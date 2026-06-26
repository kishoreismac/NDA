// @ts-nocheck
import { describe, expect, it } from "vitest";
import { computeEndDate, computeTermFromDates, formatCustomTerm, matchesPreset } from "../../lib/dateMath";
import { formatExpirationDate, getExpirationTs, isExpired, isExpiringSoon, parseTermToMs } from "../../lib/requestStore";

describe("agreement and expiry date calculations", () => {
  it("calculates end date from start date and preset term", () => {
    expect(computeEndDate("2026-01-01", "one (1) year")).toBe("2027-01-01");
    expect(computeEndDate("2026-01-01", "two (2) years")).toBe("2028-01-01");
  });

  it("calculates exact human-readable duration from start and end dates", () => {
    expect(formatCustomTerm("2026-01-15", "2027-04-27")).toBe("1 year 3 months 12 days");
    expect(formatCustomTerm("2026-01-15", "2026-01-15")).toBe("");
  });

  it("maps exact date gaps back to preset terms", () => {
    expect(computeTermFromDates("2026-01-01", "2029-01-01")).toBe("three (3) years");
    expect(matchesPreset("2026-01-01", "2028-01-01")).toBe(true);
  });

  it("rejects invalid or reversed date inputs instead of producing misleading terms", () => {
    expect(computeEndDate("", "one (1) year")).toBe("");
    expect(computeEndDate("2026-01-01", "unsupported term")).toBe("");
    expect(computeTermFromDates("2026-05-01", "2026-04-01")).toBe("");
    expect(formatCustomTerm("not-a-date", "2026-04-01")).toBe("");
    expect(matchesPreset("not-a-date", "2026-04-01")).toBe(false);
  });

  it("parses free-form terms and computes expiration from explicit end date first", () => {
    expect(parseTermToMs("18 months")).toBe(18 * 30 * 24 * 60 * 60 * 1000);
    expect(parseTermToMs("90 days")).toBe(90 * 24 * 60 * 60 * 1000);
    expect(parseTermToMs("no duration")).toBe(null);
    const record = {
      createdAt: Date.parse("2026-01-01"),
      form: { effectiveDate: "2026-02-01", term: "two (2) years", endDate: "2026-12-31" },
    };
    expect(new Date(getExpirationTs(record)).toISOString().slice(0, 10)).toBe("2026-12-31");
  });

  it("excludes archived records from expiring-soon logic", () => {
    const soon = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const record = { status: "Archived", form: { endDate: new Date(soon).toISOString().slice(0, 10) } };
    expect(isExpiringSoon(record, 30)).toBe(false);
    expect(isExpired({ form: { endDate: "2000-01-01" } })).toBe(true);
    expect(formatExpirationDate({ form: { endDate: "2026-12-31" } })).toMatch(/Dec.*31.*2026/);
  });
});
