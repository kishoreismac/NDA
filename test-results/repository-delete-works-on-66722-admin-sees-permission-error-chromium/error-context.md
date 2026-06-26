# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: repository.spec.ts >> delete works only for Admin and non-admin sees permission error
- Location: tests\e2e\repository.spec.ts:52:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('You do not have permission to perform this activity.')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('You do not have permission to perform this activity.')

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
    - option "All" [selected]
    - option "In Review"
    - option "Approved"
    - option "Awaiting Signature"
    - option "Signed"
    - option "Archived"
  - img
  - text: Showing 12 of 12 records
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
      - row "NDA-2041 Acme Robotics — Joint R&D Mutual Medium In Review Sara Patel Mar 31, 2028 May 19, 2026, 08:22 AM View":
        - cell "NDA-2041"
        - cell "Acme Robotics — Joint R&D"
        - cell "Mutual"
        - cell "Medium"
        - cell "In Review"
        - cell "Sara Patel"
        - cell "Mar 31, 2028"
        - cell
        - cell "May 19, 2026, 08:22 AM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
      - row "NDA-2040 Northwind Pharma — Clinical Data One-Way In High Awaiting Signature Jordan Nguyen Mar 14, 2029 May 19, 2026, 06:22 AM View":
        - cell "NDA-2040"
        - cell "Northwind Pharma — Clinical Data"
        - cell "One-Way In"
        - cell "High"
        - cell "Awaiting Signature"
        - cell "Jordan Nguyen"
        - cell "Mar 14, 2029"
        - cell
        - cell "May 19, 2026, 06:22 AM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
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
      - row "NDA-2038 Wayne Ent. — JV Exploration M&A High In Review Alex Kim Apr 19, 2031 May 18, 2026, 10:22 AM View":
        - cell "NDA-2038"
        - cell "Wayne Ent. — JV Exploration"
        - cell "M&A"
        - cell "High"
        - cell "In Review"
        - cell "Alex Kim"
        - cell "Apr 19, 2031"
        - cell
        - cell "May 18, 2026, 10:22 AM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
      - row "NDA-2037 Initech — Beta Software One-Way Out Low Signed Riley Gomez Jan 5, 2027 May 17, 2026, 10:22 AM View Signed PDF":
        - cell "NDA-2037"
        - cell "Initech — Beta Software"
        - cell "One-Way Out"
        - cell "Low"
        - cell "Signed"
        - cell "Riley Gomez"
        - cell "Jan 5, 2027"
        - cell
        - cell "May 17, 2026, 10:22 AM"
        - cell "View Signed PDF":
          - button "View":
            - img
            - text: View
          - button "Signed PDF":
            - img
            - text: Signed PDF
          - button "More actions":
            - img
      - row "NDA-2044 asdasdasdas Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 11:42 AM View Signed PDF":
        - cell "NDA-2044"
        - cell "asdasdasdas"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "Signed"
        - cell "Sara Patel"
        - cell "May 19, 2027"
        - cell
        - cell "May 19, 2026, 11:42 AM"
        - cell "View Signed PDF":
          - button "View":
            - img
            - text: View
          - button "Signed PDF":
            - img
            - text: Signed PDF
          - button "More actions":
            - img
      - row "NDA-2074 dsadsad Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 12:10 PM View Signed PDF":
        - cell "NDA-2074"
        - cell "dsadsad"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "Signed"
        - cell "Sara Patel"
        - cell "May 19, 2027"
        - cell
        - cell "May 19, 2026, 12:10 PM"
        - cell "View Signed PDF":
          - button "View":
            - img
            - text: View
          - button "Signed PDF":
            - img
            - text: Signed PDF
          - button "More actions":
            - img
      - row "NDA-2053 scdsad Mutual NDA Low Signed Sara Patel May 23, 2026Expired May 19, 2026, 12:14 PM View Signed PDF":
        - cell "NDA-2053"
        - cell "scdsad"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "Signed"
        - cell "Sara Patel"
        - cell "May 23, 2026Expired"
        - cell
        - cell "May 19, 2026, 12:14 PM"
        - cell "View Signed PDF":
          - button "View":
            - img
            - text: View
          - button "Signed PDF":
            - img
            - text: Signed PDF
          - button "More actions":
            - img
      - row "NDA-2043 sdsd Mutual NDA Low In Review Sara Patel May 19, 2027 May 19, 2026, 12:19 PM View":
        - cell "NDA-2043"
        - cell "sdsd"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "In Review"
        - cell "Sara Patel"
        - cell "May 19, 2027"
        - cell
        - cell "May 19, 2026, 12:19 PM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
      - row "NDA-2066 test Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 03:44 PM View Signed PDF":
        - cell "NDA-2066"
        - cell "test"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "Signed"
        - cell "Sara Patel"
        - cell "May 19, 2027"
        - cell
        - cell "May 19, 2026, 03:44 PM"
        - cell "View Signed PDF":
          - button "View":
            - img
            - text: View
          - button "Signed PDF":
            - img
            - text: Signed PDF
          - button "More actions":
            - img
      - row "NDA-2046 QA Automation Mutual NDA Mutual NDA Low In Review Sara Patel Apr 14, 2028 Jun 25, 2026, 03:56 PM View":
        - cell "NDA-2046"
        - cell "QA Automation Mutual NDA"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "In Review"
        - cell "Sara Patel"
        - cell "Apr 14, 2028"
        - cell
        - cell "Jun 25, 2026, 03:56 PM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
      - row "NDA-2067 QA Automation Mutual NDA Mutual NDA Low In Review Sara Patel Apr 14, 2028 Jun 25, 2026, 03:56 PM View":
        - cell "NDA-2067"
        - cell "QA Automation Mutual NDA"
        - cell "Mutual NDA"
        - cell "Low"
        - cell "In Review"
        - cell "Sara Patel"
        - cell "Apr 14, 2028"
        - cell
        - cell "Jun 25, 2026, 03:56 PM"
        - cell "View":
          - button "View":
            - img
            - text: View
          - button "More actions":
            - img
  - complementary:
    - text: NDA-2041 Acme Robotics — Joint R&D Medium In Review Mutual
    - button "Close":
      - img
      - text: Close
    - img
    - text: Owner Sara Patel
    - img
    - text: Updated May 19, 2026, 08:22 AM Workflow Actions
    - button "Send for Sign" [disabled]
    - button "Mark Signed" [disabled]
    - button "Cancel NDA"
    - button "Delete":
      - img
      - text: Delete
    - img
    - heading "NDA Document" [level=4]
    - text: Mutual NDA · v4.2
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
        - row "Jun 25, 2026, 11:57 AM Jordan Nguyen Risk Review document downloaded DOC-AB12CD.pdf":
          - cell "Jun 25, 2026, 11:57 AM"
          - cell "Jordan Nguyen"
          - cell "Risk Review document downloaded"
          - cell "DOC-AB12CD.pdf"
        - row "Jun 24, 2026, 11:57 PM Sara Patel DOCX downloaded DOC-AB12CD.docx":
          - cell "Jun 24, 2026, 11:57 PM"
          - cell "Sara Patel"
          - cell "DOCX downloaded"
          - cell "DOC-AB12CD.docx"
        - row "Jun 24, 2026, 10:57 PM Sara Patel Final NDA generated Mutual NDA v4.2 → DOC-AB12CD":
          - cell "Jun 24, 2026, 10:57 PM"
          - cell "Sara Patel"
          - cell "Final NDA generated"
          - cell "Mutual NDA v4.2 → DOC-AB12CD"
        - row "Jun 24, 2026, 09:57 PM NDAFlow Placeholder values validated 16/16 ready":
          - cell "Jun 24, 2026, 09:57 PM"
          - cell "NDAFlow"
          - cell "Placeholder values validated"
          - cell "16/16 ready"
        - row "Jun 24, 2026, 07:57 PM Sara Patel Template previewed Mutual NDA v4.2":
          - cell "Jun 24, 2026, 07:57 PM"
          - cell "Sara Patel"
          - cell "Template previewed"
          - cell "Mutual NDA v4.2"
        - row "Jun 24, 2026, 05:57 PM Sara Patel Template selected Mutual NDA v4.2":
          - cell "Jun 24, 2026, 05:57 PM"
          - cell "Sara Patel"
          - cell "Template selected"
          - cell "Mutual NDA v4.2"
