#!/usr/bin/env node
/**
 * Publication blackout check (owner rule, Nov 10, 2026).
 *
 * No publishing, merging, or go-live actions on Shabbat (Friday sunset through
 * Saturday night) or on Jewish holidays and their eves. When in doubt, hold.
 *
 * Used by the GitHub Actions bots before they publish anything. Prints the
 * decision and, when run inside Actions, writes `blackout=true|false` and
 * `reason=...` to $GITHUB_OUTPUT. FAILS CLOSED: any error means blackout=true.
 *
 * Window (America/New_York, diaspora calendar, via @hebcal/core):
 *  1. From candle-lighting (18 min before sunset) on the eve of Shabbat or a
 *     yom tov until havdalah, taken conservatively at 72 min after sunset.
 *  2. The whole calendar day (ET) of any Saturday, yom tov, or Chol HaMoed.
 *  3. The whole calendar day (ET) before any yom tov (its eve).
 *
 * Not blacked out by default (owner to decide): Chanukah, Purim, Tisha B'Av,
 * minor fasts, Rosh Chodesh. Add them to EXTRA_HOLIDAY_FLAGS if wanted.
 *
 * Requires @hebcal/core (installed by the workflow step, not a site dependency).
 */
import { appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { HebrewCalendar, HDate, Location, flags } from '@hebcal/core';

const TZ = 'America/New_York';
const HAVDALAH_MINS = 72; // conservative end of Shabbat / yom tov
const BLOCK_DAY_FLAGS = flags.CHAG | flags.CHOL_HAMOED;
const EXTRA_HOLIDAY_FLAGS = 0; // e.g. flags.MINOR_HOLIDAY | flags.MAJOR_FAST

function etDateParts(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short',
    }).formatToParts(date).map((p) => [p.type, p.value]),
  );
  return { y: +parts.year, m: +parts.month, d: +parts.day, weekday: parts.weekday };
}

function holidaysOn(hdate) {
  return HebrewCalendar.getHolidaysOnDate(hdate, false) ?? [];
}

export function checkBlackout(now = new Date()) {
  const { y, m, d, weekday } = etDateParts(now);
  const today = new HDate(new Date(y, m - 1, d));
  const tomorrow = today.next();
  const dayFlags = BLOCK_DAY_FLAGS | EXTRA_HOLIDAY_FLAGS;

  if (weekday === 'Sat') return { blackout: true, reason: 'Shabbat (Saturday, ET)' };

  const todayHit = holidaysOn(today).find((e) => e.getFlags() & dayFlags);
  if (todayHit) return { blackout: true, reason: `Holiday today: ${todayHit.render('en')}` };

  const eveOf = holidaysOn(tomorrow).find((e) => e.getFlags() & flags.CHAG);
  if (eveOf) return { blackout: true, reason: `Eve of ${eveOf.render('en')}` };

  // Shabbat / yom tov that began at candle-lighting and has not ended yet.
  const events = HebrewCalendar.calendar({
    start: new Date(now.getTime() - 5 * 86400000),
    end: new Date(now.getTime() + 2 * 86400000),
    location: Location.lookup('New York'),
    candlelighting: true,
    havdalahMins: HAVDALAH_MINS,
    il: false,
    sedrot: false,
    noMinorFast: true,
    noModern: true,
    noRoshChodesh: true,
    noSpecialShabbat: true,
  });
  const starts = events.filter((e) => e.getDesc() === 'Candle lighting' && e.eventTime);
  const ends = events.filter((e) => e.getDesc() === 'Havdalah' && e.eventTime);
  const lastStart = starts.filter((e) => e.eventTime <= now).at(-1);
  if (lastStart) {
    const end = ends.find((e) => e.eventTime > lastStart.eventTime);
    if (!end || now < end.eventTime) {
      return { blackout: true, reason: `Shabbat/yom tov since candle-lighting ${lastStart.eventTime.toISOString()}` };
    }
  }
  return { blackout: false, reason: 'No Shabbat or holiday window' };
}

function emit(result) {
  const reason = result.reason.replace(/\n/g, ' ');
  console.log(`Publication blackout: ${result.blackout ? 'YES - publishing skipped' : 'no'} (${reason})`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `blackout=${result.blackout}\nreason=${reason}\n`);
  }
  if (process.env.GITHUB_STEP_SUMMARY && result.blackout) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Skipped: publication blackout\n${reason}\n`);
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  let result;
  try {
    result = checkBlackout(new Date());
  } catch (err) {
    result = { blackout: true, reason: `check failed, holding (fail closed): ${err?.message ?? err}` };
  }
  try {
    emit(result);
  } catch (err) {
    console.error(`Could not write outputs: ${err?.message ?? err}`);
    process.exit(1); // missing output => later steps' == 'false' guard also holds
  }
}
