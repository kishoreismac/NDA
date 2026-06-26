import { expect, type Page } from "@playwright/test";

export class RepositoryPage {
  constructor(private readonly page: Page) {}

  async goto(query = "") {
    await this.page.goto(`/repository${query}`);
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.getByText("Contract Repository")).toBeVisible();
  }

  rows() {
    return this.page.getByTestId("repository-row");
  }

  async openFirstRecord() {
    await this.rows().first().click();
    await expect(this.page.getByTestId("repository-detail-drawer")).toBeVisible();
  }
}

