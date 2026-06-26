// @ts-nocheck
import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
import {
  completeRequiredNdaIntakeThroughTemplate,
  fillCounterpartyDetails,
  ndaFixture,
  openNewNdaIntake,
  reachFinalDocument,
} from "./helpers/nda";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "business");
});

test("each intake step is clickable and mandatory fields are marked", async ({ page }) => {
  await openNewNdaIntake(page);
  for (const step of ["counterparty", "record", "template", "questions", "pii", "risk", "draft"]) {
    await expect(page.getByTestId(`intake-step-${step}`)).toBeVisible();
    await page.getByTestId(`intake-step-${step}`).click();
  }
  await page.getByTestId("intake-step-counterparty").click();
  await expect(page.getByTestId("intake-section-counterparty").locator(".text-rose-400").first()).toHaveText("*");
});

test("missing required Counterparty Details turns section red after Continue", async ({ page }) => {
  await openNewNdaIntake(page);
  await page.getByTestId("intake-continue").click();
  await expect(page.getByText("Missing required fields")).toBeVisible();
  await expect(page.getByTestId("intake-step-counterparty")).toHaveClass(/rose/);
});

test("completed sections turn green only after mandatory fields are filled", async ({ page }) => {
  await openNewNdaIntake(page);
  await fillCounterpartyDetails(page);
  await page.getByTestId("intake-continue").click();
  await expect(page.getByTestId("intake-step-counterparty")).toHaveClass(/emerald/);
});

test("agreement period calculates in both directions and displays exact duration", async ({ page }) => {
  await openNewNdaIntake(page);
  await page.getByTestId("field-effective-date").fill("2026-04-15");
  await page.getByTestId("field-term-time").selectOption("one (1) year");
  await expect(page.getByTestId("field-end-date")).toHaveValue("2027-04-15");

  await page.getByTestId("field-end-date").fill(ndaFixture.customEndDate);
  await expect(page.getByTestId("field-term-time")).toHaveValue("1 year 3 months 12 days");
  await expect(page.getByText("Custom Time")).toHaveCount(0);
});

test("Save as Draft persists and can be reopened from Repository", async ({ page }) => {
  await openNewNdaIntake(page);
  await reachFinalDocument(page);
  await page.getByTestId("save-draft").click();
  await expect(page.getByText("Draft saved successfully")).toBeVisible();
  await gotoApp(page, "/repository");
  await page.getByText(ndaFixture.recordTitle).click();
  await expect(page.getByTestId("repository-detail-drawer")).toBeVisible();
});

test("Submit validates fields and saves request", async ({ page }) => {
  await openNewNdaIntake(page);
  await reachFinalDocument(page);
  await page.getByTestId("submit-for-legal-review").click();
  await expect(page.getByText("Submitted for legal review")).toBeVisible();
  await gotoApp(page, "/repository?status=In%20Review");
  await expect(page.getByText(ndaFixture.recordTitle)).toBeVisible();
});
