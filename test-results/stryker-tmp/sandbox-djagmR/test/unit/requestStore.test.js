// @ts-nocheck
import { describe, expect, it } from "vitest";
import {
  getRequests,
  getRequestsByStatus,
  getStatusCounts,
  hydrateFormFromRecord,
  normalizeStatus,
  setRequestStatus,
  upsertRequest,
} from "../../lib/requestStore";

describe("repository status and dashboard metrics", () => {
  it("normalizes legacy statuses into the canonical CLM workflow", () => {
    expect(normalizeStatus("Draft")).toBe("In Review");
    expect(normalizeStatus("Rejected")).toBe("Archived");
    expect(normalizeStatus("Signed")).toBe("Signed");
    expect(normalizeStatus()).toBe("In Review");
  });

  it("keeps dashboard status counts aligned with filtered repository records", () => {
    const counts = getStatusCounts();
    for (const status of ["In Review", "Approved", "Awaiting Signature", "Signed", "Archived"]) {
      expect(getRequestsByStatus(status)).toHaveLength(counts[status]);
    }
  });

  it("updates status transitions and audit state through setRequestStatus", () => {
    const record = getRequests()[0];
    const updated = setRequestStatus(record.id, "Approved", "unit test approval");
    expect(updated.status).toBe("Approved");
    expect(getRequestsByStatus("Approved").some((item) => item.id === record.id)).toBe(true);
  });

  it("returns null instead of mutating state for missing records", () => {
    const before = getRequests().length;
    expect(setRequestStatus("NDA-DOES-NOT-EXIST", "Signed")).toBe(null);
    expect(getRequests()).toHaveLength(before);
  });

  it("keeps unsupported statuses out of canonical dashboard counts", () => {
    upsertRequest({ id: "NDA-UNSUPPORTED", title: "Unsupported Status NDA", status: "Escalated" });
    const counts = getStatusCounts();
    expect(counts.Escalated).toBeUndefined();
    expect(Object.values(counts).reduce((sum, count) => sum + count, 0)).toBe(getRequests().length - 1);
  });

  it("hydrates edit forms from stored records without opening a blank NDA", () => {
    const record = upsertRequest({
      id: "NDA-9001",
      title: "Globex â€” Security Review",
      owner: "Maya Davis",
      type: "One-Way Out",
      form: { counterpartyName: "Globex", purpose: "Security diligence" },
    });

    const form = hydrateFormFromRecord(record);
    expect(form.counterpartyName).toBe("Globex");
    expect(form.purpose).toBe("Security diligence");
    expect(form.companyName).toBe("Contoso Corporation");
    expect(form.direction).toBe("outgoing");
  });
});
