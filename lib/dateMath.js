// Date helpers for bidirectional Start / End / Term Time computation in the
// intake flow. Term options are the same as the dropdown values.

const DAY_MS = 1000 * 60 * 60 * 24;

// Catalog of term options shown in the dropdown. Adding more options is safe.
export const TERM_OPTIONS = [
  { label: "one (1) year", days: 365 },
  { label: "two (2) years", days: 365 * 2 },
  { label: "three (3) years", days: 365 * 3 },
  { label: "five (5) years", days: 365 * 5 },
];

function isoToDate(iso) {
  if (!iso) return null;
  const t = Date.parse(iso);
  return isNaN(t) ? null : new Date(t);
}

function dateToIso(d) {
  if (!d || isNaN(d)) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Given a Start date (ISO yyyy-mm-dd) and a term label, return the End date
// (ISO yyyy-mm-dd) by adding the term days. Returns "" if inputs invalid.
export function computeEndDate(startIso, termLabel) {
  const start = isoToDate(startIso);
  const opt = TERM_OPTIONS.find((t) => t.label === termLabel);
  if (!start || !opt) return "";
  const end = new Date(start.getTime() + opt.days * DAY_MS);
  return dateToIso(end);
}

// Given a Start and End date, return the closest matching term label from
// TERM_OPTIONS based on the number of days between them. Returns "" if
// inputs invalid or the gap is non-positive.
export function computeTermFromDates(startIso, endIso) {
  const start = isoToDate(startIso);
  const end = isoToDate(endIso);
  if (!start || !end) return "";
  const days = Math.round((end.getTime() - start.getTime()) / DAY_MS);
  if (days <= 0) return "";
  let best = TERM_OPTIONS[0];
  let bestDelta = Math.abs(days - best.days);
  for (const opt of TERM_OPTIONS) {
    const d = Math.abs(days - opt.days);
    if (d < bestDelta) {
      best = opt;
      bestDelta = d;
    }
  }
  return best.label;
}
