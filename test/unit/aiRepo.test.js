import { describe, expect, it, vi } from "vitest";
import { findRecordByMention, renderRecordAsText, summarizeRecord } from "../../lib/aiRepo";
import { getRequests } from "../../lib/requestStore";

vi.mock("../../lib/signatureService", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getSignaturesForRecord: vi.fn(() => []),
  };
});

describe("AI repository exact field matching support", () => {
  it("finds records by NDA id, counterparty, and title mention", () => {
    expect(findRecordByMention("What is the expiry for NDA-2041?").id).toBe("NDA-2041");
    expect(findRecordByMention("Tell me about Wayne Enterprises").id).toBe("NDA-2038");
    expect(findRecordByMention("hosting evaluation status").id).toBe("NDA-2039");
  });

  it("summarizes exact repository fields instead of relying on generic text", () => {
    const record = getRequests().find((item) => item.id === "NDA-2039");
    const summary = summarizeRecord(record);
    expect(summary.status).toBe("Approved");
    expect(summary.counterparty).toBe("Hooli Cloud");
    expect(summary.purpose).toContain("Evaluate Hooli Cloud hosting services");
    expect(summary.expiry).not.toBe("â€”");
  });

  it("renders selected NDA template text with placeholders populated", () => {
    const record = getRequests().find((item) => item.id === "NDA-2041");
    const text = renderRecordAsText(record);
    expect(text).toContain("Acme Robotics Inc.");
    expect(text).toContain("Joint research and development collaboration");
    expect(text).not.toContain("{{CounterpartyName}}");
  });
});
