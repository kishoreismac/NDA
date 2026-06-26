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
const DAY_MS = stryMutAct_9fa48("204") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("204"), (stryMutAct_9fa48("205") ? 1000 * 60 / 60 : (stryCov_9fa48("205"), (stryMutAct_9fa48("206") ? 1000 / 60 : (stryCov_9fa48("206"), 1000 * 60)) * 60)) * 24);

// Catalog of term options shown in the dropdown. Adding more options is safe.
export const TERM_OPTIONS = stryMutAct_9fa48("207") ? [] : (stryCov_9fa48("207"), [stryMutAct_9fa48("208") ? {} : (stryCov_9fa48("208"), {
  label: stryMutAct_9fa48("209") ? "" : (stryCov_9fa48("209"), "one (1) year"),
  days: 365
}), stryMutAct_9fa48("210") ? {} : (stryCov_9fa48("210"), {
  label: stryMutAct_9fa48("211") ? "" : (stryCov_9fa48("211"), "two (2) years"),
  days: stryMutAct_9fa48("212") ? 365 / 2 : (stryCov_9fa48("212"), 365 * 2)
}), stryMutAct_9fa48("213") ? {} : (stryCov_9fa48("213"), {
  label: stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), "three (3) years"),
  days: stryMutAct_9fa48("215") ? 365 / 3 : (stryCov_9fa48("215"), 365 * 3)
}), stryMutAct_9fa48("216") ? {} : (stryCov_9fa48("216"), {
  label: stryMutAct_9fa48("217") ? "" : (stryCov_9fa48("217"), "five (5) years"),
  days: stryMutAct_9fa48("218") ? 365 / 5 : (stryCov_9fa48("218"), 365 * 5)
})]);
function isoToDate(iso) {
  if (stryMutAct_9fa48("219")) {
    {}
  } else {
    stryCov_9fa48("219");
    if (stryMutAct_9fa48("222") ? false : stryMutAct_9fa48("221") ? true : stryMutAct_9fa48("220") ? iso : (stryCov_9fa48("220", "221", "222"), !iso)) return null;
    const t = Date.parse(iso);
    return isNaN(t) ? null : new Date(t);
  }
}
function dateToIso(d) {
  if (stryMutAct_9fa48("223")) {
    {}
  } else {
    stryCov_9fa48("223");
    if (stryMutAct_9fa48("226") ? !d && isNaN(d) : stryMutAct_9fa48("225") ? false : stryMutAct_9fa48("224") ? true : (stryCov_9fa48("224", "225", "226"), (stryMutAct_9fa48("227") ? d : (stryCov_9fa48("227"), !d)) || isNaN(d))) return stryMutAct_9fa48("228") ? "Stryker was here!" : (stryCov_9fa48("228"), "");
    const y = d.getFullYear();
    const m = String(stryMutAct_9fa48("229") ? d.getMonth() - 1 : (stryCov_9fa48("229"), d.getMonth() + 1)).padStart(2, stryMutAct_9fa48("230") ? "" : (stryCov_9fa48("230"), "0"));
    const day = String(d.getDate()).padStart(2, stryMutAct_9fa48("231") ? "" : (stryCov_9fa48("231"), "0"));
    return stryMutAct_9fa48("232") ? `` : (stryCov_9fa48("232"), `${y}-${m}-${day}`);
  }
}

// Given a Start date (ISO yyyy-mm-dd) and a term label, return the End date
// (ISO yyyy-mm-dd) by adding the term days. Returns "" if inputs invalid.
export function computeEndDate(startIso, termLabel) {
  if (stryMutAct_9fa48("233")) {
    {}
  } else {
    stryCov_9fa48("233");
    const start = isoToDate(startIso);
    const opt = TERM_OPTIONS.find(stryMutAct_9fa48("234") ? () => undefined : (stryCov_9fa48("234"), t => stryMutAct_9fa48("237") ? t.label !== termLabel : stryMutAct_9fa48("236") ? false : stryMutAct_9fa48("235") ? true : (stryCov_9fa48("235", "236", "237"), t.label === termLabel)));
    if (stryMutAct_9fa48("240") ? !start && !opt : stryMutAct_9fa48("239") ? false : stryMutAct_9fa48("238") ? true : (stryCov_9fa48("238", "239", "240"), (stryMutAct_9fa48("241") ? start : (stryCov_9fa48("241"), !start)) || (stryMutAct_9fa48("242") ? opt : (stryCov_9fa48("242"), !opt)))) return stryMutAct_9fa48("243") ? "Stryker was here!" : (stryCov_9fa48("243"), "");
    const end = new Date(stryMutAct_9fa48("244") ? start.getTime() - opt.days * DAY_MS : (stryCov_9fa48("244"), start.getTime() + (stryMutAct_9fa48("245") ? opt.days / DAY_MS : (stryCov_9fa48("245"), opt.days * DAY_MS))));
    return dateToIso(end);
  }
}

