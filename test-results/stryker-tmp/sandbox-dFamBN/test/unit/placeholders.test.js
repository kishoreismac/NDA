// @ts-nocheck
import { describe, expect, it } from "vitest";
import { TEMPLATE_LIBRARY } from "../../lib/templates";
import {
  applyPlaceholders,
  buildMappingSummary,
  buildPlaceholderValues,
  extractPlaceholders,
  validatePlaceholders,
} from "../../lib/placeholders";

describe("template placeholder mapping and validation", () => {
  const template = TEMPLATE_LIBRARY.find((item) => item.id === "tpl-standard");

  it("extracts unique placeholders from template text and signature blocks", () => {
    const placeholders = extractPlaceholders(template);
    expect(placeholders).toContain("CompanyName");
    expect(placeholders).toContain("CounterpartyName");
    expect(placeholders).toContain("AuthorizedSignerTitle");
    expect(new Set(placeholders).size).toBe(placeholders.length);
  });

  it("maps intake form fields to placeholder values", () => {
    const values = buildPlaceholderValues({
      companyName: "Contoso Legal",
      counterpartyName: "Acme Robotics",
      counterpartyAddress: "500 Innovation Way",
      effectiveDate: "2026-04-01",
      purpose: "Robotics evaluation",
      term: "two (2) years",
      companySignerName: "Sara Patel",
      counterpartySignerName: "Daniel Reeves",
    });

    expect(values.CompanyName).toBe("Contoso Legal");
    expect(values.CounterpartyName).toBe("Acme Robotics");
    expect(values.BusinessPurpose).toBe("Robotics evaluation");
    expect(values.EffectiveDate).toBe("April 1, 2026");
  });

  it("replaces every occurrence and blanks missing values without exposing tokens", () => {
    const text = "{{CompanyName}} and {{CompanyName}} disclose to {{CounterpartyName}}.";
    expect(applyPlaceholders(text, { CompanyName: "Contoso" })).toBe(
      "Contoso and Contoso disclose to ______________________."
    );
  });

  it("flags required missing placeholder values", () => {
    const values = buildPlaceholderValues({ companyName: "Contoso" });
    const result = validatePlaceholders(template, values);
    expect(result.isValid).toBe(false);
    expect(result.missingRequired.map((item) => item.key)).toContain("CounterpartyName");
    expect(buildMappingSummary(template, values).find((item) => item.key === "CompanyName").status).toBe("Ready");
  });
});
