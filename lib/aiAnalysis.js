// Automated contract review + risk scoring.
// Inspects a contract's text against a rules library and returns:
//   - findings   list of flagged issues with severity, category, snippet
//   - score      0-100 (higher = lower risk)
//   - riskLevel  Low | Medium | High
//
// 100% client-side, no external API. Rules library is intentionally compact
// and demo-grade — the same shape can be extended in lib/aiClauses.js.

const RULES = [
  {
    id: "missing-confidentiality-definition",
    label: "Missing 'Confidential Information' definition",
    severity: "high",
    category: "Definitions",
    test: (t) => !/confidential\s+information\s*("|means|shall\s+mean)/i.test(t),
    recommendation:
      "Add an explicit definition of 'Confidential Information' to scope what is protected.",
  },
  {
    id: "missing-term",
    label: "Missing or unclear contract term",
    severity: "high",
    category: "Term",
    test: (t) =>
      !/(term\s+of\s+this\s+agreement|shall\s+remain\s+in\s+effect|effective\s+for)/i.test(
        t
      ),
    recommendation:
      "Add a clear term clause (e.g., 'shall remain in effect for two (2) years').",
  },
  {
    id: "missing-survival",
    label: "No survival clause for confidentiality",
    severity: "high",
    category: "Term",
    test: (t) =>
      !/(survive|survival|continue\s+in\s+effect\s+after\s+termination)/i.test(
        t
      ),
    recommendation:
      "Add a survival period (typically 3–5 years after termination).",
  },
  {
    id: "missing-governing-law",
    label: "No governing law specified",
    severity: "high",
    category: "Jurisdiction",
    test: (t) => !/governed\s+by\s+the\s+laws\s+of/i.test(t),
    recommendation:
      "Specify the governing law jurisdiction (e.g., 'laws of Delaware, USA').",
  },
  {
    id: "missing-jurisdiction",
    label: "No exclusive jurisdiction / venue",
    severity: "medium",
    category: "Jurisdiction",
    test: (t) => !/(jurisdiction|venue)\s+(?:of|in)/i.test(t),
    recommendation:
      "Add an exclusive jurisdiction / venue clause to avoid forum disputes.",
  },
  {
    id: "missing-return-destroy",
    label: "No return or destruction of confidential information",
    severity: "medium",
    category: "Obligations",
    test: (t) => !/(return\s+or\s+destroy|destroy\s+all|return\s+all)/i.test(t),
    recommendation:
      "Add a clause requiring return or destruction of Confidential Information on request or termination.",
  },
  {
    id: "missing-equitable-relief",
    label: "No equitable relief / injunction language",
    severity: "medium",
    category: "Remedies",
    test: (t) => !/(equitable\s+relief|injunctive\s+relief|specific\s+performance)/i.test(t),
    recommendation:
      "Add equitable relief language — monetary damages alone are usually inadequate for breach.",
  },
  {
    id: "missing-no-license",
    label: "No 'No License' clause",
    severity: "low",
    category: "IP",
    test: (t) => !/no\s+license|nothing\s+(?:in\s+this\s+agreement\s+)?shall\s+be\s+construed\s+as\s+granting/i.test(t),
    recommendation:
      "Add a clause clarifying that no IP license is granted by disclosure.",
  },
  {
    id: "missing-third-party",
    label: "No third-party disclosure restriction",
    severity: "medium",
    category: "Obligations",
    test: (t) => !/third\s+party|third\-party/i.test(t),
    recommendation:
      "Add an explicit prohibition on third-party disclosure without prior written consent.",
  },
  {
    id: "unusual-perpetual",
    label: "Perpetual confidentiality term detected",
    severity: "medium",
    category: "Term",
    test: (t) => /perpetual|indefinite|in\s+perpetuity/i.test(t),
    recommendation:
      "Perpetual confidentiality obligations are often unenforceable. Consider capping at 3–7 years.",
  },
  {
    id: "broad-indemnity",
    label: "Broad indemnification language",
    severity: "high",
    category: "Risk",
    test: (t) =>
      /indemnif(y|ication)[^.]{0,200}(any\s+and\s+all|all\s+claims|all\s+losses)/i.test(
        t
      ),
    recommendation:
      "Indemnity scope is very broad. Narrow to direct claims caused by the indemnifying party's breach.",
  },
  {
    id: "missing-signature-block",
    label: "No signature block found",
    severity: "high",
    category: "Execution",
    test: (t) => !/(IN\s+WITNESS\s+WHEREOF|signature[s]?|by:\s*_+)/i.test(t),
    recommendation:
      "Add a signature block with party names, titles, and date lines for execution.",
  },
];

const SEVERITY_WEIGHT = { high: 15, medium: 8, low: 3 };

export function analyzeContract(rawText) {
  const text = (rawText || "").trim();
  if (text.length < 50) {
    return {
      ok: false,
      error: "Please paste at least one full paragraph of contract text.",
    };
  }
  const findings = [];
  for (const rule of RULES) {
    try {
      if (rule.test(text)) {
        findings.push({
          id: rule.id,
          label: rule.label,
          severity: rule.severity,
          category: rule.category,
          recommendation: rule.recommendation,
        });
      }
    } catch {
      // ignore rule errors
    }
  }
  const penalty = findings.reduce(
    (sum, f) => sum + (SEVERITY_WEIGHT[f.severity] || 0),
    0
  );
  const score = Math.max(0, Math.min(100, 100 - penalty));
  const riskLevel = score >= 80 ? "Low" : score >= 55 ? "Medium" : "High";

  const counts = {
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
  };

  return {
    ok: true,
    score,
    riskLevel,
    findings,
    counts,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    checkedRules: RULES.length,
  };
}
