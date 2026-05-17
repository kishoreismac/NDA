// Repository chatbot — answers natural-language queries about the NDA
// portfolio AND drills into a specific record (summary, purpose,
// counterparty, expiry, risk, signature status, renewal, clauses).
// No external LLM call — deterministic intent matching.

import { getRequests } from "./requestStore";
import { getGeneratedDocs } from "./auditTrail";
import {
  findRecordByMention,
  summarizeRecord,
  renderRecordAsText,
} from "./aiRepo";
import { analyzeContract } from "./aiAnalysis";

const STATUSES = [
  "In Review",
  "Approved",
  "Awaiting Signature",
  "Signed",
  "Archived",
];

// Per-record sub-intents — ORDER MATTERS, most specific first.
function recordSubIntent(q) {
  const s = q.toLowerCase();

  // --- specific field requests (must run before generic "what is" / summary) ---
  if (
    /(expir(y|es|ation|ing)?|end\s+date|valid\s+until|valid\s+through|when\s+(does|will).*(end|expir|finish)|until\s+when)/.test(
      s
    )
  )
    return "expiry";
  if (/(renew|renewal|extend|extension|auto[-\s]?renew)/.test(s))
    return "renewal";
  if (
    /(effective\s+date|start\s+date|commencement|begins?|begin\s+date|kick[-\s]?off)/.test(
      s
    )
  )
    return "effectiveDate";
  if (/(\bterm\b|duration|period|how\s+long)/.test(s)) return "term";
  if (/(survival|survive)/.test(s)) return "survival";
  if (/(govern(ing)?\s+law|applicable\s+law|law\s+of)/.test(s))
    return "governingLaw";
  if (/(jurisdiction|venue|court|forum)/.test(s)) return "jurisdiction";
  if (/(status|state|stage|where.*(is|stand)|current\s+status)/.test(s))
    return "status";
  if (
    /(sign(ed|ature|atories|er)?|who\s+signed|when.*signed|fully\s+executed|executed)/.test(
      s
    )
  )
    return "signature";
  if (/(risk|risky|risk\s+score|score|highlight|red\s*flag|issue)/.test(s))
    return "risk";
  if (/(owner|owned\s+by|assigned\s+to|responsible|in\s+charge)/.test(s))
    return "owner";
  if (/(type|kind|category|mutual|one[-\s]?way|unilateral)/.test(s))
    return "type";
  if (
    /(counterparty|other\s+party|with\s+whom|\bparty\b|contact|email|address|company\s+name|who\s+is)/.test(
      s
    )
  )
    return "counterparty";
  if (/(purpose|why|reason|business\s+purpose|use\s+case|for\s+what)/.test(s))
    return "purpose";
  if (/(confidential\s+information|what\s+(info|information)|scope\s+of\s+confidential)/.test(s))
    return "confidentialInformation";
  if (
    /(clause|provision|paragraph|section|obligat|return|destroy|equitable|remed)/.test(
      s
    )
  )
    return "clause";
  if (/(text|full\s+text|content|body|read.*document|show.*document)/.test(s))
    return "fulltext";

  // --- generic summary catch-all (LAST) ---
  if (
    /(summary|summari[sz]e|overview|brief|tell\s+me\s+about|what\s+is|details|info\b|information)/.test(
      s
    )
  )
    return "summary";

  return "summary";
}

function intent(q) {
  const s = q.toLowerCase();
  if (/(how many|count|number of)/.test(s)) return "count";
  if (/(expir|renew|ending|expir(ing|ation))/.test(s) && !/specific|nda-/i.test(s))
    return "expiring";
  if (/(high\s+risk|risky|risk score|risk level)/.test(s) && !/nda-/i.test(s))
    return "risk";
  if (/(awaiting|pending\s+sign|out\s+for\s+sign)/.test(s)) return "awaiting";
  if (/(signed|complete[d]?)/.test(s) && !/un\s?signed/.test(s) && !/nda-/i.test(s))
    return "signed";
  if (/(owner|owned by|assigned to|my)/.test(s) && !/nda-/i.test(s))
    return "owner";
  if (/(template|type)\b/.test(s) && !/nda-/i.test(s)) return "type";
  if (/(latest|recent|most recent|last\s+\d+)/.test(s)) return "recent";
  if (/(summary|overview|portfolio|dashboard)/.test(s) && !/nda-/i.test(s))
    return "summary";
  return "search";
}

