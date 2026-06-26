// @ts-nocheck
// Helpers that bridge AI Tools with the NDA repository:
//   - findRecordByMention(): resolve a free-text reference (NDA-2041,
//     "wayne", "joint r&d", counterparty name, etc.) to an actual record.
//   - renderRecordAsText(): produce a synthetic contract text body for any
//     record by running the saved form values through its template. This
//     lets Extract & Review work on any repository document without the
//     user pasting anything.
//   - summarizeRecord(): build the structured per-record summary used by
//     the chat tab when the user asks about a specific NDA.
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
import { getRequests, getRequest, getExpirationTs } from "./requestStore";
import { getTemplateById } from "./templates";
import { buildPlaceholderValues, applyPlaceholders } from "./placeholders";
import { getSignaturesForRecord } from "./signatureService";
const norm = stryMutAct_9fa48("0") ? () => undefined : (stryCov_9fa48("0"), (() => {
  const norm = s => stryMutAct_9fa48("2") ? (s || "").toString().toUpperCase().trim() : stryMutAct_9fa48("1") ? (s || "").toString().toLowerCase() : (stryCov_9fa48("1", "2"), (stryMutAct_9fa48("5") ? s && "" : stryMutAct_9fa48("4") ? false : stryMutAct_9fa48("3") ? true : (stryCov_9fa48("3", "4", "5"), s || (stryMutAct_9fa48("6") ? "Stryker was here!" : (stryCov_9fa48("6"), "")))).toString().toLowerCase().trim());
  return norm;
})());
export function findRecordByMention(q) {
  if (stryMutAct_9fa48("7")) {
    {}
  } else {
    stryCov_9fa48("7");
    const records = getRequests();
    if (stryMutAct_9fa48("10") ? false : stryMutAct_9fa48("9") ? true : stryMutAct_9fa48("8") ? records.length : (stryCov_9fa48("8", "9", "10"), !records.length)) return null;
    const s = norm(q);
    if (stryMutAct_9fa48("13") ? false : stryMutAct_9fa48("12") ? true : stryMutAct_9fa48("11") ? s : (stryCov_9fa48("11", "12", "13"), !s)) return null;

    // 1) Exact NDA-#### token (with or without dash)
    const idMatch = s.match(stryMutAct_9fa48("18") ? /nda[-\s]?(\D{3,5})/i : stryMutAct_9fa48("17") ? /nda[-\s]?(\d)/i : stryMutAct_9fa48("16") ? /nda[-\S]?(\d{3,5})/i : stryMutAct_9fa48("15") ? /nda[^-\s]?(\d{3,5})/i : stryMutAct_9fa48("14") ? /nda[-\s](\d{3,5})/i : (stryCov_9fa48("14", "15", "16", "17", "18"), /nda[-\s]?(\d{3,5})/i));
    if (stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : (stryCov_9fa48("19", "20"), idMatch)) {
      if (stryMutAct_9fa48("21")) {
        {}
      } else {
        stryCov_9fa48("21");
        const id = stryMutAct_9fa48("22") ? `` : (stryCov_9fa48("22"), `NDA-${idMatch[1]}`);
        const hit = records.find(stryMutAct_9fa48("23") ? () => undefined : (stryCov_9fa48("23"), r => stryMutAct_9fa48("26") ? r.id.toUpperCase() !== id : stryMutAct_9fa48("25") ? false : stryMutAct_9fa48("24") ? true : (stryCov_9fa48("24", "25", "26"), (stryMutAct_9fa48("27") ? r.id.toLowerCase() : (stryCov_9fa48("27"), r.id.toUpperCase())) === id)));
        if (stryMutAct_9fa48("29") ? false : stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28", "29"), hit)) return hit;
      }
    }

    // 2) Exact id substring
    const direct = records.find(stryMutAct_9fa48("30") ? () => undefined : (stryCov_9fa48("30"), r => s.includes(norm(r.id))));
    if (stryMutAct_9fa48("32") ? false : stryMutAct_9fa48("31") ? true : (stryCov_9fa48("31", "32"), direct)) return direct;

    // 3) Counterparty name (longest match wins)
    const cpMatch = stryMutAct_9fa48("34") ? [...records].sort((a, b) => norm(b.counterparty || b.form?.counterpartyName).length - norm(a.counterparty || a.form?.counterpartyName).length)[0] : stryMutAct_9fa48("33") ? [...records].filter(r => {
      const cp = norm(r.counterparty || r.form?.counterpartyName);
      return cp && s.includes(cp);
    })[0] : (stryCov_9fa48("33", "34"), (stryMutAct_9fa48("35") ? [] : (stryCov_9fa48("35"), [...records])).filter(r => {
      if (stryMutAct_9fa48("36")) {
        {}
      } else {
        stryCov_9fa48("36");
        const cp = norm(stryMutAct_9fa48("39") ? r.counterparty && r.form?.counterpartyName : stryMutAct_9fa48("38") ? false : stryMutAct_9fa48("37") ? true : (stryCov_9fa48("37", "38", "39"), r.counterparty || (stryMutAct_9fa48("40") ? r.form.counterpartyName : (stryCov_9fa48("40"), r.form?.counterpartyName))));
        return stryMutAct_9fa48("43") ? cp || s.includes(cp) : stryMutAct_9fa48("42") ? false : stryMutAct_9fa48("41") ? true : (stryCov_9fa48("41", "42", "43"), cp && s.includes(cp));
      }
    }).sort(stryMutAct_9fa48("44") ? () => undefined : (stryCov_9fa48("44"), (a, b) => stryMutAct_9fa48("45") ? norm(b.counterparty || b.form?.counterpartyName).length + norm(a.counterparty || a.form?.counterpartyName).length : (stryCov_9fa48("45"), norm(stryMutAct_9fa48("48") ? b.counterparty && b.form?.counterpartyName : stryMutAct_9fa48("47") ? false : stryMutAct_9fa48("46") ? true : (stryCov_9fa48("46", "47", "48"), b.counterparty || (stryMutAct_9fa48("49") ? b.form.counterpartyName : (stryCov_9fa48("49"), b.form?.counterpartyName)))).length - norm(stryMutAct_9fa48("52") ? a.counterparty && a.form?.counterpartyName : stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50", "51", "52"), a.counterparty || (stryMutAct_9fa48("53") ? a.form.counterpartyName : (stryCov_9fa48("53"), a.form?.counterpartyName)))).length)))[0]);
    if (stryMutAct_9fa48("55") ? false : stryMutAct_9fa48("54") ? true : (stryCov_9fa48("54", "55"), cpMatch)) return cpMatch;

    // 4) Title substring
    const titleMatch = records.find(r => {
      if (stryMutAct_9fa48("56")) {
        {}
      } else {
        stryCov_9fa48("56");
        const t = norm(r.title);
        if (stryMutAct_9fa48("59") ? false : stryMutAct_9fa48("58") ? true : stryMutAct_9fa48("57") ? t : (stryCov_9fa48("57", "58", "59"), !t)) return stryMutAct_9fa48("60") ? true : (stryCov_9fa48("60"), false);
        // require at least one word of 4+ chars to overlap
        return stryMutAct_9fa48("62") ? t.split(/\s+/).some(w => s.includes(w)) : stryMutAct_9fa48("61") ? t.split(/\s+/).filter(w => w.length >= 4).every(w => s.includes(w)) : (stryCov_9fa48("61", "62"), t.split(stryMutAct_9fa48("64") ? /\S+/ : stryMutAct_9fa48("63") ? /\s/ : (stryCov_9fa48("63", "64"), /\s+/)).filter(stryMutAct_9fa48("65") ? () => undefined : (stryCov_9fa48("65"), w => stryMutAct_9fa48("69") ? w.length < 4 : stryMutAct_9fa48("68") ? w.length > 4 : stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : (stryCov_9fa48("66", "67", "68", "69"), w.length >= 4))).some(stryMutAct_9fa48("70") ? () => undefined : (stryCov_9fa48("70"), w => s.includes(w))));
      }
    });
    if (stryMutAct_9fa48("72") ? false : stryMutAct_9fa48("71") ? true : (stryCov_9fa48("71", "72"), titleMatch)) return titleMatch;
    return null;
  }
}

// Produce a plain-text representation of the actual NDA document for a
// record (template + placeholder substitution). Falls back to a structured
// dump of the form when no template is bound.
export function renderRecordAsText(record) {
  if (stryMutAct_9fa48("73")) {
    {}
  } else {
    stryCov_9fa48("73");
    if (stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : stryMutAct_9fa48("74") ? record : (stryCov_9fa48("74", "75", "76"), !record)) return stryMutAct_9fa48("77") ? "Stryker was here!" : (stryCov_9fa48("77"), "");
    const tpl = record.templateId ? getTemplateById(record.templateId) : getTemplateById(stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "tpl-mutual"));
    const values = buildPlaceholderValues(stryMutAct_9fa48("81") ? record.form && {} : stryMutAct_9fa48("80") ? false : stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79", "80", "81"), record.form || {}));
    const lines = stryMutAct_9fa48("82") ? ["Stryker was here"] : (stryCov_9fa48("82"), []);
    if (stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84"), tpl)) {
      if (stryMutAct_9fa48("85")) {
        {}
      } else {
        stryCov_9fa48("85");
        for (const block of tpl.content) {
          if (stryMutAct_9fa48("86")) {
            {}
          } else {
            stryCov_9fa48("86");
            if (stryMutAct_9fa48("89") ? block.type !== "title" : stryMutAct_9fa48("88") ? false : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88", "89"), block.type === (stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "title")))) {
              if (stryMutAct_9fa48("91")) {
                {}
              } else {
                stryCov_9fa48("91");
                lines.push(stryMutAct_9fa48("92") ? applyPlaceholders(block.text, values).toLowerCase() : (stryCov_9fa48("92"), applyPlaceholders(block.text, values).toUpperCase()), stryMutAct_9fa48("93") ? "Stryker was here!" : (stryCov_9fa48("93"), ""));
              }
            } else if (stryMutAct_9fa48("96") ? block.type !== "subtitle" : stryMutAct_9fa48("95") ? false : stryMutAct_9fa48("94") ? true : (stryCov_9fa48("94", "95", "96"), block.type === (stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "subtitle")))) {
              if (stryMutAct_9fa48("98")) {
                {}
              } else {
                stryCov_9fa48("98");
                lines.push(applyPlaceholders(block.text, values), stryMutAct_9fa48("99") ? "Stryker was here!" : (stryCov_9fa48("99"), ""));
              }
            } else if (stryMutAct_9fa48("102") ? block.type !== "heading" : stryMutAct_9fa48("101") ? false : stryMutAct_9fa48("100") ? true : (stryCov_9fa48("100", "101", "102"), block.type === (stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "heading")))) {
              if (stryMutAct_9fa48("104")) {
                {}
              } else {
                stryCov_9fa48("104");
                lines.push(stryMutAct_9fa48("105") ? "Stryker was here!" : (stryCov_9fa48("105"), ""), applyPlaceholders(block.text, values));
              }
            } else if (stryMutAct_9fa48("108") ? block.type !== "paragraph" : stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107", "108"), block.type === (stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), "paragraph")))) {
              if (stryMutAct_9fa48("110")) {
                {}
              } else {
                stryCov_9fa48("110");
                lines.push(applyPlaceholders(block.text, values));
              }
            } else if (stryMutAct_9fa48("113") ? block.type !== "spacer" : stryMutAct_9fa48("112") ? false : stryMutAct_9fa48("111") ? true : (stryCov_9fa48("111", "112", "113"), block.type === (stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), "spacer")))) {
              if (stryMutAct_9fa48("115")) {
                {}
              } else {
                stryCov_9fa48("115");
                lines.push(stryMutAct_9fa48("116") ? "Stryker was here!" : (stryCov_9fa48("116"), ""));
              }
            } else if (stryMutAct_9fa48("119") ? block.type !== "signatureBlock" : stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118", "119"), block.type === (stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "signatureBlock")))) {
              if (stryMutAct_9fa48("121")) {
                {}
              } else {
                stryCov_9fa48("121");
                lines.push(stryMutAct_9fa48("122") ? "Stryker was here!" : (stryCov_9fa48("122"), ""), stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), "IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date."));
                for (const p of block.parties) {
                  if (stryMutAct_9fa48("124")) {
                    {}
                  } else {
                    stryCov_9fa48("124");
                    lines.push(stryMutAct_9fa48("125") ? "Stryker was here!" : (stryCov_9fa48("125"), ""), applyPlaceholders(p.party, values), stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), "By: ____________________________________"), stryMutAct_9fa48("127") ? `` : (stryCov_9fa48("127"), `Name: ${applyPlaceholders(p.name, values)}`), stryMutAct_9fa48("128") ? `` : (stryCov_9fa48("128"), `Title: ${applyPlaceholders(stryMutAct_9fa48("131") ? p.title && "" : stryMutAct_9fa48("130") ? false : stryMutAct_9fa48("129") ? true : (stryCov_9fa48("129", "130", "131"), p.title || (stryMutAct_9fa48("132") ? "Stryker was here!" : (stryCov_9fa48("132"), ""))), values)}`), stryMutAct_9fa48("133") ? `` : (stryCov_9fa48("133"), `Date: __________________________`));
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (stryMutAct_9fa48("134")) {
        {}
      } else {
        stryCov_9fa48("134");
        lines.push(stryMutAct_9fa48("137") ? record.title && "" : stryMutAct_9fa48("136") ? false : stryMutAct_9fa48("135") ? true : (stryCov_9fa48("135", "136", "137"), record.title || (stryMutAct_9fa48("138") ? "Stryker was here!" : (stryCov_9fa48("138"), ""))));
        Object.entries(stryMutAct_9fa48("141") ? record.form && {} : stryMutAct_9fa48("140") ? false : stryMutAct_9fa48("139") ? true : (stryCov_9fa48("139", "140", "141"), record.form || {})).forEach(([k, v]) => {
          if (stryMutAct_9fa48("142")) {
            {}
          } else {
            stryCov_9fa48("142");
            if (stryMutAct_9fa48("144") ? false : stryMutAct_9fa48("143") ? true : (stryCov_9fa48("143", "144"), v)) lines.push(stryMutAct_9fa48("145") ? `` : (stryCov_9fa48("145"), `${k}: ${v}`));
          }
        });
      }
    }
    return lines.join(stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), "\n"));
  }
}
function fmtDate(d) {
  if (stryMutAct_9fa48("147")) {
    {}
  } else {
    stryCov_9fa48("147");
    if (stryMutAct_9fa48("150") ? false : stryMutAct_9fa48("149") ? true : stryMutAct_9fa48("148") ? d : (stryCov_9fa48("148", "149", "150"), !d)) return stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), "—");
    try {
      if (stryMutAct_9fa48("152")) {
        {}
      } else {
        stryCov_9fa48("152");
        return new Date(d).toLocaleDateString(stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), "en-US"), stryMutAct_9fa48("154") ? {} : (stryCov_9fa48("154"), {
          year: stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), "numeric"),
          month: stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), "long"),
          day: stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), "numeric")
        }));
      }
    } catch {
      if (stryMutAct_9fa48("158")) {
        {}
      } else {
        stryCov_9fa48("158");
        return String(d);
      }
    }
  }
}

