// @ts-nocheck
// Request + task store backed by localStorage. Demo persistence.
// Provides the full status workflow + automatic task creation.
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
import { logAuditEvent } from "./auditTrail";
const REQ_KEY = stryMutAct_9fa48("877") ? "" : (stryCov_9fa48("877"), "ndaflow.requests.v2");
const TASK_KEY = stryMutAct_9fa48("878") ? "" : (stryCov_9fa48("878"), "ndaflow.tasks.v1");

// ---- canonical record types (CLM use cases) ----
export const RECORD_TYPES = stryMutAct_9fa48("879") ? [] : (stryCov_9fa48("879"), [stryMutAct_9fa48("880") ? "" : (stryCov_9fa48("880"), "Non-Disclosure Agreement (NDA)"), stryMutAct_9fa48("881") ? "" : (stryCov_9fa48("881"), "Master Service Agreement (MSA)"), stryMutAct_9fa48("882") ? "" : (stryCov_9fa48("882"), "Statement of Work (SOW)"), stryMutAct_9fa48("883") ? "" : (stryCov_9fa48("883"), "Vendor Agreement"), stryMutAct_9fa48("884") ? "" : (stryCov_9fa48("884"), "Supply Agreement"), stryMutAct_9fa48("885") ? "" : (stryCov_9fa48("885"), "Warehousing Services (3PL)"), stryMutAct_9fa48("886") ? "" : (stryCov_9fa48("886"), "Licensing Agreement"), stryMutAct_9fa48("887") ? "" : (stryCov_9fa48("887"), "Employment Contract"), stryMutAct_9fa48("888") ? "" : (stryCov_9fa48("888"), "Other")]);

// ---- canonical statuses (the only 5 we use) ----
export const STATUSES = stryMutAct_9fa48("889") ? [] : (stryCov_9fa48("889"), [stryMutAct_9fa48("890") ? "" : (stryCov_9fa48("890"), "In Review"), stryMutAct_9fa48("891") ? "" : (stryCov_9fa48("891"), "Approved"), stryMutAct_9fa48("892") ? "" : (stryCov_9fa48("892"), "Awaiting Signature"), stryMutAct_9fa48("893") ? "" : (stryCov_9fa48("893"), "Signed"), stryMutAct_9fa48("894") ? "" : (stryCov_9fa48("894"), "Archived")]);

// Map any legacy/alternate status to one of the 5 canonical statuses
export function normalizeStatus(s) {
  if (stryMutAct_9fa48("895")) {
    {}
  } else {
    stryCov_9fa48("895");
    switch (s) {
      case stryMutAct_9fa48("896") ? "" : (stryCov_9fa48("896"), "Draft"):
      case stryMutAct_9fa48("897") ? "" : (stryCov_9fa48("897"), "Submitted"):
      case stryMutAct_9fa48("898") ? "" : (stryCov_9fa48("898"), "Legal Review"):
      case stryMutAct_9fa48("899") ? "" : (stryCov_9fa48("899"), "Privacy Review"):
      case stryMutAct_9fa48("901") ? "" : (stryCov_9fa48("901"), "Priority"):
        if (stryMutAct_9fa48("900")) {} else {
          stryCov_9fa48("900");
          return stryMutAct_9fa48("902") ? "" : (stryCov_9fa48("902"), "In Review");
        }
      case stryMutAct_9fa48("903") ? "" : (stryCov_9fa48("903"), "Rejected"):
      case stryMutAct_9fa48("905") ? "" : (stryCov_9fa48("905"), "Cancelled"):
        if (stryMutAct_9fa48("904")) {} else {
          stryCov_9fa48("904");
          return stryMutAct_9fa48("906") ? "" : (stryCov_9fa48("906"), "Archived");
        }
      case stryMutAct_9fa48("907") ? "" : (stryCov_9fa48("907"), "In Review"):
      case stryMutAct_9fa48("908") ? "" : (stryCov_9fa48("908"), "Approved"):
      case stryMutAct_9fa48("909") ? "" : (stryCov_9fa48("909"), "Awaiting Signature"):
      case stryMutAct_9fa48("910") ? "" : (stryCov_9fa48("910"), "Signed"):
      case stryMutAct_9fa48("912") ? "" : (stryCov_9fa48("912"), "Archived"):
        if (stryMutAct_9fa48("911")) {} else {
          stryCov_9fa48("911");
          return s;
        }
      default:
        if (stryMutAct_9fa48("913")) {} else {
          stryCov_9fa48("913");
          return stryMutAct_9fa48("916") ? s && "In Review" : stryMutAct_9fa48("915") ? false : stryMutAct_9fa48("914") ? true : (stryCov_9fa48("914", "915", "916"), s || (stryMutAct_9fa48("917") ? "" : (stryCov_9fa48("917"), "In Review")));
        }
    }
  }
}
export const TASK_TYPES = stryMutAct_9fa48("918") ? [] : (stryCov_9fa48("918"), [stryMutAct_9fa48("919") ? "" : (stryCov_9fa48("919"), "Legal Review"), stryMutAct_9fa48("920") ? "" : (stryCov_9fa48("920"), "Privacy Review"), stryMutAct_9fa48("921") ? "" : (stryCov_9fa48("921"), "Business Approval"), stryMutAct_9fa48("922") ? "" : (stryCov_9fa48("922"), "Signature"), stryMutAct_9fa48("923") ? "" : (stryCov_9fa48("923"), "Document Correction"), stryMutAct_9fa48("924") ? "" : (stryCov_9fa48("924"), "Missing Information"), stryMutAct_9fa48("925") ? "" : (stryCov_9fa48("925"), "Renewal Reminder")]);
export const TASK_STATUSES = stryMutAct_9fa48("926") ? [] : (stryCov_9fa48("926"), [stryMutAct_9fa48("927") ? "" : (stryCov_9fa48("927"), "Open"), stryMutAct_9fa48("928") ? "" : (stryCov_9fa48("928"), "In Progress"), stryMutAct_9fa48("929") ? "" : (stryCov_9fa48("929"), "Completed"), stryMutAct_9fa48("930") ? "" : (stryCov_9fa48("930"), "Rejected"), stryMutAct_9fa48("931") ? "" : (stryCov_9fa48("931"), "Cancelled"), stryMutAct_9fa48("932") ? "" : (stryCov_9fa48("932"), "Overdue")]);