function matchStatus(q) {
  return STATUSES.find((st) => q.toLowerCase().includes(st.toLowerCase()));
}

function formatRow(r) {
  return {
    id: r.id,
    title: r.title,
    type: r.type,
    risk: r.risk,
    status: r.status,
    owner: r.owner,
    counterparty: r.counterparty || r.form?.counterpartyName || "—",
  };
}

// Answer a question that targets a specific record.
function answerRecord(record, q) {
  const sum = summarizeRecord(record);
  const sub = recordSubIntent(q);
  const lower = q.toLowerCase();

  if (sub === "summary") {
    return {
      kind: "record",
      text: `Here is a summary of ${sum.id} — ${sum.title}.`,
      record: sum,
    };
  }
  if (sub === "purpose") {
    return {
      kind: "record-field",
      text: sum.purpose
        ? `Purpose of ${sum.id}: ${sum.purpose}`
        : `No purpose recorded for ${sum.id}.`,
      label: "Business Purpose",
      value: sum.purpose || "—",
      record: sum,
    };
  }
  if (sub === "counterparty") {
    return {
      kind: "record-counterparty",
      text: `Counterparty for ${sum.id} is ${
        sum.counterparty.name || "not recorded"
      }.`,
      record: sum,
    };
  }
  if (sub === "expiry") {
    const days =
      sum.daysToExpiry === null
        ? "unknown"
        : sum.daysToExpiry < 0
        ? `expired ${Math.abs(sum.daysToExpiry)} day(s) ago`
        : `${sum.daysToExpiry} day(s) from today`;
    const headline =
      sum.expiry && sum.expiry !== "—"
        ? `${sum.id} expires on ${sum.expiry} (${days}).`
        : `Expiry for ${sum.id} cannot be computed — effective date or term is missing.`;
    return {
      kind: "record-field",
      text: headline,
      label: "Expiry Date",
      value: sum.expiry || "—",
      record: sum,
    };
  }
  if (sub === "effectiveDate") {
    return {
      kind: "record-field",
      text: sum.effectiveDate
        ? `${sum.id} effective date: ${sum.effectiveDate}.`
        : `No effective date recorded for ${sum.id}.`,
      label: "Effective Date",
      value: sum.effectiveDate || "—",
      record: sum,
    };
  }
  if (sub === "term") {
    return {
      kind: "record-field",
      text: sum.term
        ? `${sum.id} term: ${sum.term}.`
        : `No term recorded for ${sum.id}.`,
      label: "Term",
      value: sum.term || "—",
      record: sum,
    };
  }
  if (sub === "survival") {
    return {
      kind: "record-field",
      text: sum.survival
        ? `${sum.id} survival: ${sum.survival}.`
        : `No survival period recorded for ${sum.id}.`,
      label: "Survival",
      value: sum.survival || "—",
      record: sum,
    };
  }
  if (sub === "governingLaw") {
    return {
      kind: "record-field",
      text: sum.governingLaw
        ? `${sum.id} is governed by ${sum.governingLaw}.`
        : `No governing law recorded for ${sum.id}.`,
      label: "Governing Law",
      value: sum.governingLaw || "—",
      record: sum,
    };
  }
  if (sub === "jurisdiction") {
    return {
      kind: "record-field",
      text: sum.jurisdiction
        ? `${sum.id} jurisdiction: ${sum.jurisdiction}.`
        : `No jurisdiction recorded for ${sum.id}.`,
      label: "Jurisdiction",
      value: sum.jurisdiction || "—",
      record: sum,
    };
  }
  if (sub === "status") {
    return {
      kind: "record-field",
      text: `${sum.id} is currently in status: ${sum.status}.`,
      label: "Status",
      value: sum.status,
      record: sum,
    };
  }
  if (sub === "owner") {
    return {
      kind: "record-field",
      text: sum.owner
        ? `${sum.id} is owned by ${sum.owner}.`
        : `${sum.id} has no assigned owner.`,
      label: "Owner",
      value: sum.owner || "—",
      record: sum,
    };
  }
  if (sub === "type") {
    return {
      kind: "record-field",
      text: `${sum.id} is a ${sum.type} NDA.`,
      label: "Type",
      value: sum.type || "—",
      record: sum,
    };
  }
  if (sub === "confidentialInformation") {
    return {
      kind: "record-field",
      text: sum.confidentialInformation
        ? `${sum.id} confidential information scope:`
        : `No confidential-information scope recorded for ${sum.id}.`,
      label: "Confidential Information",
      value: sum.confidentialInformation || "—",
      record: sum,
    };
  }
  if (sub === "renewal") {
    return {
      kind: "record-field",
      text:
        sum.renewalDue
          ? `${sum.id} renewal is due — expires in ${sum.daysToExpiry} day(s) on ${sum.expiry}.`
          : sum.daysToExpiry !== null
          ? `${sum.id} renewal not yet due. Expires ${sum.expiry} (${sum.daysToExpiry} day(s) away).`
          : `Cannot compute renewal for ${sum.id} — missing effective date or term.`,
      label: "Renewal",
      value: sum.renewalDue
        ? `Due in ${sum.daysToExpiry} day(s)`
        : sum.daysToExpiry !== null
        ? `${sum.daysToExpiry} day(s) away`
        : "—",
      record: sum,
    };
  }
  if (sub === "signature") {
    return {
      kind: "record-field",
      text: `${sum.id} signature status: ${sum.signatureStatus}.`,
      label: "Signature",
      value: sum.signatureStatus,
      record: sum,
    };
  }
  if (sub === "risk") {
    // Run live analysis on the rendered document
    const text = renderRecordAsText(record);
    const r = analyzeContract(text);
    const top = r.ok
      ? r.findings.slice(0, 5).map((f) => `• [${f.severity}] ${f.label}`)
      : [];
    return {
      kind: "record-risk",
      text: `Risk highlights for ${sum.id}:`,
      record: sum,
      analysis: r.ok
        ? {
            score: r.score,
            riskLevel: r.riskLevel,
            counts: r.counts,
            top,
          }
        : null,
    };
  }
  if (sub === "clause") {
    const text = renderRecordAsText(record);
    // Find paragraph(s) most relevant to the keywords in the question
    const want = lower.match(
      /(govern(ing)?\s+law|jurisdiction|term|survival|confidential|obligat|return|destroy|equitable|remed)/g
    );
    const needles = want ? Array.from(new Set(want)) : [];
    const paras = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    const matches = paras
      .filter((p) => needles.some((n) => p.toLowerCase().includes(n)))
      .slice(0, 3);
    return {
      kind: "record-clauses",
      text: matches.length
        ? `Relevant clause(s) from ${sum.id}:`
        : `No specific clause matched in ${sum.id} — showing summary:`,
      record: sum,
      clauses: matches,
    };
  }
  if (sub === "fulltext") {
    const text = renderRecordAsText(record);
    return {
      kind: "record-text",
      text: `Full rendered text of ${sum.id}:`,
      record: sum,
      body: text,
    };
  }
  return {
    kind: "record",
    text: `Here is what I know about ${sum.id}:`,
    record: sum,
  };
}

