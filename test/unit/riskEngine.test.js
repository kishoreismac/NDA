import { describe, expect, it } from "vitest";
import { aiExplanation, computeRisk, recommendClauses, recommendTemplate, recommendWorkflow } from "../../lib/riskEngine";

describe("risk scoring and recommendations", () => {
  it("classifies low, medium, and high risk using weighted answers", () => {
    expect(computeRisk({}).level).toBe("Low");
    expect(computeRisk({ competitor: true, pricingStrategy: true }).level).toBe("Medium");
    expect(computeRisk({ pii: true, crossBorder: true, ma: true, newIp: true }).level).toBe("High");
  });

  it("adds combo flags for privacy, competitor strategy, and M&A/IP combinations", () => {
    const result = computeRisk({ pii: true, crossBorder: true, competitor: true, pricingStrategy: true, ma: true, newIp: true });
    expect(result.flags.map((flag) => flag.id)).toEqual(
      expect.arrayContaining(["combo-pii-cb", "combo-comp-strat", "combo-ma-ip"])
    );
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("recommends stricter templates and workflows for critical patterns", () => {
    expect(recommendTemplate({ ma: true }, "High").id).toBe("t-ma");
    expect(recommendTemplate({ competitor: true }, "Medium").id).toBe("t-strict-mutual");
    expect(recommendWorkflow("High", { pii: true, crossBorder: true, newIp: true })).toEqual(
      expect.arrayContaining(["Privacy Officer + DPO review", "CISO + IP Lead review", "Final CLO sign-off"])
    );
  });

  it("recommends clauses and explanations tied to exact risk signals", () => {
    const answers = { pii: true, crossBorder: true, competitor: true, ma: true };
    const risk = computeRisk(answers);
    const clauses = recommendClauses(answers, risk.level).map((clause) => clause.name);
    expect(clauses).toEqual(expect.arrayContaining(["Data Processing Addendum (DPA)", "Standard Contractual Clauses (SCCs)"]));
    expect(clauses.some((name) => name.includes("Standstill"))).toBe(true);
    expect(aiExplanation(risk.score, risk.level, risk.flags, answers)).toContain("PII + cross-border transfer");
  });
});
