// @ts-nocheck
import { describe, expect, it } from "vitest";
import { completeSignature, getSignatureRequest, sendForSignature, signingUrl } from "../../lib/signatureService";
import { getRequest, upsertRequest } from "../../lib/requestStore";

describe("e-signature status transitions", () => {
  it("requires a valid counterparty email before sending", async () => {
    upsertRequest({
      id: "NDA-9100",
      title: "Missing Email NDA",
      status: "Approved",
      form: { counterpartyName: "No Email LLC" },
    });

    const result = await sendForSignature("NDA-9100");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/email/i);
  });

  it("creates signing token and moves approved NDA to Awaiting Signature", async () => {
    upsertRequest({
      id: "NDA-9101",
      title: "Ready for Signature NDA",
      status: "Approved",
      counterparty: "Acme",
      form: { counterpartyName: "Acme", counterpartyEmail: "signer@acme.com" },
    });

    const result = await sendForSignature("NDA-9101");
    expect(result.ok).toBe(true);
    expect(result.url).toContain(`/sign/${result.token}`);
    expect(getSignatureRequest(result.token)).toMatchObject({ recordId: "NDA-9101", status: "sent" });
    expect(getRequest("NDA-9101").status).toBe("Awaiting Signature");
  });

  it("completes signature once and updates NDA as Signed with signed metadata", async () => {
    upsertRequest({
      id: "NDA-9102",
      title: "Complete Signature NDA",
      status: "Approved",
      counterparty: "Globex",
      templateId: "tpl-standard",
      form: { counterpartyName: "Globex", counterpartyEmail: "signer@globex.com" },
    });
    const sent = await sendForSignature("NDA-9102");
    const signed = await completeSignature(sent.token, {
      signatureName: "Grace Hopper",
      signatureTitle: "General Counsel",
      signatureMethod: "typed",
    });

    expect(signed.ok).toBe(true);
    expect(getSignatureRequest(sent.token).status).toBe("signed");
    expect(getRequest("NDA-9102")).toMatchObject({ status: "Signed", signedBy: "Grace Hopper" });

    const duplicate = await completeSignature(sent.token, {
      signatureName: "Grace Hopper",
      signatureTitle: "General Counsel",
    });
    expect(duplicate.ok).toBe(false);
  });

  it("builds signing URL from browser origin when public app URL is absent", () => {
    expect(signingUrl("sig-unit")).toBe("http://localhost:3000/sign/sig-unit");
  });
});