// ---- storage helpers ----
function read(key, fallback) {
  if (stryMutAct_9fa48("933")) {
    {}
  } else {
    stryCov_9fa48("933");
    if (stryMutAct_9fa48("936") ? typeof window !== "undefined" : stryMutAct_9fa48("935") ? false : stryMutAct_9fa48("934") ? true : (stryCov_9fa48("934", "935", "936"), typeof window === (stryMutAct_9fa48("937") ? "" : (stryCov_9fa48("937"), "undefined")))) return fallback;
    try {
      if (stryMutAct_9fa48("938")) {
        {}
      } else {
        stryCov_9fa48("938");
        const raw = window.localStorage.getItem(key);
        if (stryMutAct_9fa48("941") ? false : stryMutAct_9fa48("940") ? true : stryMutAct_9fa48("939") ? raw : (stryCov_9fa48("939", "940", "941"), !raw)) return fallback;
        return JSON.parse(raw);
      }
    } catch {
      if (stryMutAct_9fa48("942")) {
        {}
      } else {
        stryCov_9fa48("942");
        return fallback;
      }
    }
  }
}
function write(key, value) {
  if (stryMutAct_9fa48("943")) {
    {}
  } else {
    stryCov_9fa48("943");
    if (stryMutAct_9fa48("946") ? typeof window !== "undefined" : stryMutAct_9fa48("945") ? false : stryMutAct_9fa48("944") ? true : (stryCov_9fa48("944", "945", "946"), typeof window === (stryMutAct_9fa48("947") ? "" : (stryCov_9fa48("947"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("948")) {
        {}
      } else {
        stryCov_9fa48("948");
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {}
  }
}

// ---- seed data (only used if storage empty) ----
const seedRequests = stryMutAct_9fa48("949") ? [] : (stryCov_9fa48("949"), [stryMutAct_9fa48("950") ? {} : (stryCov_9fa48("950"), {
  id: stryMutAct_9fa48("951") ? "" : (stryCov_9fa48("951"), "NDA-2041"),
  title: stryMutAct_9fa48("952") ? "" : (stryCov_9fa48("952"), "Acme Robotics — Joint R&D"),
  recordType: stryMutAct_9fa48("953") ? "" : (stryCov_9fa48("953"), "Non-Disclosure Agreement (NDA)"),
  type: stryMutAct_9fa48("954") ? "" : (stryCov_9fa48("954"), "Mutual"),
  risk: stryMutAct_9fa48("955") ? "" : (stryCov_9fa48("955"), "Medium"),
  status: stryMutAct_9fa48("956") ? "" : (stryCov_9fa48("956"), "In Review"),
  owner: stryMutAct_9fa48("957") ? "" : (stryCov_9fa48("957"), "Sara Patel"),
  counterparty: stryMutAct_9fa48("958") ? "" : (stryCov_9fa48("958"), "Acme Robotics Inc."),
  templateId: stryMutAct_9fa48("959") ? "" : (stryCov_9fa48("959"), "tpl-mutual"),
  createdAt: stryMutAct_9fa48("960") ? Date.now() + 1000 * 60 * 60 * 26 : (stryCov_9fa48("960"), Date.now() - (stryMutAct_9fa48("961") ? 1000 * 60 * 60 / 26 : (stryCov_9fa48("961"), (stryMutAct_9fa48("962") ? 1000 * 60 / 60 : (stryCov_9fa48("962"), (stryMutAct_9fa48("963") ? 1000 / 60 : (stryCov_9fa48("963"), 1000 * 60)) * 60)) * 26))),
  updatedAt: stryMutAct_9fa48("964") ? Date.now() + 1000 * 60 * 60 * 2 : (stryCov_9fa48("964"), Date.now() - (stryMutAct_9fa48("965") ? 1000 * 60 * 60 / 2 : (stryCov_9fa48("965"), (stryMutAct_9fa48("966") ? 1000 * 60 / 60 : (stryCov_9fa48("966"), (stryMutAct_9fa48("967") ? 1000 / 60 : (stryCov_9fa48("967"), 1000 * 60)) * 60)) * 2))),
  riskScore: 58,
  workflowSteps: 4,
  form: stryMutAct_9fa48("968") ? {} : (stryCov_9fa48("968"), {
    counterpartyId: stryMutAct_9fa48("969") ? "" : (stryCov_9fa48("969"), "acme"),
    counterpartyName: stryMutAct_9fa48("970") ? "" : (stryCov_9fa48("970"), "Acme Robotics Inc."),
    counterpartyAddress: stryMutAct_9fa48("971") ? "" : (stryCov_9fa48("971"), "500 Innovation Way, San Jose, CA 95110, USA"),
    counterpartyContact: stryMutAct_9fa48("972") ? "" : (stryCov_9fa48("972"), "Daniel Reeves"),
    counterpartyEmail: stryMutAct_9fa48("973") ? "" : (stryCov_9fa48("973"), "d.reeves@acmerobotics.com"),
    counterpartyCountry: stryMutAct_9fa48("974") ? "" : (stryCov_9fa48("974"), "United States"),
    counterpartySignerName: stryMutAct_9fa48("975") ? "" : (stryCov_9fa48("975"), "Daniel Reeves"),
    counterpartySignerTitle: stryMutAct_9fa48("976") ? "" : (stryCov_9fa48("976"), "Chief Technology Officer"),
    companyName: stryMutAct_9fa48("977") ? "" : (stryCov_9fa48("977"), "Contoso Corporation"),
    companyAddress: stryMutAct_9fa48("978") ? "" : (stryCov_9fa48("978"), "1 Microsoft Way, Redmond, WA 98052, USA"),
    companySignerName: stryMutAct_9fa48("979") ? "" : (stryCov_9fa48("979"), "Sara Patel"),
    companySignerTitle: stryMutAct_9fa48("980") ? "" : (stryCov_9fa48("980"), "VP, Legal"),
    recordTitle: stryMutAct_9fa48("981") ? "" : (stryCov_9fa48("981"), "Acme Robotics — Joint R&D"),
    recordOwner: stryMutAct_9fa48("982") ? "" : (stryCov_9fa48("982"), "Sara Patel"),
    businessUnit: stryMutAct_9fa48("983") ? "" : (stryCov_9fa48("983"), "Corporate Development"),
    purpose: stryMutAct_9fa48("984") ? "" : (stryCov_9fa48("984"), "Joint research and development collaboration on autonomous robotics platforms."),
    confidentialInformation: stryMutAct_9fa48("985") ? "" : (stryCov_9fa48("985"), "Source code, hardware schematics, sensor calibration data, roadmap."),
    effectiveDate: stryMutAct_9fa48("986") ? "" : (stryCov_9fa48("986"), "2026-04-01"),
    term: stryMutAct_9fa48("987") ? "" : (stryCov_9fa48("987"), "two (2) years"),
    survival: stryMutAct_9fa48("988") ? "" : (stryCov_9fa48("988"), "three (3) years"),
    templateId: stryMutAct_9fa48("989") ? "" : (stryCov_9fa48("989"), "tpl-mutual"),
    jurisdiction: stryMutAct_9fa48("990") ? "" : (stryCov_9fa48("990"), "Delaware, USA"),
    governingLaw: stryMutAct_9fa48("991") ? "" : (stryCov_9fa48("991"), "Delaware, USA"),
    direction: stryMutAct_9fa48("992") ? "" : (stryCov_9fa48("992"), "mutual"),
    type: stryMutAct_9fa48("993") ? "" : (stryCov_9fa48("993"), "mutual")
  })
}), stryMutAct_9fa48("994") ? {} : (stryCov_9fa48("994"), {
  id: stryMutAct_9fa48("995") ? "" : (stryCov_9fa48("995"), "NDA-2040"),
  title: stryMutAct_9fa48("996") ? "" : (stryCov_9fa48("996"), "Northwind Pharma — Clinical Data"),
  recordType: stryMutAct_9fa48("997") ? "" : (stryCov_9fa48("997"), "Non-Disclosure Agreement (NDA)"),
  type: stryMutAct_9fa48("998") ? "" : (stryCov_9fa48("998"), "One-Way In"),
  risk: stryMutAct_9fa48("999") ? "" : (stryCov_9fa48("999"), "High"),
  status: stryMutAct_9fa48("1000") ? "" : (stryCov_9fa48("1000"), "Awaiting Signature"),
  owner: stryMutAct_9fa48("1001") ? "" : (stryCov_9fa48("1001"), "Jordan Nguyen"),
  counterparty: stryMutAct_9fa48("1002") ? "" : (stryCov_9fa48("1002"), "Northwind Pharma"),
  templateId: stryMutAct_9fa48("1003") ? "" : (stryCov_9fa48("1003"), "tpl-international"),
  createdAt: stryMutAct_9fa48("1004") ? Date.now() + 1000 * 60 * 60 * 50 : (stryCov_9fa48("1004"), Date.now() - (stryMutAct_9fa48("1005") ? 1000 * 60 * 60 / 50 : (stryCov_9fa48("1005"), (stryMutAct_9fa48("1006") ? 1000 * 60 / 60 : (stryCov_9fa48("1006"), (stryMutAct_9fa48("1007") ? 1000 / 60 : (stryCov_9fa48("1007"), 1000 * 60)) * 60)) * 50))),
  updatedAt: stryMutAct_9fa48("1008") ? Date.now() + 1000 * 60 * 60 * 4 : (stryCov_9fa48("1008"), Date.now() - (stryMutAct_9fa48("1009") ? 1000 * 60 * 60 / 4 : (stryCov_9fa48("1009"), (stryMutAct_9fa48("1010") ? 1000 * 60 / 60 : (stryCov_9fa48("1010"), (stryMutAct_9fa48("1011") ? 1000 / 60 : (stryCov_9fa48("1011"), 1000 * 60)) * 60)) * 4))),
  riskScore: 82,
  workflowSteps: 5,
  form: stryMutAct_9fa48("1012") ? {} : (stryCov_9fa48("1012"), {
    counterpartyId: stryMutAct_9fa48("1013") ? "" : (stryCov_9fa48("1013"), "northwind"),
    counterpartyName: stryMutAct_9fa48("1014") ? "" : (stryCov_9fa48("1014"), "Northwind Pharma"),
    counterpartyAddress: stryMutAct_9fa48("1015") ? "" : (stryCov_9fa48("1015"), "22 Harbor Drive, Boston, MA 02110, USA"),
    counterpartyContact: stryMutAct_9fa48("1016") ? "" : (stryCov_9fa48("1016"), "Dr. Anika Shah"),
    counterpartyEmail: stryMutAct_9fa48("1017") ? "" : (stryCov_9fa48("1017"), "a.shah@northwindpharma.com"),
    counterpartyCountry: stryMutAct_9fa48("1018") ? "" : (stryCov_9fa48("1018"), "United States"),
    counterpartySignerName: stryMutAct_9fa48("1019") ? "" : (stryCov_9fa48("1019"), "Dr. Anika Shah"),
    counterpartySignerTitle: stryMutAct_9fa48("1020") ? "" : (stryCov_9fa48("1020"), "VP, Clinical Development"),
    companyName: stryMutAct_9fa48("1021") ? "" : (stryCov_9fa48("1021"), "Contoso Corporation"),
    companyAddress: stryMutAct_9fa48("1022") ? "" : (stryCov_9fa48("1022"), "1 Microsoft Way, Redmond, WA 98052, USA"),
    companySignerName: stryMutAct_9fa48("1023") ? "" : (stryCov_9fa48("1023"), "Jordan Nguyen"),
    companySignerTitle: stryMutAct_9fa48("1024") ? "" : (stryCov_9fa48("1024"), "Privacy Counsel"),
    recordTitle: stryMutAct_9fa48("1025") ? "" : (stryCov_9fa48("1025"), "Northwind Pharma — Clinical Data"),
    recordOwner: stryMutAct_9fa48("1026") ? "" : (stryCov_9fa48("1026"), "Jordan Nguyen"),
    businessUnit: stryMutAct_9fa48("1027") ? "" : (stryCov_9fa48("1027"), "Life Sciences"),
    purpose: stryMutAct_9fa48("1028") ? "" : (stryCov_9fa48("1028"), "Evaluation of de-identified clinical trial datasets for analytics partnership."),
    confidentialInformation: stryMutAct_9fa48("1029") ? "" : (stryCov_9fa48("1029"), "Patient cohort statistics, trial protocols, biomarker results."),
    effectiveDate: stryMutAct_9fa48("1030") ? "" : (stryCov_9fa48("1030"), "2026-03-15"),
    term: stryMutAct_9fa48("1031") ? "" : (stryCov_9fa48("1031"), "three (3) years"),
    survival: stryMutAct_9fa48("1032") ? "" : (stryCov_9fa48("1032"), "five (5) years"),
    templateId: stryMutAct_9fa48("1033") ? "" : (stryCov_9fa48("1033"), "tpl-international"),
    jurisdiction: stryMutAct_9fa48("1034") ? "" : (stryCov_9fa48("1034"), "New York, USA"),
    governingLaw: stryMutAct_9fa48("1035") ? "" : (stryCov_9fa48("1035"), "New York, USA"),
    direction: stryMutAct_9fa48("1036") ? "" : (stryCov_9fa48("1036"), "incoming"),
    type: stryMutAct_9fa48("1037") ? "" : (stryCov_9fa48("1037"), "oneway-incoming")
  })
}), stryMutAct_9fa48("1038") ? {} : (stryCov_9fa48("1038"), {
  id: stryMutAct_9fa48("1039") ? "" : (stryCov_9fa48("1039"), "NDA-2039"),
  title: stryMutAct_9fa48("1040") ? "" : (stryCov_9fa48("1040"), "Hooli Cloud — Hosting Eval"),
  recordType: stryMutAct_9fa48("1041") ? "" : (stryCov_9fa48("1041"), "Vendor Agreement"),
  type: stryMutAct_9fa48("1042") ? "" : (stryCov_9fa48("1042"), "Vendor"),
  risk: stryMutAct_9fa48("1043") ? "" : (stryCov_9fa48("1043"), "Low"),
  status: stryMutAct_9fa48("1044") ? "" : (stryCov_9fa48("1044"), "Approved"),
  owner: stryMutAct_9fa48("1045") ? "" : (stryCov_9fa48("1045"), "Maya Davis"),
  counterparty: stryMutAct_9fa48("1046") ? "" : (stryCov_9fa48("1046"), "Hooli Cloud"),
  templateId: stryMutAct_9fa48("1047") ? "" : (stryCov_9fa48("1047"), "tpl-vendor"),
  createdAt: stryMutAct_9fa48("1048") ? Date.now() + 1000 * 60 * 60 * 80 : (stryCov_9fa48("1048"), Date.now() - (stryMutAct_9fa48("1049") ? 1000 * 60 * 60 / 80 : (stryCov_9fa48("1049"), (stryMutAct_9fa48("1050") ? 1000 * 60 / 60 : (stryCov_9fa48("1050"), (stryMutAct_9fa48("1051") ? 1000 / 60 : (stryCov_9fa48("1051"), 1000 * 60)) * 60)) * 80))),
  updatedAt: stryMutAct_9fa48("1052") ? Date.now() + 1000 * 60 * 60 * 24 : (stryCov_9fa48("1052"), Date.now() - (stryMutAct_9fa48("1053") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("1053"), (stryMutAct_9fa48("1054") ? 1000 * 60 / 60 : (stryCov_9fa48("1054"), (stryMutAct_9fa48("1055") ? 1000 / 60 : (stryCov_9fa48("1055"), 1000 * 60)) * 60)) * 24))),
  riskScore: 28,
  workflowSteps: 2,
  form: stryMutAct_9fa48("1056") ? {} : (stryCov_9fa48("1056"), {
    counterpartyId: stryMutAct_9fa48("1057") ? "" : (stryCov_9fa48("1057"), "hooli"),
    counterpartyName: stryMutAct_9fa48("1058") ? "" : (stryCov_9fa48("1058"), "Hooli Cloud"),
    counterpartyAddress: stryMutAct_9fa48("1059") ? "" : (stryCov_9fa48("1059"), "1 Hooli Plaza, Palo Alto, CA 94301, USA"),
    counterpartyContact: stryMutAct_9fa48("1060") ? "" : (stryCov_9fa48("1060"), "Marcus Bell"),
    counterpartyEmail: stryMutAct_9fa48("1061") ? "" : (stryCov_9fa48("1061"), "marcus.bell@hooli.com"),
    counterpartyCountry: stryMutAct_9fa48("1062") ? "" : (stryCov_9fa48("1062"), "United States"),
    counterpartySignerName: stryMutAct_9fa48("1063") ? "" : (stryCov_9fa48("1063"), "Marcus Bell"),
    counterpartySignerTitle: stryMutAct_9fa48("1064") ? "" : (stryCov_9fa48("1064"), "Director, Strategic Partnerships"),
    companyName: stryMutAct_9fa48("1065") ? "" : (stryCov_9fa48("1065"), "Contoso Corporation"),
    companyAddress: stryMutAct_9fa48("1066") ? "" : (stryCov_9fa48("1066"), "1 Microsoft Way, Redmond, WA 98052, USA"),
    companySignerName: stryMutAct_9fa48("1067") ? "" : (stryCov_9fa48("1067"), "Maya Davis"),
    companySignerTitle: stryMutAct_9fa48("1068") ? "" : (stryCov_9fa48("1068"), "Procurement Manager"),
    recordTitle: stryMutAct_9fa48("1069") ? "" : (stryCov_9fa48("1069"), "Hooli Cloud — Hosting Eval"),
    recordOwner: stryMutAct_9fa48("1070") ? "" : (stryCov_9fa48("1070"), "Maya Davis"),
    businessUnit: stryMutAct_9fa48("1071") ? "" : (stryCov_9fa48("1071"), "IT Operations"),
    purpose: stryMutAct_9fa48("1072") ? "" : (stryCov_9fa48("1072"), "Evaluate Hooli Cloud hosting services for production workloads."),
    confidentialInformation: stryMutAct_9fa48("1073") ? "" : (stryCov_9fa48("1073"), "Architecture diagrams, traffic forecasts, pricing terms."),
    effectiveDate: stryMutAct_9fa48("1074") ? "" : (stryCov_9fa48("1074"), "2026-02-10"),
    term: stryMutAct_9fa48("1075") ? "" : (stryCov_9fa48("1075"), "one (1) year"),
    survival: stryMutAct_9fa48("1076") ? "" : (stryCov_9fa48("1076"), "two (2) years"),
    templateId: stryMutAct_9fa48("1077") ? "" : (stryCov_9fa48("1077"), "tpl-vendor"),
    jurisdiction: stryMutAct_9fa48("1078") ? "" : (stryCov_9fa48("1078"), "California, USA"),
    governingLaw: stryMutAct_9fa48("1079") ? "" : (stryCov_9fa48("1079"), "California, USA"),
    direction: stryMutAct_9fa48("1080") ? "" : (stryCov_9fa48("1080"), "mutual"),
    type: stryMutAct_9fa48("1081") ? "" : (stryCov_9fa48("1081"), "vendor")
  })
}), stryMutAct_9fa48("1082") ? {} : (stryCov_9fa48("1082"), {
  id: stryMutAct_9fa48("1083") ? "" : (stryCov_9fa48("1083"), "NDA-2038"),
  title: stryMutAct_9fa48("1084") ? "" : (stryCov_9fa48("1084"), "Wayne Ent. — JV Exploration"),
  recordType: stryMutAct_9fa48("1085") ? "" : (stryCov_9fa48("1085"), "Master Service Agreement (MSA)"),
  type: stryMutAct_9fa48("1086") ? "" : (stryCov_9fa48("1086"), "M&A"),
  risk: stryMutAct_9fa48("1087") ? "" : (stryCov_9fa48("1087"), "High"),
  status: stryMutAct_9fa48("1088") ? "" : (stryCov_9fa48("1088"), "In Review"),
  owner: stryMutAct_9fa48("1089") ? "" : (stryCov_9fa48("1089"), "Alex Kim"),
  counterparty: stryMutAct_9fa48("1090") ? "" : (stryCov_9fa48("1090"), "Wayne Enterprises"),
  templateId: stryMutAct_9fa48("1091") ? "" : (stryCov_9fa48("1091"), "tpl-international"),
  createdAt: stryMutAct_9fa48("1092") ? Date.now() + 1000 * 60 * 60 * 60 : (stryCov_9fa48("1092"), Date.now() - (stryMutAct_9fa48("1093") ? 1000 * 60 * 60 / 60 : (stryCov_9fa48("1093"), (stryMutAct_9fa48("1094") ? 1000 * 60 / 60 : (stryCov_9fa48("1094"), (stryMutAct_9fa48("1095") ? 1000 / 60 : (stryCov_9fa48("1095"), 1000 * 60)) * 60)) * 60))),
  updatedAt: stryMutAct_9fa48("1096") ? Date.now() + 1000 * 60 * 60 * 24 : (stryCov_9fa48("1096"), Date.now() - (stryMutAct_9fa48("1097") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("1097"), (stryMutAct_9fa48("1098") ? 1000 * 60 / 60 : (stryCov_9fa48("1098"), (stryMutAct_9fa48("1099") ? 1000 / 60 : (stryCov_9fa48("1099"), 1000 * 60)) * 60)) * 24))),
  riskScore: 79,
  workflowSteps: 5,
  form: stryMutAct_9fa48("1100") ? {} : (stryCov_9fa48("1100"), {
    counterpartyId: stryMutAct_9fa48("1101") ? "" : (stryCov_9fa48("1101"), "wayne"),
    counterpartyName: stryMutAct_9fa48("1102") ? "" : (stryCov_9fa48("1102"), "Wayne Enterprises"),
    counterpartyAddress: stryMutAct_9fa48("1103") ? "" : (stryCov_9fa48("1103"), "1007 Mountain Drive, Gotham, NJ 07001, USA"),
    counterpartyContact: stryMutAct_9fa48("1104") ? "" : (stryCov_9fa48("1104"), "Lucius Fox"),
    counterpartyEmail: stryMutAct_9fa48("1105") ? "" : (stryCov_9fa48("1105"), "l.fox@wayneenterprises.com"),
    counterpartyCountry: stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), "United States"),
    counterpartySignerName: stryMutAct_9fa48("1107") ? "" : (stryCov_9fa48("1107"), "Lucius Fox"),
    counterpartySignerTitle: stryMutAct_9fa48("1108") ? "" : (stryCov_9fa48("1108"), "President, Wayne Enterprises"),
    companyName: stryMutAct_9fa48("1109") ? "" : (stryCov_9fa48("1109"), "Contoso Corporation"),
    companyAddress: stryMutAct_9fa48("1110") ? "" : (stryCov_9fa48("1110"), "1 Microsoft Way, Redmond, WA 98052, USA"),
    companySignerName: stryMutAct_9fa48("1111") ? "" : (stryCov_9fa48("1111"), "Alex Kim"),
    companySignerTitle: stryMutAct_9fa48("1112") ? "" : (stryCov_9fa48("1112"), "Senior Counsel"),
    recordTitle: stryMutAct_9fa48("1113") ? "" : (stryCov_9fa48("1113"), "Wayne Ent. — JV Exploration"),
    recordOwner: stryMutAct_9fa48("1114") ? "" : (stryCov_9fa48("1114"), "Alex Kim"),
    businessUnit: stryMutAct_9fa48("1115") ? "" : (stryCov_9fa48("1115"), "Corporate Development"),
    purpose: stryMutAct_9fa48("1116") ? "" : (stryCov_9fa48("1116"), "Exploratory discussions for a joint venture on advanced materials manufacturing."),
    confidentialInformation: stryMutAct_9fa48("1117") ? "" : (stryCov_9fa48("1117"), "Financial models, IP portfolio, manufacturing processes, M&A strategy."),
    effectiveDate: stryMutAct_9fa48("1118") ? "" : (stryCov_9fa48("1118"), "2026-04-20"),
    term: stryMutAct_9fa48("1119") ? "" : (stryCov_9fa48("1119"), "five (5) years"),
    survival: stryMutAct_9fa48("1120") ? "" : (stryCov_9fa48("1120"), "seven (7) years"),
    templateId: stryMutAct_9fa48("1121") ? "" : (stryCov_9fa48("1121"), "tpl-international"),
    jurisdiction: stryMutAct_9fa48("1122") ? "" : (stryCov_9fa48("1122"), "Delaware, USA"),
    governingLaw: stryMutAct_9fa48("1123") ? "" : (stryCov_9fa48("1123"), "Delaware, USA"),
    direction: stryMutAct_9fa48("1124") ? "" : (stryCov_9fa48("1124"), "mutual"),
    type: stryMutAct_9fa48("1125") ? "" : (stryCov_9fa48("1125"), "mutual")
  })
}), stryMutAct_9fa48("1126") ? {} : (stryCov_9fa48("1126"), {
  id: stryMutAct_9fa48("1127") ? "" : (stryCov_9fa48("1127"), "NDA-2037"),
  title: stryMutAct_9fa48("1128") ? "" : (stryCov_9fa48("1128"), "Initech — Beta Software"),
  recordType: stryMutAct_9fa48("1129") ? "" : (stryCov_9fa48("1129"), "Licensing Agreement"),
  type: stryMutAct_9fa48("1130") ? "" : (stryCov_9fa48("1130"), "One-Way Out"),
  risk: stryMutAct_9fa48("1131") ? "" : (stryCov_9fa48("1131"), "Low"),
  status: stryMutAct_9fa48("1132") ? "" : (stryCov_9fa48("1132"), "Signed"),
  owner: stryMutAct_9fa48("1133") ? "" : (stryCov_9fa48("1133"), "Riley Gomez"),
  counterparty: stryMutAct_9fa48("1134") ? "" : (stryCov_9fa48("1134"), "Initech Software"),
  templateId: stryMutAct_9fa48("1135") ? "" : (stryCov_9fa48("1135"), "tpl-oneway-out"),
  createdAt: stryMutAct_9fa48("1136") ? Date.now() + 1000 * 60 * 60 * 96 : (stryCov_9fa48("1136"), Date.now() - (stryMutAct_9fa48("1137") ? 1000 * 60 * 60 / 96 : (stryCov_9fa48("1137"), (stryMutAct_9fa48("1138") ? 1000 * 60 / 60 : (stryCov_9fa48("1138"), (stryMutAct_9fa48("1139") ? 1000 / 60 : (stryCov_9fa48("1139"), 1000 * 60)) * 60)) * 96))),
  updatedAt: stryMutAct_9fa48("1140") ? Date.now() + 1000 * 60 * 60 * 48 : (stryCov_9fa48("1140"), Date.now() - (stryMutAct_9fa48("1141") ? 1000 * 60 * 60 / 48 : (stryCov_9fa48("1141"), (stryMutAct_9fa48("1142") ? 1000 * 60 / 60 : (stryCov_9fa48("1142"), (stryMutAct_9fa48("1143") ? 1000 / 60 : (stryCov_9fa48("1143"), 1000 * 60)) * 60)) * 48))),
  riskScore: 22,
  workflowSteps: 2,
  form: stryMutAct_9fa48("1144") ? {} : (stryCov_9fa48("1144"), {
    counterpartyId: stryMutAct_9fa48("1145") ? "" : (stryCov_9fa48("1145"), "initech"),
    counterpartyName: stryMutAct_9fa48("1146") ? "" : (stryCov_9fa48("1146"), "Initech Software"),
    counterpartyAddress: stryMutAct_9fa48("1147") ? "" : (stryCov_9fa48("1147"), "4120 Freedom Blvd, Austin, TX 78701, USA"),
    counterpartyContact: stryMutAct_9fa48("1148") ? "" : (stryCov_9fa48("1148"), "Peter Gibbons"),
    counterpartyEmail: stryMutAct_9fa48("1149") ? "" : (stryCov_9fa48("1149"), "p.gibbons@initech.com"),
    counterpartyCountry: stryMutAct_9fa48("1150") ? "" : (stryCov_9fa48("1150"), "United States"),
    counterpartySignerName: stryMutAct_9fa48("1151") ? "" : (stryCov_9fa48("1151"), "Peter Gibbons"),
    counterpartySignerTitle: stryMutAct_9fa48("1152") ? "" : (stryCov_9fa48("1152"), "Head of Engineering"),
    companyName: stryMutAct_9fa48("1153") ? "" : (stryCov_9fa48("1153"), "Contoso Corporation"),
    companyAddress: stryMutAct_9fa48("1154") ? "" : (stryCov_9fa48("1154"), "1 Microsoft Way, Redmond, WA 98052, USA"),
    companySignerName: stryMutAct_9fa48("1155") ? "" : (stryCov_9fa48("1155"), "Riley Gomez"),
    companySignerTitle: stryMutAct_9fa48("1156") ? "" : (stryCov_9fa48("1156"), "Sales Director"),
    recordTitle: stryMutAct_9fa48("1157") ? "" : (stryCov_9fa48("1157"), "Initech — Beta Software"),
    recordOwner: stryMutAct_9fa48("1158") ? "" : (stryCov_9fa48("1158"), "Riley Gomez"),
    businessUnit: stryMutAct_9fa48("1159") ? "" : (stryCov_9fa48("1159"), "Sales"),
    purpose: stryMutAct_9fa48("1160") ? "" : (stryCov_9fa48("1160"), "Provide Initech with early access to Contoso beta software for evaluation."),
    confidentialInformation: stryMutAct_9fa48("1161") ? "" : (stryCov_9fa48("1161"), "Beta binaries, release notes, roadmap, performance benchmarks."),
    effectiveDate: stryMutAct_9fa48("1162") ? "" : (stryCov_9fa48("1162"), "2026-01-05"),
    term: stryMutAct_9fa48("1163") ? "" : (stryCov_9fa48("1163"), "one (1) year"),
    survival: stryMutAct_9fa48("1164") ? "" : (stryCov_9fa48("1164"), "two (2) years"),
    templateId: stryMutAct_9fa48("1165") ? "" : (stryCov_9fa48("1165"), "tpl-oneway-out"),
    jurisdiction: stryMutAct_9fa48("1166") ? "" : (stryCov_9fa48("1166"), "Washington, USA"),
    governingLaw: stryMutAct_9fa48("1167") ? "" : (stryCov_9fa48("1167"), "Washington, USA"),
    direction: stryMutAct_9fa48("1168") ? "" : (stryCov_9fa48("1168"), "outgoing"),
    type: stryMutAct_9fa48("1169") ? "" : (stryCov_9fa48("1169"), "oneway-outgoing")
  })
})]);
const dueIn = stryMutAct_9fa48("1170") ? () => undefined : (stryCov_9fa48("1170"), (() => {
  const dueIn = days => stryMutAct_9fa48("1171") ? Date.now() - days * 24 * 60 * 60 * 1000 : (stryCov_9fa48("1171"), Date.now() + (stryMutAct_9fa48("1172") ? days * 24 * 60 * 60 / 1000 : (stryCov_9fa48("1172"), (stryMutAct_9fa48("1173") ? days * 24 * 60 / 60 : (stryCov_9fa48("1173"), (stryMutAct_9fa48("1174") ? days * 24 / 60 : (stryCov_9fa48("1174"), (stryMutAct_9fa48("1175") ? days / 24 : (stryCov_9fa48("1175"), days * 24)) * 60)) * 60)) * 1000)));
  return dueIn;
})());
const seedTasks = stryMutAct_9fa48("1176") ? [] : (stryCov_9fa48("1176"), [stryMutAct_9fa48("1177") ? {} : (stryCov_9fa48("1177"), {
  id: stryMutAct_9fa48("1178") ? "" : (stryCov_9fa48("1178"), "T-1001"),
  requestId: stryMutAct_9fa48("1179") ? "" : (stryCov_9fa48("1179"), "NDA-2041"),
  requestTitle: stryMutAct_9fa48("1180") ? "" : (stryCov_9fa48("1180"), "Acme Robotics — Joint R&D"),
  type: stryMutAct_9fa48("1181") ? "" : (stryCov_9fa48("1181"), "Legal Review"),
  assignedTo: stryMutAct_9fa48("1182") ? "" : (stryCov_9fa48("1182"), "Alex Kim"),
  dueDate: dueIn(2),
  priority: stryMutAct_9fa48("1183") ? "" : (stryCov_9fa48("1183"), "High"),
  status: stryMutAct_9fa48("1184") ? "" : (stryCov_9fa48("1184"), "In Progress"),
  createdAt: stryMutAct_9fa48("1185") ? Date.now() + 1000 * 60 * 60 * 24 : (stryCov_9fa48("1185"), Date.now() - (stryMutAct_9fa48("1186") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("1186"), (stryMutAct_9fa48("1187") ? 1000 * 60 / 60 : (stryCov_9fa48("1187"), (stryMutAct_9fa48("1188") ? 1000 / 60 : (stryCov_9fa48("1188"), 1000 * 60)) * 60)) * 24)))
}), stryMutAct_9fa48("1189") ? {} : (stryCov_9fa48("1189"), {
  id: stryMutAct_9fa48("1190") ? "" : (stryCov_9fa48("1190"), "T-1002"),
  requestId: stryMutAct_9fa48("1191") ? "" : (stryCov_9fa48("1191"), "NDA-2041"),
  requestTitle: stryMutAct_9fa48("1192") ? "" : (stryCov_9fa48("1192"), "Acme Robotics — Joint R&D"),
  type: stryMutAct_9fa48("1193") ? "" : (stryCov_9fa48("1193"), "Business Approval"),
  assignedTo: stryMutAct_9fa48("1194") ? "" : (stryCov_9fa48("1194"), "Sara Patel"),
  dueDate: dueIn(3),
  priority: stryMutAct_9fa48("1195") ? "" : (stryCov_9fa48("1195"), "Medium"),
  status: stryMutAct_9fa48("1196") ? "" : (stryCov_9fa48("1196"), "Open"),
  createdAt: stryMutAct_9fa48("1197") ? Date.now() + 1000 * 60 * 60 * 24 : (stryCov_9fa48("1197"), Date.now() - (stryMutAct_9fa48("1198") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("1198"), (stryMutAct_9fa48("1199") ? 1000 * 60 / 60 : (stryCov_9fa48("1199"), (stryMutAct_9fa48("1200") ? 1000 / 60 : (stryCov_9fa48("1200"), 1000 * 60)) * 60)) * 24)))
}), stryMutAct_9fa48("1201") ? {} : (stryCov_9fa48("1201"), {
  id: stryMutAct_9fa48("1202") ? "" : (stryCov_9fa48("1202"), "T-1003"),
  requestId: stryMutAct_9fa48("1203") ? "" : (stryCov_9fa48("1203"), "NDA-2040"),
  requestTitle: stryMutAct_9fa48("1204") ? "" : (stryCov_9fa48("1204"), "Northwind Pharma — Clinical Data"),
  type: stryMutAct_9fa48("1205") ? "" : (stryCov_9fa48("1205"), "Privacy Review"),
  assignedTo: stryMutAct_9fa48("1206") ? "" : (stryCov_9fa48("1206"), "Privacy Office"),
  dueDate: dueIn(stryMutAct_9fa48("1207") ? +1 : (stryCov_9fa48("1207"), -1)),
  priority: stryMutAct_9fa48("1208") ? "" : (stryCov_9fa48("1208"), "Critical"),
  status: stryMutAct_9fa48("1209") ? "" : (stryCov_9fa48("1209"), "Overdue"),
  createdAt: stryMutAct_9fa48("1210") ? Date.now() + 1000 * 60 * 60 * 50 : (stryCov_9fa48("1210"), Date.now() - (stryMutAct_9fa48("1211") ? 1000 * 60 * 60 / 50 : (stryCov_9fa48("1211"), (stryMutAct_9fa48("1212") ? 1000 * 60 / 60 : (stryCov_9fa48("1212"), (stryMutAct_9fa48("1213") ? 1000 / 60 : (stryCov_9fa48("1213"), 1000 * 60)) * 60)) * 50)))
}), stryMutAct_9fa48("1214") ? {} : (stryCov_9fa48("1214"), {
  id: stryMutAct_9fa48("1215") ? "" : (stryCov_9fa48("1215"), "T-1004"),
  requestId: stryMutAct_9fa48("1216") ? "" : (stryCov_9fa48("1216"), "NDA-2040"),
  requestTitle: stryMutAct_9fa48("1217") ? "" : (stryCov_9fa48("1217"), "Northwind Pharma — Clinical Data"),
  type: stryMutAct_9fa48("1218") ? "" : (stryCov_9fa48("1218"), "Signature"),
  assignedTo: stryMutAct_9fa48("1219") ? "" : (stryCov_9fa48("1219"), "Jordan Nguyen"),
  dueDate: dueIn(2),
  priority: stryMutAct_9fa48("1220") ? "" : (stryCov_9fa48("1220"), "High"),
  status: stryMutAct_9fa48("1221") ? "" : (stryCov_9fa48("1221"), "Open"),
  createdAt: stryMutAct_9fa48("1222") ? Date.now() + 1000 * 60 * 60 * 12 : (stryCov_9fa48("1222"), Date.now() - (stryMutAct_9fa48("1223") ? 1000 * 60 * 60 / 12 : (stryCov_9fa48("1223"), (stryMutAct_9fa48("1224") ? 1000 * 60 / 60 : (stryCov_9fa48("1224"), (stryMutAct_9fa48("1225") ? 1000 / 60 : (stryCov_9fa48("1225"), 1000 * 60)) * 60)) * 12)))
}), stryMutAct_9fa48("1226") ? {} : (stryCov_9fa48("1226"), {
  id: stryMutAct_9fa48("1227") ? "" : (stryCov_9fa48("1227"), "T-1005"),
  requestId: stryMutAct_9fa48("1228") ? "" : (stryCov_9fa48("1228"), "NDA-2038"),
  requestTitle: stryMutAct_9fa48("1229") ? "" : (stryCov_9fa48("1229"), "Wayne Ent. — JV Exploration"),
  type: stryMutAct_9fa48("1230") ? "" : (stryCov_9fa48("1230"), "Legal Review"),
  assignedTo: stryMutAct_9fa48("1231") ? "" : (stryCov_9fa48("1231"), "Alex Kim"),
  dueDate: dueIn(1),
  priority: stryMutAct_9fa48("1232") ? "" : (stryCov_9fa48("1232"), "High"),
  status: stryMutAct_9fa48("1233") ? "" : (stryCov_9fa48("1233"), "In Progress"),
  createdAt: stryMutAct_9fa48("1234") ? Date.now() + 1000 * 60 * 60 * 30 : (stryCov_9fa48("1234"), Date.now() - (stryMutAct_9fa48("1235") ? 1000 * 60 * 60 / 30 : (stryCov_9fa48("1235"), (stryMutAct_9fa48("1236") ? 1000 * 60 / 60 : (stryCov_9fa48("1236"), (stryMutAct_9fa48("1237") ? 1000 / 60 : (stryCov_9fa48("1237"), 1000 * 60)) * 60)) * 30)))
})]);

