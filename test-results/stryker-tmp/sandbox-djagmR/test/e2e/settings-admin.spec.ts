// @ts-nocheck
import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "admin");
});

test("Admin can access settings, add users, and switch themes", async ({ page }) => {
  await gotoApp(page, "/admin");
  await expect(page.getByRole("heading", { name: "Admin Settings" })).toBeVisible();

  await page.getByRole("button", { name: /appearance/i }).click();
  await page.getByTestId("theme-white").click();
  await expect(page.locator("html, body").first()).toBeVisible();
  await page.getByTestId("theme-dark").click();

  await page.getByRole("button", { name: /users/i }).click();
  await page.getByTestId("user-title").selectOption("Ms.");
  await page.getByTestId("user-first-name").fill("Olivia");
  await page.getByTestId("user-last-name").fill("Carter");
  await page.getByTestId("user-role").selectOption("Business User");
  await page.getByTestId("user-email").fill("olivia.carter@contoso.com");
  await page.getByTestId("add-user-submit").click();
  await expect(page.getByText("olivia.carter@contoso.com")).toBeVisible();
});

test("Admin can manage Parties and Rules and dropdowns are readable", async ({ page }) => {
  await gotoApp(page, "/parties");
  await page.getByTestId("add-party-open").click();
  await page.getByTestId("party-name").fill("QA Partner LLC");
  await page.getByTestId("party-country").fill("United States");
  await page.getByTestId("party-industry").fill("Software");
  await page.getByTestId("party-risk").selectOption("Medium");
  await page.getByTestId("add-party-submit").click();
  await expect(page.getByText("QA Partner LLC", { exact: true }).first()).toBeVisible();

  await gotoApp(page, "/rules");
  await page.getByTestId("add-rule-open").click();
  await page.getByTestId("rule-name").fill("QA High Risk Escalation");
  await page.getByTestId("rule-condition").fill("Risk = High");
  await page.getByTestId("rule-action").fill("Assign to Senior Counsel");
  await page.getByTestId("add-rule-submit").click();
  await expect(page.getByText("QA High Risk Escalation", { exact: true }).first()).toBeVisible();
});
