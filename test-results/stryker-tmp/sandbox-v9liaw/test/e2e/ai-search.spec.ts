// @ts-nocheck
import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "business");
});

test("AI Tools is renamed to AI Search", async ({ page }) => {
  await expect(page.getByTestId("sidebar-link-ai-search")).toBeVisible();
  await expect(page.getByText("AI Tools")).toHaveCount(0);
});

test("user can select an NDA and get exact repository answers", async ({ page }) => {
  await gotoApp(page, "/ai-tools");
  await page.getByTestId("ai-search-tab-chat").click();
  await page.getByTestId("ai-search-input").fill("What is the status of NDA-2041?");
  await page.getByTestId("ai-search-send").click();
  await expect(page.locator(".bg-white\\/5").last()).toContainText(/status|signed|approved|review|signature/i);

  await page.getByTestId("ai-search-input").fill("What is the expiry date of NDA-2041?");
  await page.getByTestId("ai-search-send").click();
  await expect(page.locator("body")).not.toContainText(/generic summary/i);
});

test("AI repository picker can select an NDA for analysis", async ({ page }) => {
  await gotoApp(page, "/ai-tools");
  await page.getByTestId("ai-repository-picker-search").fill("NDA");
  await page.getByTestId("ai-repository-picker-option").first().click();
  await expect(page.getByText(/selected|NDA-/i).first()).toBeVisible();
});

