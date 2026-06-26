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
      companyAddress: "1 Legal Plaza",
      counterpartyName: "Acme Robotics",
      counterpartyAddress: "500 Innovation Way",
      effectiveDate: "2026-04-01",
      recordTitle: "Project Atlas NDA",
      purpose: "Robotics evaluation",
      confidentialInformation: "robotics source code and test data",
      jurisdiction: "New York, USA",
      governingLaw: "New York",
      term: "two (2) years",
      survival: "five (5) years",
      companySignerName: "Sara Patel",
      companySignerTitle: "General Counsel",
      counterpartySignerName: "Daniel Reeves",
      counterpartySignerTitle: "Chief Legal Officer",
    });

    expect(values.CompanyName).toBe("Contoso Legal");
    expect(values.CompanyAddress).toBe("1 Legal Plaza");
    expect(values.CounterpartyName).toBe("Acme Robotics");
    expect(values.CounterpartyAddress).toBe("500 Innovation Way");
    expect(values.ProjectName).toBe("Project Atlas NDA");
    expect(values.BusinessPurpose).toBe("Robotics evaluation");
    expect(values.ConfidentialInformation).toBe("robotics source code and test data");
    expect(values.Jurisdiction).toBe("New York, USA");
    expect(values.GoverningLaw).toBe("New York");
    expect(values.NDADuration).toBe("two (2) years");
    expect(values.SurvivalPeriod).toBe("five (5) years");
    expect(values.AuthorizedSignerName).toBe("Sara Patel");
    expect(values.AuthorizedSignerTitle).toBe("General Counsel");
    expect(values.CounterpartySignerName).toBe("Daniel Reeves");
    expect(values.CounterpartySignerTitle).toBe("Chief Legal Officer");
    expect(values.EffectiveDate).toBe("April 1, 2026");
  });

  it("uses CLM default placeholder values when optional fields are absent", () => {
    const values = buildPlaceholderValues({});

    expect(values.CompanyName).toBe("Contoso Corporation");
    expect(values.CompanyAddress).toBe("1 Microsoft Way, Redmond, WA 98052, USA");
    expect(values.ConfidentialInformation).toContain("business plans");
    expect(values.Jurisdiction).toBe("Delaware, USA");
    expect(values.GoverningLaw).toBe("Delaware, USA");
    expect(values.NDADuration).toBe("two (2) years");
    expect(values.SurvivalPeriod).toBe("three (3) years");
    expect(values.AuthorizedSignerTitle).toBe("Authorized Signatory");
    expect(values.CounterpartySignerTitle).toBe("Authorized Signatory");
  });

  it("replaces every occurrence and blanks missing values without exposing tokens", () => {
    const text = "{{CompanyName}} and {{CompanyName}} disclose to {{CounterpartyName}}.";
    expect(applyPlaceholders(text, { CompanyName: "Contoso" })).toBe(
      "Contoso and Contoso disclose to ______________________."
    );
    expect(applyPlaceholders("{{CompanyName}}", { CompanyName: "   " })).toBe("______________________");
    expect(applyPlaceholders("", { CompanyName: "Contoso" })).toBe("");
  });

  it("flags required missing placeholder values", () => {
    const values = buildPlaceholderValues({ companyName: "Contoso" });
    const result = validatePlaceholders(template, values);
    expect(result.isValid).toBe(false);
    expect(result.missingRequired.map((item) => item.key)).toContain("CounterpartyName");
    expect(buildMappingSummary(template, values).find((item) => item.key === "CompanyName").status).toBe("Ready");
  });

  it("preserves unknown optional placeholders as mapped summary rows", () => {
    const customTemplate = {
      content: [{ type: "paragraph", text: "{{CompanyName}} discloses to {{UnknownOptionalField}}." }],
    };
    const values = buildPlaceholderValues({ companyName: "Contoso" });
    const summary = buildMappingSummary(customTemplate, values);

    expect(summary.find((item) => item.key === "UnknownOptionalField")).toMatchObject({
      label: "UnknownOptionalField",
      source: "—",
      required: false,
      value: "",
      status: "Optional (blank)",
    });
    expect(validatePlaceholders(customTemplate, values).isValid).toBe(true);
  });
});
