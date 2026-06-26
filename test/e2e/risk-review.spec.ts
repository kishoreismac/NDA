import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
import { openNewNdaIntake, reachRiskReview } from "./helpers/nda";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "business");
});

test("risk review displays score, flags, explanation, workflow, clauses, and final document panel", async ({ page }) => {
  await openNewNdaIntake(page);
  await reachRiskReview(page);
  await expect(page.getByTestId("risk-review-panel")).toBeVisible();
  await expect(page.getByTestId("risk-score-label")).toBeVisible();
  await expect(page.getByTestId("risk-flags-label")).toBeVisible();
  await expect(page.getByText(/risk explanation/i)).toBeVisible();
  await expect(page.getByTestId("recommended-workflow-heading")).toBeVisible();
  await expect(page.getByTestId("clause-recommendations-heading")).toBeVisible();
  await expect(page.getByTestId("final-document-download-panel-risk")).toBeVisible();
  await expect(page.getByRole("button", { name: /download docx/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /download pdf/i })).toBeVisible();
});

test("placeholders are not repeated as the primary Risk Review content", async ({ page }) => {
  await openNewNdaIntake(page);
  await reachRiskReview(page);
  await expect(page.getByTestId("risk-review-panel").getByText(/\{\{CompanyName\}\}/)).toHaveCount(0);
});

