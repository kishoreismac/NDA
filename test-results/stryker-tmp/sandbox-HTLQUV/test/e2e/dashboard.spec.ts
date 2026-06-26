// @ts-nocheck
import { expect, test } from "@playwright/test";
import { resetDemoState } from "./helpers/app";
import { DashboardPage } from "./pages/DashboardPage";

const STATUSES = ["In Review", "Approved", "Awaiting Signature", "Signed", "Archived"];

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
});

test("dashboard loads and exposes required dashboard actions", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await dashboard.expectLoaded();

  await expect(page.getByTestId("dashboard-cta-request-a-new-contract")).toBeVisible();
  await expect(page.getByText("Priority Requests")).toHaveCount(0);
  await expect(page.getByText("Tasks")).toHaveCount(0);
  await expect(page.getByTestId("dashboard-cta-search-contracts")).toHaveCount(0);
  await expect(page.getByTestId("dashboard-cta-calendar")).toHaveCount(0);
});

test("status summary tabs are visible in one row", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();

  const boxes = [];
  for (const status of STATUSES) {
    const tab = dashboard.statusTab(status);
    await expect(tab).toBeVisible();
    boxes.push(await tab.boundingBox());
  }

  const yValues = boxes.map((b) => Math.round(b?.y || 0));
  expect(Math.max(...yValues) - Math.min(...yValues)).toBeLessThan(24);
});

for (const status of STATUSES) {
  test(`clicking ${status} tab shows only matching repository records and count matches`, async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    const tab = dashboard.statusTab(status);
    const text = await tab.innerText();
    const expectedCount = Number(text.match(/\d+/)?.[0] || 0);

    await tab.click();
    await page.waitForURL(/\/repository/);
    await expect(page.getByText("Contract Repository")).toBeVisible();

    const rows = page.getByTestId("repository-row");
    await expect(rows).toHaveCount(expectedCount);
    for (let i = 0; i < expectedCount; i += 1) {
      await expect(rows.nth(i)).toHaveAttribute("data-status", status);
    }
  });
}

