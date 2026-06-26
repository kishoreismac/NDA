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
  if (stryMutAct_9fa48("163")) {
    {}
  } else {
    stryCov_9fa48("163");
    if (stryMutAct_9fa48("166") ? v === null && v === undefined : stryMutAct_9fa48("165") ? false : stryMutAct_9fa48("164") ? true : (stryCov_9fa48("164", "165", "166"), (stryMutAct_9fa48("168") ? v !== null : stryMutAct_9fa48("167") ? false : (stryCov_9fa48("167", "168"), v === null)) || (stryMutAct_9fa48("170") ? v !== undefined : stryMutAct_9fa48("169") ? false : (stryCov_9fa48("169", "170"), v === undefined)))) return stryMutAct_9fa48("171") ? "Stryker was here!" : (stryCov_9fa48("171"), "");
    const s = (stryMutAct_9fa48("174") ? typeof v !== "string" : stryMutAct_9fa48("173") ? false : stryMutAct_9fa48("172") ? true : (stryCov_9fa48("172", "173", "174"), typeof v === (stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), "string")))) ? v : String(v);
    if (stryMutAct_9fa48("178") ? (s.includes(",") || s.includes('"')) && s.includes("\n") : stryMutAct_9fa48("177") ? false : stryMutAct_9fa48("176") ? true : (stryCov_9fa48("176", "177", "178"), (stryMutAct_9fa48("180") ? s.includes(",") && s.includes('"') : stryMutAct_9fa48("179") ? false : (stryCov_9fa48("179", "180"), s.includes(stryMutAct_9fa48("181") ? "" : (stryCov_9fa48("181"), ",")) || s.includes(stryMutAct_9fa48("182") ? "" : (stryCov_9fa48("182"), '"')))) || s.includes(stryMutAct_9fa48("183") ? "" : (stryCov_9fa48("183"), "\n")))) {
      if (stryMutAct_9fa48("184")) {
        {}
      } else {
        stryCov_9fa48("184");
        return (stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), '"')) + s.replace(/"/g, stryMutAct_9fa48("186") ? "" : (stryCov_9fa48("186"), '""')) + (stryMutAct_9fa48("187") ? "" : (stryCov_9fa48("187"), '"'));
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
  if (stryMutAct_9fa48("188")) {
    {}
  } else {
    stryCov_9fa48("188");
    const header = columns.map(stryMutAct_9fa48("189") ? () => undefined : (stryCov_9fa48("189"), c => escape(c.label))).join(stryMutAct_9fa48("190") ? "" : (stryCov_9fa48("190"), ","));
    const body = rows.map(stryMutAct_9fa48("191") ? () => undefined : (stryCov_9fa48("191"), r => columns.map(c => {
      if (stryMutAct_9fa48("192")) {
        {}
      } else {
        stryCov_9fa48("192");
        const v = c.accessor ? c.accessor(r) : r[c.key];
        return escape(v);
      }
    }).join(stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), ",")))).join(stryMutAct_9fa48("194") ? "" : (stryCov_9fa48("194"), "\n"));
    const csv = (stryMutAct_9fa48("195") ? "" : (stryCov_9fa48("195"), "\ufeff")) + header + (stryMutAct_9fa48("196") ? "" : (stryCov_9fa48("196"), "\n")) + body; // BOM for Excel
    const blob = new Blob(stryMutAct_9fa48("197") ? [] : (stryCov_9fa48("197"), [csv]), stryMutAct_9fa48("198") ? {} : (stryCov_9fa48("198"), {
      type: stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), "text/csv;charset=utf-8;")
    }));
    const stamped = (stryMutAct_9fa48("200") ? filename.startsWith(".csv") : (stryCov_9fa48("200"), filename.endsWith(stryMutAct_9fa48("201") ? "" : (stryCov_9fa48("201"), ".csv")))) ? filename : stryMutAct_9fa48("202") ? `` : (stryCov_9fa48("202"), `${filename}_${stryMutAct_9fa48("203") ? new Date().toISOString() : (stryCov_9fa48("203"), new Date().toISOString().slice(0, 10))}.csv`);
    return downloadBlob(blob, stamped);
  }
}