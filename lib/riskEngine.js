// Local "AI" risk engine — simulates scoring, flags, recommendations.

export const riskQuestions = [
  { id: "competitor", label: "Counterparty is or may be a competitor?", weight: 18, category: "Strategic" },
  { id: "ma", label: "Discussions involve M&A, JV, or investment?", weight: 16, category: "Strategic" },
  { id: "international", label: "Counterparty operates internationally?", weight: 6, category: "Geographic" },
  { id: "newIp", label: "New or unreleased IP will be discussed?", weight: 14, category: "IP" },
  { id: "similarProducts", label: "Counterparty has similar products/services?", weight: 12, category: "Strategic" },
  { id: "thirdParty", label: "Third-party confidential information involved?", weight: 10, category: "IP" },
  { id: "pricingStrategy", label: "Pricing, strategy, or roadmap will be shared?", weight: 12, category: "Strategic" },
  { id: "pii", label: "Personally Identifiable Information (PII) shared?", weight: 14, category: "Privacy" },
  { id: "employeeData", label: "Employee data will be shared?", weight: 10, category: "Privacy" },
  { id: "customerData", label: "Customer data will be shared?", weight: 12, category: "Privacy" },
  { id: "largeData", label: "Large data files (>1GB) will be exchanged?", weight: 6, category: "Data" },
  { id: "crossBorder", label: "Cross-border data transfer involved?", weight: 14, category: "Privacy" },
];

export function computeRisk(answers = {}) {
  let score = 0;
  const flags = [];
  const categories = {};

  for (const q of riskQuestions) {
    if (answers[q.id]) {
      score += q.weight;
      flags.push({ id: q.id, label: q.label, category: q.category, weight: q.weight });
      categories[q.category] = (categories[q.category] || 0) + q.weight;
    }
  }

  // Combo amplifiers
  if (answers.pii && answers.crossBorder) {
    score += 8;
    flags.push({ id: "combo-pii-cb", label: "PII + Cross-border transfer (GDPR/Schrems II exposure)", category: "Privacy", weight: 8 });
  }
  if (answers.competitor && answers.pricingStrategy) {
    score += 6;
    flags.push({ id: "combo-comp-strat", label: "Competitor + strategy disclosure", category: "Strategic", weight: 6 });
  }
  if (answers.ma && answers.newIp) {
    score += 6;
    flags.push({ id: "combo-ma-ip", label: "M&A discussions + unreleased IP", category: "IP", weight: 6 });
  }

  score = Math.min(100, score);

  let level = "Low";
  if (score >= 55) level = "High";
  else if (score >= 28) level = "Medium";

  return { score, level, flags, categories };
}

export function recommendTemplate(answers, level) {
  if (answers.ma) return { id: "t-ma", name: "M&A Due Diligence NDA" };
  if (level === "High" || answers.newIp || answers.competitor)
    return { id: "t-strict-mutual", name: "Strict Mutual NDA (IP-heavy)" };
  if (answers.type === "vendor") return { id: "t-vendor", name: "Vendor NDA — Lite" };
  if (answers.direction === "incoming") return { id: "t-incoming", name: "One-Way Incoming v3.0" };
  if (answers.direction === "outgoing") return { id: "t-outgoing", name: "One-Way Outgoing v3.1" };
  return { id: "t-std-mutual", name: "Standard Mutual NDA v4.2" };
}

export function recommendWorkflow(level, answers) {
  const steps = ["Legal Ops triage"];
  if (level === "Low") {
    steps.push("Auto-approve (template match)");
    steps.push("Send for signature");
  } else if (level === "Medium") {
    steps.push("Counsel review (1 reviewer)");
    if (answers.pii) steps.push("Privacy Office sign-off");
    steps.push("Send for signature");
  } else {
    steps.push("Senior Counsel review");
    if (answers.ma) steps.push("CLO approval");
    if (answers.pii || answers.crossBorder) steps.push("Privacy Officer + DPO review");
    if (answers.newIp || answers.competitor) steps.push("CISO + IP Lead review");
    steps.push("Final CLO sign-off");
    steps.push("Send for signature");
  }
  return steps;
}

