// Demo mode: opening the app without a key (?k=...) runs it on made-up data kept in this browser.
// It answers the same requests as /api/state and /api/tx, so app.js does not know the difference.
(() => {
  const KEY = 'taktziv-demo-v1';
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const id = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function seed() {
    const now = new Date();
    const payday = 10;
    // start of the current salary cycle
    const start = new Date(now.getFullYear(), now.getMonth() - (now.getDate() < payday ? 1 : 0), payday);
    const key = start.getFullYear() + '-' + pad(start.getMonth() + 1);
    const daysIn = Math.max(1, Math.round((now - start) / 864e5));

    const cfg = {
      income: 11500, cut: 50, inv: 90, payday, start: key, starts: {}, incomes: {}, asides: {}, asideDone: {}, plans: [], rules: {},
      budgets: { fuel: 600, super: 1100, eat: 450, shop: 400, cash: 200 },
      fixed: [
        { n: 'חדר כושר', a: 249, day: 1 }, { n: 'סלולר ואינטרנט', a: 159, day: 11 },
        { n: 'Spotify', a: 23.9, day: 14 }, { n: 'Netflix', a: 54.9, day: 8 }, { n: 'iCloud+', a: 3.9, day: 18 },
      ],
    };

    const spend = [
      ['super', 'שופרסל דיל', 214.6], ['fuel', 'פז', 287.3], ['eat', 'Wolt', 76.5], ['super', 'רמי לוי', 342.1],
      ['eat', 'ארומה', 38], ['shop', 'סופר-פארם', 89.9], ['super', 'מכולת השכונה', 46], ['eat', 'פיצה האט', 64],
      ['fuel', 'סונול', 251.8], ['cash', 'כספומט', 100], ['super', 'ויקטורי', 128.4], ['shop', 'ZARA', 179.9],
      ['eat', 'תן ביס', 52], ['super', 'שופרסל אקספרס', 33.5], ['once', 'מתנת יום הולדת', 150], ['eat', 'קפה גרג', 27],
    ];
    const tx = spend.map(([cat, note, a], i) => {
      const day = new Date(start.getTime() + Math.floor((i / spend.length) * daysIn) * 864e5 + 13 * 36e5);
      return { id: id() + i, ts: day.getTime(), a, cat, note, d: iso(day), src: i % 3 ? 'applepay' : 'manual' };
    });
    // one Apple Pay purchase from a merchant the app doesn't know yet, to show the "pick a category" flow
    tx.push({ id: id() + 'u', ts: Date.now() - 2 * 36e5, a: 64.9, cat: 'super', unsure: true, note: 'BLUE SQUARE 114', d: iso(new Date(Date.now() - 2 * 36e5)), src: 'applepay' });
    return { cfg, tx };
  }

  const read = () => { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.cfg) return s; } catch (e) { /* fresh data */ } return seed(); };
  const write = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* still works for this visit */ } return s; };
  const clone = (s) => JSON.parse(JSON.stringify(s));

  window.taktzivDemo = {
    reset() { try { localStorage.removeItem(KEY); } catch (e) { /* nothing stored */ } location.reload(); },
    async api(path, method = 'GET', body) {
      const s = read();
      const url = new URL(path, location.href);
      if (url.pathname === '/api/state') {
        if (method === 'PUT') s.cfg = { ...body.cfg, rules: { ...(s.cfg.rules || {}), ...(body.cfg.rules || {}) } };
      } else if (url.pathname === '/api/tx') {
        if (method === 'POST') {
          const a = Math.round(parseFloat(body.a) * 100) / 100;
          if (!(a > 0)) throw { status: 400 };
          s.tx.push({ id: id(), ts: Date.now(), a, cat: body.cat || 'once', note: String(body.note || '').slice(0, 60), d: body.d || iso(new Date()), src: 'manual' });
        } else if (method === 'PATCH') {
          const t = s.tx.find((x) => x.id === body.id);
          if (t) { t.cat = body.cat; delete t.unsure; if (t.note) s.cfg.rules[t.note.toLowerCase()] = body.cat; }
        } else if (method === 'DELETE') {
          s.tx = s.tx.filter((x) => x.id !== url.searchParams.get('id'));
        }
      }
      write(s);
      await new Promise((r) => setTimeout(r, 80));
      return clone(s);
    },
  };
})();
