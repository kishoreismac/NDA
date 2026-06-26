import { describe, expect, it } from "vitest";
import {
  formatTimestamp,
  getAuditLog,
  getDocsForRecord,
  getGeneratedDocs,
  logAuditEvent,
  recordGeneratedDoc,
} from "../../lib/auditTrail";

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
    expect(entry.id).toMatch(/^a-/);
  });

  it("defaults actor and sorts audit entries newest first", () => {
    const older = logAuditEvent({
      action: "Older action",
      target: "NDA-OLDER",
      recordId: "NDA-OLDER",
    });
    const newer = logAuditEvent({
      actor: "Legal Reviewer",
      action: "Newer action",
      target: "NDA-NEWER",
      recordId: "NDA-NEWER",
    });

    const log = getAuditLog();
    expect(older.actor).toBe("Sara Patel");
    expect(log.findIndex((item) => item.id === newer.id)).toBeLessThan(
      log.findIndex((item) => item.id === older.id)
    );
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

  it("deduplicates generated documents, sorts newest first, and formats timestamps", () => {
    recordGeneratedDoc({
      id: "DOC-SORTED-UNIT",
      recordId: "NDA-9003",
      recordTitle: "Old Unit NDA",
      generatedAt: Date.parse("2026-01-01T00:00:00Z"),
    });
    recordGeneratedDoc({
      id: "DOC-SORTED-UNIT",
      recordId: "NDA-9003",
      recordTitle: "New Unit NDA",
      generatedAt: Date.parse("2026-02-01T00:00:00Z"),
    });

    const docs = getGeneratedDocs();
    expect(docs.filter((doc) => doc.id === "DOC-SORTED-UNIT")).toHaveLength(1);
    expect(getDocsForRecord("NDA-9003")[0]).toMatchObject({
      recordTitle: "New Unit NDA",
      generatedAt: Date.parse("2026-02-01T00:00:00Z"),
    });
    expect(formatTimestamp(Date.parse("2026-06-26T10:30:00Z"))).toContain("2026");
  });
});