// ---- requests API ----
export function getRequests() {
  if (stryMutAct_9fa48("1238")) {
    {}
  } else {
    stryCov_9fa48("1238");
    const list = read(REQ_KEY, null);
    if (stryMutAct_9fa48("1241") ? false : stryMutAct_9fa48("1240") ? true : stryMutAct_9fa48("1239") ? list : (stryCov_9fa48("1239", "1240", "1241"), !list)) {
      if (stryMutAct_9fa48("1242")) {
        {}
      } else {
        stryCov_9fa48("1242");
        write(REQ_KEY, seedRequests);
        return seedRequests.map(stryMutAct_9fa48("1243") ? () => undefined : (stryCov_9fa48("1243"), r => stryMutAct_9fa48("1244") ? {} : (stryCov_9fa48("1244"), {
          ...r,
          status: normalizeStatus(r.status)
        })));
      }
    }
    return list.map(stryMutAct_9fa48("1245") ? () => undefined : (stryCov_9fa48("1245"), r => stryMutAct_9fa48("1246") ? {} : (stryCov_9fa48("1246"), {
      ...r,
      status: normalizeStatus(r.status)
    })));
  }
}
export function getRequest(id) {
  if (stryMutAct_9fa48("1247")) {
    {}
  } else {
    stryCov_9fa48("1247");
    return stryMutAct_9fa48("1250") ? getRequests().find(r => r.id === id) && null : stryMutAct_9fa48("1249") ? false : stryMutAct_9fa48("1248") ? true : (stryCov_9fa48("1248", "1249", "1250"), getRequests().find(stryMutAct_9fa48("1251") ? () => undefined : (stryCov_9fa48("1251"), r => stryMutAct_9fa48("1254") ? r.id !== id : stryMutAct_9fa48("1253") ? false : stryMutAct_9fa48("1252") ? true : (stryCov_9fa48("1252", "1253", "1254"), r.id === id))) || null);
  }
}

