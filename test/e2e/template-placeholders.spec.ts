import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
import { completeRequiredNdaIntakeThroughTemplate, openNewNdaIntake } from "./helpers/nda";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
});

test("template selection, preview, placeholders, and single Continue behavior work", async ({ page }) => {
  await switchRole(page, "business");
  await openNewNdaIntake(page);
  await completeRequiredNdaIntakeThroughTemplate(page);
  await page.getByTestId("template-option-tpl-mutual").click();
  await page.getByTestId("view-template-preview-placeholders").click();

  await expect(page.getByTestId("template-preview-panel")).toBeVisible();
  await expect(page.getByTestId("placeholder-validation-panel")).toBeVisible();
  await expect(page.getByText(/\{\{CompanyName\}\}/).first()).toBeVisible();
  await expect(page.getByTestId("intake-section-template").getByRole("button", { name: /continue/i })).toHaveCount(0);
  await expect(page.getByTestId("intake-continue")).toHaveCount(1);
});

test("placeholder warnings appear if required values are missing", async ({ page }) => {
  await switchRole(page, "business");
  await openNewNdaIntake(page);
  await page.getByTestId("intake-step-template").click();
  await page.getByTestId("view-template-preview-placeholders").click();
  await expect(page.getByTestId("placeholder-validation-panel")).toContainText(/missing|required/i);
});

test("newly created Admin templates are available during NDA creation", async ({ page }) => {
  await switchRole(page, "admin");
  await gotoApp(page, "/templates");
  await page.getByTestId("new-template-open").click();
  await page.getByTestId("new-template-name").fill("QA Admin NDA Template");
  await page.getByTestId("new-template-save").click();

  await gotoApp(page, "/requests/new-contract");
  await expect(page.getByTestId("select-more-templates-dropdown")).toContainText("QA Admin NDA Template");
});
