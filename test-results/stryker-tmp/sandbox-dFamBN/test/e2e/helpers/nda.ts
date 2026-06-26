// @ts-nocheck
import { expect, type Page } from "@playwright/test";

export const ndaFixture = {
  counterpartyName: "Atlas Robotics QA Inc.",
  counterpartyAddress: "455 Market Street, San Francisco, CA 94105",
  counterpartyEmail: "qa.signer@atlasrobotics.example",
  counterpartySignerName: "Morgan QA Ellis",
  recordTitle: "QA Automation Mutual NDA",
  purpose: "Evaluate a confidential product integration for automated testing.",
  companyName: "Contoso Corporation",
  companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
  companySignerName: "Sara Patel",
  effectiveDate: "2026-04-15",
  customEndDate: "2027-07-27",
};

export async function openNewNdaIntake(page: Page, templateId = "tpl-standard") {
  await page.goto(`/requests/intake?template=${templateId}`);
  await page.waitForLoadState("networkidle");
  await expect(page.getByTestId("nda-intake-workflow")).toBeVisible();
}

export async function fillCounterpartyDetails(page: Page) {
  await page.getByTestId("field-counterparty-name").fill(ndaFixture.counterpartyName);
  await page.getByTestId("field-counterparty-address").fill(ndaFixture.counterpartyAddress);
  await page.getByTestId("field-counterparty-email").fill(ndaFixture.counterpartyEmail);
  await page.getByTestId("field-counterparty-signer-name").fill(ndaFixture.counterpartySignerName);
  await page.getByTestId("field-effective-date").fill(ndaFixture.effectiveDate);
}

export async function fillRecordDetails(page: Page) {
  await page.getByTestId("field-record-title").fill(ndaFixture.recordTitle);
  await page.getByTestId("field-purpose").fill(ndaFixture.purpose);
  await page.getByTestId("field-company-name").fill(ndaFixture.companyName);
  await page.getByTestId("field-company-address").fill(ndaFixture.companyAddress);
  await page.getByTestId("field-company-signer-name").fill(ndaFixture.companySignerName);
}

export async function continueToStep(page: Page, stepTestId: string) {
  for (let i = 0; i < 8; i += 1) {
    if (await page.getByTestId(stepTestId).isVisible().catch(() => false)) return;
    await page.getByTestId("intake-continue").click();
  }
  await expect(page.getByTestId(stepTestId)).toBeVisible();
}

export async function completeRequiredNdaIntakeThroughTemplate(page: Page) {
  await fillCounterpartyDetails(page);
  await page.getByTestId("intake-continue").click();
  await fillRecordDetails(page);
  await page.getByTestId("intake-continue").click();
  await expect(page.getByTestId("intake-section-template")).toBeVisible();
  await page.getByTestId("field-governing-law").selectOption({ label: "Delaware, USA" });
  await page.getByTestId("field-jurisdiction").fill("Delaware, USA");
}

export async function reachRiskReview(page: Page) {
  await completeRequiredNdaIntakeThroughTemplate(page);
  await page.getByTestId("intake-continue").click();
  await expect(page.getByTestId("intake-section-additional-questions")).toBeVisible();
  await page.getByTestId("intake-continue").click();
  await expect(page.getByTestId("intake-section-pii-questions")).toBeVisible();
  await page.getByTestId("intake-continue").click();
  await expect(page.getByTestId("intake-section-risk-review")).toBeVisible();
}

export async function reachFinalDocument(page: Page) {
  await reachRiskReview(page);
  await page.getByTestId("intake-continue").click();
  await expect(page.getByTestId("intake-section-final-document")).toBeVisible();
}

