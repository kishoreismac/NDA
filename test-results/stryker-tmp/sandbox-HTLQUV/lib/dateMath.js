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
const DAY_MS = stryMutAct_9fa48("0") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("0"), (stryMutAct_9fa48("1") ? 1000 * 60 / 60 : (stryCov_9fa48("1"), (stryMutAct_9fa48("2") ? 1000 / 60 : (stryCov_9fa48("2"), 1000 * 60)) * 60)) * 24);

// Catalog of term options shown in the dropdown. Adding more options is safe.
export const TERM_OPTIONS = stryMutAct_9fa48("3") ? [] : (stryCov_9fa48("3"), [stryMutAct_9fa48("4") ? {} : (stryCov_9fa48("4"), {
  label: stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), "one (1) year"),
  days: 365
}), stryMutAct_9fa48("6") ? {} : (stryCov_9fa48("6"), {
  label: stryMutAct_9fa48("7") ? "" : (stryCov_9fa48("7"), "two (2) years"),
  days: stryMutAct_9fa48("8") ? 365 / 2 : (stryCov_9fa48("8"), 365 * 2)
}), stryMutAct_9fa48("9") ? {} : (stryCov_9fa48("9"), {
  label: stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "three (3) years"),
  days: stryMutAct_9fa48("11") ? 365 / 3 : (stryCov_9fa48("11"), 365 * 3)
}), stryMutAct_9fa48("12") ? {} : (stryCov_9fa48("12"), {
  label: stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), "five (5) years"),
  days: stryMutAct_9fa48("14") ? 365 / 5 : (stryCov_9fa48("14"), 365 * 5)
})]);
function isoToDate(iso) {
  if (stryMutAct_9fa48("15")) {
    {}
  } else {
    stryCov_9fa48("15");
    if (stryMutAct_9fa48("18") ? false : stryMutAct_9fa48("17") ? true : stryMutAct_9fa48("16") ? iso : (stryCov_9fa48("16", "17", "18"), !iso)) return null;
    const t = Date.parse(iso);
    return isNaN(t) ? null : new Date(t);
  }
}
function dateToIso(d) {
  if (stryMutAct_9fa48("19")) {
    {}
  } else {
    stryCov_9fa48("19");
    if (stryMutAct_9fa48("22") ? !d && isNaN(d) : stryMutAct_9fa48("21") ? false : stryMutAct_9fa48("20") ? true : (stryCov_9fa48("20", "21", "22"), (stryMutAct_9fa48("23") ? d : (stryCov_9fa48("23"), !d)) || isNaN(d))) return stryMutAct_9fa48("24") ? "Stryker was here!" : (stryCov_9fa48("24"), "");
    const y = d.getFullYear();
    const m = String(stryMutAct_9fa48("25") ? d.getMonth() - 1 : (stryCov_9fa48("25"), d.getMonth() + 1)).padStart(2, stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), "0"));
    const day = String(d.getDate()).padStart(2, stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "0"));
    return stryMutAct_9fa48("28") ? `` : (stryCov_9fa48("28"), `${y}-${m}-${day}`);
  }
}

// Given a Start date (ISO yyyy-mm-dd) and a term label, return the End date
// (ISO yyyy-mm-dd) by adding the term days. Returns "" if inputs invalid.
export function computeEndDate(startIso, termLabel) {
  if (stryMutAct_9fa48("29")) {
    {}
  } else {
    stryCov_9fa48("29");
    const start = isoToDate(startIso);
    const opt = TERM_OPTIONS.find(stryMutAct_9fa48("30") ? () => undefined : (stryCov_9fa48("30"), t => stryMutAct_9fa48("33") ? t.label !== termLabel : stryMutAct_9fa48("32") ? false : stryMutAct_9fa48("31") ? true : (stryCov_9fa48("31", "32", "33"), t.label === termLabel)));
    if (stryMutAct_9fa48("36") ? !start && !opt : stryMutAct_9fa48("35") ? false : stryMutAct_9fa48("34") ? true : (stryCov_9fa48("34", "35", "36"), (stryMutAct_9fa48("37") ? start : (stryCov_9fa48("37"), !start)) || (stryMutAct_9fa48("38") ? opt : (stryCov_9fa48("38"), !opt)))) return stryMutAct_9fa48("39") ? "Stryker was here!" : (stryCov_9fa48("39"), "");
    const end = new Date(stryMutAct_9fa48("40") ? start.getTime() - opt.days * DAY_MS : (stryCov_9fa48("40"), start.getTime() + (stryMutAct_9fa48("41") ? opt.days / DAY_MS : (stryCov_9fa48("41"), opt.days * DAY_MS))));
    return dateToIso(end);
  }
}

