// @ts-nocheck
// Simple localStorage-backed audit trail for demo persistence.
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
const KEY = stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), "ndaflow.audit.v1");
const DOCS_KEY = stryMutAct_9fa48("1") ? "" : (stryCov_9fa48("1"), "ndaflow.docs.v1");
const seedAudit = stryMutAct_9fa48("2") ? [] : (stryCov_9fa48("2"), [stryMutAct_9fa48("3") ? {} : (stryCov_9fa48("3"), {
  id: stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), "a-001"),
  ts: stryMutAct_9fa48("5") ? Date.now() + 1000 * 60 * 60 * 22 : (stryCov_9fa48("5"), Date.now() - (stryMutAct_9fa48("6") ? 1000 * 60 * 60 / 22 : (stryCov_9fa48("6"), (stryMutAct_9fa48("7") ? 1000 * 60 / 60 : (stryCov_9fa48("7"), (stryMutAct_9fa48("8") ? 1000 / 60 : (stryCov_9fa48("8"), 1000 * 60)) * 60)) * 22))),
  actor: stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), "Sara Patel"),
  action: stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "Template selected"),
  target: stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "Mutual NDA v4.2"),
  recordId: stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "NDA-2041")
}), stryMutAct_9fa48("13") ? {} : (stryCov_9fa48("13"), {
  id: stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "a-002"),
  ts: stryMutAct_9fa48("15") ? Date.now() + 1000 * 60 * 60 * 20 : (stryCov_9fa48("15"), Date.now() - (stryMutAct_9fa48("16") ? 1000 * 60 * 60 / 20 : (stryCov_9fa48("16"), (stryMutAct_9fa48("17") ? 1000 * 60 / 60 : (stryCov_9fa48("17"), (stryMutAct_9fa48("18") ? 1000 / 60 : (stryCov_9fa48("18"), 1000 * 60)) * 60)) * 20))),
  actor: stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), "Sara Patel"),
  action: stryMutAct_9fa48("20") ? "" : (stryCov_9fa48("20"), "Template previewed"),
  target: stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), "Mutual NDA v4.2"),
  recordId: stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "NDA-2041")
}), stryMutAct_9fa48("23") ? {} : (stryCov_9fa48("23"), {
  id: stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), "a-003"),
  ts: stryMutAct_9fa48("25") ? Date.now() + 1000 * 60 * 60 * 18 : (stryCov_9fa48("25"), Date.now() - (stryMutAct_9fa48("26") ? 1000 * 60 * 60 / 18 : (stryCov_9fa48("26"), (stryMutAct_9fa48("27") ? 1000 * 60 / 60 : (stryCov_9fa48("27"), (stryMutAct_9fa48("28") ? 1000 / 60 : (stryCov_9fa48("28"), 1000 * 60)) * 60)) * 18))),
  actor: stryMutAct_9fa48("29") ? "" : (stryCov_9fa48("29"), "NDAFlow"),
  action: stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), "Placeholder values validated"),
  target: stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "16/16 ready"),
  recordId: stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), "NDA-2041")
}), stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
  id: stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "a-004"),
  ts: stryMutAct_9fa48("35") ? Date.now() + 1000 * 60 * 60 * 17 : (stryCov_9fa48("35"), Date.now() - (stryMutAct_9fa48("36") ? 1000 * 60 * 60 / 17 : (stryCov_9fa48("36"), (stryMutAct_9fa48("37") ? 1000 * 60 / 60 : (stryCov_9fa48("37"), (stryMutAct_9fa48("38") ? 1000 / 60 : (stryCov_9fa48("38"), 1000 * 60)) * 60)) * 17))),
  actor: stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "Sara Patel"),
  action: stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "Final NDA generated"),
  target: stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "Mutual NDA v4.2 → DOC-AB12CD"),
  recordId: stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), "NDA-2041")
}), stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
  id: stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "a-005"),
  ts: stryMutAct_9fa48("45") ? Date.now() + 1000 * 60 * 60 * 16 : (stryCov_9fa48("45"), Date.now() - (stryMutAct_9fa48("46") ? 1000 * 60 * 60 / 16 : (stryCov_9fa48("46"), (stryMutAct_9fa48("47") ? 1000 * 60 / 60 : (stryCov_9fa48("47"), (stryMutAct_9fa48("48") ? 1000 / 60 : (stryCov_9fa48("48"), 1000 * 60)) * 60)) * 16))),
  actor: stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), "Sara Patel"),
  action: stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "DOCX downloaded"),
  target: stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), "DOC-AB12CD.docx"),
  recordId: stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), "NDA-2041")
}), stryMutAct_9fa48("53") ? {} : (stryCov_9fa48("53"), {
  id: stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), "a-006"),
  ts: stryMutAct_9fa48("55") ? Date.now() + 1000 * 60 * 60 * 4 : (stryCov_9fa48("55"), Date.now() - (stryMutAct_9fa48("56") ? 1000 * 60 * 60 / 4 : (stryCov_9fa48("56"), (stryMutAct_9fa48("57") ? 1000 * 60 / 60 : (stryCov_9fa48("57"), (stryMutAct_9fa48("58") ? 1000 / 60 : (stryCov_9fa48("58"), 1000 * 60)) * 60)) * 4))),
  actor: stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "Jordan Nguyen"),
  action: stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "Risk Review document downloaded"),
  target: stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), "DOC-AB12CD.pdf"),
  recordId: stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), "NDA-2041")
})]);
function read(key, fallback) {
  if (stryMutAct_9fa48("63")) {
    {}
  } else {
    stryCov_9fa48("63");
    if (stryMutAct_9fa48("66") ? typeof window !== "undefined" : stryMutAct_9fa48("65") ? false : stryMutAct_9fa48("64") ? true : (stryCov_9fa48("64", "65", "66"), typeof window === (stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "undefined")))) return fallback;
    try {
      if (stryMutAct_9fa48("68")) {
        {}
      } else {
        stryCov_9fa48("68");
        const raw = window.localStorage.getItem(key);
        if (stryMutAct_9fa48("71") ? false : stryMutAct_9fa48("70") ? true : stryMutAct_9fa48("69") ? raw : (stryCov_9fa48("69", "70", "71"), !raw)) return fallback;
        return JSON.parse(raw);
      }
    } catch {
      if (stryMutAct_9fa48("72")) {
        {}
      } else {
        stryCov_9fa48("72");
        return fallback;
      }
    }
  }
}
function write(key, value) {
  if (stryMutAct_9fa48("73")) {
    {}
  } else {
    stryCov_9fa48("73");
    if (stryMutAct_9fa48("76") ? typeof window !== "undefined" : stryMutAct_9fa48("75") ? false : stryMutAct_9fa48("74") ? true : (stryCov_9fa48("74", "75", "76"), typeof window === (stryMutAct_9fa48("77") ? "" : (stryCov_9fa48("77"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("78")) {
        {}
      } else {
        stryCov_9fa48("78");
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {}
  }
}
export function getAuditLog() {
  if (stryMutAct_9fa48("79")) {
    {}
  } else {
    stryCov_9fa48("79");
    const list = read(KEY, null);
    if (stryMutAct_9fa48("82") ? false : stryMutAct_9fa48("81") ? true : stryMutAct_9fa48("80") ? list : (stryCov_9fa48("80", "81", "82"), !list)) {
      if (stryMutAct_9fa48("83")) {
        {}
      } else {
        stryCov_9fa48("83");
        write(KEY, seedAudit);
        return stryMutAct_9fa48("84") ? [...seedAudit] : (stryCov_9fa48("84"), (stryMutAct_9fa48("85") ? [] : (stryCov_9fa48("85"), [...seedAudit])).sort(stryMutAct_9fa48("86") ? () => undefined : (stryCov_9fa48("86"), (a, b) => stryMutAct_9fa48("87") ? b.ts + a.ts : (stryCov_9fa48("87"), b.ts - a.ts))));
      }
    }
    return stryMutAct_9fa48("88") ? [...list] : (stryCov_9fa48("88"), (stryMutAct_9fa48("89") ? [] : (stryCov_9fa48("89"), [...list])).sort(stryMutAct_9fa48("90") ? () => undefined : (stryCov_9fa48("90"), (a, b) => stryMutAct_9fa48("91") ? b.ts + a.ts : (stryCov_9fa48("91"), b.ts - a.ts))));
  }
}
export function logAuditEvent({
  actor = stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), "Sara Patel"),
  action,
  target = stryMutAct_9fa48("93") ? "Stryker was here!" : (stryCov_9fa48("93"), ""),
  recordId = stryMutAct_9fa48("94") ? "Stryker was here!" : (stryCov_9fa48("94"), "")
}) {
  if (stryMutAct_9fa48("95")) {
    {}
  } else {
    stryCov_9fa48("95");
    const list = read(KEY, seedAudit);
    const entry = stryMutAct_9fa48("96") ? {} : (stryCov_9fa48("96"), {
      id: (stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "a-")) + (stryMutAct_9fa48("98") ? Math.random().toString(36) : (stryCov_9fa48("98"), Math.random().toString(36).slice(2, 8))),
      ts: Date.now(),
      actor,
      action,
      target,
      recordId
    });
    const next = stryMutAct_9fa48("99") ? [entry, ...list] : (stryCov_9fa48("99"), (stryMutAct_9fa48("100") ? [] : (stryCov_9fa48("100"), [entry, ...list])).slice(0, 200));
    write(KEY, next);
    return entry;
  }
}

// ---- generated documents store ----

const seedDocs = stryMutAct_9fa48("101") ? [] : (stryCov_9fa48("101"), [stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
  id: stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "DOC-AB12CD"),
  recordId: stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "NDA-2041"),
  recordTitle: stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "Acme Robotics — Joint R&D"),
  templateId: stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "tpl-mutual"),
  templateName: stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), "Mutual NDA"),
  templateVersion: stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "v4.2"),
  generatedAt: stryMutAct_9fa48("109") ? Date.now() + 1000 * 60 * 60 * 17 : (stryCov_9fa48("109"), Date.now() - (stryMutAct_9fa48("110") ? 1000 * 60 * 60 / 17 : (stryCov_9fa48("110"), (stryMutAct_9fa48("111") ? 1000 * 60 / 60 : (stryCov_9fa48("111"), (stryMutAct_9fa48("112") ? 1000 / 60 : (stryCov_9fa48("112"), 1000 * 60)) * 60)) * 17))),
  generatedBy: stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), "Sara Patel"),
  counterparty: stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), "Acme Robotics Inc."),
  placeholders: 16,
  placeholdersFilled: 16
}), stryMutAct_9fa48("115") ? {} : (stryCov_9fa48("115"), {
  id: stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), "DOC-EF34GH"),
  recordId: stryMutAct_9fa48("117") ? "" : (stryCov_9fa48("117"), "NDA-2039"),
  recordTitle: stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), "Hooli Cloud — Hosting Eval"),
  templateId: stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), "tpl-vendor"),
  templateName: stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "Vendor / Supplier NDA"),
  templateVersion: stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), "v3.0"),
  generatedAt: stryMutAct_9fa48("122") ? Date.now() + 1000 * 60 * 60 * 32 : (stryCov_9fa48("122"), Date.now() - (stryMutAct_9fa48("123") ? 1000 * 60 * 60 / 32 : (stryCov_9fa48("123"), (stryMutAct_9fa48("124") ? 1000 * 60 / 60 : (stryCov_9fa48("124"), (stryMutAct_9fa48("125") ? 1000 / 60 : (stryCov_9fa48("125"), 1000 * 60)) * 60)) * 32))),
  generatedBy: stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), "Maya Davis"),
  counterparty: stryMutAct_9fa48("127") ? "" : (stryCov_9fa48("127"), "Hooli Cloud"),
  placeholders: 15,
  placeholdersFilled: 15
})]);
export function getGeneratedDocs() {
  if (stryMutAct_9fa48("128")) {
    {}
  } else {
    stryCov_9fa48("128");
    const list = read(DOCS_KEY, null);
    if (stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : stryMutAct_9fa48("129") ? list : (stryCov_9fa48("129", "130", "131"), !list)) {
      if (stryMutAct_9fa48("132")) {
        {}
      } else {
        stryCov_9fa48("132");
        write(DOCS_KEY, seedDocs);
        return stryMutAct_9fa48("133") ? [...seedDocs] : (stryCov_9fa48("133"), (stryMutAct_9fa48("134") ? [] : (stryCov_9fa48("134"), [...seedDocs])).sort(stryMutAct_9fa48("135") ? () => undefined : (stryCov_9fa48("135"), (a, b) => stryMutAct_9fa48("136") ? b.generatedAt + a.generatedAt : (stryCov_9fa48("136"), b.generatedAt - a.generatedAt))));
      }
    }
    return stryMutAct_9fa48("137") ? [...list] : (stryCov_9fa48("137"), (stryMutAct_9fa48("138") ? [] : (stryCov_9fa48("138"), [...list])).sort(stryMutAct_9fa48("139") ? () => undefined : (stryCov_9fa48("139"), (a, b) => stryMutAct_9fa48("140") ? b.generatedAt + a.generatedAt : (stryCov_9fa48("140"), b.generatedAt - a.generatedAt))));
  }
}
export function recordGeneratedDoc(doc) {
  if (stryMutAct_9fa48("141")) {
    {}
  } else {
    stryCov_9fa48("141");
    const list = read(DOCS_KEY, seedDocs);
    const next = stryMutAct_9fa48("142") ? [doc, ...list.filter(d => d.id !== doc.id)] : (stryCov_9fa48("142"), (stryMutAct_9fa48("143") ? [] : (stryCov_9fa48("143"), [doc, ...(stryMutAct_9fa48("144") ? list : (stryCov_9fa48("144"), list.filter(stryMutAct_9fa48("145") ? () => undefined : (stryCov_9fa48("145"), d => stryMutAct_9fa48("148") ? d.id === doc.id : stryMutAct_9fa48("147") ? false : stryMutAct_9fa48("146") ? true : (stryCov_9fa48("146", "147", "148"), d.id !== doc.id)))))])).slice(0, 100));
    write(DOCS_KEY, next);
    return doc;
  }
}
export function getDocsForRecord(recordId) {
  if (stryMutAct_9fa48("149")) {
    {}
  } else {
    stryCov_9fa48("149");
    return stryMutAct_9fa48("150") ? getGeneratedDocs() : (stryCov_9fa48("150"), getGeneratedDocs().filter(stryMutAct_9fa48("151") ? () => undefined : (stryCov_9fa48("151"), d => stryMutAct_9fa48("154") ? d.recordId !== recordId : stryMutAct_9fa48("153") ? false : stryMutAct_9fa48("152") ? true : (stryCov_9fa48("152", "153", "154"), d.recordId === recordId))));
  }
}
export function formatTimestamp(ts) {
  if (stryMutAct_9fa48("155")) {
    {}
  } else {
    stryCov_9fa48("155");
    const d = new Date(ts);
    return d.toLocaleString(stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), "en-US"), stryMutAct_9fa48("157") ? {} : (stryCov_9fa48("157"), {
      month: stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), "short"),
      day: stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), "numeric"),
      year: stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), "numeric"),
      hour: stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), "2-digit"),
      minute: stryMutAct_9fa48("162") ? "" : (stryCov_9fa48("162"), "2-digit")
    }));
  }
}