// Build a structured per-record summary used by chat answers.
export function summarizeRecord(record) {
  if (stryMutAct_9fa48("159")) {
    {}
  } else {
    stryCov_9fa48("159");
    if (stryMutAct_9fa48("162") ? false : stryMutAct_9fa48("161") ? true : stryMutAct_9fa48("160") ? record : (stryCov_9fa48("160", "161", "162"), !record)) return null;
    const f = stryMutAct_9fa48("165") ? record.form && {} : stryMutAct_9fa48("164") ? false : stryMutAct_9fa48("163") ? true : (stryCov_9fa48("163", "164", "165"), record.form || {});
    const sigs = stryMutAct_9fa48("168") ? getSignaturesForRecord(record.id) && [] : stryMutAct_9fa48("167") ? false : stryMutAct_9fa48("166") ? true : (stryCov_9fa48("166", "167", "168"), getSignaturesForRecord(record.id) || (stryMutAct_9fa48("169") ? ["Stryker was here"] : (stryCov_9fa48("169"), [])));
    const latestSig = sigs[0];
    const signed = sigs.find(stryMutAct_9fa48("170") ? () => undefined : (stryCov_9fa48("170"), s => stryMutAct_9fa48("173") ? s.status !== "signed" : stryMutAct_9fa48("172") ? false : stryMutAct_9fa48("171") ? true : (stryCov_9fa48("171", "172", "173"), s.status === (stryMutAct_9fa48("174") ? "" : (stryCov_9fa48("174"), "signed")))));

    // Compute expiry using the shared store helper so chat answers match
    // exactly what the Repository displays (handles "two (2) years", custom
    // endDate, etc.).
    const expiryTs = getExpirationTs(record);
    const expiry = expiryTs ? new Date(expiryTs) : null;
    const today = new Date();
    const daysToExpiry = expiry ? Math.ceil(stryMutAct_9fa48("175") ? (expiry - today) * (1000 * 60 * 60 * 24) : (stryCov_9fa48("175"), (stryMutAct_9fa48("176") ? expiry + today : (stryCov_9fa48("176"), expiry - today)) / (stryMutAct_9fa48("177") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("177"), (stryMutAct_9fa48("178") ? 1000 * 60 / 60 : (stryCov_9fa48("178"), (stryMutAct_9fa48("179") ? 1000 / 60 : (stryCov_9fa48("179"), 1000 * 60)) * 60)) * 24)))) : null;
    return stryMutAct_9fa48("180") ? {} : (stryCov_9fa48("180"), {
      id: record.id,
      title: record.title,
      type: record.type,
      recordType: stryMutAct_9fa48("183") ? record.recordType && "NDA" : stryMutAct_9fa48("182") ? false : stryMutAct_9fa48("181") ? true : (stryCov_9fa48("181", "182", "183"), record.recordType || (stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), "NDA"))),
      status: record.status,
      risk: record.risk,
      riskScore: record.riskScore,
      owner: record.owner,
      counterparty: stryMutAct_9fa48("187") ? (f.counterpartyName || record.counterparty) && "—" : stryMutAct_9fa48("186") ? false : stryMutAct_9fa48("185") ? true : (stryCov_9fa48("185", "186", "187"), (stryMutAct_9fa48("189") ? f.counterpartyName && record.counterparty : stryMutAct_9fa48("188") ? false : (stryCov_9fa48("188", "189"), f.counterpartyName || record.counterparty)) || (stryMutAct_9fa48("190") ? "" : (stryCov_9fa48("190"), "—"))),
      counterpartyAddress: stryMutAct_9fa48("193") ? f.counterpartyAddress && "—" : stryMutAct_9fa48("192") ? false : stryMutAct_9fa48("191") ? true : (stryCov_9fa48("191", "192", "193"), f.counterpartyAddress || (stryMutAct_9fa48("194") ? "" : (stryCov_9fa48("194"), "—"))),
      counterpartyContact: stryMutAct_9fa48("197") ? f.counterpartyContact && "—" : stryMutAct_9fa48("196") ? false : stryMutAct_9fa48("195") ? true : (stryCov_9fa48("195", "196", "197"), f.counterpartyContact || (stryMutAct_9fa48("198") ? "" : (stryCov_9fa48("198"), "—"))),
      counterpartyEmail: stryMutAct_9fa48("201") ? f.counterpartyEmail && "—" : stryMutAct_9fa48("200") ? false : stryMutAct_9fa48("199") ? true : (stryCov_9fa48("199", "200", "201"), f.counterpartyEmail || (stryMutAct_9fa48("202") ? "" : (stryCov_9fa48("202"), "—"))),
      company: stryMutAct_9fa48("205") ? f.companyName && "Contoso Corporation" : stryMutAct_9fa48("204") ? false : stryMutAct_9fa48("203") ? true : (stryCov_9fa48("203", "204", "205"), f.companyName || (stryMutAct_9fa48("206") ? "" : (stryCov_9fa48("206"), "Contoso Corporation"))),
      companyAddress: stryMutAct_9fa48("209") ? f.companyAddress && "—" : stryMutAct_9fa48("208") ? false : stryMutAct_9fa48("207") ? true : (stryCov_9fa48("207", "208", "209"), f.companyAddress || (stryMutAct_9fa48("210") ? "" : (stryCov_9fa48("210"), "—"))),
      purpose: stryMutAct_9fa48("213") ? f.purpose && "—" : stryMutAct_9fa48("212") ? false : stryMutAct_9fa48("211") ? true : (stryCov_9fa48("211", "212", "213"), f.purpose || (stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), "—"))),
      confidentialInformation: stryMutAct_9fa48("217") ? f.confidentialInformation && "—" : stryMutAct_9fa48("216") ? false : stryMutAct_9fa48("215") ? true : (stryCov_9fa48("215", "216", "217"), f.confidentialInformation || (stryMutAct_9fa48("218") ? "" : (stryCov_9fa48("218"), "—"))),
      effectiveDate: f.effectiveDate ? fmtDate(f.effectiveDate) : stryMutAct_9fa48("219") ? "" : (stryCov_9fa48("219"), "—"),
      term: stryMutAct_9fa48("222") ? f.term && "—" : stryMutAct_9fa48("221") ? false : stryMutAct_9fa48("220") ? true : (stryCov_9fa48("220", "221", "222"), f.term || (stryMutAct_9fa48("223") ? "" : (stryCov_9fa48("223"), "—"))),
      survival: stryMutAct_9fa48("226") ? f.survival && "—" : stryMutAct_9fa48("225") ? false : stryMutAct_9fa48("224") ? true : (stryCov_9fa48("224", "225", "226"), f.survival || (stryMutAct_9fa48("227") ? "" : (stryCov_9fa48("227"), "—"))),
      governingLaw: stryMutAct_9fa48("230") ? (f.governingLaw || f.jurisdiction) && "—" : stryMutAct_9fa48("229") ? false : stryMutAct_9fa48("228") ? true : (stryCov_9fa48("228", "229", "230"), (stryMutAct_9fa48("232") ? f.governingLaw && f.jurisdiction : stryMutAct_9fa48("231") ? false : (stryCov_9fa48("231", "232"), f.governingLaw || f.jurisdiction)) || (stryMutAct_9fa48("233") ? "" : (stryCov_9fa48("233"), "—"))),
      jurisdiction: stryMutAct_9fa48("236") ? f.jurisdiction && "—" : stryMutAct_9fa48("235") ? false : stryMutAct_9fa48("234") ? true : (stryCov_9fa48("234", "235", "236"), f.jurisdiction || (stryMutAct_9fa48("237") ? "" : (stryCov_9fa48("237"), "—"))),
      companySigner: f.companySignerName ? stryMutAct_9fa48("238") ? `` : (stryCov_9fa48("238"), `${f.companySignerName}${f.companySignerTitle ? stryMutAct_9fa48("239") ? `` : (stryCov_9fa48("239"), `, ${f.companySignerTitle}`) : stryMutAct_9fa48("240") ? "Stryker was here!" : (stryCov_9fa48("240"), "")}`) : stryMutAct_9fa48("241") ? "" : (stryCov_9fa48("241"), "—"),
      counterpartySigner: f.counterpartySignerName ? stryMutAct_9fa48("242") ? `` : (stryCov_9fa48("242"), `${f.counterpartySignerName}${f.counterpartySignerTitle ? stryMutAct_9fa48("243") ? `` : (stryCov_9fa48("243"), `, ${f.counterpartySignerTitle}`) : stryMutAct_9fa48("244") ? "Stryker was here!" : (stryCov_9fa48("244"), "")}`) : stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), "—"),
      expiry: expiry ? fmtDate(expiry) : stryMutAct_9fa48("246") ? "" : (stryCov_9fa48("246"), "—"),
      daysToExpiry,
      renewalDue: stryMutAct_9fa48("249") ? daysToExpiry !== null && daysToExpiry <= 90 || daysToExpiry >= 0 : stryMutAct_9fa48("248") ? false : stryMutAct_9fa48("247") ? true : (stryCov_9fa48("247", "248", "249"), (stryMutAct_9fa48("251") ? daysToExpiry !== null || daysToExpiry <= 90 : stryMutAct_9fa48("250") ? true : (stryCov_9fa48("250", "251"), (stryMutAct_9fa48("253") ? daysToExpiry === null : stryMutAct_9fa48("252") ? true : (stryCov_9fa48("252", "253"), daysToExpiry !== null)) && (stryMutAct_9fa48("256") ? daysToExpiry > 90 : stryMutAct_9fa48("255") ? daysToExpiry < 90 : stryMutAct_9fa48("254") ? true : (stryCov_9fa48("254", "255", "256"), daysToExpiry <= 90)))) && (stryMutAct_9fa48("259") ? daysToExpiry < 0 : stryMutAct_9fa48("258") ? daysToExpiry > 0 : stryMutAct_9fa48("257") ? true : (stryCov_9fa48("257", "258", "259"), daysToExpiry >= 0))),
      signatureStatus: signed ? stryMutAct_9fa48("260") ? `` : (stryCov_9fa48("260"), `Signed on ${fmtDate(signed.signedAt)} by ${signed.signatureName}`) : latestSig ? stryMutAct_9fa48("261") ? `` : (stryCov_9fa48("261"), `Awaiting signature (sent ${fmtDate(latestSig.sentAt)} to ${latestSig.email})`) : (stryMutAct_9fa48("264") ? record.status !== "Awaiting Signature" : stryMutAct_9fa48("263") ? false : stryMutAct_9fa48("262") ? true : (stryCov_9fa48("262", "263", "264"), record.status === (stryMutAct_9fa48("265") ? "" : (stryCov_9fa48("265"), "Awaiting Signature")))) ? stryMutAct_9fa48("266") ? "" : (stryCov_9fa48("266"), "Awaiting counter-signature") : (stryMutAct_9fa48("269") ? record.status !== "Signed" : stryMutAct_9fa48("268") ? false : stryMutAct_9fa48("267") ? true : (stryCov_9fa48("267", "268", "269"), record.status === (stryMutAct_9fa48("270") ? "" : (stryCov_9fa48("270"), "Signed")))) ? stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), "Marked signed") : stryMutAct_9fa48("272") ? "" : (stryCov_9fa48("272"), "Not yet sent for signature"),
      signedAt: stryMutAct_9fa48("275") ? (signed?.signedAt || record.signedAt) && null : stryMutAct_9fa48("274") ? false : stryMutAct_9fa48("273") ? true : (stryCov_9fa48("273", "274", "275"), (stryMutAct_9fa48("277") ? signed?.signedAt && record.signedAt : stryMutAct_9fa48("276") ? false : (stryCov_9fa48("276", "277"), (stryMutAct_9fa48("278") ? signed.signedAt : (stryCov_9fa48("278"), signed?.signedAt)) || record.signedAt)) || null),
      signedBy: stryMutAct_9fa48("281") ? (signed?.signatureName || record.signedBy) && null : stryMutAct_9fa48("280") ? false : stryMutAct_9fa48("279") ? true : (stryCov_9fa48("279", "280", "281"), (stryMutAct_9fa48("283") ? signed?.signatureName && record.signedBy : stryMutAct_9fa48("282") ? false : (stryCov_9fa48("282", "283"), (stryMutAct_9fa48("284") ? signed.signatureName : (stryCov_9fa48("284"), signed?.signatureName)) || record.signedBy)) || null)
    });
  }
}
export function getRecordById(id) {
  if (stryMutAct_9fa48("285")) {
    {}
  } else {
    stryCov_9fa48("285");
    return getRequest(id);
  }
}