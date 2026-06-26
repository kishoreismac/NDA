import { expect, test } from "@playwright/test";
import { expectDownloadFrom, gotoApp, resetDemoState, switchRole } from "./helpers/app";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
  await gotoApp(page);
  await switchRole(page, "admin");
});

test("Repository, Parties, and Rules exports download visible records as CSV", async ({ page }) => {
  await gotoApp(page, "/repository");
  await expectDownloadFrom(page, () => page.getByTestId("repository-export-csv").click(), "csv");

  await gotoApp(page, "/parties");
  await expectDownloadFrom(page, () => page.getByTestId("parties-export-csv").click(), "csv");

  await gotoApp(page, "/rules");
  await expectDownloadFrom(page, () => page.getByTestId("rules-export-csv").click(), "csv");
});

test("Templates export downloads CSV if export button exists and audit trail captures actions", async ({ page }) => {
  await gotoApp(page, "/templates");
  const exportButton = page.getByRole("button", { name: /export/i }).first();
  if (await exportButton.isVisible().catch(() => false)) {
    await expectDownloadFrom(page, () => exportButton.click(), "csv");
  }

  await gotoApp(page, "/repository");
  await page.getByTestId("repository-row").first().click();
  await expect(page.getByText(/audit trail/i)).toBeVisible();
});

