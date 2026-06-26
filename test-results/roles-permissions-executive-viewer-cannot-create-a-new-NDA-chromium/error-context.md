# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: roles-permissions.spec.ts >> executive viewer cannot create a new NDA
- Location: tests\e2e\roles-permissions.spec.ts:15:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Access restricted')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Access restricted')

```

```yaml
- complementary:
  - link "CLM Contract Lifecycle":
    - /url: /dashboard
    - img
    - text: CLM Contract Lifecycle
  - navigation:
    - link "Dashboard":
      - /url: /dashboard
      - img
      - text: Dashboard
    - link "Legal Review Queue":
      - /url: /legal-queue
      - img
      - text: Legal Review Queue
    - link "Calendar":
      - /url: /calendar
      - img
      - text: Calendar
    - link "Repository":
      - /url: /repository
      - img
      - text: Repository
    - link "AI Search":
      - /url: /ai-tools
      - img
      - text: AI Search
    - link "Reports":
      - /url: /reports
      - img
      - text: Reports
    - link "Templates":
      - /url: /templates
      - img
      - text: Templates
    - link "Admin Settings":
      - /url: /admin
      - img
      - text: Admin Settings
  - img
  - text: AI Copilot
  - paragraph: Request, draft, review, sign, store, search and renew — across NDA, MSA, SOW, vendor & more.
- main:
  - heading "Request a New Contract" [level=1]
  - paragraph: Pick a quick-start template, choose from the full library, or start a blank request.
  - img
  - textbox "Search contracts, parties, clauses…"
  - button "3":
    - img
    - text: "3"
  - link "Back":
    - /url: /dashboard
    - img
    - text: Back
  - button "SJ Sarah Johnson Business User":
    - text: SJ Sarah Johnson
    - img
    - text: Business User
    - img
  - text: Quick Templates
  - button "Standard NDA General-purpose mutual NDA suitable for most low-risk engagements. Standard · v1.0":
    - img
    - text: Standard NDA General-purpose mutual NDA suitable for most low-risk engagements. Standard · v1.0
  - button "Mutual NDA Bilateral confidentiality agreement where both parties may exchange confidential information. Mutual · v4.2":
    - img
    - text: Mutual NDA Bilateral confidentiality agreement where both parties may exchange confidential information. Mutual · v4.2
  - button "Employee / Contractor NDA For new hires, contractors, interns, and internal personnel. Employee · v5.0":
    - img
    - text: Employee / Contractor NDA For new hires, contractors, interns, and internal personnel. Employee · v5.0
  - text: Select More Templates
  - combobox:
    - option "— Choose a template from the full library —" [selected]
    - option "One-Way NDA (Incoming) · One-Way (Incoming) · Global · v3.0"
    - option "One-Way NDA (Outgoing) · One-Way (Outgoing) · Global · v3.1"
    - option "Vendor / Supplier NDA · Vendor · Global · v3.0"
    - option "Customer NDA · Customer · Global · v2.4"
    - option "Partner / Channel NDA · Partner · Global · v2.1"
    - option "International NDA (GDPR / SCCs) · International · EU + USA · v3.3"
  - img
  - button "Continue" [disabled]:
    - text: Continue
    - img
  - text: Need a custom flow? Start a blank request and pick the template later during intake.
  - link "Browse all templates →":
    - /url: /templates
  - button "Start a blank request"
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | 
  4  | test.beforeEach(async ({ page }) => {
  5  |   await resetDemoState(page);
  6  |   await gotoApp(page);
  7  | });
  8  | 
  9  | test("user can switch between all demo roles", async ({ page }) => {
  10 |   for (const role of ["business", "legal", "admin", "exec"] as const) {
  11 |     await switchRole(page, role);
  12 |   }
  13 | });
  14 | 
  15 | test("executive viewer cannot create a new NDA", async ({ page }) => {
  16 |   await switchRole(page, "exec");
  17 |   await expect(page.getByTestId("topbar-new-contract-action")).toHaveCount(0);
  18 |   await gotoApp(page, "/requests/new-contract");
> 19 |   await expect(page.getByText("Access restricted")).toBeVisible();
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  20 | });
  21 | 
  22 | test("parties and rules are hidden for non-admin roles and visible for admin", async ({ page }) => {
  23 |   for (const role of ["business", "legal", "exec"] as const) {
  24 |     await switchRole(page, role);
  25 |     await expect(page.getByTestId("sidebar-link-parties")).toHaveCount(0);
  26 |     await expect(page.getByTestId("sidebar-link-rules")).toHaveCount(0);
  27 |   }
  28 | 
  29 |   await switchRole(page, "admin");
  30 |   await expect(page.getByTestId("sidebar-link-parties")).toBeVisible();
  31 |   await expect(page.getByTestId("sidebar-link-rules")).toBeVisible();
  32 | });
  33 | 
  34 | test("business user cannot send an approved NDA for signature from repository detail", async ({ page }) => {
  35 |   await switchRole(page, "business");
  36 |   await gotoApp(page, "/repository?status=Approved");
  37 |   await page.getByTestId("repository-row").first().click();
  38 |   await expect(page.getByTestId("repository-detail-send-for-sign")).toBeVisible();
  39 |   await page.getByTestId("repository-detail-send-for-sign").click({ force: true });
  40 |   await expect(page.getByText("You do not have permission to perform this activity.")).toBeVisible();
  41 | });
  42 | 
  43 | test("admin can access Parties and Rules", async ({ page }) => {
  44 |   await switchRole(page, "admin");
  45 |   await gotoApp(page, "/parties");
  46 |   await expect(page.getByText("Parties")).toBeVisible();
  47 |   await gotoApp(page, "/rules");
  48 |   await expect(page.getByText("Auto-Assignment & Routing Rules")).toBeVisible();
  49 | });
  50 | 
  51 | 
```