import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categorize, parseAmount, norm } from '../lib/store.js';

test('parseAmount accepts the formats a shortcut or a person sends', () => {
  assert.equal(parseAmount('₪52.90'), 52.9);
  assert.equal(parseAmount('1,234.50'), 1234.5);
  assert.equal(parseAmount('1.234,50'), 1234.5);
  assert.equal(parseAmount('52,9'), 52.9);
  assert.equal(parseAmount(12.345), 12.35);
  assert.ok(Number.isNaN(parseAmount('abc')));
});

test('categorize recognizes merchants in Hebrew and English', () => {
  assert.equal(categorize('WOLT Tel Aviv').cat, 'eat');
  assert.equal(categorize('פז ראשון לציון').cat, 'fuel');
  assert.equal(categorize('שופרסל דיל').cat, 'super');
});

test('an unknown merchant is flagged instead of guessed silently', () => {
  assert.deepEqual(categorize('XYZ LTD 4411'), { cat: 'super', unsure: true });
});

test('a category the user picked for a merchant wins over the keywords', () => {
  const cfg = { rules: { [norm('Wolt')]: 'once' } };
  assert.deepEqual(categorize('WOLT', cfg), { cat: 'once', unsure: false });
});

test('norm ignores case, quotes and extra spaces', () => {
  assert.equal(norm('  Victory  "ת"א"  '), norm('victory תא'));
});
