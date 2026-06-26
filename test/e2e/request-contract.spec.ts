import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "business");
});

test("Request a New Contract opens a full-page view, not a popup", async ({ page }) => {
  await page.getByTestId("dashboard-cta-request-a-new-contract").click();
  await page.waitForURL(/\/requests\/new-contract/);
  await expect(page.getByText("Pick a quick-start template")).toBeVisible();
  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
});

test("quick templates and select more template dropdown behave correctly", async ({ page }) => {
  await gotoApp(page, "/requests/new-contract");
  const quick = page.locator('[data-testid^="quick-template-"]');
  await expect(quick).toHaveCount(3);
  await expect(page.getByTestId("quick-template-standard-nda")).toBeVisible();
  await expect(page.getByTestId("quick-template-mutual-nda")).toBeVisible();
  await expect(page.getByTestId("quick-template-employee-contractor-nda")).toBeVisible();
  await expect(page.getByTestId("quick-templates-section").getByText("One-Way NDA")).toHaveCount(0);

  await expect(page.getByTestId("select-more-templates-dropdown")).toBeVisible();
  await page.getByTestId("select-more-templates-dropdown").selectOption({ index: 1 });
  await expect(page.getByTestId("select-more-templates-continue")).toBeEnabled();
});