// Given a Start and End date, return the closest matching term label from
// TERM_OPTIONS based on the number of days between them. Returns "" if
// inputs invalid or the gap is non-positive.
export function computeTermFromDates(startIso, endIso) {
  if (stryMutAct_9fa48("42")) {
    {}
  } else {
    stryCov_9fa48("42");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("45") ? !start && !end : stryMutAct_9fa48("44") ? false : stryMutAct_9fa48("43") ? true : (stryCov_9fa48("43", "44", "45"), (stryMutAct_9fa48("46") ? start : (stryCov_9fa48("46"), !start)) || (stryMutAct_9fa48("47") ? end : (stryCov_9fa48("47"), !end)))) return stryMutAct_9fa48("48") ? "Stryker was here!" : (stryCov_9fa48("48"), "");
    const days = Math.round(stryMutAct_9fa48("49") ? (end.getTime() - start.getTime()) * DAY_MS : (stryCov_9fa48("49"), (stryMutAct_9fa48("50") ? end.getTime() + start.getTime() : (stryCov_9fa48("50"), end.getTime() - start.getTime())) / DAY_MS));
    if (stryMutAct_9fa48("54") ? days > 0 : stryMutAct_9fa48("53") ? days < 0 : stryMutAct_9fa48("52") ? false : stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51", "52", "53", "54"), days <= 0)) return stryMutAct_9fa48("55") ? "Stryker was here!" : (stryCov_9fa48("55"), "");
    let best = TERM_OPTIONS[0];
    let bestDelta = Math.abs(stryMutAct_9fa48("56") ? days + best.days : (stryCov_9fa48("56"), days - best.days));
    for (const opt of TERM_OPTIONS) {
      if (stryMutAct_9fa48("57")) {
        {}
      } else {
        stryCov_9fa48("57");
        const d = Math.abs(stryMutAct_9fa48("58") ? days + opt.days : (stryCov_9fa48("58"), days - opt.days));
        if (stryMutAct_9fa48("62") ? d >= bestDelta : stryMutAct_9fa48("61") ? d <= bestDelta : stryMutAct_9fa48("60") ? false : stryMutAct_9fa48("59") ? true : (stryCov_9fa48("59", "60", "61", "62"), d < bestDelta)) {
          if (stryMutAct_9fa48("63")) {
            {}
          } else {
            stryCov_9fa48("63");
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
  if (stryMutAct_9fa48("64")) {
    {}
  } else {
    stryCov_9fa48("64");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("67") ? (!start || !end) && end <= start : stryMutAct_9fa48("66") ? false : stryMutAct_9fa48("65") ? true : (stryCov_9fa48("65", "66", "67"), (stryMutAct_9fa48("69") ? !start && !end : stryMutAct_9fa48("68") ? false : (stryCov_9fa48("68", "69"), (stryMutAct_9fa48("70") ? start : (stryCov_9fa48("70"), !start)) || (stryMutAct_9fa48("71") ? end : (stryCov_9fa48("71"), !end)))) || (stryMutAct_9fa48("74") ? end > start : stryMutAct_9fa48("73") ? end < start : stryMutAct_9fa48("72") ? false : (stryCov_9fa48("72", "73", "74"), end <= start)))) return stryMutAct_9fa48("75") ? "Stryker was here!" : (stryCov_9fa48("75"), "");
    let years = stryMutAct_9fa48("76") ? end.getFullYear() + start.getFullYear() : (stryCov_9fa48("76"), end.getFullYear() - start.getFullYear());
    let months = stryMutAct_9fa48("77") ? end.getMonth() + start.getMonth() : (stryCov_9fa48("77"), end.getMonth() - start.getMonth());
    let days = stryMutAct_9fa48("78") ? end.getDate() + start.getDate() : (stryCov_9fa48("78"), end.getDate() - start.getDate());
    if (stryMutAct_9fa48("82") ? days >= 0 : stryMutAct_9fa48("81") ? days <= 0 : stryMutAct_9fa48("80") ? false : stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79", "80", "81", "82"), days < 0)) {
      if (stryMutAct_9fa48("83")) {
        {}
      } else {
        stryCov_9fa48("83");
        // borrow from previous month of `end`
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        stryMutAct_9fa48("84") ? days -= prevMonth.getDate() : (stryCov_9fa48("84"), days += prevMonth.getDate());
        stryMutAct_9fa48("85") ? months += 1 : (stryCov_9fa48("85"), months -= 1);
      }
    }
    if (stryMutAct_9fa48("89") ? months >= 0 : stryMutAct_9fa48("88") ? months <= 0 : stryMutAct_9fa48("87") ? false : stryMutAct_9fa48("86") ? true : (stryCov_9fa48("86", "87", "88", "89"), months < 0)) {
      if (stryMutAct_9fa48("90")) {
        {}
      } else {
        stryCov_9fa48("90");
        stryMutAct_9fa48("91") ? months -= 12 : (stryCov_9fa48("91"), months += 12);
        stryMutAct_9fa48("92") ? years += 1 : (stryCov_9fa48("92"), years -= 1);
      }
    }
    const parts = stryMutAct_9fa48("93") ? ["Stryker was here"] : (stryCov_9fa48("93"), []);
    if (stryMutAct_9fa48("97") ? years <= 0 : stryMutAct_9fa48("96") ? years >= 0 : stryMutAct_9fa48("95") ? false : stryMutAct_9fa48("94") ? true : (stryCov_9fa48("94", "95", "96", "97"), years > 0)) parts.push(stryMutAct_9fa48("98") ? `` : (stryCov_9fa48("98"), `${years} year${(stryMutAct_9fa48("101") ? years !== 1 : stryMutAct_9fa48("100") ? false : stryMutAct_9fa48("99") ? true : (stryCov_9fa48("99", "100", "101"), years === 1)) ? stryMutAct_9fa48("102") ? "Stryker was here!" : (stryCov_9fa48("102"), "") : stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "s")}`));
    if (stryMutAct_9fa48("107") ? months <= 0 : stryMutAct_9fa48("106") ? months >= 0 : stryMutAct_9fa48("105") ? false : stryMutAct_9fa48("104") ? true : (stryCov_9fa48("104", "105", "106", "107"), months > 0)) parts.push(stryMutAct_9fa48("108") ? `` : (stryCov_9fa48("108"), `${months} month${(stryMutAct_9fa48("111") ? months !== 1 : stryMutAct_9fa48("110") ? false : stryMutAct_9fa48("109") ? true : (stryCov_9fa48("109", "110", "111"), months === 1)) ? stryMutAct_9fa48("112") ? "Stryker was here!" : (stryCov_9fa48("112"), "") : stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), "s")}`));
    if (stryMutAct_9fa48("117") ? days <= 0 : stryMutAct_9fa48("116") ? days >= 0 : stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : (stryCov_9fa48("114", "115", "116", "117"), days > 0)) parts.push(stryMutAct_9fa48("118") ? `` : (stryCov_9fa48("118"), `${days} day${(stryMutAct_9fa48("121") ? days !== 1 : stryMutAct_9fa48("120") ? false : stryMutAct_9fa48("119") ? true : (stryCov_9fa48("119", "120", "121"), days === 1)) ? stryMutAct_9fa48("122") ? "Stryker was here!" : (stryCov_9fa48("122"), "") : stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), "s")}`));
    return parts.length ? parts.join(stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), " ")) : stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), "0 days");
  }
}