- alert
- img
- text: 2 errors
- button "Hide Errors":
  - img
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { expectDownloadFrom, gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | import { RepositoryPage } from "./pages/RepositoryPage";
  4  | 
  5  | test.beforeEach(async ({ page }) => {
  6  |   await resetDemoState(page);
  7  | });
  8  | 
  9  | test("Repository is visible to every role and all roles can see documents", async ({ page }) => {
  10 |   const counts: number[] = [];
  11 |   for (const role of ["business", "legal", "admin", "exec"] as const) {
  12 |     await gotoApp(page);
  13 |     await switchRole(page, role);
  14 |     const repo = new RepositoryPage(page);
  15 |     await repo.goto();
  16 |     counts.push(await repo.rows().count());
  17 |   }
  18 |   expect(new Set(counts).size).toBe(1);
  19 |   expect(counts[0]).toBeGreaterThan(0);
  20 | });
  21 | 
  22 | test("Repository displays required columns and full final document view", async ({ page }) => {
  23 |   await gotoApp(page);
  24 |   await switchRole(page, "admin");
  25 |   await new RepositoryPage(page).goto();
  26 | 
  27 |   for (const header of ["ID", "Title", "Type", "Risk", "Status", "Owner", "Expires", "Updated", "Time Stamp"]) {
  28 |     await expect(page.getByRole("columnheader", { name: header })).toBeVisible();
  29 |   }
  30 | 
  31 |   await page.getByTestId("repository-row").first().click();
  32 |   await expect(page.getByTestId("repository-final-document-section")).toBeVisible();
  33 |   await page.getByTestId("repository-document-preview").click();
  34 |   await expect(page.getByText(/NDA Document|Final Signed NDA/)).toBeVisible();
  35 | });
  36 | 
  37 | test("DOCX/PDF downloads and row action menu are available", async ({ page }) => {
  38 |   await gotoApp(page);
  39 |   await switchRole(page, "admin");
  40 |   await new RepositoryPage(page).goto();
  41 |   await page.getByTestId("repository-row").first().click();
  42 |   await expectDownloadFrom(page, () => page.getByTestId("repository-download-docx").click(), "docx");
  43 |   await expectDownloadFrom(page, () => page.getByTestId("repository-download-pdf").click(), "pdf");
  44 | 
  45 |   await page.keyboard.press("Escape");
  46 |   await page.getByTestId("repository-row-actions").first().click();
  47 |   await expect(page.getByTestId("repository-add-tag")).toBeVisible();
  48 |   await expect(page.getByTestId("repository-edit-nda")).toBeVisible();
  49 |   await expect(page.getByTestId("repository-renew-nda")).toBeVisible();
  50 | });
  51 | 
  52 | test("delete works only for Admin and non-admin sees permission error", async ({ page }) => {
  53 |   await gotoApp(page);
  54 |   await switchRole(page, "business");
  55 |   await new RepositoryPage(page).goto();
  56 |   await page.getByTestId("repository-row").first().click();
  57 |   await page.getByTestId("repository-detail-delete").click();
> 58 |   await expect(page.getByText("You do not have permission to perform this activity.")).toBeVisible();
     |                                                                                        ^ Error: expect(locator).toBeVisible() failed
  59 | 
  60 |   await switchRole(page, "admin");
  61 |   page.once("dialog", (dialog) => dialog.accept());
  62 |   await page.getByTestId("repository-detail-delete").click();
  63 |   await expect(page.getByText(/deleted/i)).toBeVisible();
  64 | });
  65 | 
  66 | 
```