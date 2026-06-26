// @ts-nocheck
import { expect, type Locator, type Page } from "@playwright/test";

export type DemoRole = "business" | "legal" | "admin" | "exec";

export const ROLE_LABELS: Record<DemoRole, string> = {
  business: "Business User",
  legal: "Legal Reviewer",
  admin: "Admin",
  exec: "Executive Viewer",
};

export async function resetDemoState(page: Page) {
  await page.request.post("/api/requests", { data: { action: "reset" } }).catch(() => {});
  await page.request.post("/api/signatures", { data: { action: "reset" } }).catch(() => {});
}

export async function gotoApp(page: Page, path = "/dashboard") {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

export async function switchRole(page: Page, role: DemoRole) {
  const trigger = page.getByTestId("role-selector-trigger");
  const option = page.getByTestId(`role-option-${role}`);

  if (!(await option.isVisible().catch(() => false))) {
    await trigger.click();
  }

  if (!(await option.isVisible().catch(() => false))) {
    await trigger.click({ force: true });
  }

  await expect(option).toBeVisible();
  await option.click();
  await expect(page.getByTestId("role-selector-trigger")).toContainText(ROLE_LABELS[role]);
}

export async function expectPermissionDenied(page: Page) {
  await expect(page.getByText("You do not have permission to perform this activity.")).toBeVisible();
}

export function rowStatus(row: Locator) {
  return row.getAttribute("data-status");
}

export async function clickFirstRepositoryRow(page: Page) {
  const row = page.getByTestId("repository-row").first();
  await expect(row).toBeVisible();
  await row.click();
  await expect(page.getByTestId("repository-detail-drawer")).toBeVisible();
}

export async function expectDownloadFrom(page: Page, clickAction: () => Promise<unknown>, extension: string) {
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    clickAction(),
  ]);
  expect(download.suggestedFilename().toLowerCase()).toMatch(new RegExp(`\\.${extension.toLowerCase()}$`));
  return download;
}

export async function safeClick(locator: Locator) {
  await expect(locator).toBeVisible();
  await locator.click();
}
