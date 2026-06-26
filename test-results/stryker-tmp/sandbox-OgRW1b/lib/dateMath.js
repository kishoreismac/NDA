// @ts-nocheck
// Date helpers for bidirectional Start / End / Term Time computation in the
// intake flow. Term options are the same as the dropdown values.
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const DAY_MS = stryMutAct_9fa48("490") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("490"), (stryMutAct_9fa48("491") ? 1000 * 60 / 60 : (stryCov_9fa48("491"), (stryMutAct_9fa48("492") ? 1000 / 60 : (stryCov_9fa48("492"), 1000 * 60)) * 60)) * 24);

// Catalog of term options shown in the dropdown. Adding more options is safe.
export const TERM_OPTIONS = stryMutAct_9fa48("493") ? [] : (stryCov_9fa48("493"), [stryMutAct_9fa48("494") ? {} : (stryCov_9fa48("494"), {
  label: stryMutAct_9fa48("495") ? "" : (stryCov_9fa48("495"), "one (1) year"),
  days: 365
}), stryMutAct_9fa48("496") ? {} : (stryCov_9fa48("496"), {
  label: stryMutAct_9fa48("497") ? "" : (stryCov_9fa48("497"), "two (2) years"),
  days: stryMutAct_9fa48("498") ? 365 / 2 : (stryCov_9fa48("498"), 365 * 2)
}), stryMutAct_9fa48("499") ? {} : (stryCov_9fa48("499"), {
  label: stryMutAct_9fa48("500") ? "" : (stryCov_9fa48("500"), "three (3) years"),
  days: stryMutAct_9fa48("501") ? 365 / 3 : (stryCov_9fa48("501"), 365 * 3)
}), stryMutAct_9fa48("502") ? {} : (stryCov_9fa48("502"), {
  label: stryMutAct_9fa48("503") ? "" : (stryCov_9fa48("503"), "five (5) years"),
  days: stryMutAct_9fa48("504") ? 365 / 5 : (stryCov_9fa48("504"), 365 * 5)
})]);
function isoToDate(iso) {
  if (stryMutAct_9fa48("505")) {
    {}
  } else {
    stryCov_9fa48("505");
    if (stryMutAct_9fa48("508") ? false : stryMutAct_9fa48("507") ? true : stryMutAct_9fa48("506") ? iso : (stryCov_9fa48("506", "507", "508"), !iso)) return null;
    const t = Date.parse(iso);
    return isNaN(t) ? null : new Date(t);
  }
}
function dateToIso(d) {
  if (stryMutAct_9fa48("509")) {
    {}
  } else {
    stryCov_9fa48("509");
    if (stryMutAct_9fa48("512") ? !d && isNaN(d) : stryMutAct_9fa48("511") ? false : stryMutAct_9fa48("510") ? true : (stryCov_9fa48("510", "511", "512"), (stryMutAct_9fa48("513") ? d : (stryCov_9fa48("513"), !d)) || isNaN(d))) return stryMutAct_9fa48("514") ? "Stryker was here!" : (stryCov_9fa48("514"), "");
    const y = d.getFullYear();
    const m = String(stryMutAct_9fa48("515") ? d.getMonth() - 1 : (stryCov_9fa48("515"), d.getMonth() + 1)).padStart(2, stryMutAct_9fa48("516") ? "" : (stryCov_9fa48("516"), "0"));
    const day = String(d.getDate()).padStart(2, stryMutAct_9fa48("517") ? "" : (stryCov_9fa48("517"), "0"));
    return stryMutAct_9fa48("518") ? `` : (stryCov_9fa48("518"), `${y}-${m}-${day}`);
  }
}

// Given a Start date (ISO yyyy-mm-dd) and a term label, return the End date
// (ISO yyyy-mm-dd) by adding the term days. Returns "" if inputs invalid.
export function computeEndDate(startIso, termLabel) {
  if (stryMutAct_9fa48("519")) {
    {}
  } else {
    stryCov_9fa48("519");
    const start = isoToDate(startIso);
    const opt = TERM_OPTIONS.find(stryMutAct_9fa48("520") ? () => undefined : (stryCov_9fa48("520"), t => stryMutAct_9fa48("523") ? t.label !== termLabel : stryMutAct_9fa48("522") ? false : stryMutAct_9fa48("521") ? true : (stryCov_9fa48("521", "522", "523"), t.label === termLabel)));
    if (stryMutAct_9fa48("526") ? !start && !opt : stryMutAct_9fa48("525") ? false : stryMutAct_9fa48("524") ? true : (stryCov_9fa48("524", "525", "526"), (stryMutAct_9fa48("527") ? start : (stryCov_9fa48("527"), !start)) || (stryMutAct_9fa48("528") ? opt : (stryCov_9fa48("528"), !opt)))) return stryMutAct_9fa48("529") ? "Stryker was here!" : (stryCov_9fa48("529"), "");
    const end = new Date(stryMutAct_9fa48("530") ? start.getTime() - opt.days * DAY_MS : (stryCov_9fa48("530"), start.getTime() + (stryMutAct_9fa48("531") ? opt.days / DAY_MS : (stryCov_9fa48("531"), opt.days * DAY_MS))));
    return dateToIso(end);
  }
}

