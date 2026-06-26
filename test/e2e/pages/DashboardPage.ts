import { expect, type Page } from "@playwright/test";

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/dashboard");
    await this.page.waitForLoadState("networkidle");
  }

  statusTab(label: string) {
    return this.page.getByTestId(`dashboard-status-tab-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`);
  }

  async expectLoaded() {
    await expect(this.page.getByText("Contract Management Dashboard")).toBeVisible();
  }
}

