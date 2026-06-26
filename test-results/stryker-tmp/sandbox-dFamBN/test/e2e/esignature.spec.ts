// @ts-nocheck
import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole, expectDownloadFrom } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "legal");
});

async function createSigningLink(page) {
  await gotoApp(page, "/repository?status=Approved");
  await page.getByTestId("repository-row").first().click();
  await page.getByTestId("repository-detail-send-for-sign").click();
  await expect(page.getByTestId("signature-sent-modal")).toBeVisible();
  return page.getByTestId("signing-link-input").inputValue();
}

test("Send to Sign creates clickable signing link", async ({ page }) => {
  const url = await createSigningLink(page);
  expect(url).toContain("/sign/");
  await expect(page.getByTestId("open-signing-page")).toHaveAttribute("href", url);
});

test("counterparty can open signing page, preview/download, sign, and see confirmation", async ({ page, context }) => {
  const url = await createSigningLink(page);
  const signer = await context.newPage();
  await signer.goto(url);
  await signer.waitForLoadState("networkidle");
  await expect(signer.getByTestId("signing-page-root")).toBeVisible();

  await signer.getByTestId("signing-preview-document").click();
  await expect(signer.getByText("Review the Full NDA Document")).toBeVisible();
  await expectDownloadFrom(signer, () => signer.getByTestId("signing-download-pdf").click(), "pdf");

  await signer.getByTestId("signer-name").fill("Morgan QA Ellis");
  await signer.getByTestId("signer-title").fill("Authorized Signatory");
  await signer.getByPlaceholder(/type your name/i).fill("Morgan QA Ellis");
  await signer.getByTestId("signing-agreement-checkbox").check();
  await signer.getByTestId("sign-and-return").click();

  await expect(signer.getByTestId("signing-confirmation-page")).toBeVisible();
  await expect(signer.getByText("Return to CLM Dashboard")).toHaveCount(0);
  await expect(signer.getByTestId("download-signed-nda")).toBeVisible();
});

