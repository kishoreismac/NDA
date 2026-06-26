// @ts-nocheck
// CSV export utility — pure client-side. Used by Export buttons.
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
import { downloadBlob } from "./documentGenerator";
function escape(v) {
  if (stryMutAct_9fa48("449")) {
    {}
  } else {
    stryCov_9fa48("449");
    if (stryMutAct_9fa48("452") ? v === null && v === undefined : stryMutAct_9fa48("451") ? false : stryMutAct_9fa48("450") ? true : (stryCov_9fa48("450", "451", "452"), (stryMutAct_9fa48("454") ? v !== null : stryMutAct_9fa48("453") ? false : (stryCov_9fa48("453", "454"), v === null)) || (stryMutAct_9fa48("456") ? v !== undefined : stryMutAct_9fa48("455") ? false : (stryCov_9fa48("455", "456"), v === undefined)))) return stryMutAct_9fa48("457") ? "Stryker was here!" : (stryCov_9fa48("457"), "");
    const s = (stryMutAct_9fa48("460") ? typeof v !== "string" : stryMutAct_9fa48("459") ? false : stryMutAct_9fa48("458") ? true : (stryCov_9fa48("458", "459", "460"), typeof v === (stryMutAct_9fa48("461") ? "" : (stryCov_9fa48("461"), "string")))) ? v : String(v);
    if (stryMutAct_9fa48("464") ? (s.includes(",") || s.includes('"')) && s.includes("\n") : stryMutAct_9fa48("463") ? false : stryMutAct_9fa48("462") ? true : (stryCov_9fa48("462", "463", "464"), (stryMutAct_9fa48("466") ? s.includes(",") && s.includes('"') : stryMutAct_9fa48("465") ? false : (stryCov_9fa48("465", "466"), s.includes(stryMutAct_9fa48("467") ? "" : (stryCov_9fa48("467"), ",")) || s.includes(stryMutAct_9fa48("468") ? "" : (stryCov_9fa48("468"), '"')))) || s.includes(stryMutAct_9fa48("469") ? "" : (stryCov_9fa48("469"), "\n")))) {
      if (stryMutAct_9fa48("470")) {
        {}
      } else {
        stryCov_9fa48("470");
        return (stryMutAct_9fa48("471") ? "" : (stryCov_9fa48("471"), '"')) + s.replace(/"/g, stryMutAct_9fa48("472") ? "" : (stryCov_9fa48("472"), '""')) + (stryMutAct_9fa48("473") ? "" : (stryCov_9fa48("473"), '"'));
      }
    }
    return s;
  }
}

// columns: [{ key, label, accessor?: row => value }]
// rows: array of objects
export async function exportToCsv({
  filename,
  columns,
  rows
}) {
  if (stryMutAct_9fa48("474")) {
    {}
  } else {
    stryCov_9fa48("474");
    const header = columns.map(stryMutAct_9fa48("475") ? () => undefined : (stryCov_9fa48("475"), c => escape(c.label))).join(stryMutAct_9fa48("476") ? "" : (stryCov_9fa48("476"), ","));
    const body = rows.map(stryMutAct_9fa48("477") ? () => undefined : (stryCov_9fa48("477"), r => columns.map(c => {
      if (stryMutAct_9fa48("478")) {
        {}
      } else {
        stryCov_9fa48("478");
        const v = c.accessor ? c.accessor(r) : r[c.key];
        return escape(v);
      }
    }).join(stryMutAct_9fa48("479") ? "" : (stryCov_9fa48("479"), ",")))).join(stryMutAct_9fa48("480") ? "" : (stryCov_9fa48("480"), "\n"));
    const csv = (stryMutAct_9fa48("481") ? "" : (stryCov_9fa48("481"), "\ufeff")) + header + (stryMutAct_9fa48("482") ? "" : (stryCov_9fa48("482"), "\n")) + body; // BOM for Excel
    const blob = new Blob(stryMutAct_9fa48("483") ? [] : (stryCov_9fa48("483"), [csv]), stryMutAct_9fa48("484") ? {} : (stryCov_9fa48("484"), {
      type: stryMutAct_9fa48("485") ? "" : (stryCov_9fa48("485"), "text/csv;charset=utf-8;")
    }));
    const stamped = (stryMutAct_9fa48("486") ? filename.startsWith(".csv") : (stryCov_9fa48("486"), filename.endsWith(stryMutAct_9fa48("487") ? "" : (stryCov_9fa48("487"), ".csv")))) ? filename : stryMutAct_9fa48("488") ? `` : (stryCov_9fa48("488"), `${filename}_${stryMutAct_9fa48("489") ? new Date().toISOString() : (stryCov_9fa48("489"), new Date().toISOString().slice(0, 10))}.csv`);
    return downloadBlob(blob, stamped);
  }
}