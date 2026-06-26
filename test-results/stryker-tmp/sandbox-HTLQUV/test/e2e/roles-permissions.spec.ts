// @ts-nocheck
import { expect, test } from "@playwright/test";
import { gotoApp, resetDemoState, switchRole } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
});

test("user can switch between all demo roles", async ({ page }) => {
  for (const role of ["business", "legal", "admin", "exec"] as const) {
    await switchRole(page, role);
  }
});

test("executive viewer cannot create a new NDA", async ({ page }) => {
  await switchRole(page, "exec");
  await expect(page.getByTestId("topbar-new-contract-action")).toHaveCount(0);
  await gotoApp(page, "/requests/new-contract");
  await expect(page.getByText("Access restricted")).toBeVisible();
});

test("parties and rules are hidden for non-admin roles and visible for admin", async ({ page }) => {
  for (const role of ["business", "legal", "exec"] as const) {
    await switchRole(page, role);
    await expect(page.getByTestId("sidebar-link-parties")).toHaveCount(0);
    await expect(page.getByTestId("sidebar-link-rules")).toHaveCount(0);
  }

  await switchRole(page, "admin");
  await expect(page.getByTestId("sidebar-link-parties")).toBeVisible();
  await expect(page.getByTestId("sidebar-link-rules")).toBeVisible();
});

test("business user cannot send an approved NDA for signature from repository detail", async ({ page }) => {
  await switchRole(page, "business");
  await gotoApp(page, "/repository?status=Approved");
  await page.getByTestId("repository-row").first().click();
  await expect(page.getByTestId("repository-detail-send-for-sign")).toBeVisible();
  await page.getByTestId("repository-detail-send-for-sign").click({ force: true });
  await expect(page.getByText("You do not have permission to perform this activity.")).toBeVisible();
});

test("admin can access Parties and Rules", async ({ page }) => {
  await switchRole(page, "admin");
  await gotoApp(page, "/parties");
  await expect(page.getByText("Parties")).toBeVisible();
  await gotoApp(page, "/rules");
  await expect(page.getByText("Auto-Assignment & Routing Rules")).toBeVisible();
});