export function answer(q) {
  // Per-record question takes priority
  const target = findRecordByMention(q);
  if (target) {
    return answerRecord(target, q);
  }

  const requests = getRequests();
  const docs = getGeneratedDocs();
  const k = intent(q);
  const lower = (q || "").toLowerCase();

  if (k === "count") {
    const st = matchStatus(q);
    const rows = st ? requests.filter((r) => r.status === st) : requests;
    return {
      kind: "count",
      text: st
        ? `There are ${rows.length} NDA(s) in status "${st}".`
        : `You have ${requests.length} NDA(s) in the repository.`,
      rows: rows.slice(0, 10).map(formatRow),
    };
  }

  if (k === "expiring") {
    const m = lower.match(/(\d{1,3})\s*(day|week|month)/);
    let windowDays = 90;
    if (m) {
      const n = parseInt(m[1], 10);
      windowDays = m[2] === "day" ? n : m[2] === "week" ? n * 7 : n * 30;
    }
    const now = Date.now();
    // Use summarizeRecord to compute expiry from effectiveDate + term
    const rows = requests
      .map((r) => ({ r, sum: summarizeRecord(r) }))
      .filter(({ sum }) => sum && sum.daysToExpiry !== null)
      .filter(({ sum }) => sum.daysToExpiry >= 0 && sum.daysToExpiry <= windowDays)
      .map(({ r }) => r);
    return {
      kind: "list",
      text: `${rows.length} NDA(s) expiring in the next ${windowDays} days.`,
      rows: rows.map(formatRow),
    };
  }

  if (k === "risk") {
    const rows = requests.filter((r) => r.risk === "High");
    return {
      kind: "list",
      text: `${rows.length} high-risk NDA(s) in the portfolio.`,
      rows: rows.map(formatRow),
    };
  }

  if (k === "awaiting") {
    const rows = requests.filter((r) => r.status === "Awaiting Signature");
    return {
      kind: "list",
      text: `${rows.length} NDA(s) currently awaiting counter-signature.`,
      rows: rows.map(formatRow),
    };
  }

  if (k === "signed") {
    const rows = requests.filter((r) => r.status === "Signed");
    return {
      kind: "list",
      text: `${rows.length} NDA(s) have been fully signed.`,
      rows: rows.map(formatRow),
    };
  }

  if (k === "owner") {
    const owners = {};
    requests.forEach((r) => {
      const o = r.owner || "Unassigned";
      owners[o] = (owners[o] || 0) + 1;
    });
    const list = Object.entries(owners)
      .map(([owner, count]) => ({ owner, count }))
      .sort((a, b) => b.count - a.count);
    return {
      kind: "owners",
      text: `Top owners across ${requests.length} NDA(s):`,
      owners: list,
    };
  }

  if (k === "type") {
    const types = {};
    requests.forEach((r) => {
      const t = r.type || "Unknown";
      types[t] = (types[t] || 0) + 1;
    });
    return {
      kind: "types",
      text: `NDA distribution by type:`,
      types: Object.entries(types)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count),
    };
  }

  if (k === "recent") {
    const m = lower.match(/last\s+(\d+)/);
    const n = m ? parseInt(m[1], 10) : 5;
    const rows = [...requests]
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, n);
    return {
      kind: "list",
      text: `Most recent ${rows.length} NDA(s):`,
      rows: rows.map(formatRow),
    };
  }

  if (k === "summary") {
    const counts = {};
    STATUSES.forEach((s) => {
      counts[s] = requests.filter((r) => r.status === s).length;
    });
    const high = requests.filter((r) => r.risk === "High").length;
    return {
      kind: "summary",
      text: `Portfolio overview:`,
      stats: {
        total: requests.length,
        signed: counts["Signed"] || 0,
        awaiting: counts["Awaiting Signature"] || 0,
        inReview: counts["In Review"] || 0,
        approved: counts["Approved"] || 0,
        archived: counts["Archived"] || 0,
        highRisk: high,
        generatedDocs: docs.length,
      },
    };
  }

  // Fallback: keyword search across id/title/owner/type/counterparty
  const s = lower;
  const rows = requests.filter((r) =>
    [r.id, r.title, r.owner, r.type, r.counterparty, r.form?.counterpartyName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(s)
  );
  return {
    kind: "list",
    text:
      rows.length === 0
        ? `No NDAs matched "${q}". Try mentioning an NDA ID (e.g. "summary of NDA-2041"), a counterparty name, or ask "portfolio summary".`
        : `${rows.length} NDA(s) matching "${q}":`,
    rows: rows.slice(0, 12).map(formatRow),
  };
}

export const SUGGESTED_PROMPTS = [
  "Show portfolio summary",
  "Expiry date of NDA-2041",
  "Status of NDA-2041",
  "Counterparty of NDA-2041",
  "Signature status of NDA-2041",
  "Governing law of NDA-2041",
  "Purpose of NDA-2041",
  "Risk highlights for NDA-2041",
  "Renewal for NDA-2041",
  "List high-risk NDAs",
  "Expiring in 90 days",
  "Awaiting signature",
];
