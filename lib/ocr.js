// Reads the text the iPhone pulls out of a screenshot of the Cal app's transaction list
// (date, business, amount per row) and turns it into purchases.
const DATE = /(\d{1,2})[/.](\d{1,2})[/.](\d{2,4})/;
const pad = (n) => String(n).padStart(2, '0');

function toDate(m) {
  let y = +m[3]; if (y < 100) y += 2000;
  const mo = +m[2], d = +m[1];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return `${y}-${pad(mo)}-${pad(d)}`;
}
// "₪52.90", "52.90 ₪", "₪-13.00", "-₪13.00", "₪1,666.57", "₪52 .90"
function toAmount(line) {
  const s = line.replace(/\s+/g, '');
  if (!/₪|ש"ח|[.,]\d{2}$/.test(s)) return null;
  const m = s.match(/^(-?)(?:₪|ש"ח)?(-?)(\d{1,3}(?:,\d{3})+|\d+)(?:[.,](\d{2}))?(?:₪|ש"ח)?$/);
  if (!m) return null;
  const v = parseFloat(m[3].replace(/,/g, '') + '.' + (m[4] || '00'));
  return Number.isFinite(v) && v > 0 ? ((m[1] || m[2]) ? -v : v) : null;
}
const NOISE = /^(העסקאות שלך|עסקאות|סינון|מיון|ייצוא|חיפוש|היום|אתמול|בהמתנה|ממתין לאישור)$/;

// Live Text may put date, business and amount on one line or on separate lines, in either order,
// so every line is cut into pieces (dates, amounts, words) and rows are rebuilt from the order they come in.
const DATE_G = /(\d{1,2})[/.](\d{1,2})[/.](\d{2,4})/g;
const AMT_G = /(-?)\s*(₪|ש"ח)\s*(-?)\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\s*[.,]\s*(\d{2}))?|(-?)(\d{1,3}(?:,\d{3})+|\d+)\s*[.,]\s*(\d{2})(?!\d)\s*(₪|ש"ח)?/g;
// A line that is only an amount, as Live Text reads Cal's list: the ₪ sign comes out as letters ("rU", "R", "₩", "U"),
// is dropped together with the dot ("11500" = 115.00), or turns into an extra digit ("R377.10" = 77.10, "R19.00" = 9.00).
const AMT_LINE = /^(-?)([^\d\s.,:/]{0,3})\s*(-?)(\d{1,3}(?:,\d{3})+|\d+)(?:\s*[.,]\s*(\d{2}))?$/;
function amountLine(line) {
  const m = line.replace(/\s+/g, ' ').trim().match(AMT_LINE);
  if (!m) return null;
  let int = m[4].replace(/,/g, ''), dec = m[5];
  if (dec == null) { if (int.length < 3) return null; dec = int.slice(-2); int = int.slice(0, -2); }
  const neg = m[1] || m[3] || /-/.test(m[2]);
  const v = parseFloat(int + '.' + dec);
  if (!(v > 0)) return null;
  const it = { k: 'a', v: neg ? -v : v };
  // "R" + 1 or 3 in front: most likely the ₪ sign read as a digit; the other reading is kept for the duplicate check
  if (/r/i.test(m[2]) && /^[13]\d/.test(int)) { const w = parseFloat(int.slice(1) + '.' + dec); it.alt = it.v; it.v = neg ? -w : w; }
  return [it];
}
const word = (out, s) => {
  s = s.replace(/[•·|]/g, ' ').replace(/\s+/g, ' ').trim();
  if (s.length >= 2 && !NOISE.test(s) && /[A-Za-zא-ת]{2,}/.test(s)) out.push({ k: 'n', v: s }); // not stray marks like "g" or "ął"
};
function pieces(line) {
  const al = amountLine(line);
  if (al) return al;
  const marks = [];
  for (const m of line.matchAll(DATE_G)) { const d = toDate(m); if (d) marks.push({ i: m.index, end: m.index + m[0].length, k: 'd', v: d }); }
  for (const m of line.matchAll(AMT_G)) {
    if (marks.some((x) => m.index < x.end && m.index + m[0].length > x.i)) continue; // part of a date
    const neg = m[1] || m[3] || m[6], int = (m[4] || m[7]).replace(/,/g, ''), dec = m[5] || m[8] || '00';
    const v = parseFloat(int + '.' + dec);
    if (v > 0) marks.push({ i: m.index, end: m.index + m[0].length, k: 'a', v: neg ? -v : v });
  }
  marks.sort((x, y) => x.i - y.i);
  const out = []; let pos = 0;
  for (const m of marks) { word(out, line.slice(pos, m.i)); out.push({ k: m.k, v: m.v }); pos = m.end; }
  word(out, line.slice(pos));
  return out;
}

export function parseCal(text) {
  const lines = String(text || '').split(/\r?\n/).map((l) => l.replace(/[‎‏‪-‮]/g, '').trim()).filter(Boolean);
  const items = lines.flatMap(pieces);
  const first = items.find((x) => x.k === 'a' || x.k === 'd');
  const rows = [];
  let cur = null;
  if (first && first.k === 'a') {
    // Cal's list as Live Text reads it: amount, then the date (with the business), then more of the business name
    for (const it of items) {
      if (it.k === 'a') { if (cur && cur.d) rows.push(cur); cur = { a: [it.v], alt: it.alt, n: [] }; }
      else if (it.k === 'd') { if (cur && !cur.d) cur.d = it.v; }
      else if (cur && cur.d) cur.n.push(it.v);
    }
    if (cur && cur.d) rows.push(cur);
  } else {
    // date first, then business and amount in any order
    for (const it of items) {
      if (it.k === 'd') { if (cur) rows.push(cur); cur = { d: it.v, a: [], n: [] }; }
      else if (cur) { cur[it.k].push(it.v); if (it.k === 'a' && it.alt != null) cur.alt = it.alt; }
    }
    if (cur) rows.push(cur);
  }
  let out = rows.filter((r) => r.a.length === 1).map((r) => {
    const o = { d: r.d, a: r.a[0], note: r.n.join(' ').slice(0, 60) };
    if (r.alt != null) o.alt = r.alt;
    return o;
  });
  // fallback: the text came column by column (all dates, then all names, then all amounts)
  if (!out.length) {
    const ds = items.filter((x) => x.k === 'd').map((x) => x.v), as = items.filter((x) => x.k === 'a').map((x) => x.v), ns = items.filter((x) => x.k === 'n').map((x) => x.v);
    if (ds.length && ds.length === as.length) out = ds.map((d, i) => ({ d, a: as[i], note: ns.length === ds.length ? ns[i] : '' }));
  }
  return out;
}

// which purchases are new: a row matches an existing purchase on the same day with (almost) the same amount
export function newRows(rows, tx) {
  const used = new Set(), fresh = [], dup = [];
  for (const r0 of rows) {
    const r = r0, hit = (r.alt != null && tx.find((t) => !used.has(t.id) && Math.abs(Date.parse(t.d) - Date.parse(r.d)) <= 864e5 && Math.abs(+t.a - Math.abs(r.alt)) < 0.015));
    if (hit) { used.add(hit.id); dup.push(r); continue; } // the other reading of the amount is already in the app
    const near = tx.filter((t) => !used.has(t.id) && t.d === r.d && Math.abs(+t.a - Math.abs(r.a)) < 0.015);
    const day = (t) => Math.abs(Date.parse(t.d) - Date.parse(r.d)) / 864e5;
    const close = near.length ? near : tx.filter((t) => !used.has(t.id) && t.d === r.d && Math.abs(+t.a - Math.abs(r.a)) <= 1.5)
      .concat(tx.filter((t) => !used.has(t.id) && day(t) <= 1 && Math.abs(+t.a - Math.abs(r.a)) < 0.015));
    if (close.length) { used.add(close[0].id); dup.push(r); } else fresh.push(r);
  }
  return { fresh, dup };
}

// first day of the salary cycle that today is in
export function cycleStart(cfg, todayStr) {
  const PD = Math.min(Math.max(+cfg.payday || 10, 1), 28), ST = cfg.starts || {};
  const addM = (k, n) => { const d = new Date(+k.slice(0, 4), +k.slice(5) - 1 + n, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
  const st = (k) => ST[k] || k + '-' + pad(PD);
  const k = todayStr.slice(0, 7), n = addM(k, 1);
  return todayStr >= st(n) ? st(n) : todayStr >= st(k) ? st(k) : st(addM(k, -1));
}
