// @ts-nocheck
// Placeholder mapping + validation utilities.
// Pure substitution — no AI rewriting.
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
import { PLACEHOLDER_DEFS } from "./templates";
const PLACEHOLDER_REGEX = stryMutAct_9fa48("407") ? /\{\{([^A-Za-z0-9_]+)\}\}/g : stryMutAct_9fa48("406") ? /\{\{([A-Za-z0-9_])\}\}/g : (stryCov_9fa48("406", "407"), /\{\{([A-Za-z0-9_]+)\}\}/g);
export function extractPlaceholders(template) {
  if (stryMutAct_9fa48("408")) {
    {}
  } else {
    stryCov_9fa48("408");
    if (stryMutAct_9fa48("411") ? false : stryMutAct_9fa48("410") ? true : stryMutAct_9fa48("409") ? template : (stryCov_9fa48("409", "410", "411"), !template)) return stryMutAct_9fa48("412") ? ["Stryker was here"] : (stryCov_9fa48("412"), []);
    const found = new Set();
    for (const block of template.content) {
      if (stryMutAct_9fa48("413")) {
        {}
      } else {
        stryCov_9fa48("413");
        if (stryMutAct_9fa48("415") ? false : stryMutAct_9fa48("414") ? true : (stryCov_9fa48("414", "415"), block.text)) {
          if (stryMutAct_9fa48("416")) {
            {}
          } else {
            stryCov_9fa48("416");
            let m;
            const re = new RegExp(PLACEHOLDER_REGEX.source, stryMutAct_9fa48("417") ? "" : (stryCov_9fa48("417"), "g"));
            while (stryMutAct_9fa48("419") ? (m = re.exec(block.text)) === null : stryMutAct_9fa48("418") ? false : (stryCov_9fa48("418", "419"), (m = re.exec(block.text)) !== null)) found.add(m[1]);
          }
        }
        if (stryMutAct_9fa48("421") ? false : stryMutAct_9fa48("420") ? true : (stryCov_9fa48("420", "421"), block.parties)) {
          if (stryMutAct_9fa48("422")) {
            {}
          } else {
            stryCov_9fa48("422");
            for (const p of block.parties) {
              if (stryMutAct_9fa48("423")) {
                {}
              } else {
                stryCov_9fa48("423");
                (stryMutAct_9fa48("424") ? [] : (stryCov_9fa48("424"), [stryMutAct_9fa48("425") ? "" : (stryCov_9fa48("425"), "party"), stryMutAct_9fa48("426") ? "" : (stryCov_9fa48("426"), "name"), stryMutAct_9fa48("427") ? "" : (stryCov_9fa48("427"), "title")])).forEach(k => {
                  if (stryMutAct_9fa48("428")) {
                    {}
                  } else {
                    stryCov_9fa48("428");
                    if (stryMutAct_9fa48("431") ? false : stryMutAct_9fa48("430") ? true : stryMutAct_9fa48("429") ? p[k] : (stryCov_9fa48("429", "430", "431"), !p[k])) return;
                    let m;
                    const re = new RegExp(PLACEHOLDER_REGEX.source, stryMutAct_9fa48("432") ? "" : (stryCov_9fa48("432"), "g"));
                    while (stryMutAct_9fa48("434") ? (m = re.exec(p[k])) === null : stryMutAct_9fa48("433") ? false : (stryCov_9fa48("433", "434"), (m = re.exec(p[k])) !== null)) found.add(m[1]);
                  }
                });
              }
            }
          }
        }
      }
    }
    return Array.from(found);
  }
}

