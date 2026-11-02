// Storage (private Vercel Blob):
//   budget/state.json      the purchases { tx: [] }  (older versions also kept cfg here)
//   budget/cfg.json        the settings, written on their own so saving settings can never overwrite a purchase
//   budget/inbox/<id>.json a copy of every Apple Pay purchase, written before anything else. If the main write is
//                          lost or fails, recover() puts it back; copies that are already in state.json get cleaned up.
import { get, put, list, del } from '@vercel/blob';

const PATH = 'budget/state.json';
const CFG_PATH = 'budget/cfg.json';
const INBOX = 'budget/inbox/';

export const CATS = {
  fixed: 'קבועים ומנויים', fuel: 'דלק', super: 'סופר וקניות קטנות',
  eat: 'מסעדות ומשלוחים', shop: 'קניות וטיפוח', cash: 'מזומן', once: 'חד-פעמי',
};

// Used until the first save; everything here is edited in the app afterwards.
const DEFAULT_CFG = {
  income: 0, cut: 50, inv: 90, payday: 10, start: null, incomes: {}, asideDone: {}, plans: [], rules: {},
  budgets: { fuel: 0, super: 0, eat: 0, shop: 0, cash: 0 },
  fixed: [],
};

const KEYWORDS = [
  ['fuel', ['פז', 'סונול', 'דלק', 'דור אלון', 'yellow', 'ten ', 'תחנת']],
  ['eat', ['wolt', 'וולט', 'תן ביס', '10bis', 'מסעד', 'קפה', 'cafe', 'coffee', 'ארומה', 'פיצה', 'בורגר', 'מקדונלד', 'סושי', 'שווארמה', 'פלאפל', 'גלידה', 'בר ']],
  ['shop', ['zara', 'h&m', 'castro', 'קסטרו', 'fox', 'ksp', 'ivory', 'bug', 'איקאה', 'ikea', 'מספרה', 'סופר פארם', 'סופר-פארם', 'super-pharm', 'terminal', 'nike', 'adidas', 'aliexpress', 'amazon']],
  ['super', ['טבק', 'tobacco', 'שופרסל', 'רמי לוי', 'ויקטורי', 'יוחננוף', 'אושר עד', 'טיב טעם', 'קרפור', 'am:pm', 'מרקט', 'סופר', 'מכולת', 'קיוסק', 'מינימרקט', 'victory', 'shufersal', 'rami levy', 'yochananof', 'osher ad', 'tiv taam', 'carrefour', 'market', 'super', 'makolet', 'kiosk']],
  ['cash', ['כספומט', 'משיכת מזומן', 'atm']],
];

export const norm = (s) => String(s || '').toLowerCase().replace(/["'״׳]/g, '').replace(/\s+/g, ' ').trim();

export function categorize(merchant, cfg) {
  const k = norm(merchant);
  if (k && cfg && cfg.rules && CATS[cfg.rules[k]]) return { cat: cfg.rules[k], unsure: false };
  const p = ' ' + k + ' ';
  for (const [cat, words] of KEYWORDS) for (const w of words) if (p.includes(w)) return { cat, unsure: false };
  return { cat: 'super', unsure: true }; // unknown merchant: flagged in the app until you pick a category
}

export function parseAmount(v) {
  if (typeof v === 'number') return Math.round(v * 100) / 100;
  let s = String(v ?? '').replace(/[^\d.,-]/g, '');
  if (/,\d{1,2}$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
  else s = s.replace(/,/g, '');
  const n = Math.abs(parseFloat(s));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
}

export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem' }).format(new Date());

// 'ok' | 'pin' (right key, missing or wrong PIN) | 'no'. The PIN is only asked when APP_PIN is set.
export function access(req) {
  const key = process.env.APP_KEY, pin = process.env.APP_PIN;
  const got = req.headers['x-key'] || (req.query && req.query.k);
  if (!key || got !== key) return 'no';
  return !pin || String(req.headers['x-pin'] || (req.query && req.query.p) || '') === pin ? 'ok' : 'pin'; // ?p= lets a plain link (for checks) carry the PIN
}
export const auth = (req) => access(req) === 'ok';
// a wrong PIN costs a second, so guessing it takes days
export const denied = async (res, a) => { if (a === 'pin') await new Promise((r) => setTimeout(r, 1000)); return res.status(401).json({ error: a === 'pin' ? 'pin' : 'unauthorized', text: 'מפתח שגוי' }); };

async function readJson(path) {
  let r;
  try {
    r = await get(path, { access: 'private', useCache: false });
  } catch (e) {
    if (e && e.name === 'BlobNotFoundError') return null;
    throw e; // never treat a read failure as "empty": the next save would wipe the data
  }
  if (!r) return null;
  if (r.statusCode !== 200) throw new Error('blob read failed: ' + r.statusCode);
  return JSON.parse(await new Response(r.stream).text());
}
const putJson = (path, v) => put(path, JSON.stringify(v), {
  access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
});

export async function load() {
  const [s, c] = await Promise.all([readJson(PATH), readJson(CFG_PATH)]);
  const cfg = c || (s && s.cfg) || structuredClone(DEFAULT_CFG);
  return { cfg, tx: s && Array.isArray(s.tx) ? s.tx : [] };
}

export const saveCfg = (cfg) => putJson(CFG_PATH, cfg);
export const saveTx = (s) => putJson(PATH, { cfg: s.cfg, tx: s.tx }); // cfg kept here too, for older versions
export async function save(s) { await Promise.all([saveTx(s), saveCfg(s.cfg)]); }

export const keepCopy = (t) => putJson(INBOX + t.id + '.json', t);
export async function dropCopy(id) {
  const { blobs } = await list({ prefix: INBOX + id + '.json' });
  if (blobs.length) await del(blobs.map((b) => b.url));
}
// puts back any Apple Pay purchase whose main write was lost; returns how many came back
export async function recover(s) {
  const found = [];
  let cursor;
  do {
    const r = await list({ prefix: INBOX, cursor });
    found.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  const have = new Set(s.tx.map((t) => t.id)), done = [];
  let added = 0;
  for (const b of found) {
    const id = b.pathname.slice(INBOX.length).replace(/[.]json$/, '');
    if (have.has(id)) { done.push(b.url); continue; }
    const t = await readJson(b.pathname);
    if (t && t.id) { s.tx.push(t); have.add(t.id); added++; }
  }
  if (added) { s.tx.sort((x, y) => (x.ts || 0) - (y.ts || 0)); await saveTx(s); }
  if (done.length) await del(done);
  return added;
}

export const body = (req) => (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {});
