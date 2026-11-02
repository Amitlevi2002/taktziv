// POST   { amount, merchant, card }      <- the Apple Pay shortcut (card = the Wallet card it was paid with)
// POST   { a, cat, note, d }             <- the form in the app
// POST   { ocr }                         <- text of a Cal app screenshot ("share -> add to budget" shortcut)
// GET    ?ocr=...                        <- the same, for a shortcut that can only open a link (answers in plain text)
// PATCH  { id, cat }                     <- fix a category (and remember it for that merchant)
// DELETE ?id=...
// The shortcut may use the short PAY_KEY instead of the full key: it can only add an expense and gets no data back.
import { parseCal, newRows, cycleStart } from '../lib/ocr.js';
import { access, denied, load, saveTx, saveCfg, keepCopy, dropCopy, body, today, categorize, parseAmount, norm, CATS } from '../lib/store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const a = access(req), full = a === 'ok';
  const ocrGet = req.method === 'GET' && req.query && typeof req.query.ocr === 'string';
  const payOnly = !full && (req.method === 'POST' || ocrGet) && Boolean(process.env.PAY_KEY) && req.query && req.query.k === process.env.PAY_KEY;
  if (!full && !payOnly) return denied(res, a);
  let copied = false;
  try {
    if (ocrGet) return await importShot(req.query.ocr, res, true, true);
    const b = body(req);
    if (payOnly) { delete b.a; delete b.cat; delete b.d; delete b.note; }
    if (req.method === 'POST' && typeof b.ocr === 'string') return await importShot(b.ocr, res, payOnly);
    const ts = Date.now(), id = ts.toString(36) + Math.random().toString(36).slice(2, 6);
    // Apple Pay: keep a copy first, so the purchase survives even if reading or writing the main file fails
    if (req.method === 'POST' && b.a == null && parseAmount(b.amount) > 0) {
      const merchant = String(b.merchant || '').trim().slice(0, 60), card = String(b.card || '').trim().slice(0, 40);
      const t = { id, ts, a: parseAmount(b.amount), cat: 'super', unsure: true, note: merchant, d: today(), src: 'applepay' };
      if (card) t.card = card;
      try { await keepCopy(t); copied = true; } catch (e) { /* the main write below still runs */ }
    }
    const s = await load();
    let text = '';
    if (req.method === 'POST') {
      const fromPay = b.a == null;
      const a = parseAmount(fromPay ? b.amount : b.a);
      if (!(a > 0)) return res.status(400).json({ error: 'amount missing', text: 'לא התקבל סכום, ההוצאה לא נרשמה' });
      const merchant = String(b.merchant || '').trim().slice(0, 60);
      let cat = CATS[b.cat] ? b.cat : null, unsure = false;
      if (!cat) ({ cat, unsure } = categorize(merchant, s.cfg));
      const note = String(b.note || merchant || '').trim().slice(0, 60);
      const dup = fromPay && s.tx.some((t) => t.src === 'applepay' && t.a === a && t.note === note && ts - (t.ts || 0) < 90000);
      if (!dup) {
        const t = { id, ts, a, cat, note,
          d: /^\d{4}-\d{2}-\d{2}$/.test(b.d || '') ? b.d : today(), src: fromPay ? 'applepay' : 'manual' };
        if (unsure) t.unsure = true;
        const card = String(b.card || '').trim().slice(0, 40);
        if (card) t.card = card;
        s.tx.push(t);
        await saveTx(s);
        if (fromPay) { try { await keepCopy(t); } catch (e) { /* the first copy is still there */ } } // same id, now with the real category
      } else if (fromPay) { try { await dropCopy(id); } catch (e) { /* cleaned up later */ } } // the shortcut fired twice: no copy for the repeat
      text = `נרשם ₪${a} · ${CATS[cat]}` + (unsure ? ' (בדוק קטגוריה)' : '');
    } else if (req.method === 'PATCH') {
      const t = s.tx.find((x) => x.id === b.id);
      if (!t || !CATS[b.cat]) return res.status(400).json({ error: 'bad id or category' });
      t.cat = b.cat; delete t.unsure;
      await saveTx(s);
      if (t.src === 'applepay' && t.note) { s.cfg.rules = s.cfg.rules || {}; s.cfg.rules[norm(t.note)] = b.cat; await saveCfg(s.cfg); }
    } else if (req.method === 'DELETE') {
      const did = req.query && req.query.id;
      s.tx = s.tx.filter((x) => x.id !== did);
      await saveTx(s);
      try { await dropCopy(did); } catch (e) { /* a leftover copy is cleaned up later */ }
    } else return res.status(405).json({ error: 'method not allowed' });
    return res.status(200).json(payOnly ? { text } : { ...s, text });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e), text: copied ? 'נשמר גיבוי, יופיע באפליקציה תוך כמה דקות' : 'שגיאה, ההוצאה לא נרשמה' });
  }
}

// Screenshot import: adds what is not in the app yet, from the start of this salary cycle on.
async function importShot(ocr, res, payOnly, plain) {
  const send = (c, o) => plain ? (res.setHeader('Content-Type', 'text/plain; charset=utf-8'), res.status(c).send(o.text)) : res.status(c).json(o);
  const rows = parseCal(ocr);
  if (!rows.length) return send(400, { error: 'nothing found', text: 'לא מצאתי עסקאות בתמונה. מה שהתקבל: ' + (String(ocr).replace(/\s+/g, ' ').trim().slice(0, 300) || '(ריק, הטקסט לא חולץ מהתמונה)') });
  const s = await load();
  const from = cycleStart(s.cfg, today());
  const inCycle = rows.filter((r) => r.d >= from && r.d <= today()), old = rows.length - inCycle.length;
  const { fresh, dup } = newRows(inCycle, s.tx);
  const added = [];
  for (const r of fresh) {
    if (r.a < 0) continue; // refunds: not added automatically
    const { cat, unsure } = categorize(r.note, s.cfg);
    // the screenshot has no time: midday of that date, or just after the bank update when it is the same day
    const B = s.cfg.bank, ts = B && B.d === r.d ? Math.max(+B.ts + 60000, Date.parse(r.d + 'T12:00:00+03:00')) : Date.parse(r.d + 'T12:00:00+03:00');
    const t = { id: ts.toString(36) + Math.random().toString(36).slice(2, 6), ts, a: r.a, cat, note: r.note, d: r.d, src: 'applepay', via: 'shot' }; // shown and fixable like an Apple Pay purchase (category menu, direct/Visa switch)
    if (unsure) t.unsure = true;
    s.tx.push(t); added.push(r.alt != null ? { ...t, chk: 1 } : t);
  }
  if (added.length) { s.tx.sort((x, y) => (x.ts || 0) - (y.ts || 0)); await saveTx(s); }
  const refunds = fresh.filter((r) => r.a < 0).length;
  const f = (t) => `${t.note || 'ללא שם'} ₪${t.a}` + (t.chk ? ' (בדוק סכום)' : '');
  const text = (added.length ? `נוספו ${added.length}: ${added.map(f).join(', ')}` : 'אין עסקאות חדשות')
    + (dup.length ? ` · ${dup.length} כבר היו` : '') + (old ? ` · ${old} מלפני המשכורת, דילגתי` : '') + (refunds ? ` · ${refunds} זיכויים, לא נוספו` : '');
  return send(200, payOnly ? { text } : { ...s, text });
}
