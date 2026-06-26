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
const PLACEHOLDER_REGEX = stryMutAct_9fa48("693") ? /\{\{([^A-Za-z0-9_]+)\}\}/g : stryMutAct_9fa48("692") ? /\{\{([A-Za-z0-9_])\}\}/g : (stryCov_9fa48("692", "693"), /\{\{([A-Za-z0-9_]+)\}\}/g);
export function extractPlaceholders(template) {
  if (stryMutAct_9fa48("694")) {
    {}
  } else {
    stryCov_9fa48("694");
    if (stryMutAct_9fa48("697") ? false : stryMutAct_9fa48("696") ? true : stryMutAct_9fa48("695") ? template : (stryCov_9fa48("695", "696", "697"), !template)) return stryMutAct_9fa48("698") ? ["Stryker was here"] : (stryCov_9fa48("698"), []);
    const found = new Set();
    for (const block of template.content) {
      if (stryMutAct_9fa48("699")) {
        {}
      } else {
        stryCov_9fa48("699");
        if (stryMutAct_9fa48("701") ? false : stryMutAct_9fa48("700") ? true : (stryCov_9fa48("700", "701"), block.text)) {
          if (stryMutAct_9fa48("702")) {
            {}
          } else {
            stryCov_9fa48("702");
            let m;
            const re = new RegExp(PLACEHOLDER_REGEX.source, stryMutAct_9fa48("703") ? "" : (stryCov_9fa48("703"), "g"));
            while (stryMutAct_9fa48("705") ? (m = re.exec(block.text)) === null : stryMutAct_9fa48("704") ? false : (stryCov_9fa48("704", "705"), (m = re.exec(block.text)) !== null)) found.add(m[1]);
          }
        }
        if (stryMutAct_9fa48("707") ? false : stryMutAct_9fa48("706") ? true : (stryCov_9fa48("706", "707"), block.parties)) {
          if (stryMutAct_9fa48("708")) {
            {}
          } else {
            stryCov_9fa48("708");
            for (const p of block.parties) {
              if (stryMutAct_9fa48("709")) {
                {}
              } else {
                stryCov_9fa48("709");
                (stryMutAct_9fa48("710") ? [] : (stryCov_9fa48("710"), [stryMutAct_9fa48("711") ? "" : (stryCov_9fa48("711"), "party"), stryMutAct_9fa48("712") ? "" : (stryCov_9fa48("712"), "name"), stryMutAct_9fa48("713") ? "" : (stryCov_9fa48("713"), "title")])).forEach(k => {
                  if (stryMutAct_9fa48("714")) {
                    {}
                  } else {
                    stryCov_9fa48("714");
                    if (stryMutAct_9fa48("717") ? false : stryMutAct_9fa48("716") ? true : stryMutAct_9fa48("715") ? p[k] : (stryCov_9fa48("715", "716", "717"), !p[k])) return;
                    let m;
                    const re = new RegExp(PLACEHOLDER_REGEX.source, stryMutAct_9fa48("718") ? "" : (stryCov_9fa48("718"), "g"));
                    while (stryMutAct_9fa48("720") ? (m = re.exec(p[k])) === null : stryMutAct_9fa48("719") ? false : (stryCov_9fa48("719", "720"), (m = re.exec(p[k])) !== null)) found.add(m[1]);
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
  if (stryMutAct_9fa48("721")) {
    {}
  } else {
    stryCov_9fa48("721");
    const cp = stryMutAct_9fa48("724") ? form.counterpartyName && "" : stryMutAct_9fa48("723") ? false : stryMutAct_9fa48("722") ? true : (stryCov_9fa48("722", "723", "724"), form.counterpartyName || (stryMutAct_9fa48("725") ? "Stryker was here!" : (stryCov_9fa48("725"), "")));
    const company = stryMutAct_9fa48("728") ? form.companyName && "Contoso Corporation" : stryMutAct_9fa48("727") ? false : stryMutAct_9fa48("726") ? true : (stryCov_9fa48("726", "727", "728"), form.companyName || (stryMutAct_9fa48("729") ? "" : (stryCov_9fa48("729"), "Contoso Corporation")));
    return stryMutAct_9fa48("730") ? {} : (stryCov_9fa48("730"), {
      CompanyName: company,
      CompanyAddress: stryMutAct_9fa48("733") ? form.companyAddress && "1 Microsoft Way, Redmond, WA 98052, USA" : stryMutAct_9fa48("732") ? false : stryMutAct_9fa48("731") ? true : (stryCov_9fa48("731", "732", "733"), form.companyAddress || (stryMutAct_9fa48("734") ? "" : (stryCov_9fa48("734"), "1 Microsoft Way, Redmond, WA 98052, USA"))),
      CounterpartyName: cp,
      CounterpartyAddress: stryMutAct_9fa48("737") ? form.counterpartyAddress && "" : stryMutAct_9fa48("736") ? false : stryMutAct_9fa48("735") ? true : (stryCov_9fa48("735", "736", "737"), form.counterpartyAddress || (stryMutAct_9fa48("738") ? "Stryker was here!" : (stryCov_9fa48("738"), ""))),
      EmployeeName: stryMutAct_9fa48("741") ? form.employeeName && "" : stryMutAct_9fa48("740") ? false : stryMutAct_9fa48("739") ? true : (stryCov_9fa48("739", "740", "741"), form.employeeName || (stryMutAct_9fa48("742") ? "Stryker was here!" : (stryCov_9fa48("742"), ""))),
      EffectiveDate: form.effectiveDate ? formatDate(form.effectiveDate) : new Date().toLocaleDateString(stryMutAct_9fa48("743") ? "" : (stryCov_9fa48("743"), "en-US"), stryMutAct_9fa48("744") ? {} : (stryCov_9fa48("744"), {
        year: stryMutAct_9fa48("745") ? "" : (stryCov_9fa48("745"), "numeric"),
        month: stryMutAct_9fa48("746") ? "" : (stryCov_9fa48("746"), "long"),
        day: stryMutAct_9fa48("747") ? "" : (stryCov_9fa48("747"), "numeric")
      })),
      ProjectName: stryMutAct_9fa48("750") ? (form.recordTitle || form.projectName) && "" : stryMutAct_9fa48("749") ? false : stryMutAct_9fa48("748") ? true : (stryCov_9fa48("748", "749", "750"), (stryMutAct_9fa48("752") ? form.recordTitle && form.projectName : stryMutAct_9fa48("751") ? false : (stryCov_9fa48("751", "752"), form.recordTitle || form.projectName)) || (stryMutAct_9fa48("753") ? "Stryker was here!" : (stryCov_9fa48("753"), ""))),
      BusinessPurpose: stryMutAct_9fa48("756") ? form.purpose && "" : stryMutAct_9fa48("755") ? false : stryMutAct_9fa48("754") ? true : (stryCov_9fa48("754", "755", "756"), form.purpose || (stryMutAct_9fa48("757") ? "Stryker was here!" : (stryCov_9fa48("757"), ""))),
      ConfidentialInformation: stryMutAct_9fa48("760") ? form.confidentialInformation && "business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential" : stryMutAct_9fa48("759") ? false : stryMutAct_9fa48("758") ? true : (stryCov_9fa48("758", "759", "760"), form.confidentialInformation || (stryMutAct_9fa48("761") ? "" : (stryCov_9fa48("761"), "business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential"))),
      Jurisdiction: stryMutAct_9fa48("764") ? form.jurisdiction && "Delaware, USA" : stryMutAct_9fa48("763") ? false : stryMutAct_9fa48("762") ? true : (stryCov_9fa48("762", "763", "764"), form.jurisdiction || (stryMutAct_9fa48("765") ? "" : (stryCov_9fa48("765"), "Delaware, USA"))),
      GoverningLaw: stryMutAct_9fa48("768") ? (form.governingLaw || form.jurisdiction) && "Delaware, USA" : stryMutAct_9fa48("767") ? false : stryMutAct_9fa48("766") ? true : (stryCov_9fa48("766", "767", "768"), (stryMutAct_9fa48("770") ? form.governingLaw && form.jurisdiction : stryMutAct_9fa48("769") ? false : (stryCov_9fa48("769", "770"), form.governingLaw || form.jurisdiction)) || (stryMutAct_9fa48("771") ? "" : (stryCov_9fa48("771"), "Delaware, USA"))),
      NDADuration: stryMutAct_9fa48("774") ? form.term && "two (2) years" : stryMutAct_9fa48("773") ? false : stryMutAct_9fa48("772") ? true : (stryCov_9fa48("772", "773", "774"), form.term || (stryMutAct_9fa48("775") ? "" : (stryCov_9fa48("775"), "two (2) years"))),
      SurvivalPeriod: stryMutAct_9fa48("778") ? form.survival && "three (3) years" : stryMutAct_9fa48("777") ? false : stryMutAct_9fa48("776") ? true : (stryCov_9fa48("776", "777", "778"), form.survival || (stryMutAct_9fa48("779") ? "" : (stryCov_9fa48("779"), "three (3) years"))),
      AuthorizedSignerName: stryMutAct_9fa48("782") ? (form.companySignerName || form.recordOwner) && "" : stryMutAct_9fa48("781") ? false : stryMutAct_9fa48("780") ? true : (stryCov_9fa48("780", "781", "782"), (stryMutAct_9fa48("784") ? form.companySignerName && form.recordOwner : stryMutAct_9fa48("783") ? false : (stryCov_9fa48("783", "784"), form.companySignerName || form.recordOwner)) || (stryMutAct_9fa48("785") ? "Stryker was here!" : (stryCov_9fa48("785"), ""))),
      AuthorizedSignerTitle: stryMutAct_9fa48("788") ? form.companySignerTitle && "Authorized Signatory" : stryMutAct_9fa48("787") ? false : stryMutAct_9fa48("786") ? true : (stryCov_9fa48("786", "787", "788"), form.companySignerTitle || (stryMutAct_9fa48("789") ? "" : (stryCov_9fa48("789"), "Authorized Signatory"))),
      CounterpartySignerName: stryMutAct_9fa48("792") ? (form.counterpartySignerName || form.counterpartyContact) && "" : stryMutAct_9fa48("791") ? false : stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790", "791", "792"), (stryMutAct_9fa48("794") ? form.counterpartySignerName && form.counterpartyContact : stryMutAct_9fa48("793") ? false : (stryCov_9fa48("793", "794"), form.counterpartySignerName || form.counterpartyContact)) || (stryMutAct_9fa48("795") ? "Stryker was here!" : (stryCov_9fa48("795"), ""))),
      CounterpartySignerTitle: stryMutAct_9fa48("798") ? form.counterpartySignerTitle && "Authorized Signatory" : stryMutAct_9fa48("797") ? false : stryMutAct_9fa48("796") ? true : (stryCov_9fa48("796", "797", "798"), form.counterpartySignerTitle || (stryMutAct_9fa48("799") ? "" : (stryCov_9fa48("799"), "Authorized Signatory")))
    });
  }
}
function formatDate(d) {
  if (stryMutAct_9fa48("800")) {
    {}
  } else {
    stryCov_9fa48("800");
    try {
      if (stryMutAct_9fa48("801")) {
        {}
      } else {
        stryCov_9fa48("801");
        return new Date(d).toLocaleDateString(stryMutAct_9fa48("802") ? "" : (stryCov_9fa48("802"), "en-US"), stryMutAct_9fa48("803") ? {} : (stryCov_9fa48("803"), {
          year: stryMutAct_9fa48("804") ? "" : (stryCov_9fa48("804"), "numeric"),
          month: stryMutAct_9fa48("805") ? "" : (stryCov_9fa48("805"), "long"),
          day: stryMutAct_9fa48("806") ? "" : (stryCov_9fa48("806"), "numeric")
        }));
      }
    } catch {
      if (stryMutAct_9fa48("807")) {
        {}
      } else {
        stryCov_9fa48("807");
        return d;
      }
    }
  }
}

// Replace placeholders inside a single string.
// Empty / missing values are substituted with a blank legal-style line so the
// resulting document never shows raw `{{Token}}` tokens to a counterparty.
const BLANK_LINE = stryMutAct_9fa48("808") ? "" : (stryCov_9fa48("808"), "______________________");
export function applyPlaceholders(text, values) {
  if (stryMutAct_9fa48("809")) {
    {}
  } else {
    stryCov_9fa48("809");
    if (stryMutAct_9fa48("812") ? false : stryMutAct_9fa48("811") ? true : stryMutAct_9fa48("810") ? text : (stryCov_9fa48("810", "811", "812"), !text)) return text;
    return text.replace(PLACEHOLDER_REGEX, (_, key) => {
      if (stryMutAct_9fa48("813")) {
        {}
      } else {
        stryCov_9fa48("813");
        const v = values[key];
        if (stryMutAct_9fa48("816") ? v !== undefined && v !== null || String(v).trim() !== "" : stryMutAct_9fa48("815") ? false : stryMutAct_9fa48("814") ? true : (stryCov_9fa48("814", "815", "816"), (stryMutAct_9fa48("818") ? v !== undefined || v !== null : stryMutAct_9fa48("817") ? true : (stryCov_9fa48("817", "818"), (stryMutAct_9fa48("820") ? v === undefined : stryMutAct_9fa48("819") ? true : (stryCov_9fa48("819", "820"), v !== undefined)) && (stryMutAct_9fa48("822") ? v === null : stryMutAct_9fa48("821") ? true : (stryCov_9fa48("821", "822"), v !== null)))) && (stryMutAct_9fa48("824") ? String(v).trim() === "" : stryMutAct_9fa48("823") ? true : (stryCov_9fa48("823", "824"), (stryMutAct_9fa48("825") ? String(v) : (stryCov_9fa48("825"), String(v).trim())) !== (stryMutAct_9fa48("826") ? "Stryker was here!" : (stryCov_9fa48("826"), "")))))) {
          if (stryMutAct_9fa48("827")) {
            {}
          } else {
            stryCov_9fa48("827");
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
  if (stryMutAct_9fa48("828")) {
    {}
  } else {
    stryCov_9fa48("828");
    const used = extractPlaceholders(template);
    return used.map(key => {
      if (stryMutAct_9fa48("829")) {
        {}
      } else {
        stryCov_9fa48("829");
        const def = PLACEHOLDER_DEFS.find(stryMutAct_9fa48("830") ? () => undefined : (stryCov_9fa48("830"), p => stryMutAct_9fa48("833") ? p.key !== key : stryMutAct_9fa48("832") ? false : stryMutAct_9fa48("831") ? true : (stryCov_9fa48("831", "832", "833"), p.key === key)));
        const value = values[key];
        const ready = stryMutAct_9fa48("836") ? !!value || String(value).trim().length > 0 : stryMutAct_9fa48("835") ? false : stryMutAct_9fa48("834") ? true : (stryCov_9fa48("834", "835", "836"), (stryMutAct_9fa48("837") ? !value : (stryCov_9fa48("837"), !(stryMutAct_9fa48("838") ? value : (stryCov_9fa48("838"), !value)))) && (stryMutAct_9fa48("841") ? String(value).trim().length <= 0 : stryMutAct_9fa48("840") ? String(value).trim().length >= 0 : stryMutAct_9fa48("839") ? true : (stryCov_9fa48("839", "840", "841"), (stryMutAct_9fa48("842") ? String(value).length : (stryCov_9fa48("842"), String(value).trim().length)) > 0)));
        return stryMutAct_9fa48("843") ? {} : (stryCov_9fa48("843"), {
          key,
          label: stryMutAct_9fa48("846") ? def?.label && key : stryMutAct_9fa48("845") ? false : stryMutAct_9fa48("844") ? true : (stryCov_9fa48("844", "845", "846"), (stryMutAct_9fa48("847") ? def.label : (stryCov_9fa48("847"), def?.label)) || key),
          source: stryMutAct_9fa48("850") ? def?.source && "—" : stryMutAct_9fa48("849") ? false : stryMutAct_9fa48("848") ? true : (stryCov_9fa48("848", "849", "850"), (stryMutAct_9fa48("851") ? def.source : (stryCov_9fa48("851"), def?.source)) || (stryMutAct_9fa48("852") ? "" : (stryCov_9fa48("852"), "—"))),
          required: stryMutAct_9fa48("853") ? def?.required && false : (stryCov_9fa48("853"), (stryMutAct_9fa48("854") ? def.required : (stryCov_9fa48("854"), def?.required)) ?? (stryMutAct_9fa48("855") ? true : (stryCov_9fa48("855"), false))),
          value: stryMutAct_9fa48("858") ? value && "" : stryMutAct_9fa48("857") ? false : stryMutAct_9fa48("856") ? true : (stryCov_9fa48("856", "857", "858"), value || (stryMutAct_9fa48("859") ? "Stryker was here!" : (stryCov_9fa48("859"), ""))),
          status: ready ? stryMutAct_9fa48("860") ? "" : (stryCov_9fa48("860"), "Ready") : (stryMutAct_9fa48("861") ? def.required : (stryCov_9fa48("861"), def?.required)) ? stryMutAct_9fa48("862") ? "" : (stryCov_9fa48("862"), "Missing") : stryMutAct_9fa48("863") ? "" : (stryCov_9fa48("863"), "Optional (blank)")
        });
      }
    });
  }
}
export function validatePlaceholders(template, values) {
  if (stryMutAct_9fa48("864")) {
    {}
  } else {
    stryCov_9fa48("864");
    const summary = buildMappingSummary(template, values);
    const missingRequired = stryMutAct_9fa48("865") ? summary : (stryCov_9fa48("865"), summary.filter(stryMutAct_9fa48("866") ? () => undefined : (stryCov_9fa48("866"), s => stryMutAct_9fa48("869") ? s.required || s.status === "Missing" : stryMutAct_9fa48("868") ? false : stryMutAct_9fa48("867") ? true : (stryCov_9fa48("867", "868", "869"), s.required && (stryMutAct_9fa48("871") ? s.status !== "Missing" : stryMutAct_9fa48("870") ? true : (stryCov_9fa48("870", "871"), s.status === (stryMutAct_9fa48("872") ? "" : (stryCov_9fa48("872"), "Missing"))))))));
    return stryMutAct_9fa48("873") ? {} : (stryCov_9fa48("873"), {
      summary,
      missingRequired,
      isValid: stryMutAct_9fa48("876") ? missingRequired.length !== 0 : stryMutAct_9fa48("875") ? false : stryMutAct_9fa48("874") ? true : (stryCov_9fa48("874", "875", "876"), missingRequired.length === 0)
    });
  }
}