// Map intake form values onto placeholder keys.
// `form` is the intake form state object built in the wizard.
export function buildPlaceholderValues(form = {}) {
  if (stryMutAct_9fa48("435")) {
    {}
  } else {
    stryCov_9fa48("435");
    const cp = stryMutAct_9fa48("438") ? form.counterpartyName && "" : stryMutAct_9fa48("437") ? false : stryMutAct_9fa48("436") ? true : (stryCov_9fa48("436", "437", "438"), form.counterpartyName || (stryMutAct_9fa48("439") ? "Stryker was here!" : (stryCov_9fa48("439"), "")));
    const company = stryMutAct_9fa48("442") ? form.companyName && "Contoso Corporation" : stryMutAct_9fa48("441") ? false : stryMutAct_9fa48("440") ? true : (stryCov_9fa48("440", "441", "442"), form.companyName || (stryMutAct_9fa48("443") ? "" : (stryCov_9fa48("443"), "Contoso Corporation")));
    return stryMutAct_9fa48("444") ? {} : (stryCov_9fa48("444"), {
      CompanyName: company,
      CompanyAddress: stryMutAct_9fa48("447") ? form.companyAddress && "1 Microsoft Way, Redmond, WA 98052, USA" : stryMutAct_9fa48("446") ? false : stryMutAct_9fa48("445") ? true : (stryCov_9fa48("445", "446", "447"), form.companyAddress || (stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), "1 Microsoft Way, Redmond, WA 98052, USA"))),
      CounterpartyName: cp,
      CounterpartyAddress: stryMutAct_9fa48("451") ? form.counterpartyAddress && "" : stryMutAct_9fa48("450") ? false : stryMutAct_9fa48("449") ? true : (stryCov_9fa48("449", "450", "451"), form.counterpartyAddress || (stryMutAct_9fa48("452") ? "Stryker was here!" : (stryCov_9fa48("452"), ""))),
      EmployeeName: stryMutAct_9fa48("455") ? form.employeeName && "" : stryMutAct_9fa48("454") ? false : stryMutAct_9fa48("453") ? true : (stryCov_9fa48("453", "454", "455"), form.employeeName || (stryMutAct_9fa48("456") ? "Stryker was here!" : (stryCov_9fa48("456"), ""))),
      EffectiveDate: form.effectiveDate ? formatDate(form.effectiveDate) : new Date().toLocaleDateString(stryMutAct_9fa48("457") ? "" : (stryCov_9fa48("457"), "en-US"), stryMutAct_9fa48("458") ? {} : (stryCov_9fa48("458"), {
        year: stryMutAct_9fa48("459") ? "" : (stryCov_9fa48("459"), "numeric"),
        month: stryMutAct_9fa48("460") ? "" : (stryCov_9fa48("460"), "long"),
        day: stryMutAct_9fa48("461") ? "" : (stryCov_9fa48("461"), "numeric")
      })),
      ProjectName: stryMutAct_9fa48("464") ? (form.recordTitle || form.projectName) && "" : stryMutAct_9fa48("463") ? false : stryMutAct_9fa48("462") ? true : (stryCov_9fa48("462", "463", "464"), (stryMutAct_9fa48("466") ? form.recordTitle && form.projectName : stryMutAct_9fa48("465") ? false : (stryCov_9fa48("465", "466"), form.recordTitle || form.projectName)) || (stryMutAct_9fa48("467") ? "Stryker was here!" : (stryCov_9fa48("467"), ""))),
      BusinessPurpose: stryMutAct_9fa48("470") ? form.purpose && "" : stryMutAct_9fa48("469") ? false : stryMutAct_9fa48("468") ? true : (stryCov_9fa48("468", "469", "470"), form.purpose || (stryMutAct_9fa48("471") ? "Stryker was here!" : (stryCov_9fa48("471"), ""))),
      ConfidentialInformation: stryMutAct_9fa48("474") ? form.confidentialInformation && "business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential" : stryMutAct_9fa48("473") ? false : stryMutAct_9fa48("472") ? true : (stryCov_9fa48("472", "473", "474"), form.confidentialInformation || (stryMutAct_9fa48("475") ? "" : (stryCov_9fa48("475"), "business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential"))),
      Jurisdiction: stryMutAct_9fa48("478") ? form.jurisdiction && "Delaware, USA" : stryMutAct_9fa48("477") ? false : stryMutAct_9fa48("476") ? true : (stryCov_9fa48("476", "477", "478"), form.jurisdiction || (stryMutAct_9fa48("479") ? "" : (stryCov_9fa48("479"), "Delaware, USA"))),
      GoverningLaw: stryMutAct_9fa48("482") ? (form.governingLaw || form.jurisdiction) && "Delaware, USA" : stryMutAct_9fa48("481") ? false : stryMutAct_9fa48("480") ? true : (stryCov_9fa48("480", "481", "482"), (stryMutAct_9fa48("484") ? form.governingLaw && form.jurisdiction : stryMutAct_9fa48("483") ? false : (stryCov_9fa48("483", "484"), form.governingLaw || form.jurisdiction)) || (stryMutAct_9fa48("485") ? "" : (stryCov_9fa48("485"), "Delaware, USA"))),
      NDADuration: stryMutAct_9fa48("488") ? form.term && "two (2) years" : stryMutAct_9fa48("487") ? false : stryMutAct_9fa48("486") ? true : (stryCov_9fa48("486", "487", "488"), form.term || (stryMutAct_9fa48("489") ? "" : (stryCov_9fa48("489"), "two (2) years"))),
      SurvivalPeriod: stryMutAct_9fa48("492") ? form.survival && "three (3) years" : stryMutAct_9fa48("491") ? false : stryMutAct_9fa48("490") ? true : (stryCov_9fa48("490", "491", "492"), form.survival || (stryMutAct_9fa48("493") ? "" : (stryCov_9fa48("493"), "three (3) years"))),
      AuthorizedSignerName: stryMutAct_9fa48("496") ? (form.companySignerName || form.recordOwner) && "" : stryMutAct_9fa48("495") ? false : stryMutAct_9fa48("494") ? true : (stryCov_9fa48("494", "495", "496"), (stryMutAct_9fa48("498") ? form.companySignerName && form.recordOwner : stryMutAct_9fa48("497") ? false : (stryCov_9fa48("497", "498"), form.companySignerName || form.recordOwner)) || (stryMutAct_9fa48("499") ? "Stryker was here!" : (stryCov_9fa48("499"), ""))),
      AuthorizedSignerTitle: stryMutAct_9fa48("502") ? form.companySignerTitle && "Authorized Signatory" : stryMutAct_9fa48("501") ? false : stryMutAct_9fa48("500") ? true : (stryCov_9fa48("500", "501", "502"), form.companySignerTitle || (stryMutAct_9fa48("503") ? "" : (stryCov_9fa48("503"), "Authorized Signatory"))),
      CounterpartySignerName: stryMutAct_9fa48("506") ? (form.counterpartySignerName || form.counterpartyContact) && "" : stryMutAct_9fa48("505") ? false : stryMutAct_9fa48("504") ? true : (stryCov_9fa48("504", "505", "506"), (stryMutAct_9fa48("508") ? form.counterpartySignerName && form.counterpartyContact : stryMutAct_9fa48("507") ? false : (stryCov_9fa48("507", "508"), form.counterpartySignerName || form.counterpartyContact)) || (stryMutAct_9fa48("509") ? "Stryker was here!" : (stryCov_9fa48("509"), ""))),
      CounterpartySignerTitle: stryMutAct_9fa48("512") ? form.counterpartySignerTitle && "Authorized Signatory" : stryMutAct_9fa48("511") ? false : stryMutAct_9fa48("510") ? true : (stryCov_9fa48("510", "511", "512"), form.counterpartySignerTitle || (stryMutAct_9fa48("513") ? "" : (stryCov_9fa48("513"), "Authorized Signatory")))
    });
  }
}
function formatDate(d) {
  if (stryMutAct_9fa48("514")) {
    {}
  } else {
    stryCov_9fa48("514");
    try {
      if (stryMutAct_9fa48("515")) {
        {}
      } else {
        stryCov_9fa48("515");
        return new Date(d).toLocaleDateString(stryMutAct_9fa48("516") ? "" : (stryCov_9fa48("516"), "en-US"), stryMutAct_9fa48("517") ? {} : (stryCov_9fa48("517"), {
          year: stryMutAct_9fa48("518") ? "" : (stryCov_9fa48("518"), "numeric"),
          month: stryMutAct_9fa48("519") ? "" : (stryCov_9fa48("519"), "long"),
          day: stryMutAct_9fa48("520") ? "" : (stryCov_9fa48("520"), "numeric")
        }));
      }
    } catch {
      if (stryMutAct_9fa48("521")) {
        {}
      } else {
        stryCov_9fa48("521");
        return d;
      }
    }
  }
}

