// @ts-nocheck
import { expect, test } from "@playwright/test";
import { expectDownloadFrom, gotoApp, resetDemoState, switchRole } from "./helpers/app";
import { RepositoryPage } from "./pages/RepositoryPage";

test.beforeEach(async ({ page }) => {
  await resetDemoState(page);
});

test("Repository is visible to every role and all roles can see documents", async ({ page }) => {
  const counts: number[] = [];
  for (const role of ["business", "legal", "admin", "exec"] as const) {
    await gotoApp(page);
    await switchRole(page, role);
    const repo = new RepositoryPage(page);
    await repo.goto();
    counts.push(await repo.rows().count());
  }
  expect(new Set(counts).size).toBe(1);
  expect(counts[0]).toBeGreaterThan(0);
});

test("Repository displays required columns and full final document view", async ({ page }) => {
  await gotoApp(page);
  await switchRole(page, "admin");
  await new RepositoryPage(page).goto();

  for (const header of ["ID", "Title", "Type", "Risk", "Status", "Owner", "Expires", "Updated", "Time Stamp"]) {
    await expect(page.getByRole("columnheader", { name: header })).toBeVisible();
  }

  await page.getByTestId("repository-row").first().click();
  await expect(page.getByTestId("repository-final-document-section")).toBeVisible();
  await page.getByTestId("repository-document-preview").click();
  await expect(page.getByText(/NDA Document|Final Signed NDA/)).toBeVisible();
});

test("DOCX/PDF downloads and row action menu are available", async ({ page }) => {
  await gotoApp(page);
  await switchRole(page, "admin");
  await new RepositoryPage(page).goto();
  await page.getByTestId("repository-row").first().click();
  await expectDownloadFrom(page, () => page.getByTestId("repository-download-docx").click(), "docx");
  await expectDownloadFrom(page, () => page.getByTestId("repository-download-pdf").click(), "pdf");

  await page.keyboard.press("Escape");
  await page.getByTestId("repository-row-actions").first().click();
  await expect(page.getByTestId("repository-add-tag")).toBeVisible();
  await expect(page.getByTestId("repository-edit-nda")).toBeVisible();
  await expect(page.getByTestId("repository-renew-nda")).toBeVisible();
});

test("delete works only for Admin and non-admin sees permission error", async ({ page }) => {
  await gotoApp(page);
  await switchRole(page, "business");
  await new RepositoryPage(page).goto();
  await page.getByTestId("repository-row").first().click();
  await page.getByTestId("repository-detail-delete").click();
  await expect(page.getByText("You do not have permission to perform this activity.")).toBeVisible();

  await switchRole(page, "admin");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByTestId("repository-detail-delete").click();
  await expect(page.getByText(/deleted/i)).toBeVisible();
});

