// @ts-nocheck
import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "legal");
});

test("Legal Reviewer can preview, edit existing NDA, and does not start from scratch", async ({ page }) => {
  await gotoApp(page, "/repository?status=In%20Review");
  await page.getByTestId("repository-row-actions").first().click();
  await page.getByTestId("repository-edit-nda").first().click();
  await page.waitForURL(/\/requests\/intake\?edit=/);
  await expect(page.getByText(/editing record/i)).toBeVisible();
  await expect(page.getByTestId("field-counterparty-name")).not.toHaveValue("");
});

test("Legal Reviewer can approve and then send NDA for signature", async ({ page }) => {
  await gotoApp(page, "/legal-queue");
  await page.getByRole("button", { name: /^Approve$/ }).first().click();
  await expect(page.getByText("NDA approved")).toBeVisible();
  await page.getByRole("button", { name: /approved/i }).click();
  await page.getByRole("button", { name: /send to sign/i }).first().click();
  await expect(page.getByTestId("signature-sent-modal")).toBeVisible();
  await expect(page.getByTestId("signing-link-input")).toHaveValue(/\/sign\//);
});