export function recommendClauses(answers, level) {
  const clauses = [
    { name: "Definition of Confidential Information", strength: "Standard" },
    { name: "Term & Survival (3 years post-termination)", strength: "Standard" },
  ];
  if (answers.newIp || answers.competitor) {
    clauses.push({ name: "Residuals clause — REMOVED", strength: "Strict" });
    clauses.push({ name: "IP non-use / non-derivation", strength: "Strict" });
  }
  if (answers.pii || answers.customerData || answers.employeeData) {
    clauses.push({ name: "Data Processing Addendum (DPA)", strength: "Required" });
    clauses.push({ name: "Breach notification within 48 hours", strength: "Strict" });
  }
  if (answers.crossBorder) {
    clauses.push({ name: "Standard Contractual Clauses (SCCs)", strength: "Required" });
    clauses.push({ name: "Cross-border transfer impact assessment", strength: "Required" });
  }
  if (answers.ma) {
    clauses.push({ name: "Standstill — 12 months", strength: "Strict" });
    clauses.push({ name: "Non-solicitation of employees", strength: "Strict" });
  }
  if (answers.thirdParty) {
    clauses.push({ name: "Third-party confidentiality flow-down", strength: "Required" });
  }
  if (level !== "Low") {
    clauses.push({ name: "Injunctive relief & equitable remedies", strength: "Strict" });
    clauses.push({ name: "Choice of law: Delaware (US) / arbitration ICC", strength: "Standard" });
  }
  return clauses;
}

export function aiExplanation(score, level, flags, answers) {
  const parts = [];
  parts.push(
    `NDAFlow AI analyzed ${flags.length} risk signals across ${
      Object.keys(
        flags.reduce((a, f) => ((a[f.category] = 1), a), {})
      ).length
    } categories.`
  );
  if (level === "High") {
    parts.push(
      "This request is **High Risk** because it combines strategically sensitive disclosures with regulated data and/or M&A context."
    );
  } else if (level === "Medium") {
    parts.push(
      "This request is **Medium Risk** — manageable with standard counsel review and targeted clauses."
    );
  } else {
    parts.push("This request is **Low Risk** and can typically be auto-approved with the standard template.");
  }
  if (answers.pii && answers.crossBorder) {
    parts.push(
      "Privacy exposure is elevated due to PII + cross-border transfer; SCCs and a DPA are recommended."
    );
  }
  if (answers.competitor) {
    parts.push("Competitive overlap detected — recommending strict residuals removal and use restrictions.");
  }
  if (answers.ma) {
    parts.push("M&A context detected — adding standstill and non-solicit, escalating to CLO.");
  }
  parts.push(`Composite risk score: **${score}/100**.`);
  return parts.join(" ");
}

export function generateMockNda({ counterparty, recordTitle, level, clauses, template, jurisdiction = "Delaware, USA" }) {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const cp = counterparty || "[Counterparty Name]";
  const title = recordTitle || "[Engagement Title]";
  const clauseList = clauses
    .map(
      (c, i) =>
        `${i + 1}. ${c.name}${c.strength !== "Standard" ? ` — (${c.strength})` : ""}`
    )
    .join("\n");
  return `MUTUAL NON-DISCLOSURE AGREEMENT
(Generated by NDAFlow AI — ${template?.name || "Standard Template"})

This Non-Disclosure Agreement ("Agreement") is entered into as of ${date} by and between:

  Contoso Corporation, a Delaware corporation ("Contoso"), and
  ${cp} ("Counterparty"),

each a "Party" and collectively the "Parties", in connection with: ${title}.

1. PURPOSE
   The Parties wish to explore a potential business relationship and may disclose
   certain Confidential Information to one another. Risk classification: ${level}.

2. CONFIDENTIAL INFORMATION
   "Confidential Information" means any non-public information disclosed by one
   Party to the other, whether orally, in writing or electronically, that is
   designated as confidential or that reasonably should be understood to be
   confidential given the nature of the information and circumstances of disclosure.

3. OBLIGATIONS
   Each Party shall (a) protect Confidential Information using at least the same
   degree of care it uses for its own confidential information, but no less than a
   reasonable degree of care, and (b) use it solely for the Purpose.

4. RECOMMENDED CLAUSES (auto-inserted by NDAFlow AI)
${clauseList}

5. TERM
   This Agreement shall remain in effect for two (2) years from the Effective Date.
   Confidentiality obligations shall survive for three (3) years thereafter.

6. GOVERNING LAW
   This Agreement shall be governed by the laws of ${jurisdiction}, without regard
   to its conflict of laws principles.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first
written above.

Contoso Corporation                           ${cp}
By: _________________________                 By: _________________________
Name:                                         Name:
Title:                                        Title:
Date:                                         Date:

— END OF DRAFT —
`;
}