// True when the (start, end) gap exactly equals one of the preset term
// options (within a small calendar tolerance).
export function matchesPreset(startIso, endIso) {
  if (stryMutAct_9fa48("126")) {
    {}
  } else {
    stryCov_9fa48("126");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("129") ? !start && !end : stryMutAct_9fa48("128") ? false : stryMutAct_9fa48("127") ? true : (stryCov_9fa48("127", "128", "129"), (stryMutAct_9fa48("130") ? start : (stryCov_9fa48("130"), !start)) || (stryMutAct_9fa48("131") ? end : (stryCov_9fa48("131"), !end)))) return stryMutAct_9fa48("132") ? true : (stryCov_9fa48("132"), false);
    const days = Math.round(stryMutAct_9fa48("133") ? (end.getTime() - start.getTime()) * DAY_MS : (stryCov_9fa48("133"), (stryMutAct_9fa48("134") ? end.getTime() + start.getTime() : (stryCov_9fa48("134"), end.getTime() - start.getTime())) / DAY_MS));
    return stryMutAct_9fa48("135") ? TERM_OPTIONS.every(o => Math.abs(days - o.days) <= 1) : (stryCov_9fa48("135"), TERM_OPTIONS.some(stryMutAct_9fa48("136") ? () => undefined : (stryCov_9fa48("136"), o => stryMutAct_9fa48("140") ? Math.abs(days - o.days) > 1 : stryMutAct_9fa48("139") ? Math.abs(days - o.days) < 1 : stryMutAct_9fa48("138") ? false : stryMutAct_9fa48("137") ? true : (stryCov_9fa48("137", "138", "139", "140"), Math.abs(stryMutAct_9fa48("141") ? days + o.days : (stryCov_9fa48("141"), days - o.days)) <= 1))));
  }
}