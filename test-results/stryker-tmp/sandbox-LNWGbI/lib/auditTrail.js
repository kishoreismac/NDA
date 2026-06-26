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
const KEY = stryMutAct_9fa48("286") ? "" : (stryCov_9fa48("286"), "ndaflow.audit.v1");
const DOCS_KEY = stryMutAct_9fa48("287") ? "" : (stryCov_9fa48("287"), "ndaflow.docs.v1");
const seedAudit = stryMutAct_9fa48("288") ? [] : (stryCov_9fa48("288"), [stryMutAct_9fa48("289") ? {} : (stryCov_9fa48("289"), {
  id: stryMutAct_9fa48("290") ? "" : (stryCov_9fa48("290"), "a-001"),
  ts: stryMutAct_9fa48("291") ? Date.now() + 1000 * 60 * 60 * 22 : (stryCov_9fa48("291"), Date.now() - (stryMutAct_9fa48("292") ? 1000 * 60 * 60 / 22 : (stryCov_9fa48("292"), (stryMutAct_9fa48("293") ? 1000 * 60 / 60 : (stryCov_9fa48("293"), (stryMutAct_9fa48("294") ? 1000 / 60 : (stryCov_9fa48("294"), 1000 * 60)) * 60)) * 22))),
  actor: stryMutAct_9fa48("295") ? "" : (stryCov_9fa48("295"), "Sara Patel"),
  action: stryMutAct_9fa48("296") ? "" : (stryCov_9fa48("296"), "Template selected"),
  target: stryMutAct_9fa48("297") ? "" : (stryCov_9fa48("297"), "Mutual NDA v4.2"),
  recordId: stryMutAct_9fa48("298") ? "" : (stryCov_9fa48("298"), "NDA-2041")
}), stryMutAct_9fa48("299") ? {} : (stryCov_9fa48("299"), {
  id: stryMutAct_9fa48("300") ? "" : (stryCov_9fa48("300"), "a-002"),
  ts: stryMutAct_9fa48("301") ? Date.now() + 1000 * 60 * 60 * 20 : (stryCov_9fa48("301"), Date.now() - (stryMutAct_9fa48("302") ? 1000 * 60 * 60 / 20 : (stryCov_9fa48("302"), (stryMutAct_9fa48("303") ? 1000 * 60 / 60 : (stryCov_9fa48("303"), (stryMutAct_9fa48("304") ? 1000 / 60 : (stryCov_9fa48("304"), 1000 * 60)) * 60)) * 20))),
  actor: stryMutAct_9fa48("305") ? "" : (stryCov_9fa48("305"), "Sara Patel"),
  action: stryMutAct_9fa48("306") ? "" : (stryCov_9fa48("306"), "Template previewed"),
  target: stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), "Mutual NDA v4.2"),
  recordId: stryMutAct_9fa48("308") ? "" : (stryCov_9fa48("308"), "NDA-2041")
}), stryMutAct_9fa48("309") ? {} : (stryCov_9fa48("309"), {
  id: stryMutAct_9fa48("310") ? "" : (stryCov_9fa48("310"), "a-003"),
  ts: stryMutAct_9fa48("311") ? Date.now() + 1000 * 60 * 60 * 18 : (stryCov_9fa48("311"), Date.now() - (stryMutAct_9fa48("312") ? 1000 * 60 * 60 / 18 : (stryCov_9fa48("312"), (stryMutAct_9fa48("313") ? 1000 * 60 / 60 : (stryCov_9fa48("313"), (stryMutAct_9fa48("314") ? 1000 / 60 : (stryCov_9fa48("314"), 1000 * 60)) * 60)) * 18))),
  actor: stryMutAct_9fa48("315") ? "" : (stryCov_9fa48("315"), "NDAFlow"),
  action: stryMutAct_9fa48("316") ? "" : (stryCov_9fa48("316"), "Placeholder values validated"),
  target: stryMutAct_9fa48("317") ? "" : (stryCov_9fa48("317"), "16/16 ready"),
  recordId: stryMutAct_9fa48("318") ? "" : (stryCov_9fa48("318"), "NDA-2041")
}), stryMutAct_9fa48("319") ? {} : (stryCov_9fa48("319"), {
  id: stryMutAct_9fa48("320") ? "" : (stryCov_9fa48("320"), "a-004"),
  ts: stryMutAct_9fa48("321") ? Date.now() + 1000 * 60 * 60 * 17 : (stryCov_9fa48("321"), Date.now() - (stryMutAct_9fa48("322") ? 1000 * 60 * 60 / 17 : (stryCov_9fa48("322"), (stryMutAct_9fa48("323") ? 1000 * 60 / 60 : (stryCov_9fa48("323"), (stryMutAct_9fa48("324") ? 1000 / 60 : (stryCov_9fa48("324"), 1000 * 60)) * 60)) * 17))),
  actor: stryMutAct_9fa48("325") ? "" : (stryCov_9fa48("325"), "Sara Patel"),
  action: stryMutAct_9fa48("326") ? "" : (stryCov_9fa48("326"), "Final NDA generated"),
  target: stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), "Mutual NDA v4.2 → DOC-AB12CD"),
  recordId: stryMutAct_9fa48("328") ? "" : (stryCov_9fa48("328"), "NDA-2041")
}), stryMutAct_9fa48("329") ? {} : (stryCov_9fa48("329"), {
  id: stryMutAct_9fa48("330") ? "" : (stryCov_9fa48("330"), "a-005"),
  ts: stryMutAct_9fa48("331") ? Date.now() + 1000 * 60 * 60 * 16 : (stryCov_9fa48("331"), Date.now() - (stryMutAct_9fa48("332") ? 1000 * 60 * 60 / 16 : (stryCov_9fa48("332"), (stryMutAct_9fa48("333") ? 1000 * 60 / 60 : (stryCov_9fa48("333"), (stryMutAct_9fa48("334") ? 1000 / 60 : (stryCov_9fa48("334"), 1000 * 60)) * 60)) * 16))),
  actor: stryMutAct_9fa48("335") ? "" : (stryCov_9fa48("335"), "Sara Patel"),
  action: stryMutAct_9fa48("336") ? "" : (stryCov_9fa48("336"), "DOCX downloaded"),
  target: stryMutAct_9fa48("337") ? "" : (stryCov_9fa48("337"), "DOC-AB12CD.docx"),
  recordId: stryMutAct_9fa48("338") ? "" : (stryCov_9fa48("338"), "NDA-2041")
}), stryMutAct_9fa48("339") ? {} : (stryCov_9fa48("339"), {
  id: stryMutAct_9fa48("340") ? "" : (stryCov_9fa48("340"), "a-006"),
  ts: stryMutAct_9fa48("341") ? Date.now() + 1000 * 60 * 60 * 4 : (stryCov_9fa48("341"), Date.now() - (stryMutAct_9fa48("342") ? 1000 * 60 * 60 / 4 : (stryCov_9fa48("342"), (stryMutAct_9fa48("343") ? 1000 * 60 / 60 : (stryCov_9fa48("343"), (stryMutAct_9fa48("344") ? 1000 / 60 : (stryCov_9fa48("344"), 1000 * 60)) * 60)) * 4))),
  actor: stryMutAct_9fa48("345") ? "" : (stryCov_9fa48("345"), "Jordan Nguyen"),
  action: stryMutAct_9fa48("346") ? "" : (stryCov_9fa48("346"), "Risk Review document downloaded"),
  target: stryMutAct_9fa48("347") ? "" : (stryCov_9fa48("347"), "DOC-AB12CD.pdf"),
  recordId: stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), "NDA-2041")
})]);
function read(key, fallback) {
  if (stryMutAct_9fa48("349")) {
    {}
  } else {
    stryCov_9fa48("349");
    if (stryMutAct_9fa48("352") ? typeof window !== "undefined" : stryMutAct_9fa48("351") ? false : stryMutAct_9fa48("350") ? true : (stryCov_9fa48("350", "351", "352"), typeof window === (stryMutAct_9fa48("353") ? "" : (stryCov_9fa48("353"), "undefined")))) return fallback;
    try {
      if (stryMutAct_9fa48("354")) {
        {}
      } else {
        stryCov_9fa48("354");
        const raw = window.localStorage.getItem(key);
        if (stryMutAct_9fa48("357") ? false : stryMutAct_9fa48("356") ? true : stryMutAct_9fa48("355") ? raw : (stryCov_9fa48("355", "356", "357"), !raw)) return fallback;
        return JSON.parse(raw);
      }
    } catch {
      if (stryMutAct_9fa48("358")) {
        {}
      } else {
        stryCov_9fa48("358");
        return fallback;
      }
    }
  }
}
function write(key, value) {
  if (stryMutAct_9fa48("359")) {
    {}
  } else {
    stryCov_9fa48("359");
    if (stryMutAct_9fa48("362") ? typeof window !== "undefined" : stryMutAct_9fa48("361") ? false : stryMutAct_9fa48("360") ? true : (stryCov_9fa48("360", "361", "362"), typeof window === (stryMutAct_9fa48("363") ? "" : (stryCov_9fa48("363"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("364")) {
        {}
      } else {
        stryCov_9fa48("364");
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {}
  }
}
export function getAuditLog() {
  if (stryMutAct_9fa48("365")) {
    {}
  } else {
    stryCov_9fa48("365");
    const list = read(KEY, null);
    if (stryMutAct_9fa48("368") ? false : stryMutAct_9fa48("367") ? true : stryMutAct_9fa48("366") ? list : (stryCov_9fa48("366", "367", "368"), !list)) {
      if (stryMutAct_9fa48("369")) {
        {}
      } else {
        stryCov_9fa48("369");
        write(KEY, seedAudit);
        return stryMutAct_9fa48("370") ? [...seedAudit] : (stryCov_9fa48("370"), (stryMutAct_9fa48("371") ? [] : (stryCov_9fa48("371"), [...seedAudit])).sort(stryMutAct_9fa48("372") ? () => undefined : (stryCov_9fa48("372"), (a, b) => stryMutAct_9fa48("373") ? b.ts + a.ts : (stryCov_9fa48("373"), b.ts - a.ts))));
      }
    }
    return stryMutAct_9fa48("374") ? [...list] : (stryCov_9fa48("374"), (stryMutAct_9fa48("375") ? [] : (stryCov_9fa48("375"), [...list])).sort(stryMutAct_9fa48("376") ? () => undefined : (stryCov_9fa48("376"), (a, b) => stryMutAct_9fa48("377") ? b.ts + a.ts : (stryCov_9fa48("377"), b.ts - a.ts))));
  }
}
export function logAuditEvent({
  actor = stryMutAct_9fa48("378") ? "" : (stryCov_9fa48("378"), "Sara Patel"),
  action,
  target = stryMutAct_9fa48("379") ? "Stryker was here!" : (stryCov_9fa48("379"), ""),
  recordId = stryMutAct_9fa48("380") ? "Stryker was here!" : (stryCov_9fa48("380"), "")
}) {
  if (stryMutAct_9fa48("381")) {
    {}
  } else {
    stryCov_9fa48("381");
    const list = read(KEY, seedAudit);
    const entry = stryMutAct_9fa48("382") ? {} : (stryCov_9fa48("382"), {
      id: (stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), "a-")) + (stryMutAct_9fa48("384") ? Math.random().toString(36) : (stryCov_9fa48("384"), Math.random().toString(36).slice(2, 8))),
      ts: Date.now(),
      actor,
      action,
      target,
      recordId
    });
    const next = stryMutAct_9fa48("385") ? [entry, ...list] : (stryCov_9fa48("385"), (stryMutAct_9fa48("386") ? [] : (stryCov_9fa48("386"), [entry, ...list])).slice(0, 200));
    write(KEY, next);
    return entry;
  }
}

// ---- generated documents store ----

const seedDocs = stryMutAct_9fa48("387") ? [] : (stryCov_9fa48("387"), [stryMutAct_9fa48("388") ? {} : (stryCov_9fa48("388"), {
  id: stryMutAct_9fa48("389") ? "" : (stryCov_9fa48("389"), "DOC-AB12CD"),
  recordId: stryMutAct_9fa48("390") ? "" : (stryCov_9fa48("390"), "NDA-2041"),
  recordTitle: stryMutAct_9fa48("391") ? "" : (stryCov_9fa48("391"), "Acme Robotics — Joint R&D"),
  templateId: stryMutAct_9fa48("392") ? "" : (stryCov_9fa48("392"), "tpl-mutual"),
  templateName: stryMutAct_9fa48("393") ? "" : (stryCov_9fa48("393"), "Mutual NDA"),
  templateVersion: stryMutAct_9fa48("394") ? "" : (stryCov_9fa48("394"), "v4.2"),
  generatedAt: stryMutAct_9fa48("395") ? Date.now() + 1000 * 60 * 60 * 17 : (stryCov_9fa48("395"), Date.now() - (stryMutAct_9fa48("396") ? 1000 * 60 * 60 / 17 : (stryCov_9fa48("396"), (stryMutAct_9fa48("397") ? 1000 * 60 / 60 : (stryCov_9fa48("397"), (stryMutAct_9fa48("398") ? 1000 / 60 : (stryCov_9fa48("398"), 1000 * 60)) * 60)) * 17))),
  generatedBy: stryMutAct_9fa48("399") ? "" : (stryCov_9fa48("399"), "Sara Patel"),
  counterparty: stryMutAct_9fa48("400") ? "" : (stryCov_9fa48("400"), "Acme Robotics Inc."),
  placeholders: 16,
  placeholdersFilled: 16
}), stryMutAct_9fa48("401") ? {} : (stryCov_9fa48("401"), {
  id: stryMutAct_9fa48("402") ? "" : (stryCov_9fa48("402"), "DOC-EF34GH"),
  recordId: stryMutAct_9fa48("403") ? "" : (stryCov_9fa48("403"), "NDA-2039"),
  recordTitle: stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), "Hooli Cloud — Hosting Eval"),
  templateId: stryMutAct_9fa48("405") ? "" : (stryCov_9fa48("405"), "tpl-vendor"),
  templateName: stryMutAct_9fa48("406") ? "" : (stryCov_9fa48("406"), "Vendor / Supplier NDA"),
  templateVersion: stryMutAct_9fa48("407") ? "" : (stryCov_9fa48("407"), "v3.0"),
  generatedAt: stryMutAct_9fa48("408") ? Date.now() + 1000 * 60 * 60 * 32 : (stryCov_9fa48("408"), Date.now() - (stryMutAct_9fa48("409") ? 1000 * 60 * 60 / 32 : (stryCov_9fa48("409"), (stryMutAct_9fa48("410") ? 1000 * 60 / 60 : (stryCov_9fa48("410"), (stryMutAct_9fa48("411") ? 1000 / 60 : (stryCov_9fa48("411"), 1000 * 60)) * 60)) * 32))),
  generatedBy: stryMutAct_9fa48("412") ? "" : (stryCov_9fa48("412"), "Maya Davis"),
  counterparty: stryMutAct_9fa48("413") ? "" : (stryCov_9fa48("413"), "Hooli Cloud"),
  placeholders: 15,
  placeholdersFilled: 15
})]);
export function getGeneratedDocs() {
  if (stryMutAct_9fa48("414")) {
    {}
  } else {
    stryCov_9fa48("414");
    const list = read(DOCS_KEY, null);
    if (stryMutAct_9fa48("417") ? false : stryMutAct_9fa48("416") ? true : stryMutAct_9fa48("415") ? list : (stryCov_9fa48("415", "416", "417"), !list)) {
      if (stryMutAct_9fa48("418")) {
        {}
      } else {
        stryCov_9fa48("418");
        write(DOCS_KEY, seedDocs);
        return stryMutAct_9fa48("419") ? [...seedDocs] : (stryCov_9fa48("419"), (stryMutAct_9fa48("420") ? [] : (stryCov_9fa48("420"), [...seedDocs])).sort(stryMutAct_9fa48("421") ? () => undefined : (stryCov_9fa48("421"), (a, b) => stryMutAct_9fa48("422") ? b.generatedAt + a.generatedAt : (stryCov_9fa48("422"), b.generatedAt - a.generatedAt))));
      }
    }
    return stryMutAct_9fa48("423") ? [...list] : (stryCov_9fa48("423"), (stryMutAct_9fa48("424") ? [] : (stryCov_9fa48("424"), [...list])).sort(stryMutAct_9fa48("425") ? () => undefined : (stryCov_9fa48("425"), (a, b) => stryMutAct_9fa48("426") ? b.generatedAt + a.generatedAt : (stryCov_9fa48("426"), b.generatedAt - a.generatedAt))));
  }
}
export function recordGeneratedDoc(doc) {
  if (stryMutAct_9fa48("427")) {
    {}
  } else {
    stryCov_9fa48("427");
    const list = read(DOCS_KEY, seedDocs);
    const next = stryMutAct_9fa48("428") ? [doc, ...list.filter(d => d.id !== doc.id)] : (stryCov_9fa48("428"), (stryMutAct_9fa48("429") ? [] : (stryCov_9fa48("429"), [doc, ...(stryMutAct_9fa48("430") ? list : (stryCov_9fa48("430"), list.filter(stryMutAct_9fa48("431") ? () => undefined : (stryCov_9fa48("431"), d => stryMutAct_9fa48("434") ? d.id === doc.id : stryMutAct_9fa48("433") ? false : stryMutAct_9fa48("432") ? true : (stryCov_9fa48("432", "433", "434"), d.id !== doc.id)))))])).slice(0, 100));
    write(DOCS_KEY, next);
    return doc;
  }
}
export function getDocsForRecord(recordId) {
  if (stryMutAct_9fa48("435")) {
    {}
  } else {
    stryCov_9fa48("435");
    return stryMutAct_9fa48("436") ? getGeneratedDocs() : (stryCov_9fa48("436"), getGeneratedDocs().filter(stryMutAct_9fa48("437") ? () => undefined : (stryCov_9fa48("437"), d => stryMutAct_9fa48("440") ? d.recordId !== recordId : stryMutAct_9fa48("439") ? false : stryMutAct_9fa48("438") ? true : (stryCov_9fa48("438", "439", "440"), d.recordId === recordId))));
  }
}
export function formatTimestamp(ts) {
  if (stryMutAct_9fa48("441")) {
    {}
  } else {
    stryCov_9fa48("441");
    const d = new Date(ts);
    return d.toLocaleString(stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), "en-US"), stryMutAct_9fa48("443") ? {} : (stryCov_9fa48("443"), {
      month: stryMutAct_9fa48("444") ? "" : (stryCov_9fa48("444"), "short"),
      day: stryMutAct_9fa48("445") ? "" : (stryCov_9fa48("445"), "numeric"),
      year: stryMutAct_9fa48("446") ? "" : (stryCov_9fa48("446"), "numeric"),
      hour: stryMutAct_9fa48("447") ? "" : (stryCov_9fa48("447"), "2-digit"),
      minute: stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), "2-digit")
    }));
  }
}