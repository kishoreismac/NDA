// @ts-nocheck
import { describe, expect, it } from "vitest";
import { ACTIONS, can } from "../../lib/permissions";

describe("role permission matrix", () => {
  it("enforces Executive Viewer as view-only", () => {
    expect(can("exec", ACTIONS.PREVIEW)).toBe(true);
    expect(can("exec", ACTIONS.SUBMIT)).toBe(false);
    expect(can("exec", ACTIONS.EDIT)).toBe(false);
    expect(can("exec", ACTIONS.APPROVE)).toBe(false);
    expect(can("exec", ACTIONS.SEND_FOR_SIGN)).toBe(false);
    expect(can("exec", ACTIONS.DELETE)).toBe(false);
    expect(can("exec", ACTIONS.ADMIN)).toBe(false);
  });

  it("allows Admin to perform every defined action", () => {
    for (const action of Object.values(ACTIONS)) {
      expect(can("admin", action), action).toBe(true);
    }
  });

  it("prevents Business User from legal approval, send for sign, and delete", () => {
    expect(can("business", ACTIONS.SUBMIT)).toBe(true);
    expect(can("business", ACTIONS.GENERATE_DRAFT)).toBe(true);
    expect(can("business", ACTIONS.RUN_RISK)).toBe(true);
    expect(can("business", ACTIONS.APPROVE)).toBe(false);
    expect(can("business", ACTIONS.SEND_FOR_SIGN)).toBe(false);
    expect(can("business", ACTIONS.DELETE)).toBe(false);
  });

  it("allows Legal Reviewer review actions but not admin delete", () => {
    expect(can("legal", ACTIONS.APPROVE)).toBe(true);
    expect(can("legal", ACTIONS.REJECT)).toBe(true);
    expect(can("legal", ACTIONS.SEND_FOR_SIGN)).toBe(true);
    expect(can("legal", ACTIONS.EDIT)).toBe(true);
    expect(can("legal", ACTIONS.DELETE)).toBe(false);
    expect(can("legal", ACTIONS.ADMIN)).toBe(false);
  });

  it("denies unknown roles and unknown actions by default", () => {
    expect(can("contractor", ACTIONS.PREVIEW)).toBe(false);
    expect(can("", ACTIONS.PREVIEW)).toBe(false);
    expect(can("admin", "unsupportedAction")).toBe(false);
    expect(can("business")).toBe(false);
  });
});