// Given a Start and End date, return the closest matching term label from
// TERM_OPTIONS based on the number of days between them. Returns "" if
// inputs invalid or the gap is non-positive.
export function computeTermFromDates(startIso, endIso) {
  if (stryMutAct_9fa48("532")) {
    {}
  } else {
    stryCov_9fa48("532");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("535") ? !start && !end : stryMutAct_9fa48("534") ? false : stryMutAct_9fa48("533") ? true : (stryCov_9fa48("533", "534", "535"), (stryMutAct_9fa48("536") ? start : (stryCov_9fa48("536"), !start)) || (stryMutAct_9fa48("537") ? end : (stryCov_9fa48("537"), !end)))) return stryMutAct_9fa48("538") ? "Stryker was here!" : (stryCov_9fa48("538"), "");
    const days = Math.round(stryMutAct_9fa48("539") ? (end.getTime() - start.getTime()) * DAY_MS : (stryCov_9fa48("539"), (stryMutAct_9fa48("540") ? end.getTime() + start.getTime() : (stryCov_9fa48("540"), end.getTime() - start.getTime())) / DAY_MS));
    if (stryMutAct_9fa48("544") ? days > 0 : stryMutAct_9fa48("543") ? days < 0 : stryMutAct_9fa48("542") ? false : stryMutAct_9fa48("541") ? true : (stryCov_9fa48("541", "542", "543", "544"), days <= 0)) return stryMutAct_9fa48("545") ? "Stryker was here!" : (stryCov_9fa48("545"), "");
    let best = TERM_OPTIONS[0];
    let bestDelta = Math.abs(stryMutAct_9fa48("546") ? days + best.days : (stryCov_9fa48("546"), days - best.days));
    for (const opt of TERM_OPTIONS) {
      if (stryMutAct_9fa48("547")) {
        {}
      } else {
        stryCov_9fa48("547");
        const d = Math.abs(stryMutAct_9fa48("548") ? days + opt.days : (stryCov_9fa48("548"), days - opt.days));
        if (stryMutAct_9fa48("552") ? d >= bestDelta : stryMutAct_9fa48("551") ? d <= bestDelta : stryMutAct_9fa48("550") ? false : stryMutAct_9fa48("549") ? true : (stryCov_9fa48("549", "550", "551", "552"), d < bestDelta)) {
          if (stryMutAct_9fa48("553")) {
            {}
          } else {
            stryCov_9fa48("553");
            best = opt;
            bestDelta = d;
          }
        }
      }
    }
    return best.label;
  }
}

