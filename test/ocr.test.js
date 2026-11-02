import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCal, newRows, cycleStart } from '../lib/ocr.js';

test('reads rows where the date comes first', () => {
  const rows = parseCal('13/10/2026 ויקטורי ויצמן ₪52.90\n14/10/2026 WOLT ₪77.10');
  assert.deepEqual(rows.map((r) => [r.d, r.a]), [['2026-10-13', 52.9], ['2026-10-14', 77.1]]);
  assert.match(rows[0].note, /ויקטורי/);
});

test('reads Cal\'s list as Live Text returns it: amount line, then date and business', () => {
  const rows = parseCal('₪115.00\n14.10.26 רוני מרקט\n₪6.20\n14.10.26 ויקטורי');
  assert.deepEqual(rows.map((r) => [r.d, r.a]), [['2026-10-14', 115], ['2026-10-14', 6.2]]);
});

test('handles thousands separators and refunds', () => {
  const rows = parseCal('01/11/2026 KSP ₪1,666.57\n02/11/2026 זיכוי ZARA -₪13.00');
  assert.deepEqual(rows.map((r) => r.a), [1666.57, -13]);
});

test('ignores text that has no purchases in it', () => {
  assert.deepEqual(parseCal('העסקאות שלך\nסינון\nמיון'), []);
  assert.deepEqual(parseCal(''), []);
});

test('newRows skips purchases already in the app, even a day apart or off by agorot', () => {
  const tx = [
    { id: '1', d: '2026-10-13', a: 52.9 },
    { id: '2', d: '2026-10-16', a: 77.1 },
  ];
  const rows = [
    { d: '2026-10-13', a: 52.9, note: 'same' },
    { d: '2026-10-17', a: 77.1, note: 'posted a day later' },
    { d: '2026-10-18', a: 20, note: 'new' },
  ];
  const { fresh, dup } = newRows(rows, tx);
  assert.deepEqual(fresh.map((r) => r.note), ['new']);
  assert.equal(dup.length, 2);
});

test('newRows matches each existing purchase only once', () => {
  const { fresh } = newRows([{ d: '2026-10-13', a: 10 }, { d: '2026-10-13', a: 10 }], [{ id: '1', d: '2026-10-13', a: 10 }]);
  assert.equal(fresh.length, 1);
});

test('cycleStart follows the salary day', () => {
  assert.equal(cycleStart({ payday: 10 }, '2026-10-12'), '2026-10-10');
  assert.equal(cycleStart({ payday: 10 }, '2026-10-05'), '2026-09-10');
  assert.equal(cycleStart({ payday: 10 }, '2026-01-03'), '2025-12-10');
});

test('cycleStart uses a start date set by hand for that month', () => {
  assert.equal(cycleStart({ payday: 10, starts: { '2026-10': '2026-10-07' } }, '2026-10-08'), '2026-10-07');
});
