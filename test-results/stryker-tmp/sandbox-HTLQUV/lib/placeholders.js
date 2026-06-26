// @ts-nocheck
// Placeholder mapping + validation utilities.
// Pure substitution — no AI rewriting.

import { PLACEHOLDER_DEFS } from "./templates";

const PLACEHOLDER_REGEX = /\{\{([A-Za-z0-9_]+)\}\}/g;

export function extractPlaceholders(template) {
  if (!template) return [];
  const found = new Set();
  for (const block of template.content) {
    if (block.text) {
      let m;
      const re = new RegExp(PLACEHOLDER_REGEX.source, "g");
      while ((m = re.exec(block.text)) !== null) found.add(m[1]);
    }
    if (block.parties) {
      for (const p of block.parties) {
        ["party", "name", "title"].forEach((k) => {
          if (!p[k]) return;
          let m;
          const re = new RegExp(PLACEHOLDER_REGEX.source, "g");
          while ((m = re.exec(p[k])) !== null) found.add(m[1]);
        });
      }
    }
  }
  return Array.from(found);
}

// Map intake form values onto placeholder keys.
// `form` is the intake form state object built in the wizard.
export function buildPlaceholderValues(form = {}) {
  const cp = form.counterpartyName || "";
  const company = form.companyName || "Contoso Corporation";
  return {
    CompanyName: company,
    CompanyAddress: form.companyAddress || "1 Microsoft Way, Redmond, WA 98052, USA",
    CounterpartyName: cp,
    CounterpartyAddress: form.counterpartyAddress || "",
    EmployeeName: form.employeeName || "",
    EffectiveDate: form.effectiveDate
      ? formatDate(form.effectiveDate)
      : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    ProjectName: form.recordTitle || form.projectName || "",
    BusinessPurpose: form.purpose || "",
    ConfidentialInformation:
      form.confidentialInformation ||
      "business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential",
    Jurisdiction: form.jurisdiction || "Delaware, USA",
    GoverningLaw: form.governingLaw || form.jurisdiction || "Delaware, USA",
    NDADuration: form.term || "two (2) years",
    SurvivalPeriod: form.survival || "three (3) years",
    AuthorizedSignerName: form.companySignerName || form.recordOwner || "",
    AuthorizedSignerTitle: form.companySignerTitle || "Authorized Signatory",
    CounterpartySignerName: form.counterpartySignerName || form.counterpartyContact || "",
    CounterpartySignerTitle: form.counterpartySignerTitle || "Authorized Signatory",
  };
}

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return d;
  }
}

// Replace placeholders inside a single string.
// Empty / missing values are substituted with a blank legal-style line so the
// resulting document never shows raw `{{Token}}` tokens to a counterparty.
const BLANK_LINE = "______________________";
export function applyPlaceholders(text, values) {
  if (!text) return text;
  return text.replace(PLACEHOLDER_REGEX, (_, key) => {
    const v = values[key];
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return String(v);
    }
    return BLANK_LINE;
  });
}

// Build a mapping summary for the UI: every placeholder used in template
// → label, source field, current value, status.
export function buildMappingSummary(template, values) {
  const used = extractPlaceholders(template);
  return used.map((key) => {
    const def = PLACEHOLDER_DEFS.find((p) => p.key === key);
    const value = values[key];
    const ready = !!value && String(value).trim().length > 0;
    return {
      key,
      label: def?.label || key,
      source: def?.source || "—",
      required: def?.required ?? false,
      value: value || "",
      status: ready ? "Ready" : def?.required ? "Missing" : "Optional (blank)",
    };
  });
}

export function validatePlaceholders(template, values) {
  const summary = buildMappingSummary(template, values);
  const missingRequired = summary.filter((s) => s.required && s.status === "Missing");
  return {
    summary,
    missingRequired,
    isValid: missingRequired.length === 0,
  };
}
