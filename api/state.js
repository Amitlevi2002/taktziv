import { access, denied, load, saveCfg, recover, body } from '../lib/store.js';

let lastRecover = 0; // at most one inbox check every 10 minutes per server instance

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const a = access(req);
  if (a !== 'ok') return denied(res, a);
  try {
    const s = await load();
    if (req.method === 'PUT') {
      const b = body(req);
      if (!b.cfg || typeof b.cfg !== 'object') return res.status(400).json({ error: 'cfg missing' });
      s.cfg = { ...b.cfg, rules: { ...(s.cfg.rules || {}), ...(b.cfg.rules || {}) } };
      await saveCfg(s.cfg); // settings only: never rewrites the purchases
    } else if (req.method === 'GET') {
      if (Date.now() - lastRecover > 600000) { lastRecover = Date.now(); try { await recover(s); } catch (e) { lastRecover = 0; } }
    } else return res.status(405).json({ error: 'method not allowed' });
    return res.status(200).json(s);
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