/**
 * Build a best-effort intake `form` object from any record (stored or mock).
 * Always returns a fully-populated form so the intake editor never opens blank.
 * Existing rec.form fields take precedence over derived defaults.
 */
export function hydrateFormFromRecord(rec) {
  if (stryMutAct_9fa48("1255")) {
    {}
  } else {
    stryCov_9fa48("1255");
    if (stryMutAct_9fa48("1258") ? false : stryMutAct_9fa48("1257") ? true : stryMutAct_9fa48("1256") ? rec : (stryCov_9fa48("1256", "1257", "1258"), !rec)) return null;
    const counterparty = stryMutAct_9fa48("1261") ? (rec.counterparty || (rec.title && rec.title.includes("—") ? rec.title.split("—")[0].trim() : rec.title)) && "" : stryMutAct_9fa48("1260") ? false : stryMutAct_9fa48("1259") ? true : (stryCov_9fa48("1259", "1260", "1261"), (stryMutAct_9fa48("1263") ? rec.counterparty && (rec.title && rec.title.includes("—") ? rec.title.split("—")[0].trim() : rec.title) : stryMutAct_9fa48("1262") ? false : (stryCov_9fa48("1262", "1263"), rec.counterparty || ((stryMutAct_9fa48("1266") ? rec.title || rec.title.includes("—") : stryMutAct_9fa48("1265") ? false : stryMutAct_9fa48("1264") ? true : (stryCov_9fa48("1264", "1265", "1266"), rec.title && rec.title.includes(stryMutAct_9fa48("1267") ? "" : (stryCov_9fa48("1267"), "—")))) ? stryMutAct_9fa48("1268") ? rec.title.split("—")[0] : (stryCov_9fa48("1268"), rec.title.split(stryMutAct_9fa48("1269") ? "" : (stryCov_9fa48("1269"), "—"))[0].trim()) : rec.title))) || (stryMutAct_9fa48("1270") ? "Stryker was here!" : (stryCov_9fa48("1270"), "")));
    const recordTitle = stryMutAct_9fa48("1273") ? rec.title && (counterparty ? `${counterparty} — NDA` : "") : stryMutAct_9fa48("1272") ? false : stryMutAct_9fa48("1271") ? true : (stryCov_9fa48("1271", "1272", "1273"), rec.title || (counterparty ? stryMutAct_9fa48("1274") ? `` : (stryCov_9fa48("1274"), `${counterparty} — NDA`) : stryMutAct_9fa48("1275") ? "Stryker was here!" : (stryCov_9fa48("1275"), "")));
    const typeLower = stryMutAct_9fa48("1276") ? (rec.type || "").toUpperCase() : (stryCov_9fa48("1276"), (stryMutAct_9fa48("1279") ? rec.type && "" : stryMutAct_9fa48("1278") ? false : stryMutAct_9fa48("1277") ? true : (stryCov_9fa48("1277", "1278", "1279"), rec.type || (stryMutAct_9fa48("1280") ? "Stryker was here!" : (stryCov_9fa48("1280"), "")))).toLowerCase());
    const direction = (stryMutAct_9fa48("1283") ? typeLower.includes("one-way in") && typeLower.includes("incoming") : stryMutAct_9fa48("1282") ? false : stryMutAct_9fa48("1281") ? true : (stryCov_9fa48("1281", "1282", "1283"), typeLower.includes(stryMutAct_9fa48("1284") ? "" : (stryCov_9fa48("1284"), "one-way in")) || typeLower.includes(stryMutAct_9fa48("1285") ? "" : (stryCov_9fa48("1285"), "incoming")))) ? stryMutAct_9fa48("1286") ? "" : (stryCov_9fa48("1286"), "incoming") : (stryMutAct_9fa48("1289") ? typeLower.includes("one-way out") && typeLower.includes("outgoing") : stryMutAct_9fa48("1288") ? false : stryMutAct_9fa48("1287") ? true : (stryCov_9fa48("1287", "1288", "1289"), typeLower.includes(stryMutAct_9fa48("1290") ? "" : (stryCov_9fa48("1290"), "one-way out")) || typeLower.includes(stryMutAct_9fa48("1291") ? "" : (stryCov_9fa48("1291"), "outgoing")))) ? stryMutAct_9fa48("1292") ? "" : (stryCov_9fa48("1292"), "outgoing") : stryMutAct_9fa48("1293") ? "" : (stryCov_9fa48("1293"), "mutual");
    const defaults = stryMutAct_9fa48("1294") ? {} : (stryCov_9fa48("1294"), {
      counterpartyId: stryMutAct_9fa48("1295") ? "Stryker was here!" : (stryCov_9fa48("1295"), ""),
      counterpartyName: counterparty,
      counterpartyAddress: stryMutAct_9fa48("1296") ? "Stryker was here!" : (stryCov_9fa48("1296"), ""),
      counterpartyContact: stryMutAct_9fa48("1297") ? "Stryker was here!" : (stryCov_9fa48("1297"), ""),
      counterpartyEmail: stryMutAct_9fa48("1298") ? "Stryker was here!" : (stryCov_9fa48("1298"), ""),
      counterpartyCountry: stryMutAct_9fa48("1299") ? "" : (stryCov_9fa48("1299"), "United States"),
      counterpartySignerName: stryMutAct_9fa48("1300") ? "Stryker was here!" : (stryCov_9fa48("1300"), ""),
      counterpartySignerTitle: stryMutAct_9fa48("1301") ? "" : (stryCov_9fa48("1301"), "Authorized Signatory"),
      companyName: stryMutAct_9fa48("1302") ? "" : (stryCov_9fa48("1302"), "Contoso Corporation"),
      companyAddress: stryMutAct_9fa48("1303") ? "" : (stryCov_9fa48("1303"), "1 Microsoft Way, Redmond, WA 98052, USA"),
      companySignerName: stryMutAct_9fa48("1306") ? rec.owner && "Sara Patel" : stryMutAct_9fa48("1305") ? false : stryMutAct_9fa48("1304") ? true : (stryCov_9fa48("1304", "1305", "1306"), rec.owner || (stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), "Sara Patel"))),
      companySignerTitle: stryMutAct_9fa48("1308") ? "" : (stryCov_9fa48("1308"), "VP, Legal"),
      employeeName: stryMutAct_9fa48("1309") ? "Stryker was here!" : (stryCov_9fa48("1309"), ""),
      recordTitle,
      recordOwner: stryMutAct_9fa48("1312") ? rec.owner && "Sara Patel" : stryMutAct_9fa48("1311") ? false : stryMutAct_9fa48("1310") ? true : (stryCov_9fa48("1310", "1311", "1312"), rec.owner || (stryMutAct_9fa48("1313") ? "" : (stryCov_9fa48("1313"), "Sara Patel"))),
      businessUnit: stryMutAct_9fa48("1314") ? "" : (stryCov_9fa48("1314"), "Corporate Development"),
      purpose: stryMutAct_9fa48("1315") ? "Stryker was here!" : (stryCov_9fa48("1315"), ""),
      confidentialInformation: stryMutAct_9fa48("1316") ? "Stryker was here!" : (stryCov_9fa48("1316"), ""),
      effectiveDate: rec.createdAt ? stryMutAct_9fa48("1317") ? new Date(rec.createdAt).toISOString() : (stryCov_9fa48("1317"), new Date(rec.createdAt).toISOString().slice(0, 10)) : stryMutAct_9fa48("1318") ? new Date().toISOString() : (stryCov_9fa48("1318"), new Date().toISOString().slice(0, 10)),
      term: stryMutAct_9fa48("1319") ? "" : (stryCov_9fa48("1319"), "two (2) years"),
      survival: stryMutAct_9fa48("1320") ? "" : (stryCov_9fa48("1320"), "three (3) years"),
      templateId: stryMutAct_9fa48("1323") ? rec.templateId && "tpl-standard" : stryMutAct_9fa48("1322") ? false : stryMutAct_9fa48("1321") ? true : (stryCov_9fa48("1321", "1322", "1323"), rec.templateId || (stryMutAct_9fa48("1324") ? "" : (stryCov_9fa48("1324"), "tpl-standard"))),
      jurisdiction: stryMutAct_9fa48("1325") ? "" : (stryCov_9fa48("1325"), "Delaware, USA"),
      governingLaw: stryMutAct_9fa48("1326") ? "" : (stryCov_9fa48("1326"), "Delaware, USA"),
      direction,
      type: stryMutAct_9fa48("1329") ? rec.type && "mutual" : stryMutAct_9fa48("1328") ? false : stryMutAct_9fa48("1327") ? true : (stryCov_9fa48("1327", "1328", "1329"), rec.type || (stryMutAct_9fa48("1330") ? "" : (stryCov_9fa48("1330"), "mutual")))
    });
    // Layer rec.form on top of defaults (rec.form fields win)
    return stryMutAct_9fa48("1331") ? {} : (stryCov_9fa48("1331"), {
      ...defaults,
      ...(stryMutAct_9fa48("1334") ? rec.form && {} : stryMutAct_9fa48("1333") ? false : stryMutAct_9fa48("1332") ? true : (stryCov_9fa48("1332", "1333", "1334"), rec.form || {}))
    });
  }
}
export function newRequestId() {
  if (stryMutAct_9fa48("1335")) {
    {}
  } else {
    stryCov_9fa48("1335");
    const list = getRequests();
    const max = list.reduce((m, r) => {
      if (stryMutAct_9fa48("1336")) {
        {}
      } else {
        stryCov_9fa48("1336");
        const n = stryMutAct_9fa48("1339") ? parseInt(String(r.id).replace(/\D/g, ""), 10) && 0 : stryMutAct_9fa48("1338") ? false : stryMutAct_9fa48("1337") ? true : (stryCov_9fa48("1337", "1338", "1339"), parseInt(String(r.id).replace(stryMutAct_9fa48("1340") ? /\d/g : (stryCov_9fa48("1340"), /\D/g), stryMutAct_9fa48("1341") ? "Stryker was here!" : (stryCov_9fa48("1341"), "")), 10) || 0);
        return stryMutAct_9fa48("1342") ? Math.min(m, n) : (stryCov_9fa48("1342"), Math.max(m, n));
      }
    }, 2041);
    return stryMutAct_9fa48("1343") ? `` : (stryCov_9fa48("1343"), `NDA-${stryMutAct_9fa48("1344") ? max - 1 : (stryCov_9fa48("1344"), max + 1)}`);
  }
}
export function upsertRequest(req) {
  if (stryMutAct_9fa48("1345")) {
    {}
  } else {
    stryCov_9fa48("1345");
    const list = getRequests();
    const idx = list.findIndex(stryMutAct_9fa48("1346") ? () => undefined : (stryCov_9fa48("1346"), r => stryMutAct_9fa48("1349") ? r.id !== req.id : stryMutAct_9fa48("1348") ? false : stryMutAct_9fa48("1347") ? true : (stryCov_9fa48("1347", "1348", "1349"), r.id === req.id)));
    const merged = stryMutAct_9fa48("1350") ? {} : (stryCov_9fa48("1350"), {
      ...((stryMutAct_9fa48("1354") ? idx < 0 : stryMutAct_9fa48("1353") ? idx > 0 : stryMutAct_9fa48("1352") ? false : stryMutAct_9fa48("1351") ? true : (stryCov_9fa48("1351", "1352", "1353", "1354"), idx >= 0)) ? list[idx] : {}),
      ...req,
      updatedAt: Date.now()
    });
    if (stryMutAct_9fa48("1358") ? idx < 0 : stryMutAct_9fa48("1357") ? idx > 0 : stryMutAct_9fa48("1356") ? false : stryMutAct_9fa48("1355") ? true : (stryCov_9fa48("1355", "1356", "1357", "1358"), idx >= 0)) list[idx] = merged;else list.unshift(merged);
    write(REQ_KEY, list);
    // Best-effort mirror to server so other users see the change.
    serverUpsert(merged);
    return merged;
  }
}
export function deleteRequest(id) {
  if (stryMutAct_9fa48("1359")) {
    {}
  } else {
    stryCov_9fa48("1359");
    const list = stryMutAct_9fa48("1360") ? getRequests() : (stryCov_9fa48("1360"), getRequests().filter(stryMutAct_9fa48("1361") ? () => undefined : (stryCov_9fa48("1361"), r => stryMutAct_9fa48("1364") ? r.id === id : stryMutAct_9fa48("1363") ? false : stryMutAct_9fa48("1362") ? true : (stryCov_9fa48("1362", "1363", "1364"), r.id !== id))));
    write(REQ_KEY, list);
    serverDelete(id);
  }
}
export function setRequestStatus(id, status, note = stryMutAct_9fa48("1365") ? "Stryker was here!" : (stryCov_9fa48("1365"), "")) {
  if (stryMutAct_9fa48("1366")) {
    {}
  } else {
    stryCov_9fa48("1366");
    const r = getRequest(id);
    if (stryMutAct_9fa48("1369") ? false : stryMutAct_9fa48("1368") ? true : stryMutAct_9fa48("1367") ? r : (stryCov_9fa48("1367", "1368", "1369"), !r)) return null;
    const next = normalizeStatus(status);
    const updated = upsertRequest(stryMutAct_9fa48("1370") ? {} : (stryCov_9fa48("1370"), {
      ...r,
      id,
      status: next
    }));
    logAuditEvent(stryMutAct_9fa48("1371") ? {} : (stryCov_9fa48("1371"), {
      action: stryMutAct_9fa48("1372") ? `` : (stryCov_9fa48("1372"), `Status → ${next}`),
      target: stryMutAct_9fa48("1373") ? r.title - (note ? ` (${note})` : "") : (stryCov_9fa48("1373"), r.title + (note ? stryMutAct_9fa48("1374") ? `` : (stryCov_9fa48("1374"), ` (${note})`) : stryMutAct_9fa48("1375") ? "Stryker was here!" : (stryCov_9fa48("1375"), ""))),
      recordId: id
    }));
    return updated;
  }
}