// Given a Start and End date, return an exact human-friendly duration like
// "1 year 3 months 12 days" computed via real calendar math (years and
// months stepped first, remaining days last). Returns "" if invalid.
export function formatCustomTerm(startIso, endIso) {
  if (stryMutAct_9fa48("554")) {
    {}
  } else {
    stryCov_9fa48("554");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("557") ? (!start || !end) && end <= start : stryMutAct_9fa48("556") ? false : stryMutAct_9fa48("555") ? true : (stryCov_9fa48("555", "556", "557"), (stryMutAct_9fa48("559") ? !start && !end : stryMutAct_9fa48("558") ? false : (stryCov_9fa48("558", "559"), (stryMutAct_9fa48("560") ? start : (stryCov_9fa48("560"), !start)) || (stryMutAct_9fa48("561") ? end : (stryCov_9fa48("561"), !end)))) || (stryMutAct_9fa48("564") ? end > start : stryMutAct_9fa48("563") ? end < start : stryMutAct_9fa48("562") ? false : (stryCov_9fa48("562", "563", "564"), end <= start)))) return stryMutAct_9fa48("565") ? "Stryker was here!" : (stryCov_9fa48("565"), "");
    let years = stryMutAct_9fa48("566") ? end.getFullYear() + start.getFullYear() : (stryCov_9fa48("566"), end.getFullYear() - start.getFullYear());
    let months = stryMutAct_9fa48("567") ? end.getMonth() + start.getMonth() : (stryCov_9fa48("567"), end.getMonth() - start.getMonth());
    let days = stryMutAct_9fa48("568") ? end.getDate() + start.getDate() : (stryCov_9fa48("568"), end.getDate() - start.getDate());
    if (stryMutAct_9fa48("572") ? days >= 0 : stryMutAct_9fa48("571") ? days <= 0 : stryMutAct_9fa48("570") ? false : stryMutAct_9fa48("569") ? true : (stryCov_9fa48("569", "570", "571", "572"), days < 0)) {
      if (stryMutAct_9fa48("573")) {
        {}
      } else {
        stryCov_9fa48("573");
        // borrow from previous month of `end`
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        stryMutAct_9fa48("574") ? days -= prevMonth.getDate() : (stryCov_9fa48("574"), days += prevMonth.getDate());
        stryMutAct_9fa48("575") ? months += 1 : (stryCov_9fa48("575"), months -= 1);
      }
    }
    if (stryMutAct_9fa48("579") ? months >= 0 : stryMutAct_9fa48("578") ? months <= 0 : stryMutAct_9fa48("577") ? false : stryMutAct_9fa48("576") ? true : (stryCov_9fa48("576", "577", "578", "579"), months < 0)) {
      if (stryMutAct_9fa48("580")) {
        {}
      } else {
        stryCov_9fa48("580");
        stryMutAct_9fa48("581") ? months -= 12 : (stryCov_9fa48("581"), months += 12);
        stryMutAct_9fa48("582") ? years += 1 : (stryCov_9fa48("582"), years -= 1);
      }
    }
    const parts = stryMutAct_9fa48("583") ? ["Stryker was here"] : (stryCov_9fa48("583"), []);
    if (stryMutAct_9fa48("587") ? years <= 0 : stryMutAct_9fa48("586") ? years >= 0 : stryMutAct_9fa48("585") ? false : stryMutAct_9fa48("584") ? true : (stryCov_9fa48("584", "585", "586", "587"), years > 0)) parts.push(stryMutAct_9fa48("588") ? `` : (stryCov_9fa48("588"), `${years} year${(stryMutAct_9fa48("591") ? years !== 1 : stryMutAct_9fa48("590") ? false : stryMutAct_9fa48("589") ? true : (stryCov_9fa48("589", "590", "591"), years === 1)) ? stryMutAct_9fa48("592") ? "Stryker was here!" : (stryCov_9fa48("592"), "") : stryMutAct_9fa48("593") ? "" : (stryCov_9fa48("593"), "s")}`));
    if (stryMutAct_9fa48("597") ? months <= 0 : stryMutAct_9fa48("596") ? months >= 0 : stryMutAct_9fa48("595") ? false : stryMutAct_9fa48("594") ? true : (stryCov_9fa48("594", "595", "596", "597"), months > 0)) parts.push(stryMutAct_9fa48("598") ? `` : (stryCov_9fa48("598"), `${months} month${(stryMutAct_9fa48("601") ? months !== 1 : stryMutAct_9fa48("600") ? false : stryMutAct_9fa48("599") ? true : (stryCov_9fa48("599", "600", "601"), months === 1)) ? stryMutAct_9fa48("602") ? "Stryker was here!" : (stryCov_9fa48("602"), "") : stryMutAct_9fa48("603") ? "" : (stryCov_9fa48("603"), "s")}`));
    if (stryMutAct_9fa48("607") ? days <= 0 : stryMutAct_9fa48("606") ? days >= 0 : stryMutAct_9fa48("605") ? false : stryMutAct_9fa48("604") ? true : (stryCov_9fa48("604", "605", "606", "607"), days > 0)) parts.push(stryMutAct_9fa48("608") ? `` : (stryCov_9fa48("608"), `${days} day${(stryMutAct_9fa48("611") ? days !== 1 : stryMutAct_9fa48("610") ? false : stryMutAct_9fa48("609") ? true : (stryCov_9fa48("609", "610", "611"), days === 1)) ? stryMutAct_9fa48("612") ? "Stryker was here!" : (stryCov_9fa48("612"), "") : stryMutAct_9fa48("613") ? "" : (stryCov_9fa48("613"), "s")}`));
    return parts.length ? parts.join(stryMutAct_9fa48("614") ? "" : (stryCov_9fa48("614"), " ")) : stryMutAct_9fa48("615") ? "" : (stryCov_9fa48("615"), "0 days");
  }
}

// True when the (start, end) gap exactly equals one of the preset term
// options (within a small calendar tolerance).
export function matchesPreset(startIso, endIso) {
  if (stryMutAct_9fa48("616")) {
    {}
  } else {
    stryCov_9fa48("616");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("619") ? !start && !end : stryMutAct_9fa48("618") ? false : stryMutAct_9fa48("617") ? true : (stryCov_9fa48("617", "618", "619"), (stryMutAct_9fa48("620") ? start : (stryCov_9fa48("620"), !start)) || (stryMutAct_9fa48("621") ? end : (stryCov_9fa48("621"), !end)))) return stryMutAct_9fa48("622") ? true : (stryCov_9fa48("622"), false);
    const days = Math.round(stryMutAct_9fa48("623") ? (end.getTime() - start.getTime()) * DAY_MS : (stryCov_9fa48("623"), (stryMutAct_9fa48("624") ? end.getTime() + start.getTime() : (stryCov_9fa48("624"), end.getTime() - start.getTime())) / DAY_MS));
    return stryMutAct_9fa48("625") ? TERM_OPTIONS.every(o => Math.abs(days - o.days) <= 1) : (stryCov_9fa48("625"), TERM_OPTIONS.some(stryMutAct_9fa48("626") ? () => undefined : (stryCov_9fa48("626"), o => stryMutAct_9fa48("630") ? Math.abs(days - o.days) > 1 : stryMutAct_9fa48("629") ? Math.abs(days - o.days) < 1 : stryMutAct_9fa48("628") ? false : stryMutAct_9fa48("627") ? true : (stryCov_9fa48("627", "628", "629", "630"), Math.abs(stryMutAct_9fa48("631") ? days + o.days : (stryCov_9fa48("631"), days - o.days)) <= 1))));
  }
}