// Replace placeholders inside a single string.
// Empty / missing values are substituted with a blank legal-style line so the
// resulting document never shows raw `{{Token}}` tokens to a counterparty.
const BLANK_LINE = stryMutAct_9fa48("522") ? "" : (stryCov_9fa48("522"), "______________________");
export function applyPlaceholders(text, values) {
  if (stryMutAct_9fa48("523")) {
    {}
  } else {
    stryCov_9fa48("523");
    if (stryMutAct_9fa48("526") ? false : stryMutAct_9fa48("525") ? true : stryMutAct_9fa48("524") ? text : (stryCov_9fa48("524", "525", "526"), !text)) return text;
    return text.replace(PLACEHOLDER_REGEX, (_, key) => {
      if (stryMutAct_9fa48("527")) {
        {}
      } else {
        stryCov_9fa48("527");
        const v = values[key];
        if (stryMutAct_9fa48("530") ? v !== undefined && v !== null || String(v).trim() !== "" : stryMutAct_9fa48("529") ? false : stryMutAct_9fa48("528") ? true : (stryCov_9fa48("528", "529", "530"), (stryMutAct_9fa48("532") ? v !== undefined || v !== null : stryMutAct_9fa48("531") ? true : (stryCov_9fa48("531", "532"), (stryMutAct_9fa48("534") ? v === undefined : stryMutAct_9fa48("533") ? true : (stryCov_9fa48("533", "534"), v !== undefined)) && (stryMutAct_9fa48("536") ? v === null : stryMutAct_9fa48("535") ? true : (stryCov_9fa48("535", "536"), v !== null)))) && (stryMutAct_9fa48("538") ? String(v).trim() === "" : stryMutAct_9fa48("537") ? true : (stryCov_9fa48("537", "538"), (stryMutAct_9fa48("539") ? String(v) : (stryCov_9fa48("539"), String(v).trim())) !== (stryMutAct_9fa48("540") ? "Stryker was here!" : (stryCov_9fa48("540"), "")))))) {
          if (stryMutAct_9fa48("541")) {
            {}
          } else {
            stryCov_9fa48("541");
            return String(v);
          }
        }
        return BLANK_LINE;
      }
    });
  }
}

