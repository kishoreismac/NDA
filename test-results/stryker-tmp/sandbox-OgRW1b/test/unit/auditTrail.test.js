// @ts-nocheck
import { describe, expect, it } from "vitest";
import { getAuditLog, getDocsForRecord, logAuditEvent, recordGeneratedDoc } from "../../lib/auditTrail";

describe("audit trail and document record storage", () => {
  it("records auditable actions with actor, target, and record id", () => {
    const entry = logAuditEvent({
      actor: "QA Tester",
      action: "Approved NDA",
      target: "NDA-9001",
      recordId: "NDA-9001",
    });

    const log = getAuditLog();
    expect(log[0].id).toBe(entry.id);
    expect(log[0]).toMatchObject({ actor: "QA Tester", action: "Approved NDA", recordId: "NDA-9001" });
  });

  it("stores generated signed document metadata by record id", () => {
    recordGeneratedDoc({
      id: "DOC-SIGNED-UNIT",
      recordId: "NDA-9002",
      recordTitle: "Unit Test NDA",
      signed: true,
      signedBy: "Counterparty Signer",
      generatedAt: Date.now(),
    });

    expect(getDocsForRecord("NDA-9002")).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "DOC-SIGNED-UNIT", signed: true })])
    );
  });
});
