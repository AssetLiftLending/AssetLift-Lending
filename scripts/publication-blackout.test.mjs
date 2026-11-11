// Run: copy both files next to an install of @hebcal/core@6.14.6, then
//   node --test publication-blackout.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { checkBlackout } from './publication-blackout.mjs';

// Times are written in UTC; comments give New York time.
const cases = [
  ['2026-11-10T16:00:00Z', false, 'Tue Nov 10 11am: ordinary weekday'],
  ['2026-11-13T19:00:00Z', false, 'Fri Nov 13 2pm: before candle-lighting'],
  ['2026-11-13T22:30:00Z', true, 'Fri Nov 13 5:30pm: after candle-lighting'],
  ['2026-11-14T17:00:00Z', true, 'Sat Nov 14 noon: Shabbat'],
  ['2026-11-15T04:30:00Z', true, 'Sat Nov 14 11:30pm: still Saturday ET (held to midnight)'],
  ['2026-11-15T15:00:00Z', false, 'Sun Nov 15 10am: after Shabbat'],
  ['2026-09-20T14:00:00Z', true, 'Sun Sep 20 10am: Erev Yom Kippur'],
  ['2026-09-21T16:00:00Z', true, 'Mon Sep 21: Yom Kippur'],
  ['2026-09-22T14:00:00Z', false, 'Tue Sep 22 10am: after Yom Kippur'],
  ['2026-09-11T14:00:00Z', true, 'Fri Sep 11 10am: Erev Rosh Hashana'],
  ['2026-09-13T16:00:00Z', true, 'Sun Sep 13: Rosh Hashana II'],
  ['2026-09-29T16:00:00Z', true, 'Tue Sep 29: Chol HaMoed Sukkot'],
  ['2026-12-08T16:00:00Z', false, 'Tue Dec 8: Chanukah (not blacked out by default)'],
  ['2027-04-21T14:00:00Z', true, 'Wed Apr 21 2027 10am: Erev Pesach'],
  ['2027-06-10T16:00:00Z', true, 'Thu Jun 10 2027: Erev Shavuot'],
];

for (const [iso, expected, label] of cases) {
  test(label, () => {
    const r = checkBlackout(new Date(iso));
    assert.equal(r.blackout, expected, `${label}: got ${r.blackout} (${r.reason})`);
  });
}
