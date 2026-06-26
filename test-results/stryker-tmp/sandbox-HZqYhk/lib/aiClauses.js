// @ts-nocheck
// Clause suggestion + redline engine.
// Inspects a pasted clause, classifies it, and proposes an improved version
// along with a diff-style explanation of what changed and why.
// Deterministic transforms — no external API.

const TEMPLATES = {
  confidentiality: {
    name: "Confidentiality Obligation",
    suggested:
      'The Receiving Party shall (a) hold all Confidential Information in strict confidence using at least the same degree of care it uses to protect its own confidential information of like importance, but in no event less than a reasonable degree of care; (b) use the Confidential Information solely for the Purpose; (c) restrict access to Confidential Information to employees, agents, and contractors who have a need to know and who are bound by written confidentiality obligations no less protective than those set forth herein; and (d) not disclose any Confidential Information to any third party without the Disclosing Party\'s prior written consent.',
    rationale: [
      "Adds explicit 'standard of care' baseline (reasonable degree of care).",
      "Adds need-to-know access restriction.",
      "Requires downstream parties to be bound by equivalent obligations.",
    ],
  },
  term: {
    name: "Term & Survival",
    suggested:
      "This Agreement shall commence on the Effective Date and remain in effect for two (2) years, unless earlier terminated by either Party upon thirty (30) days' prior written notice. The confidentiality obligations set forth herein shall survive termination for an additional three (3) years.",
    rationale: [
      "Specifies a definite two-year term.",
      "Adds 30-day written termination notice.",
      "Adds a 3-year survival period for confidentiality (industry standard).",
    ],
  },
  jurisdiction: {
    name: "Governing Law & Jurisdiction",
    suggested:
      "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, USA, without regard to its conflict of law principles. The Parties consent to the exclusive jurisdiction of the state and federal courts located in Wilmington, Delaware for any dispute arising out of or related to this Agreement.",
    rationale: [
      "Specifies governing law (Delaware, USA — common neutral choice).",
      "Excludes conflict-of-law principles to prevent forum shopping.",
      "Establishes exclusive jurisdiction and venue.",
    ],
  },
  remedies: {
    name: "Equitable Remedies",
    suggested:
      "The Receiving Party acknowledges that any unauthorized disclosure or use of Confidential Information may cause irreparable harm to the Disclosing Party for which monetary damages may be inadequate, and the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law or in equity.",
    rationale: [
      "Acknowledges 'irreparable harm' explicitly.",
      "Adds equitable relief (injunction, specific performance).",
      "Preserves all other available remedies — does not limit damages.",
    ],
  },
  return: {
    name: "Return or Destruction",
    suggested:
      "Upon the Disclosing Party's written request or upon termination of this Agreement, the Receiving Party shall promptly (and in any event within thirty (30) days) return or destroy all Confidential Information in its possession or control, and shall certify such return or destruction in writing signed by an authorized officer.",
    rationale: [
      "Adds a 30-day SLA for compliance.",
      "Adds a written certification requirement signed by an authorized officer.",
    ],
  },
  ip: {
    name: "No License",
    suggested:
      "Nothing in this Agreement shall be construed as granting, by implication, estoppel, or otherwise, any license or right under any patent, copyright, trademark, trade secret, or other intellectual property right of either Party. All Confidential Information remains the sole property of the Disclosing Party.",
    rationale: [
      "Closes implied-license loopholes (estoppel, implication).",
      "Confirms ownership of Confidential Information stays with Disclosing Party.",
    ],
  },
  generic: {
    name: "General Improvement",
    suggested: null,
    rationale: [
      "Tighten ambiguous language (e.g., 'reasonable efforts' → 'commercially reasonable efforts').",
      "Define key capitalized terms before first use.",
      "Add explicit notice and cure provisions for material breaches.",
    ],
  },
};

function classify(text) {
  const t = text.toLowerCase();
  if (/confidential\s+information|receiving\s+party|disclosing\s+party/.test(t))
    if (/(strict\s+confidence|use|disclose|hold)/.test(t))
      return "confidentiality";
  if (/(term|effective|survive|survival|terminat)/.test(t)) return "term";
  if (/(governing\s+law|jurisdiction|venue|courts)/.test(t)) return "jurisdiction";
  if (/(equitable|injunctive|specific\s+performance|irreparable)/.test(t))
    return "remedies";
  if (/(return\s+or\s+destroy|destroy\s+all|return\s+all)/.test(t))
    return "return";
  if (/(no\s+license|intellectual\s+property|patent|copyright|trademark)/.test(t))
    return "ip";
  return "generic";
}

// Heuristic redline: highlight words/phrases the suggestion removes/adds.
function diff(original, suggested) {
  if (!suggested) return null;
  const oTokens = new Set(
    original
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 4)
  );
  const sTokens = new Set(
    suggested
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 4)
  );
  const added = [];
  const removed = [];
  sTokens.forEach((w) => {
    if (!oTokens.has(w)) added.push(w);
  });
  oTokens.forEach((w) => {
    if (!sTokens.has(w)) removed.push(w);
  });
  return { added: added.slice(0, 12), removed: removed.slice(0, 12) };
}

export function suggestClause(clauseText) {
  const text = (clauseText || "").trim();
  if (text.length < 20) {
    return {
      ok: false,
      error:
        "Please paste a clause (at least one sentence) so it can be analyzed.",
    };
  }
  const type = classify(text);
  const tpl = TEMPLATES[type];
  const redline = diff(text, tpl.suggested);
  return {
    ok: true,
    type,
    label: tpl.name,
    original: text,
    suggested: tpl.suggested,
    rationale: tpl.rationale,
    redline,
  };
}

export const CLAUSE_LIBRARY = Object.entries(TEMPLATES)
  .filter(([, v]) => v.suggested)
  .map(([key, v]) => ({
    key,
    name: v.name,
    text: v.suggested,
  }));
