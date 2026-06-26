# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: esignature.spec.ts >> counterparty can open signing page, preview/download, sign, and see confirmation
- Location: tests\e2e\esignature.spec.ts:24:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('signature-sent-modal')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('signature-sent-modal')

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
  - heading "Contract Repository" [level=1]
  - paragraph: Search, filter, inspect, tag, edit and renew every contract in your organization.
  - img
  - textbox "Search contracts, parties, clauses…"
  - button "3":
    - img
    - text: "3"
  - button "Export CSV":
    - img
    - text: Export CSV
  - button "SJ Sarah Johnson Business User":
    - text: SJ Sarah Johnson
    - img
    - text: Business User
    - img
  - img
  - textbox "Search by ID, title, party, owner…"
  - combobox:
    - option "All" [selected]
    - option "Mutual"
    - option "One-Way In"
    - option "One-Way Out"
    - option "Vendor"
    - option "M&A"
  - combobox:
    - option "All" [selected]
    - option "Low"
    - option "Medium"
    - option "High"
  - combobox:
    - option "All"
    - option "In Review"
    - option "Approved" [selected]
    - option "Awaiting Signature"
    - option "Signed"
    - option "Archived"
  - img
  - text: Showing 1 of 10 records
  - table:
    - rowgroup:
      - row "ID Title Type Risk Status Owner Expires Updated Time Stamp":
        - columnheader "ID"
        - columnheader "Title"
        - columnheader "Type"
        - columnheader "Risk"
        - columnheader "Status"
        - columnheader "Owner"
        - columnheader "Expires"
        - columnheader "Updated"
        - columnheader "Time Stamp"
        - columnheader
    - rowgroup:
      - row "NDA-2039 Hooli Cloud — Hosting Eval Vendor Low Approved Maya Davis Feb 10, 2027 May 18, 2026, 10:22 AM View":
        - cell "NDA-2039"
        - cell "Hooli Cloud — Hosting Eval"
        - cell "Vendor"
        - cell "Low"
        - cell "Approved"
        - cell "Maya Davis"
        - cell "Feb 10, 2027"
        - cell
        - cell "May 18, 2026, 10:22 AM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
  - complementary:
    - text: NDA-2039 Hooli Cloud — Hosting Eval Low Approved Vendor
    - button "Close":
      - img
      - text: Close
    - img
    - text: Owner Maya Davis
    - img
    - text: Updated May 18, 2026, 10:22 AM Workflow Actions
    - button "Send for Sign"
    - button "Mark Signed" [disabled]
    - button "Cancel NDA"
    - button "Delete":
      - img
      - text: Delete
    - img
    - heading "NDA Document" [level=4]
    - text: Vendor / Supplier NDA · v3.0
    - button "Preview":
      - img
      - text: Preview
    - button "Download DOCX":
      - img
      - text: Download DOCX
    - button "Download PDF":
      - img
      - text: Download PDF
    - img
    - text: Record Audit Trail
    - table:
      - rowgroup:
        - row "Timestamp Actor Action Target":
          - columnheader "Timestamp"
          - columnheader "Actor"
          - columnheader "Action"
          - columnheader "Target"
      - rowgroup:
        - row "No audit events recorded yet.":
          - cell "No audit events recorded yet."
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole, expectDownloadFrom } from "./helpers/app";
  3  | 
  4  | test.beforeEach(async ({ page }) => {
  5  |   await resetDemoState(page);
  6  |   await gotoApp(page);
  7  |   await switchRole(page, "legal");
  8  | });
  9  | 
  10 | async function createSigningLink(page) {
  11 |   await gotoApp(page, "/repository?status=Approved");
  12 |   await page.getByTestId("repository-row").first().click();
  13 |   await page.getByTestId("repository-detail-send-for-sign").click();
> 14 |   await expect(page.getByTestId("signature-sent-modal")).toBeVisible();
     |                                                          ^ Error: expect(locator).toBeVisible() failed
  15 |   return page.getByTestId("signing-link-input").inputValue();
  16 | }
  17 | 
  18 | test("Send to Sign creates clickable signing link", async ({ page }) => {
  19 |   const url = await createSigningLink(page);
  20 |   expect(url).toContain("/sign/");
  21 |   await expect(page.getByTestId("open-signing-page")).toHaveAttribute("href", url);
  22 | });
  23 | 
  24 | test("counterparty can open signing page, preview/download, sign, and see confirmation", async ({ page, context }) => {
  25 |   const url = await createSigningLink(page);
  26 |   const signer = await context.newPage();
  27 |   await signer.goto(url);
  28 |   await signer.waitForLoadState("networkidle");
  29 |   await expect(signer.getByTestId("signing-page-root")).toBeVisible();
  30 | 
  31 |   await signer.getByTestId("signing-preview-document").click();
  32 |   await expect(signer.getByText("Review the Full NDA Document")).toBeVisible();
  33 |   await expectDownloadFrom(signer, () => signer.getByTestId("signing-download-pdf").click(), "pdf");
  34 | 
  35 |   await signer.getByTestId("signer-name").fill("Morgan QA Ellis");
  36 |   await signer.getByTestId("signer-title").fill("Authorized Signatory");
  37 |   await signer.getByPlaceholder(/type your name/i).fill("Morgan QA Ellis");
  38 |   await signer.getByTestId("signing-agreement-checkbox").check();
  39 |   await signer.getByTestId("sign-and-return").click();
  40 | 
  41 |   await expect(signer.getByTestId("signing-confirmation-page")).toBeVisible();
  42 |   await expect(signer.getByText("Return to CLM Dashboard")).toHaveCount(0);
  43 |   await expect(signer.getByTestId("download-signed-nda")).toBeVisible();
  44 | });
  45 | 
  46 | 
```