// ---- server-backed sync (so all users see all repository documents) ----

function serverUpsert(entry) {
  if (stryMutAct_9fa48("1376")) {
    {}
  } else {
    stryCov_9fa48("1376");
    if (stryMutAct_9fa48("1379") ? typeof window !== "undefined" : stryMutAct_9fa48("1378") ? false : stryMutAct_9fa48("1377") ? true : (stryCov_9fa48("1377", "1378", "1379"), typeof window === (stryMutAct_9fa48("1380") ? "" : (stryCov_9fa48("1380"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("1381")) {
        {}
      } else {
        stryCov_9fa48("1381");
        fetch(stryMutAct_9fa48("1382") ? "" : (stryCov_9fa48("1382"), "/api/requests"), stryMutAct_9fa48("1383") ? {} : (stryCov_9fa48("1383"), {
          method: stryMutAct_9fa48("1384") ? "" : (stryCov_9fa48("1384"), "POST"),
          headers: stryMutAct_9fa48("1385") ? {} : (stryCov_9fa48("1385"), {
            "Content-Type": stryMutAct_9fa48("1386") ? "" : (stryCov_9fa48("1386"), "application/json")
          }),
          body: JSON.stringify(stryMutAct_9fa48("1387") ? {} : (stryCov_9fa48("1387"), {
            action: stryMutAct_9fa48("1388") ? "" : (stryCov_9fa48("1388"), "upsert"),
            entry
          }))
        })).catch(() => {});
      }
    } catch {}
  }
}
function serverDelete(id) {
  if (stryMutAct_9fa48("1389")) {
    {}
  } else {
    stryCov_9fa48("1389");
    if (stryMutAct_9fa48("1392") ? typeof window !== "undefined" : stryMutAct_9fa48("1391") ? false : stryMutAct_9fa48("1390") ? true : (stryCov_9fa48("1390", "1391", "1392"), typeof window === (stryMutAct_9fa48("1393") ? "" : (stryCov_9fa48("1393"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("1394")) {
        {}
      } else {
        stryCov_9fa48("1394");
        fetch(stryMutAct_9fa48("1395") ? "" : (stryCov_9fa48("1395"), "/api/requests"), stryMutAct_9fa48("1396") ? {} : (stryCov_9fa48("1396"), {
          method: stryMutAct_9fa48("1397") ? "" : (stryCov_9fa48("1397"), "POST"),
          headers: stryMutAct_9fa48("1398") ? {} : (stryCov_9fa48("1398"), {
            "Content-Type": stryMutAct_9fa48("1399") ? "" : (stryCov_9fa48("1399"), "application/json")
          }),
          body: JSON.stringify(stryMutAct_9fa48("1400") ? {} : (stryCov_9fa48("1400"), {
            action: stryMutAct_9fa48("1401") ? "" : (stryCov_9fa48("1401"), "delete"),
            id
          }))
        })).catch(() => {});
      }
    } catch {}
  }
}

/**
 * Pull the canonical request list from the server and merge into local
 * cache so every user sees the same repository.
 *
 * - On first run for a fresh device, also pushes the local seed up so
 *   the server has at least the demo data.
 * - Server is authoritative for status / form changes; deletes are
 *   honored (records present locally but absent server-side are removed).
 *
 * Returns the number of changes applied locally.
 */
export async function syncRequests() {
  if (stryMutAct_9fa48("1402")) {
    {}
  } else {
    stryCov_9fa48("1402");
    if (stryMutAct_9fa48("1405") ? typeof window !== "undefined" : stryMutAct_9fa48("1404") ? false : stryMutAct_9fa48("1403") ? true : (stryCov_9fa48("1403", "1404", "1405"), typeof window === (stryMutAct_9fa48("1406") ? "" : (stryCov_9fa48("1406"), "undefined")))) return 0;
    let remote = stryMutAct_9fa48("1407") ? ["Stryker was here"] : (stryCov_9fa48("1407"), []);
    try {
      if (stryMutAct_9fa48("1408")) {
        {}
      } else {
        stryCov_9fa48("1408");
        const r = await fetch(stryMutAct_9fa48("1409") ? "" : (stryCov_9fa48("1409"), "/api/requests"), stryMutAct_9fa48("1410") ? {} : (stryCov_9fa48("1410"), {
          cache: stryMutAct_9fa48("1411") ? "" : (stryCov_9fa48("1411"), "no-store")
        }));
        if (stryMutAct_9fa48("1414") ? false : stryMutAct_9fa48("1413") ? true : stryMutAct_9fa48("1412") ? r.ok : (stryCov_9fa48("1412", "1413", "1414"), !r.ok)) return 0;
        const data = await r.json();
        remote = Array.isArray(stryMutAct_9fa48("1415") ? data.requests : (stryCov_9fa48("1415"), data?.requests)) ? data.requests : stryMutAct_9fa48("1416") ? ["Stryker was here"] : (stryCov_9fa48("1416"), []);
      }
    } catch {
      if (stryMutAct_9fa48("1417")) {
        {}
      } else {
        stryCov_9fa48("1417");
        return 0;
      }
    }

    // First-load seeding: server is empty → push current local list up.
    if (stryMutAct_9fa48("1420") ? remote.length !== 0 : stryMutAct_9fa48("1419") ? false : stryMutAct_9fa48("1418") ? true : (stryCov_9fa48("1418", "1419", "1420"), remote.length === 0)) {
      if (stryMutAct_9fa48("1421")) {
        {}
      } else {
        stryCov_9fa48("1421");
        const local = getRequests();
        if (stryMutAct_9fa48("1425") ? local.length <= 0 : stryMutAct_9fa48("1424") ? local.length >= 0 : stryMutAct_9fa48("1423") ? false : stryMutAct_9fa48("1422") ? true : (stryCov_9fa48("1422", "1423", "1424", "1425"), local.length > 0)) {
          if (stryMutAct_9fa48("1426")) {
            {}
          } else {
            stryCov_9fa48("1426");
            try {
              if (stryMutAct_9fa48("1427")) {
                {}
              } else {
                stryCov_9fa48("1427");
                await fetch(stryMutAct_9fa48("1428") ? "" : (stryCov_9fa48("1428"), "/api/requests"), stryMutAct_9fa48("1429") ? {} : (stryCov_9fa48("1429"), {
                  method: stryMutAct_9fa48("1430") ? "" : (stryCov_9fa48("1430"), "POST"),
                  headers: stryMutAct_9fa48("1431") ? {} : (stryCov_9fa48("1431"), {
                    "Content-Type": stryMutAct_9fa48("1432") ? "" : (stryCov_9fa48("1432"), "application/json")
                  }),
                  body: JSON.stringify(stryMutAct_9fa48("1433") ? {} : (stryCov_9fa48("1433"), {
                    action: stryMutAct_9fa48("1434") ? "" : (stryCov_9fa48("1434"), "bulk-upsert"),
                    entries: local
                  }))
                }));
              }
            } catch {}
          }
        }
        return 0;
      }
    }
    const local = stryMutAct_9fa48("1437") ? read(REQ_KEY, []) && [] : stryMutAct_9fa48("1436") ? false : stryMutAct_9fa48("1435") ? true : (stryCov_9fa48("1435", "1436", "1437"), read(REQ_KEY, stryMutAct_9fa48("1438") ? ["Stryker was here"] : (stryCov_9fa48("1438"), [])) || (stryMutAct_9fa48("1439") ? ["Stryker was here"] : (stryCov_9fa48("1439"), [])));
    const remoteById = new Map(remote.map(stryMutAct_9fa48("1440") ? () => undefined : (stryCov_9fa48("1440"), r => stryMutAct_9fa48("1441") ? [] : (stryCov_9fa48("1441"), [r.id, r]))));
    const localById = new Map(local.map(stryMutAct_9fa48("1442") ? () => undefined : (stryCov_9fa48("1442"), r => stryMutAct_9fa48("1443") ? [] : (stryCov_9fa48("1443"), [r.id, r]))));
    let changed = 0;

    // Apply remote → local (newer-wins by updatedAt; unknown remote rows added).
    for (const r of remote) {
      if (stryMutAct_9fa48("1444")) {
        {}
      } else {
        stryCov_9fa48("1444");
        const cur = localById.get(r.id);
        if (stryMutAct_9fa48("1447") ? false : stryMutAct_9fa48("1446") ? true : stryMutAct_9fa48("1445") ? cur : (stryCov_9fa48("1445", "1446", "1447"), !cur)) {
          if (stryMutAct_9fa48("1448")) {
            {}
          } else {
            stryCov_9fa48("1448");
            stryMutAct_9fa48("1449") ? changed-- : (stryCov_9fa48("1449"), changed++);
          }
        } else if (stryMutAct_9fa48("1453") ? (r.updatedAt || 0) <= (cur.updatedAt || 0) : stryMutAct_9fa48("1452") ? (r.updatedAt || 0) >= (cur.updatedAt || 0) : stryMutAct_9fa48("1451") ? false : stryMutAct_9fa48("1450") ? true : (stryCov_9fa48("1450", "1451", "1452", "1453"), (stryMutAct_9fa48("1456") ? r.updatedAt && 0 : stryMutAct_9fa48("1455") ? false : stryMutAct_9fa48("1454") ? true : (stryCov_9fa48("1454", "1455", "1456"), r.updatedAt || 0)) > (stryMutAct_9fa48("1459") ? cur.updatedAt && 0 : stryMutAct_9fa48("1458") ? false : stryMutAct_9fa48("1457") ? true : (stryCov_9fa48("1457", "1458", "1459"), cur.updatedAt || 0)))) {
          if (stryMutAct_9fa48("1460")) {
            {}
          } else {
            stryCov_9fa48("1460");
            stryMutAct_9fa48("1461") ? changed-- : (stryCov_9fa48("1461"), changed++);
          }
        }
      }
    }

    // Drop local rows that no longer exist on the server (admin deletes).
    for (const r of local) {
      if (stryMutAct_9fa48("1462")) {
        {}
      } else {
        stryCov_9fa48("1462");
        if (stryMutAct_9fa48("1465") ? false : stryMutAct_9fa48("1464") ? true : stryMutAct_9fa48("1463") ? remoteById.has(r.id) : (stryCov_9fa48("1463", "1464", "1465"), !remoteById.has(r.id))) stryMutAct_9fa48("1466") ? changed-- : (stryCov_9fa48("1466"), changed++);
      }
    }
    if (stryMutAct_9fa48("1470") ? changed <= 0 : stryMutAct_9fa48("1469") ? changed >= 0 : stryMutAct_9fa48("1468") ? false : stryMutAct_9fa48("1467") ? true : (stryCov_9fa48("1467", "1468", "1469", "1470"), changed > 0)) {
      if (stryMutAct_9fa48("1471")) {
        {}
      } else {
        stryCov_9fa48("1471");
        // Remote is authoritative.
        write(REQ_KEY, remote.map(stryMutAct_9fa48("1472") ? () => undefined : (stryCov_9fa48("1472"), r => stryMutAct_9fa48("1473") ? {} : (stryCov_9fa48("1473"), {
          ...r,
          status: normalizeStatus(r.status)
        }))));
      }
    }
    return changed;
  }
}

// ---- tasks API ----
export function getTasks() {
  if (stryMutAct_9fa48("1474")) {
    {}
  } else {
    stryCov_9fa48("1474");
    const list = read(TASK_KEY, null);
    if (stryMutAct_9fa48("1477") ? false : stryMutAct_9fa48("1476") ? true : stryMutAct_9fa48("1475") ? list : (stryCov_9fa48("1475", "1476", "1477"), !list)) {
      if (stryMutAct_9fa48("1478")) {
        {}
      } else {
        stryCov_9fa48("1478");
        write(TASK_KEY, seedTasks);
        return autoExpireTasks(stryMutAct_9fa48("1479") ? [] : (stryCov_9fa48("1479"), [...seedTasks]));
      }
    }
    return autoExpireTasks(stryMutAct_9fa48("1480") ? [] : (stryCov_9fa48("1480"), [...list]));
  }
}

// Mark Open/In Progress tasks past due as Overdue (live).
function autoExpireTasks(list) {
  if (stryMutAct_9fa48("1481")) {
    {}
  } else {
    stryCov_9fa48("1481");
    const now = Date.now();
    return list.map(t => {
      if (stryMutAct_9fa48("1482")) {
        {}
      } else {
        stryCov_9fa48("1482");
        if (stryMutAct_9fa48("1485") ? (t.status === "Open" || t.status === "In Progress") && t.dueDate || t.dueDate < now : stryMutAct_9fa48("1484") ? false : stryMutAct_9fa48("1483") ? true : (stryCov_9fa48("1483", "1484", "1485"), (stryMutAct_9fa48("1487") ? t.status === "Open" || t.status === "In Progress" || t.dueDate : stryMutAct_9fa48("1486") ? true : (stryCov_9fa48("1486", "1487"), (stryMutAct_9fa48("1489") ? t.status === "Open" && t.status === "In Progress" : stryMutAct_9fa48("1488") ? true : (stryCov_9fa48("1488", "1489"), (stryMutAct_9fa48("1491") ? t.status !== "Open" : stryMutAct_9fa48("1490") ? false : (stryCov_9fa48("1490", "1491"), t.status === (stryMutAct_9fa48("1492") ? "" : (stryCov_9fa48("1492"), "Open")))) || (stryMutAct_9fa48("1494") ? t.status !== "In Progress" : stryMutAct_9fa48("1493") ? false : (stryCov_9fa48("1493", "1494"), t.status === (stryMutAct_9fa48("1495") ? "" : (stryCov_9fa48("1495"), "In Progress")))))) && t.dueDate)) && (stryMutAct_9fa48("1498") ? t.dueDate >= now : stryMutAct_9fa48("1497") ? t.dueDate <= now : stryMutAct_9fa48("1496") ? true : (stryCov_9fa48("1496", "1497", "1498"), t.dueDate < now)))) {
          if (stryMutAct_9fa48("1499")) {
            {}
          } else {
            stryCov_9fa48("1499");
            return stryMutAct_9fa48("1500") ? {} : (stryCov_9fa48("1500"), {
              ...t,
              status: stryMutAct_9fa48("1501") ? "" : (stryCov_9fa48("1501"), "Overdue")
            });
          }
        }
        return t;
      }
    });
  }
}
export function getTasksForRequest(requestId) {
  if (stryMutAct_9fa48("1502")) {
    {}
  } else {
    stryCov_9fa48("1502");
    return stryMutAct_9fa48("1503") ? getTasks() : (stryCov_9fa48("1503"), getTasks().filter(stryMutAct_9fa48("1504") ? () => undefined : (stryCov_9fa48("1504"), t => stryMutAct_9fa48("1507") ? t.requestId !== requestId : stryMutAct_9fa48("1506") ? false : stryMutAct_9fa48("1505") ? true : (stryCov_9fa48("1505", "1506", "1507"), t.requestId === requestId))));
  }
}
export function upsertTask(task) {
  if (stryMutAct_9fa48("1508")) {
    {}
  } else {
    stryCov_9fa48("1508");
    const list = read(TASK_KEY, seedTasks);
    const idx = list.findIndex(stryMutAct_9fa48("1509") ? () => undefined : (stryCov_9fa48("1509"), t => stryMutAct_9fa48("1512") ? t.id !== task.id : stryMutAct_9fa48("1511") ? false : stryMutAct_9fa48("1510") ? true : (stryCov_9fa48("1510", "1511", "1512"), t.id === task.id)));
    const merged = stryMutAct_9fa48("1513") ? {} : (stryCov_9fa48("1513"), {
      ...((stryMutAct_9fa48("1517") ? idx < 0 : stryMutAct_9fa48("1516") ? idx > 0 : stryMutAct_9fa48("1515") ? false : stryMutAct_9fa48("1514") ? true : (stryCov_9fa48("1514", "1515", "1516", "1517"), idx >= 0)) ? list[idx] : {}),
      ...task
    });
    if (stryMutAct_9fa48("1521") ? idx < 0 : stryMutAct_9fa48("1520") ? idx > 0 : stryMutAct_9fa48("1519") ? false : stryMutAct_9fa48("1518") ? true : (stryCov_9fa48("1518", "1519", "1520", "1521"), idx >= 0)) list[idx] = merged;else list.unshift(merged);
    write(TASK_KEY, list);
    return merged;
  }
}
let taskCounter = 0;
export function createTask(partial) {
  if (stryMutAct_9fa48("1522")) {
    {}
  } else {
    stryCov_9fa48("1522");
    const id = (stryMutAct_9fa48("1523") ? "" : (stryCov_9fa48("1523"), "T-")) + (stryMutAct_9fa48("1524") ? 1100 - (Date.now() % 9000 + taskCounter++ % 100).toString().padStart(3, "0") : (stryCov_9fa48("1524"), 1100 + (stryMutAct_9fa48("1525") ? Date.now() % 9000 - taskCounter++ % 100 : (stryCov_9fa48("1525"), (stryMutAct_9fa48("1526") ? Date.now() * 9000 : (stryCov_9fa48("1526"), Date.now() % 9000)) + (stryMutAct_9fa48("1527") ? taskCounter++ * 100 : (stryCov_9fa48("1527"), (stryMutAct_9fa48("1528") ? taskCounter-- : (stryCov_9fa48("1528"), taskCounter++)) % 100)))).toString().padStart(3, stryMutAct_9fa48("1529") ? "" : (stryCov_9fa48("1529"), "0"))));
    const task = stryMutAct_9fa48("1530") ? {} : (stryCov_9fa48("1530"), {
      id,
      status: stryMutAct_9fa48("1531") ? "" : (stryCov_9fa48("1531"), "Open"),
      priority: stryMutAct_9fa48("1532") ? "" : (stryCov_9fa48("1532"), "Medium"),
      createdAt: Date.now(),
      dueDate: dueIn(3),
      assignedTo: stryMutAct_9fa48("1533") ? "" : (stryCov_9fa48("1533"), "Unassigned"),
      ...partial
    });
    upsertTask(task);
    logAuditEvent(stryMutAct_9fa48("1534") ? {} : (stryCov_9fa48("1534"), {
      action: stryMutAct_9fa48("1535") ? `` : (stryCov_9fa48("1535"), `${task.type} task created`),
      target: stryMutAct_9fa48("1536") ? `` : (stryCov_9fa48("1536"), `${task.id} → ${task.assignedTo}`),
      recordId: task.requestId
    }));
    return task;
  }
}

// Auto-create tasks when a request is submitted, based on risk + answers.
export function createTasksForSubmission(req, answers = {}) {
  if (stryMutAct_9fa48("1537")) {
    {}
  } else {
    stryCov_9fa48("1537");
    const created = stryMutAct_9fa48("1538") ? ["Stryker was here"] : (stryCov_9fa48("1538"), []);
    const meta = stryMutAct_9fa48("1539") ? {} : (stryCov_9fa48("1539"), {
      requestId: req.id,
      requestTitle: req.title
    });
    const risk = stryMutAct_9fa48("1542") ? req.risk && "Low" : stryMutAct_9fa48("1541") ? false : stryMutAct_9fa48("1540") ? true : (stryCov_9fa48("1540", "1541", "1542"), req.risk || (stryMutAct_9fa48("1543") ? "" : (stryCov_9fa48("1543"), "Low")));
    if (stryMutAct_9fa48("1546") ? risk !== "High" : stryMutAct_9fa48("1545") ? false : stryMutAct_9fa48("1544") ? true : (stryCov_9fa48("1544", "1545", "1546"), risk === (stryMutAct_9fa48("1547") ? "" : (stryCov_9fa48("1547"), "High")))) {
      if (stryMutAct_9fa48("1548")) {
        {}
      } else {
        stryCov_9fa48("1548");
        created.push(createTask(stryMutAct_9fa48("1549") ? {} : (stryCov_9fa48("1549"), {
          ...meta,
          type: stryMutAct_9fa48("1550") ? "" : (stryCov_9fa48("1550"), "Legal Review"),
          assignedTo: stryMutAct_9fa48("1551") ? "" : (stryCov_9fa48("1551"), "Alex Kim"),
          priority: stryMutAct_9fa48("1552") ? "" : (stryCov_9fa48("1552"), "High"),
          dueDate: dueIn(1)
        })));
        if (stryMutAct_9fa48("1555") ? (answers.pii || answers.crossBorder || answers.employeeData) && answers.customerData : stryMutAct_9fa48("1554") ? false : stryMutAct_9fa48("1553") ? true : (stryCov_9fa48("1553", "1554", "1555"), (stryMutAct_9fa48("1557") ? (answers.pii || answers.crossBorder) && answers.employeeData : stryMutAct_9fa48("1556") ? false : (stryCov_9fa48("1556", "1557"), (stryMutAct_9fa48("1559") ? answers.pii && answers.crossBorder : stryMutAct_9fa48("1558") ? false : (stryCov_9fa48("1558", "1559"), answers.pii || answers.crossBorder)) || answers.employeeData)) || answers.customerData)) {
          if (stryMutAct_9fa48("1560")) {
            {}
          } else {
            stryCov_9fa48("1560");
            created.push(createTask(stryMutAct_9fa48("1561") ? {} : (stryCov_9fa48("1561"), {
              ...meta,
              type: stryMutAct_9fa48("1562") ? "" : (stryCov_9fa48("1562"), "Privacy Review"),
              assignedTo: stryMutAct_9fa48("1563") ? "" : (stryCov_9fa48("1563"), "Privacy Office"),
              priority: stryMutAct_9fa48("1564") ? "" : (stryCov_9fa48("1564"), "Critical"),
              dueDate: dueIn(2)
            })));
          }
        }
        created.push(createTask(stryMutAct_9fa48("1565") ? {} : (stryCov_9fa48("1565"), {
          ...meta,
          type: stryMutAct_9fa48("1566") ? "" : (stryCov_9fa48("1566"), "Business Approval"),
          assignedTo: stryMutAct_9fa48("1569") ? req.owner && "Sara Patel" : stryMutAct_9fa48("1568") ? false : stryMutAct_9fa48("1567") ? true : (stryCov_9fa48("1567", "1568", "1569"), req.owner || (stryMutAct_9fa48("1570") ? "" : (stryCov_9fa48("1570"), "Sara Patel"))),
          priority: stryMutAct_9fa48("1571") ? "" : (stryCov_9fa48("1571"), "High"),
          dueDate: dueIn(3)
        })));
      }
    } else if (stryMutAct_9fa48("1574") ? risk !== "Medium" : stryMutAct_9fa48("1573") ? false : stryMutAct_9fa48("1572") ? true : (stryCov_9fa48("1572", "1573", "1574"), risk === (stryMutAct_9fa48("1575") ? "" : (stryCov_9fa48("1575"), "Medium")))) {
      if (stryMutAct_9fa48("1576")) {
        {}
      } else {
        stryCov_9fa48("1576");
        created.push(createTask(stryMutAct_9fa48("1577") ? {} : (stryCov_9fa48("1577"), {
          ...meta,
          type: stryMutAct_9fa48("1578") ? "" : (stryCov_9fa48("1578"), "Legal Review"),
          assignedTo: stryMutAct_9fa48("1579") ? "" : (stryCov_9fa48("1579"), "Alex Kim"),
          priority: stryMutAct_9fa48("1580") ? "" : (stryCov_9fa48("1580"), "Medium"),
          dueDate: dueIn(2)
        })));
        created.push(createTask(stryMutAct_9fa48("1581") ? {} : (stryCov_9fa48("1581"), {
          ...meta,
          type: stryMutAct_9fa48("1582") ? "" : (stryCov_9fa48("1582"), "Business Approval"),
          assignedTo: stryMutAct_9fa48("1585") ? req.owner && "Sara Patel" : stryMutAct_9fa48("1584") ? false : stryMutAct_9fa48("1583") ? true : (stryCov_9fa48("1583", "1584", "1585"), req.owner || (stryMutAct_9fa48("1586") ? "" : (stryCov_9fa48("1586"), "Sara Patel"))),
          priority: stryMutAct_9fa48("1587") ? "" : (stryCov_9fa48("1587"), "Medium"),
          dueDate: dueIn(3)
        })));
      }
    } else {
      if (stryMutAct_9fa48("1588")) {
        {}
      } else {
        stryCov_9fa48("1588");
        created.push(createTask(stryMutAct_9fa48("1589") ? {} : (stryCov_9fa48("1589"), {
          ...meta,
          type: stryMutAct_9fa48("1590") ? "" : (stryCov_9fa48("1590"), "Business Approval"),
          assignedTo: stryMutAct_9fa48("1593") ? req.owner && "Sara Patel" : stryMutAct_9fa48("1592") ? false : stryMutAct_9fa48("1591") ? true : (stryCov_9fa48("1591", "1592", "1593"), req.owner || (stryMutAct_9fa48("1594") ? "" : (stryCov_9fa48("1594"), "Sara Patel"))),
          priority: stryMutAct_9fa48("1595") ? "" : (stryCov_9fa48("1595"), "Low"),
          dueDate: dueIn(2)
        })));
      }
    }
    return created;
  }
}
export function setTaskStatus(taskId, status, note = stryMutAct_9fa48("1596") ? "Stryker was here!" : (stryCov_9fa48("1596"), "")) {
  if (stryMutAct_9fa48("1597")) {
    {}
  } else {
    stryCov_9fa48("1597");
    const list = read(TASK_KEY, seedTasks);
    const idx = list.findIndex(stryMutAct_9fa48("1598") ? () => undefined : (stryCov_9fa48("1598"), t => stryMutAct_9fa48("1601") ? t.id !== taskId : stryMutAct_9fa48("1600") ? false : stryMutAct_9fa48("1599") ? true : (stryCov_9fa48("1599", "1600", "1601"), t.id === taskId)));
    if (stryMutAct_9fa48("1605") ? idx >= 0 : stryMutAct_9fa48("1604") ? idx <= 0 : stryMutAct_9fa48("1603") ? false : stryMutAct_9fa48("1602") ? true : (stryCov_9fa48("1602", "1603", "1604", "1605"), idx < 0)) return null;
    list[idx] = stryMutAct_9fa48("1606") ? {} : (stryCov_9fa48("1606"), {
      ...list[idx],
      status,
      updatedAt: Date.now()
    });
    write(TASK_KEY, list);
    logAuditEvent(stryMutAct_9fa48("1607") ? {} : (stryCov_9fa48("1607"), {
      action: stryMutAct_9fa48("1608") ? `` : (stryCov_9fa48("1608"), `Task ${status}`),
      target: stryMutAct_9fa48("1609") ? list[idx].type - (note ? ` (${note})` : "") : (stryCov_9fa48("1609"), list[idx].type + (note ? stryMutAct_9fa48("1610") ? `` : (stryCov_9fa48("1610"), ` (${note})`) : stryMutAct_9fa48("1611") ? "Stryker was here!" : (stryCov_9fa48("1611"), ""))),
      recordId: list[idx].requestId
    }));
    return list[idx];
  }
}
export function reassignTask(taskId, assignedTo) {
  if (stryMutAct_9fa48("1612")) {
    {}
  } else {
    stryCov_9fa48("1612");
    const list = read(TASK_KEY, seedTasks);
    const idx = list.findIndex(stryMutAct_9fa48("1613") ? () => undefined : (stryCov_9fa48("1613"), t => stryMutAct_9fa48("1616") ? t.id !== taskId : stryMutAct_9fa48("1615") ? false : stryMutAct_9fa48("1614") ? true : (stryCov_9fa48("1614", "1615", "1616"), t.id === taskId)));
    if (stryMutAct_9fa48("1620") ? idx >= 0 : stryMutAct_9fa48("1619") ? idx <= 0 : stryMutAct_9fa48("1618") ? false : stryMutAct_9fa48("1617") ? true : (stryCov_9fa48("1617", "1618", "1619", "1620"), idx < 0)) return null;
    list[idx] = stryMutAct_9fa48("1621") ? {} : (stryCov_9fa48("1621"), {
      ...list[idx],
      assignedTo,
      updatedAt: Date.now()
    });
    write(TASK_KEY, list);
    logAuditEvent(stryMutAct_9fa48("1622") ? {} : (stryCov_9fa48("1622"), {
      action: stryMutAct_9fa48("1623") ? `` : (stryCov_9fa48("1623"), `Task reassigned`),
      target: stryMutAct_9fa48("1624") ? `` : (stryCov_9fa48("1624"), `${list[idx].type} → ${assignedTo}`),
      recordId: list[idx].requestId
    }));
    return list[idx];
  }
}

// ---- expiration helpers ----
// Parse a free-form term like "two (2) years", "1 year", "18 months", "90 days"
// into an approximate millisecond duration. Returns null if no number found.
export function parseTermToMs(term) {
  if (stryMutAct_9fa48("1625")) {
    {}
  } else {
    stryCov_9fa48("1625");
    if (stryMutAct_9fa48("1628") ? !term && typeof term !== "string" : stryMutAct_9fa48("1627") ? false : stryMutAct_9fa48("1626") ? true : (stryCov_9fa48("1626", "1627", "1628"), (stryMutAct_9fa48("1629") ? term : (stryCov_9fa48("1629"), !term)) || (stryMutAct_9fa48("1631") ? typeof term === "string" : stryMutAct_9fa48("1630") ? false : (stryCov_9fa48("1630", "1631"), typeof term !== (stryMutAct_9fa48("1632") ? "" : (stryCov_9fa48("1632"), "string")))))) return null;
    // Accept formats like "two (2) years", "2 years", "18 months", "90 days".
    // The digit may be followed by ")" or other punctuation before the unit.
    const m = term.match(stryMutAct_9fa48("1636") ? /(\d+)[A-Za-z]*?(year|yr|month|mo|week|wk|day)/i : stryMutAct_9fa48("1635") ? /(\d+)[^A-Za-z](year|yr|month|mo|week|wk|day)/i : stryMutAct_9fa48("1634") ? /(\D+)[^A-Za-z]*?(year|yr|month|mo|week|wk|day)/i : stryMutAct_9fa48("1633") ? /(\d)[^A-Za-z]*?(year|yr|month|mo|week|wk|day)/i : (stryCov_9fa48("1633", "1634", "1635", "1636"), /(\d+)[^A-Za-z]*?(year|yr|month|mo|week|wk|day)/i));
    if (stryMutAct_9fa48("1639") ? false : stryMutAct_9fa48("1638") ? true : stryMutAct_9fa48("1637") ? m : (stryCov_9fa48("1637", "1638", "1639"), !m)) return null;
    const n = parseInt(m[1], 10);
    const unit = stryMutAct_9fa48("1640") ? m[2].toUpperCase() : (stryCov_9fa48("1640"), m[2].toLowerCase());
    const dayMs = stryMutAct_9fa48("1641") ? 1000 * 60 * 60 / 24 : (stryCov_9fa48("1641"), (stryMutAct_9fa48("1642") ? 1000 * 60 / 60 : (stryCov_9fa48("1642"), (stryMutAct_9fa48("1643") ? 1000 / 60 : (stryCov_9fa48("1643"), 1000 * 60)) * 60)) * 24);
    if (stryMutAct_9fa48("1646") ? unit.startsWith("year") && unit === "yr" : stryMutAct_9fa48("1645") ? false : stryMutAct_9fa48("1644") ? true : (stryCov_9fa48("1644", "1645", "1646"), (stryMutAct_9fa48("1647") ? unit.endsWith("year") : (stryCov_9fa48("1647"), unit.startsWith(stryMutAct_9fa48("1648") ? "" : (stryCov_9fa48("1648"), "year")))) || (stryMutAct_9fa48("1650") ? unit !== "yr" : stryMutAct_9fa48("1649") ? false : (stryCov_9fa48("1649", "1650"), unit === (stryMutAct_9fa48("1651") ? "" : (stryCov_9fa48("1651"), "yr")))))) return stryMutAct_9fa48("1652") ? n * 365 / dayMs : (stryCov_9fa48("1652"), (stryMutAct_9fa48("1653") ? n / 365 : (stryCov_9fa48("1653"), n * 365)) * dayMs);
    if (stryMutAct_9fa48("1656") ? unit.startsWith("month") && unit === "mo" : stryMutAct_9fa48("1655") ? false : stryMutAct_9fa48("1654") ? true : (stryCov_9fa48("1654", "1655", "1656"), (stryMutAct_9fa48("1657") ? unit.endsWith("month") : (stryCov_9fa48("1657"), unit.startsWith(stryMutAct_9fa48("1658") ? "" : (stryCov_9fa48("1658"), "month")))) || (stryMutAct_9fa48("1660") ? unit !== "mo" : stryMutAct_9fa48("1659") ? false : (stryCov_9fa48("1659", "1660"), unit === (stryMutAct_9fa48("1661") ? "" : (stryCov_9fa48("1661"), "mo")))))) return stryMutAct_9fa48("1662") ? n * 30 / dayMs : (stryCov_9fa48("1662"), (stryMutAct_9fa48("1663") ? n / 30 : (stryCov_9fa48("1663"), n * 30)) * dayMs);
    if (stryMutAct_9fa48("1666") ? unit.startsWith("week") && unit === "wk" : stryMutAct_9fa48("1665") ? false : stryMutAct_9fa48("1664") ? true : (stryCov_9fa48("1664", "1665", "1666"), (stryMutAct_9fa48("1667") ? unit.endsWith("week") : (stryCov_9fa48("1667"), unit.startsWith(stryMutAct_9fa48("1668") ? "" : (stryCov_9fa48("1668"), "week")))) || (stryMutAct_9fa48("1670") ? unit !== "wk" : stryMutAct_9fa48("1669") ? false : (stryCov_9fa48("1669", "1670"), unit === (stryMutAct_9fa48("1671") ? "" : (stryCov_9fa48("1671"), "wk")))))) return stryMutAct_9fa48("1672") ? n * 7 / dayMs : (stryCov_9fa48("1672"), (stryMutAct_9fa48("1673") ? n / 7 : (stryCov_9fa48("1673"), n * 7)) * dayMs);
    if (stryMutAct_9fa48("1676") ? unit.endsWith("day") : stryMutAct_9fa48("1675") ? false : stryMutAct_9fa48("1674") ? true : (stryCov_9fa48("1674", "1675", "1676"), unit.startsWith(stryMutAct_9fa48("1677") ? "" : (stryCov_9fa48("1677"), "day")))) return stryMutAct_9fa48("1678") ? n / dayMs : (stryCov_9fa48("1678"), n * dayMs);
    return null;
  }
}

// Compute an expiration timestamp (ms) for a request. Priority:
//   1. form.endDate if explicitly set
//   2. form.effectiveDate + parsed form.term
//   3. createdAt + parsed form.term (last-resort fallback)
export function getExpirationTs(rec) {
  if (stryMutAct_9fa48("1679")) {
    {}
  } else {
    stryCov_9fa48("1679");
    if (stryMutAct_9fa48("1682") ? false : stryMutAct_9fa48("1681") ? true : stryMutAct_9fa48("1680") ? rec : (stryCov_9fa48("1680", "1681", "1682"), !rec)) return null;
    const form = stryMutAct_9fa48("1685") ? rec.form && {} : stryMutAct_9fa48("1684") ? false : stryMutAct_9fa48("1683") ? true : (stryCov_9fa48("1683", "1684", "1685"), rec.form || {});
    if (stryMutAct_9fa48("1687") ? false : stryMutAct_9fa48("1686") ? true : (stryCov_9fa48("1686", "1687"), form.endDate)) {
      if (stryMutAct_9fa48("1688")) {
        {}
      } else {
        stryCov_9fa48("1688");
        const t = Date.parse(form.endDate);
        if (stryMutAct_9fa48("1691") ? false : stryMutAct_9fa48("1690") ? true : stryMutAct_9fa48("1689") ? isNaN(t) : (stryCov_9fa48("1689", "1690", "1691"), !isNaN(t))) return t;
      }
    }
    const ms = parseTermToMs(form.term);
    if (stryMutAct_9fa48("1694") ? false : stryMutAct_9fa48("1693") ? true : stryMutAct_9fa48("1692") ? ms : (stryCov_9fa48("1692", "1693", "1694"), !ms)) return null;
    let base = null;
    if (stryMutAct_9fa48("1696") ? false : stryMutAct_9fa48("1695") ? true : (stryCov_9fa48("1695", "1696"), form.effectiveDate)) {
      if (stryMutAct_9fa48("1697")) {
        {}
      } else {
        stryCov_9fa48("1697");
        const t = Date.parse(form.effectiveDate);
        if (stryMutAct_9fa48("1700") ? false : stryMutAct_9fa48("1699") ? true : stryMutAct_9fa48("1698") ? isNaN(t) : (stryCov_9fa48("1698", "1699", "1700"), !isNaN(t))) base = t;
      }
    }
    if (stryMutAct_9fa48("1703") ? base === null || rec.createdAt : stryMutAct_9fa48("1702") ? false : stryMutAct_9fa48("1701") ? true : (stryCov_9fa48("1701", "1702", "1703"), (stryMutAct_9fa48("1705") ? base !== null : stryMutAct_9fa48("1704") ? true : (stryCov_9fa48("1704", "1705"), base === null)) && rec.createdAt)) base = rec.createdAt;
    if (stryMutAct_9fa48("1708") ? base !== null : stryMutAct_9fa48("1707") ? false : stryMutAct_9fa48("1706") ? true : (stryCov_9fa48("1706", "1707", "1708"), base === null)) return null;
    return stryMutAct_9fa48("1709") ? base - ms : (stryCov_9fa48("1709"), base + ms);
  }
}
export function formatExpirationDate(rec) {
  if (stryMutAct_9fa48("1710")) {
    {}
  } else {
    stryCov_9fa48("1710");
    const t = getExpirationTs(rec);
    if (stryMutAct_9fa48("1713") ? false : stryMutAct_9fa48("1712") ? true : stryMutAct_9fa48("1711") ? t : (stryCov_9fa48("1711", "1712", "1713"), !t)) return stryMutAct_9fa48("1714") ? "" : (stryCov_9fa48("1714"), "—");
    return new Date(t).toLocaleDateString(stryMutAct_9fa48("1715") ? "" : (stryCov_9fa48("1715"), "en-US"), stryMutAct_9fa48("1716") ? {} : (stryCov_9fa48("1716"), {
      year: stryMutAct_9fa48("1717") ? "" : (stryCov_9fa48("1717"), "numeric"),
      month: stryMutAct_9fa48("1718") ? "" : (stryCov_9fa48("1718"), "short"),
      day: stryMutAct_9fa48("1719") ? "" : (stryCov_9fa48("1719"), "numeric")
    }));
  }
}

// Returns true when the record expires within the given window (default 30 days)
// from "now". Archived records are excluded.
export function isExpiringSoon(rec, windowDays = 30) {
  if (stryMutAct_9fa48("1720")) {
    {}
  } else {
    stryCov_9fa48("1720");
    if (stryMutAct_9fa48("1723") ? !rec && rec.status === "Archived" : stryMutAct_9fa48("1722") ? false : stryMutAct_9fa48("1721") ? true : (stryCov_9fa48("1721", "1722", "1723"), (stryMutAct_9fa48("1724") ? rec : (stryCov_9fa48("1724"), !rec)) || (stryMutAct_9fa48("1726") ? rec.status !== "Archived" : stryMutAct_9fa48("1725") ? false : (stryCov_9fa48("1725", "1726"), rec.status === (stryMutAct_9fa48("1727") ? "" : (stryCov_9fa48("1727"), "Archived")))))) return stryMutAct_9fa48("1728") ? true : (stryCov_9fa48("1728"), false);
    const t = getExpirationTs(rec);
    if (stryMutAct_9fa48("1731") ? false : stryMutAct_9fa48("1730") ? true : stryMutAct_9fa48("1729") ? t : (stryCov_9fa48("1729", "1730", "1731"), !t)) return stryMutAct_9fa48("1732") ? true : (stryCov_9fa48("1732"), false);
    const now = Date.now();
    const window = stryMutAct_9fa48("1733") ? windowDays * 24 * 60 * 60 / 1000 : (stryCov_9fa48("1733"), (stryMutAct_9fa48("1734") ? windowDays * 24 * 60 / 60 : (stryCov_9fa48("1734"), (stryMutAct_9fa48("1735") ? windowDays * 24 / 60 : (stryCov_9fa48("1735"), (stryMutAct_9fa48("1736") ? windowDays / 24 : (stryCov_9fa48("1736"), windowDays * 24)) * 60)) * 60)) * 1000);
    return stryMutAct_9fa48("1739") ? t >= now || t - now <= window : stryMutAct_9fa48("1738") ? false : stryMutAct_9fa48("1737") ? true : (stryCov_9fa48("1737", "1738", "1739"), (stryMutAct_9fa48("1742") ? t < now : stryMutAct_9fa48("1741") ? t > now : stryMutAct_9fa48("1740") ? true : (stryCov_9fa48("1740", "1741", "1742"), t >= now)) && (stryMutAct_9fa48("1745") ? t - now > window : stryMutAct_9fa48("1744") ? t - now < window : stryMutAct_9fa48("1743") ? true : (stryCov_9fa48("1743", "1744", "1745"), (stryMutAct_9fa48("1746") ? t + now : (stryCov_9fa48("1746"), t - now)) <= window)));
  }
}
export function isExpired(rec) {
  if (stryMutAct_9fa48("1747")) {
    {}
  } else {
    stryCov_9fa48("1747");
    if (stryMutAct_9fa48("1750") ? false : stryMutAct_9fa48("1749") ? true : stryMutAct_9fa48("1748") ? rec : (stryCov_9fa48("1748", "1749", "1750"), !rec)) return stryMutAct_9fa48("1751") ? true : (stryCov_9fa48("1751"), false);
    const t = getExpirationTs(rec);
    if (stryMutAct_9fa48("1754") ? false : stryMutAct_9fa48("1753") ? true : stryMutAct_9fa48("1752") ? t : (stryCov_9fa48("1752", "1753", "1754"), !t)) return stryMutAct_9fa48("1755") ? true : (stryCov_9fa48("1755"), false);
    return stryMutAct_9fa48("1759") ? t >= Date.now() : stryMutAct_9fa48("1758") ? t <= Date.now() : stryMutAct_9fa48("1757") ? false : stryMutAct_9fa48("1756") ? true : (stryCov_9fa48("1756", "1757", "1758", "1759"), t < Date.now());
  }
}
export function getExpiringRequests(windowDays = 30) {
  if (stryMutAct_9fa48("1760")) {
    {}
  } else {
    stryCov_9fa48("1760");
    return stryMutAct_9fa48("1761") ? getRequests() : (stryCov_9fa48("1761"), getRequests().filter(stryMutAct_9fa48("1762") ? () => undefined : (stryCov_9fa48("1762"), r => isExpiringSoon(r, windowDays))));
  }
}

// ---- derived metrics ----
export function getStatusCounts() {
  if (stryMutAct_9fa48("1763")) {
    {}
  } else {
    stryCov_9fa48("1763");
    const counts = Object.fromEntries(STATUSES.map(stryMutAct_9fa48("1764") ? () => undefined : (stryCov_9fa48("1764"), s => stryMutAct_9fa48("1765") ? [] : (stryCov_9fa48("1765"), [s, 0]))));
    for (const r of getRequests()) {
      if (stryMutAct_9fa48("1766")) {
        {}
      } else {
        stryCov_9fa48("1766");
        if (stryMutAct_9fa48("1769") ? counts[r.status] === undefined : stryMutAct_9fa48("1768") ? false : stryMutAct_9fa48("1767") ? true : (stryCov_9fa48("1767", "1768", "1769"), counts[r.status] !== undefined)) stryMutAct_9fa48("1770") ? counts[r.status]-- : (stryCov_9fa48("1770"), counts[r.status]++);
      }
    }
    return counts;
  }
}
export function getTaskCounts() {
  if (stryMutAct_9fa48("1771")) {
    {}
  } else {
    stryCov_9fa48("1771");
    const list = getTasks();
    return stryMutAct_9fa48("1772") ? {} : (stryCov_9fa48("1772"), {
      total: list.length,
      open: stryMutAct_9fa48("1773") ? list.length : (stryCov_9fa48("1773"), list.filter(stryMutAct_9fa48("1774") ? () => undefined : (stryCov_9fa48("1774"), t => stryMutAct_9fa48("1777") ? t.status === "Open" && t.status === "In Progress" : stryMutAct_9fa48("1776") ? false : stryMutAct_9fa48("1775") ? true : (stryCov_9fa48("1775", "1776", "1777"), (stryMutAct_9fa48("1779") ? t.status !== "Open" : stryMutAct_9fa48("1778") ? false : (stryCov_9fa48("1778", "1779"), t.status === (stryMutAct_9fa48("1780") ? "" : (stryCov_9fa48("1780"), "Open")))) || (stryMutAct_9fa48("1782") ? t.status !== "In Progress" : stryMutAct_9fa48("1781") ? false : (stryCov_9fa48("1781", "1782"), t.status === (stryMutAct_9fa48("1783") ? "" : (stryCov_9fa48("1783"), "In Progress"))))))).length),
      overdue: stryMutAct_9fa48("1784") ? list.length : (stryCov_9fa48("1784"), list.filter(stryMutAct_9fa48("1785") ? () => undefined : (stryCov_9fa48("1785"), t => stryMutAct_9fa48("1788") ? t.status !== "Overdue" : stryMutAct_9fa48("1787") ? false : stryMutAct_9fa48("1786") ? true : (stryCov_9fa48("1786", "1787", "1788"), t.status === (stryMutAct_9fa48("1789") ? "" : (stryCov_9fa48("1789"), "Overdue"))))).length),
      completed: stryMutAct_9fa48("1790") ? list.length : (stryCov_9fa48("1790"), list.filter(stryMutAct_9fa48("1791") ? () => undefined : (stryCov_9fa48("1791"), t => stryMutAct_9fa48("1794") ? t.status !== "Completed" : stryMutAct_9fa48("1793") ? false : stryMutAct_9fa48("1792") ? true : (stryCov_9fa48("1792", "1793", "1794"), t.status === (stryMutAct_9fa48("1795") ? "" : (stryCov_9fa48("1795"), "Completed"))))).length)
    });
  }
}
export function getHighRiskCount() {
  if (stryMutAct_9fa48("1796")) {
    {}
  } else {
    stryCov_9fa48("1796");
    return stryMutAct_9fa48("1797") ? getRequests().length : (stryCov_9fa48("1797"), getRequests().filter(stryMutAct_9fa48("1798") ? () => undefined : (stryCov_9fa48("1798"), r => stryMutAct_9fa48("1801") ? r.risk !== "High" : stryMutAct_9fa48("1800") ? false : stryMutAct_9fa48("1799") ? true : (stryCov_9fa48("1799", "1800", "1801"), r.risk === (stryMutAct_9fa48("1802") ? "" : (stryCov_9fa48("1802"), "High"))))).length);
  }
}
export function getRecordTypeCounts() {
  if (stryMutAct_9fa48("1803")) {
    {}
  } else {
    stryCov_9fa48("1803");
    const counts = Object.fromEntries(RECORD_TYPES.map(stryMutAct_9fa48("1804") ? () => undefined : (stryCov_9fa48("1804"), t => stryMutAct_9fa48("1805") ? [] : (stryCov_9fa48("1805"), [t, 0]))));
    for (const r of getRequests()) {
      if (stryMutAct_9fa48("1806")) {
        {}
      } else {
        stryCov_9fa48("1806");
        const k = stryMutAct_9fa48("1809") ? r.recordType && "Non-Disclosure Agreement (NDA)" : stryMutAct_9fa48("1808") ? false : stryMutAct_9fa48("1807") ? true : (stryCov_9fa48("1807", "1808", "1809"), r.recordType || (stryMutAct_9fa48("1810") ? "" : (stryCov_9fa48("1810"), "Non-Disclosure Agreement (NDA)")));
        if (stryMutAct_9fa48("1813") ? counts[k] !== undefined : stryMutAct_9fa48("1812") ? false : stryMutAct_9fa48("1811") ? true : (stryCov_9fa48("1811", "1812", "1813"), counts[k] === undefined)) counts[k] = 0;
        stryMutAct_9fa48("1814") ? counts[k]-- : (stryCov_9fa48("1814"), counts[k]++);
      }
    }
    return counts;
  }
}
export function getRequestsByStatus(status) {
  if (stryMutAct_9fa48("1815")) {
    {}
  } else {
    stryCov_9fa48("1815");
    return stryMutAct_9fa48("1816") ? getRequests() : (stryCov_9fa48("1816"), getRequests().filter(stryMutAct_9fa48("1817") ? () => undefined : (stryCov_9fa48("1817"), r => stryMutAct_9fa48("1820") ? r.status !== status : stryMutAct_9fa48("1819") ? false : stryMutAct_9fa48("1818") ? true : (stryCov_9fa48("1818", "1819", "1820"), r.status === status))));
  }
}
export function getRequestsByRecordType(recordType) {
  if (stryMutAct_9fa48("1821")) {
    {}
  } else {
    stryCov_9fa48("1821");
    return stryMutAct_9fa48("1822") ? getRequests() : (stryCov_9fa48("1822"), getRequests().filter(stryMutAct_9fa48("1823") ? () => undefined : (stryCov_9fa48("1823"), r => stryMutAct_9fa48("1826") ? (r.recordType || "Non-Disclosure Agreement (NDA)") !== recordType : stryMutAct_9fa48("1825") ? false : stryMutAct_9fa48("1824") ? true : (stryCov_9fa48("1824", "1825", "1826"), (stryMutAct_9fa48("1829") ? r.recordType && "Non-Disclosure Agreement (NDA)" : stryMutAct_9fa48("1828") ? false : stryMutAct_9fa48("1827") ? true : (stryCov_9fa48("1827", "1828", "1829"), r.recordType || (stryMutAct_9fa48("1830") ? "" : (stryCov_9fa48("1830"), "Non-Disclosure Agreement (NDA)")))) === recordType))));
  }
}