// Given a Start and End date, return the closest matching term label from
// TERM_OPTIONS based on the number of days between them. Returns "" if
// inputs invalid or the gap is non-positive.
export function computeTermFromDates(startIso, endIso) {
  if (stryMutAct_9fa48("246")) {
    {}
  } else {
    stryCov_9fa48("246");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("249") ? !start && !end : stryMutAct_9fa48("248") ? false : stryMutAct_9fa48("247") ? true : (stryCov_9fa48("247", "248", "249"), (stryMutAct_9fa48("250") ? start : (stryCov_9fa48("250"), !start)) || (stryMutAct_9fa48("251") ? end : (stryCov_9fa48("251"), !end)))) return stryMutAct_9fa48("252") ? "Stryker was here!" : (stryCov_9fa48("252"), "");
    const days = Math.round(stryMutAct_9fa48("253") ? (end.getTime() - start.getTime()) * DAY_MS : (stryCov_9fa48("253"), (stryMutAct_9fa48("254") ? end.getTime() + start.getTime() : (stryCov_9fa48("254"), end.getTime() - start.getTime())) / DAY_MS));
    if (stryMutAct_9fa48("258") ? days > 0 : stryMutAct_9fa48("257") ? days < 0 : stryMutAct_9fa48("256") ? false : stryMutAct_9fa48("255") ? true : (stryCov_9fa48("255", "256", "257", "258"), days <= 0)) return stryMutAct_9fa48("259") ? "Stryker was here!" : (stryCov_9fa48("259"), "");
    let best = TERM_OPTIONS[0];
    let bestDelta = Math.abs(stryMutAct_9fa48("260") ? days + best.days : (stryCov_9fa48("260"), days - best.days));
    for (const opt of TERM_OPTIONS) {
      if (stryMutAct_9fa48("261")) {
        {}
      } else {
        stryCov_9fa48("261");
        const d = Math.abs(stryMutAct_9fa48("262") ? days + opt.days : (stryCov_9fa48("262"), days - opt.days));
        if (stryMutAct_9fa48("266") ? d >= bestDelta : stryMutAct_9fa48("265") ? d <= bestDelta : stryMutAct_9fa48("264") ? false : stryMutAct_9fa48("263") ? true : (stryCov_9fa48("263", "264", "265", "266"), d < bestDelta)) {
          if (stryMutAct_9fa48("267")) {
            {}
          } else {
            stryCov_9fa48("267");
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
  if (stryMutAct_9fa48("268")) {
    {}
  } else {
    stryCov_9fa48("268");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("271") ? (!start || !end) && end <= start : stryMutAct_9fa48("270") ? false : stryMutAct_9fa48("269") ? true : (stryCov_9fa48("269", "270", "271"), (stryMutAct_9fa48("273") ? !start && !end : stryMutAct_9fa48("272") ? false : (stryCov_9fa48("272", "273"), (stryMutAct_9fa48("274") ? start : (stryCov_9fa48("274"), !start)) || (stryMutAct_9fa48("275") ? end : (stryCov_9fa48("275"), !end)))) || (stryMutAct_9fa48("278") ? end > start : stryMutAct_9fa48("277") ? end < start : stryMutAct_9fa48("276") ? false : (stryCov_9fa48("276", "277", "278"), end <= start)))) return stryMutAct_9fa48("279") ? "Stryker was here!" : (stryCov_9fa48("279"), "");
    let years = stryMutAct_9fa48("280") ? end.getFullYear() + start.getFullYear() : (stryCov_9fa48("280"), end.getFullYear() - start.getFullYear());
    let months = stryMutAct_9fa48("281") ? end.getMonth() + start.getMonth() : (stryCov_9fa48("281"), end.getMonth() - start.getMonth());
    let days = stryMutAct_9fa48("282") ? end.getDate() + start.getDate() : (stryCov_9fa48("282"), end.getDate() - start.getDate());
    if (stryMutAct_9fa48("286") ? days >= 0 : stryMutAct_9fa48("285") ? days <= 0 : stryMutAct_9fa48("284") ? false : stryMutAct_9fa48("283") ? true : (stryCov_9fa48("283", "284", "285", "286"), days < 0)) {
      if (stryMutAct_9fa48("287")) {
        {}
      } else {
        stryCov_9fa48("287");
        // borrow from previous month of `end`
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        stryMutAct_9fa48("288") ? days -= prevMonth.getDate() : (stryCov_9fa48("288"), days += prevMonth.getDate());
        stryMutAct_9fa48("289") ? months += 1 : (stryCov_9fa48("289"), months -= 1);
      }
    }
    if (stryMutAct_9fa48("293") ? months >= 0 : stryMutAct_9fa48("292") ? months <= 0 : stryMutAct_9fa48("291") ? false : stryMutAct_9fa48("290") ? true : (stryCov_9fa48("290", "291", "292", "293"), months < 0)) {
      if (stryMutAct_9fa48("294")) {
        {}
      } else {
        stryCov_9fa48("294");
        stryMutAct_9fa48("295") ? months -= 12 : (stryCov_9fa48("295"), months += 12);
        stryMutAct_9fa48("296") ? years += 1 : (stryCov_9fa48("296"), years -= 1);
      }
    }
    const parts = stryMutAct_9fa48("297") ? ["Stryker was here"] : (stryCov_9fa48("297"), []);
    if (stryMutAct_9fa48("301") ? years <= 0 : stryMutAct_9fa48("300") ? years >= 0 : stryMutAct_9fa48("299") ? false : stryMutAct_9fa48("298") ? true : (stryCov_9fa48("298", "299", "300", "301"), years > 0)) parts.push(stryMutAct_9fa48("302") ? `` : (stryCov_9fa48("302"), `${years} year${(stryMutAct_9fa48("305") ? years !== 1 : stryMutAct_9fa48("304") ? false : stryMutAct_9fa48("303") ? true : (stryCov_9fa48("303", "304", "305"), years === 1)) ? stryMutAct_9fa48("306") ? "Stryker was here!" : (stryCov_9fa48("306"), "") : stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), "s")}`));
    if (stryMutAct_9fa48("311") ? months <= 0 : stryMutAct_9fa48("310") ? months >= 0 : stryMutAct_9fa48("309") ? false : stryMutAct_9fa48("308") ? true : (stryCov_9fa48("308", "309", "310", "311"), months > 0)) parts.push(stryMutAct_9fa48("312") ? `` : (stryCov_9fa48("312"), `${months} month${(stryMutAct_9fa48("315") ? months !== 1 : stryMutAct_9fa48("314") ? false : stryMutAct_9fa48("313") ? true : (stryCov_9fa48("313", "314", "315"), months === 1)) ? stryMutAct_9fa48("316") ? "Stryker was here!" : (stryCov_9fa48("316"), "") : stryMutAct_9fa48("317") ? "" : (stryCov_9fa48("317"), "s")}`));
    if (stryMutAct_9fa48("321") ? days <= 0 : stryMutAct_9fa48("320") ? days >= 0 : stryMutAct_9fa48("319") ? false : stryMutAct_9fa48("318") ? true : (stryCov_9fa48("318", "319", "320", "321"), days > 0)) parts.push(stryMutAct_9fa48("322") ? `` : (stryCov_9fa48("322"), `${days} day${(stryMutAct_9fa48("325") ? days !== 1 : stryMutAct_9fa48("324") ? false : stryMutAct_9fa48("323") ? true : (stryCov_9fa48("323", "324", "325"), days === 1)) ? stryMutAct_9fa48("326") ? "Stryker was here!" : (stryCov_9fa48("326"), "") : stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), "s")}`));
    return parts.length ? parts.join(stryMutAct_9fa48("328") ? "" : (stryCov_9fa48("328"), " ")) : stryMutAct_9fa48("329") ? "" : (stryCov_9fa48("329"), "0 days");
  }
}

// True when the (start, end) gap exactly equals one of the preset term
// options (within a small calendar tolerance).
export function matchesPreset(startIso, endIso) {
  if (stryMutAct_9fa48("330")) {
    {}
  } else {
    stryCov_9fa48("330");
    const start = isoToDate(startIso);
    const end = isoToDate(endIso);
    if (stryMutAct_9fa48("333") ? !start && !end : stryMutAct_9fa48("332") ? false : stryMutAct_9fa48("331") ? true : (stryCov_9fa48("331", "332", "333"), (stryMutAct_9fa48("334") ? start : (stryCov_9fa48("334"), !start)) || (stryMutAct_9fa48("335") ? end : (stryCov_9fa48("335"), !end)))) return stryMutAct_9fa48("336") ? true : (stryCov_9fa48("336"), false);
    const days = Math.round(stryMutAct_9fa48("337") ? (end.getTime() - start.getTime()) * DAY_MS : (stryCov_9fa48("337"), (stryMutAct_9fa48("338") ? end.getTime() + start.getTime() : (stryCov_9fa48("338"), end.getTime() - start.getTime())) / DAY_MS));
    return stryMutAct_9fa48("339") ? TERM_OPTIONS.every(o => Math.abs(days - o.days) <= 1) : (stryCov_9fa48("339"), TERM_OPTIONS.some(stryMutAct_9fa48("340") ? () => undefined : (stryCov_9fa48("340"), o => stryMutAct_9fa48("344") ? Math.abs(days - o.days) > 1 : stryMutAct_9fa48("343") ? Math.abs(days - o.days) < 1 : stryMutAct_9fa48("342") ? false : stryMutAct_9fa48("341") ? true : (stryCov_9fa48("341", "342", "343", "344"), Math.abs(stryMutAct_9fa48("345") ? days + o.days : (stryCov_9fa48("345"), days - o.days)) <= 1))));
  }
}