// Build a mapping summary for the UI: every placeholder used in template
// → label, source field, current value, status.
export function buildMappingSummary(template, values) {
  if (stryMutAct_9fa48("542")) {
    {}
  } else {
    stryCov_9fa48("542");
    const used = extractPlaceholders(template);
    return used.map(key => {
      if (stryMutAct_9fa48("543")) {
        {}
      } else {
        stryCov_9fa48("543");
        const def = PLACEHOLDER_DEFS.find(stryMutAct_9fa48("544") ? () => undefined : (stryCov_9fa48("544"), p => stryMutAct_9fa48("547") ? p.key !== key : stryMutAct_9fa48("546") ? false : stryMutAct_9fa48("545") ? true : (stryCov_9fa48("545", "546", "547"), p.key === key)));
        const value = values[key];
        const ready = stryMutAct_9fa48("550") ? !!value || String(value).trim().length > 0 : stryMutAct_9fa48("549") ? false : stryMutAct_9fa48("548") ? true : (stryCov_9fa48("548", "549", "550"), (stryMutAct_9fa48("551") ? !value : (stryCov_9fa48("551"), !(stryMutAct_9fa48("552") ? value : (stryCov_9fa48("552"), !value)))) && (stryMutAct_9fa48("555") ? String(value).trim().length <= 0 : stryMutAct_9fa48("554") ? String(value).trim().length >= 0 : stryMutAct_9fa48("553") ? true : (stryCov_9fa48("553", "554", "555"), (stryMutAct_9fa48("556") ? String(value).length : (stryCov_9fa48("556"), String(value).trim().length)) > 0)));
        return stryMutAct_9fa48("557") ? {} : (stryCov_9fa48("557"), {
          key,
          label: stryMutAct_9fa48("560") ? def?.label && key : stryMutAct_9fa48("559") ? false : stryMutAct_9fa48("558") ? true : (stryCov_9fa48("558", "559", "560"), (stryMutAct_9fa48("561") ? def.label : (stryCov_9fa48("561"), def?.label)) || key),
          source: stryMutAct_9fa48("564") ? def?.source && "—" : stryMutAct_9fa48("563") ? false : stryMutAct_9fa48("562") ? true : (stryCov_9fa48("562", "563", "564"), (stryMutAct_9fa48("565") ? def.source : (stryCov_9fa48("565"), def?.source)) || (stryMutAct_9fa48("566") ? "" : (stryCov_9fa48("566"), "—"))),
          required: stryMutAct_9fa48("567") ? def?.required && false : (stryCov_9fa48("567"), (stryMutAct_9fa48("568") ? def.required : (stryCov_9fa48("568"), def?.required)) ?? (stryMutAct_9fa48("569") ? true : (stryCov_9fa48("569"), false))),
          value: stryMutAct_9fa48("572") ? value && "" : stryMutAct_9fa48("571") ? false : stryMutAct_9fa48("570") ? true : (stryCov_9fa48("570", "571", "572"), value || (stryMutAct_9fa48("573") ? "Stryker was here!" : (stryCov_9fa48("573"), ""))),
          status: ready ? stryMutAct_9fa48("574") ? "" : (stryCov_9fa48("574"), "Ready") : (stryMutAct_9fa48("575") ? def.required : (stryCov_9fa48("575"), def?.required)) ? stryMutAct_9fa48("576") ? "" : (stryCov_9fa48("576"), "Missing") : stryMutAct_9fa48("577") ? "" : (stryCov_9fa48("577"), "Optional (blank)")
        });
      }
    });
  }
}
export function validatePlaceholders(template, values) {
  if (stryMutAct_9fa48("578")) {
    {}
  } else {
    stryCov_9fa48("578");
    const summary = buildMappingSummary(template, values);
    const missingRequired = stryMutAct_9fa48("579") ? summary : (stryCov_9fa48("579"), summary.filter(stryMutAct_9fa48("580") ? () => undefined : (stryCov_9fa48("580"), s => stryMutAct_9fa48("583") ? s.required || s.status === "Missing" : stryMutAct_9fa48("582") ? false : stryMutAct_9fa48("581") ? true : (stryCov_9fa48("581", "582", "583"), s.required && (stryMutAct_9fa48("585") ? s.status !== "Missing" : stryMutAct_9fa48("584") ? true : (stryCov_9fa48("584", "585"), s.status === (stryMutAct_9fa48("586") ? "" : (stryCov_9fa48("586"), "Missing"))))))));
    return stryMutAct_9fa48("587") ? {} : (stryCov_9fa48("587"), {
      summary,
      missingRequired,
      isValid: stryMutAct_9fa48("590") ? missingRequired.length !== 0 : stryMutAct_9fa48("589") ? false : stryMutAct_9fa48("588") ? true : (stryCov_9fa48("588", "589", "590"), missingRequired.length === 0)
    });
  }
}