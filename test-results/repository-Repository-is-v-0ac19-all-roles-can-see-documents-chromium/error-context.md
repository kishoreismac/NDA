# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: repository.spec.ts >> Repository is visible to every role and all roles can see documents
- Location: tests\e2e\repository.spec.ts:9:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - link "CLM Contract Lifecycle" [ref=e4] [cursor=pointer]:
        - /url: /dashboard
        - img [ref=e6]
        - generic [ref=e8]:
          - generic [ref=e9]: CLM
          - generic [ref=e10]: Contract Lifecycle
      - navigation [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e13]
          - generic [ref=e18]: Dashboard
        - link "Legal Review Queue" [ref=e19] [cursor=pointer]:
          - /url: /legal-queue
          - img [ref=e20]
          - generic [ref=e24]: Legal Review Queue
        - link "Calendar" [ref=e25] [cursor=pointer]:
          - /url: /calendar
          - img [ref=e26]
          - generic [ref=e28]: Calendar
        - link "Repository" [ref=e29] [cursor=pointer]:
          - /url: /repository
          - img [ref=e30]
          - generic [ref=e34]: Repository
        - link "AI Search" [ref=e35] [cursor=pointer]:
          - /url: /ai-tools
          - img [ref=e36]
          - generic [ref=e39]: AI Search
        - link "Reports" [ref=e40] [cursor=pointer]:
          - /url: /reports
          - img [ref=e41]
          - generic [ref=e43]: Reports
        - link "Templates" [ref=e44] [cursor=pointer]:
          - /url: /templates
          - img [ref=e45]
          - generic [ref=e48]: Templates
        - link "Admin Settings" [ref=e49] [cursor=pointer]:
          - /url: /admin
          - img [ref=e50]
          - generic [ref=e53]: Admin Settings
      - generic [ref=e54]:
        - generic [ref=e55]:
          - img [ref=e56]
          - generic [ref=e58]: AI Copilot
        - paragraph [ref=e59]: Request, draft, review, sign, store, search and renew — across NDA, MSA, SOW, vendor & more.
    - main [ref=e60]:
      - generic [ref=e61]:
        - generic [ref=e62]:
          - heading "Contract Repository" [level=1] [ref=e63]
          - paragraph [ref=e64]: Search, filter, inspect, tag, edit and renew every contract in your organization.
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img [ref=e67]
            - textbox "Search contracts, parties, clauses…" [ref=e70]
          - button "3" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - generic [ref=e75]: "3"
          - button "Export CSV" [ref=e76] [cursor=pointer]:
            - img [ref=e77]
            - text: Export CSV
          - button "SJ Sarah Johnson Business User" [ref=e81] [cursor=pointer]:
            - generic [ref=e82]: SJ
            - generic [ref=e83]:
              - generic [ref=e84]: Sarah Johnson
              - generic [ref=e85]:
                - img [ref=e86]
                - text: Business User
            - img [ref=e89]
      - generic [ref=e91]:
        - generic [ref=e92]:
          - generic [ref=e93]:
            - img [ref=e94]
            - textbox "Search by ID, title, party, owner…" [ref=e97]
          - combobox [ref=e98]:
            - option "All" [selected]
            - option "Mutual"
            - option "One-Way In"
            - option "One-Way Out"
            - option "Vendor"
            - option "M&A"
          - combobox [ref=e99]:
            - option "All" [selected]
            - option "Low"
            - option "Medium"
            - option "High"
          - combobox [ref=e100]:
            - option "All" [selected]
            - option "In Review"
            - option "Approved"
            - option "Awaiting Signature"
            - option "Signed"
            - option "Archived"
        - generic [ref=e101]:
          - img [ref=e102]
          - text: Showing
          - generic [ref=e104]: "10"
          - text: of 10 records
      - table [ref=e107]:
        - rowgroup [ref=e108]:
          - row "ID Title Type Risk Status Owner Expires Updated Time Stamp" [ref=e109]:
            - columnheader "ID" [ref=e110]
            - columnheader "Title" [ref=e111]
            - columnheader "Type" [ref=e112]
            - columnheader "Risk" [ref=e113]
            - columnheader "Status" [ref=e114]
            - columnheader "Owner" [ref=e115]
            - columnheader "Expires" [ref=e116]
            - columnheader "Updated" [ref=e117]
            - columnheader "Time Stamp" [ref=e118]
            - columnheader [ref=e119]
        - rowgroup [ref=e120]:
          - row "NDA-2041 Acme Robotics — Joint R&D Mutual Medium In Review Sara Patel Mar 31, 2028 May 19, 2026, 08:22 AM View" [ref=e121] [cursor=pointer]:
            - cell "NDA-2041" [ref=e122]
            - cell "Acme Robotics — Joint R&D" [ref=e123]:
              - generic [ref=e124]: Acme Robotics — Joint R&D
            - cell "Mutual" [ref=e125]
            - cell "Medium" [ref=e126]
            - cell "In Review" [ref=e127]
            - cell "Sara Patel" [ref=e128]
            - cell "Mar 31, 2028" [ref=e129]
            - cell [ref=e130]
            - cell "May 19, 2026, 08:22 AM" [ref=e131]
            - cell "View" [ref=e132]:
              - generic [ref=e133]:
                - button "View" [ref=e134]:
                  - img [ref=e135]
                  - text: View
                - button "More actions" [ref=e138]:
                  - img [ref=e139]
          - row "NDA-2040 Northwind Pharma — Clinical Data One-Way In High Awaiting Signature Jordan Nguyen Mar 14, 2029 May 19, 2026, 06:22 AM View" [ref=e143] [cursor=pointer]:
            - cell "NDA-2040" [ref=e144]
            - cell "Northwind Pharma — Clinical Data" [ref=e145]:
              - generic [ref=e146]: Northwind Pharma — Clinical Data
            - cell "One-Way In" [ref=e147]
            - cell "High" [ref=e148]
            - cell "Awaiting Signature" [ref=e149]
            - cell "Jordan Nguyen" [ref=e150]
            - cell "Mar 14, 2029" [ref=e151]
            - cell [ref=e152]
            - cell "May 19, 2026, 06:22 AM" [ref=e153]
            - cell "View" [ref=e154]:
              - generic [ref=e155]:
                - button "View" [ref=e156]:
                  - img [ref=e157]
                  - text: View
                - button "More actions" [ref=e160]:
                  - img [ref=e161]
          - row "NDA-2039 Hooli Cloud — Hosting Eval Vendor Low Approved Maya Davis Feb 10, 2027 May 18, 2026, 10:22 AM View" [ref=e165] [cursor=pointer]:
            - cell "NDA-2039" [ref=e166]
            - cell "Hooli Cloud — Hosting Eval" [ref=e167]:
              - generic [ref=e168]: Hooli Cloud — Hosting Eval
            - cell "Vendor" [ref=e169]
            - cell "Low" [ref=e170]
            - cell "Approved" [ref=e171]
            - cell "Maya Davis" [ref=e172]
            - cell "Feb 10, 2027" [ref=e173]
            - cell [ref=e174]
            - cell "May 18, 2026, 10:22 AM" [ref=e175]
            - cell "View" [ref=e176]:
              - generic [ref=e177]:
                - button "View" [ref=e178]:
                  - img [ref=e179]
                  - text: View
                - button "More actions" [ref=e182]:
                  - img [ref=e183]
          - row "NDA-2038 Wayne Ent. — JV Exploration M&A High In Review Alex Kim Apr 19, 2031 May 18, 2026, 10:22 AM View" [ref=e187] [cursor=pointer]:
            - cell "NDA-2038" [ref=e188]
            - cell "Wayne Ent. — JV Exploration" [ref=e189]:
              - generic [ref=e190]: Wayne Ent. — JV Exploration
            - cell "M&A" [ref=e191]
            - cell "High" [ref=e192]
            - cell "In Review" [ref=e193]
            - cell "Alex Kim" [ref=e194]
            - cell "Apr 19, 2031" [ref=e195]
            - cell [ref=e196]
            - cell "May 18, 2026, 10:22 AM" [ref=e197]
            - cell "View" [ref=e198]:
              - generic [ref=e199]:
                - button "View" [ref=e200]:
                  - img [ref=e201]
                  - text: View
                - button "More actions" [ref=e204]:
                  - img [ref=e205]
          - row "NDA-2037 Initech — Beta Software One-Way Out Low Signed Riley Gomez Jan 5, 2027 May 17, 2026, 10:22 AM View Signed PDF" [ref=e209] [cursor=pointer]:
            - cell "NDA-2037" [ref=e210]
            - cell "Initech — Beta Software" [ref=e211]:
              - generic [ref=e212]: Initech — Beta Software
            - cell "One-Way Out" [ref=e213]
            - cell "Low" [ref=e214]
            - cell "Signed" [ref=e215]
            - cell "Riley Gomez" [ref=e216]
            - cell "Jan 5, 2027" [ref=e217]
            - cell [ref=e218]
            - cell "May 17, 2026, 10:22 AM" [ref=e219]
            - cell "View Signed PDF" [ref=e220]:
              - generic [ref=e221]:
                - button "View" [ref=e222]:
                  - img [ref=e223]
                  - text: View
                - button "Signed PDF" [ref=e226]:
                  - img [ref=e227]
                  - text: Signed PDF
                - button "More actions" [ref=e230]:
                  - img [ref=e231]
          - row "NDA-2044 asdasdasdas Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 11:42 AM View Signed PDF" [ref=e235] [cursor=pointer]:
            - cell "NDA-2044" [ref=e236]
            - cell "asdasdasdas" [ref=e237]:
              - generic [ref=e238]: asdasdasdas
            - cell "Mutual NDA" [ref=e239]
            - cell "Low" [ref=e240]
            - cell "Signed" [ref=e241]
            - cell "Sara Patel" [ref=e242]
            - cell "May 19, 2027" [ref=e243]
            - cell [ref=e244]
            - cell "May 19, 2026, 11:42 AM" [ref=e245]
            - cell "View Signed PDF" [ref=e246]:
              - generic [ref=e247]:
                - button "View" [ref=e248]:
                  - img [ref=e249]
                  - text: View
                - button "Signed PDF" [ref=e252]:
                  - img [ref=e253]
                  - text: Signed PDF
                - button "More actions" [ref=e256]:
                  - img [ref=e257]
          - row "NDA-2074 dsadsad Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 12:10 PM View Signed PDF" [ref=e261] [cursor=pointer]:
            - cell "NDA-2074" [ref=e262]
            - cell "dsadsad" [ref=e263]:
              - generic [ref=e264]: dsadsad
            - cell "Mutual NDA" [ref=e265]
            - cell "Low" [ref=e266]
            - cell "Signed" [ref=e267]
            - cell "Sara Patel" [ref=e268]
            - cell "May 19, 2027" [ref=e269]
            - cell [ref=e270]
            - cell "May 19, 2026, 12:10 PM" [ref=e271]
            - cell "View Signed PDF" [ref=e272]:
              - generic [ref=e273]:
                - button "View" [ref=e274]:
                  - img [ref=e275]
                  - text: View
                - button "Signed PDF" [ref=e278]:
                  - img [ref=e279]
                  - text: Signed PDF
                - button "More actions" [ref=e282]:
                  - img [ref=e283]
          - row "NDA-2053 scdsad Mutual NDA Low Signed Sara Patel May 23, 2026Expired May 19, 2026, 12:14 PM View Signed PDF" [ref=e287] [cursor=pointer]:
            - cell "NDA-2053" [ref=e288]
            - cell "scdsad" [ref=e289]:
              - generic [ref=e290]: scdsad
            - cell "Mutual NDA" [ref=e291]
            - cell "Low" [ref=e292]
            - cell "Signed" [ref=e293]
            - cell "Sara Patel" [ref=e294]
            - cell "May 23, 2026Expired" [ref=e295]:
              - generic [ref=e296]: May 23, 2026Expired
            - cell [ref=e297]
            - cell "May 19, 2026, 12:14 PM" [ref=e298]
            - cell "View Signed PDF" [ref=e299]:
              - generic [ref=e300]:
                - button "View" [ref=e301]:
                  - img [ref=e302]
                  - text: View
                - button "Signed PDF" [ref=e305]:
                  - img [ref=e306]
                  - text: Signed PDF
                - button "More actions" [ref=e309]:
                  - img [ref=e310]
          - row "NDA-2043 sdsd Mutual NDA Low In Review Sara Patel May 19, 2027 May 19, 2026, 12:19 PM View" [ref=e314] [cursor=pointer]:
            - cell "NDA-2043" [ref=e315]
            - cell "sdsd" [ref=e316]:
              - generic [ref=e317]: sdsd
            - cell "Mutual NDA" [ref=e318]
            - cell "Low" [ref=e319]
            - cell "In Review" [ref=e320]
            - cell "Sara Patel" [ref=e321]
            - cell "May 19, 2027" [ref=e322]
            - cell [ref=e323]
            - cell "May 19, 2026, 12:19 PM" [ref=e324]
            - cell "View" [ref=e325]:
              - generic [ref=e326]:
                - button "View" [ref=e327]:
                  - img [ref=e328]
                  - text: View
                - button "More actions" [ref=e331]:
                  - img [ref=e332]
          - row "NDA-2066 test Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 03:44 PM View Signed PDF" [ref=e336] [cursor=pointer]:
            - cell "NDA-2066" [ref=e337]
            - cell "test" [ref=e338]:
              - generic [ref=e339]: test
            - cell "Mutual NDA" [ref=e340]
            - cell "Low" [ref=e341]
            - cell "Signed" [ref=e342]
            - cell "Sara Patel" [ref=e343]
            - cell "May 19, 2027" [ref=e344]
            - cell [ref=e345]
            - cell "May 19, 2026, 03:44 PM" [ref=e346]
            - cell "View Signed PDF" [ref=e347]:
              - generic [ref=e348]:
                - button "View" [ref=e349]:
                  - img [ref=e350]
                  - text: View
                - button "Signed PDF" [ref=e353]:
                  - img [ref=e354]
                  - text: Signed PDF
                - button "More actions" [ref=e357]:
                  - img [ref=e358]
  - alert [ref=e362]
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
> 18 |   expect(new Set(counts).size).toBe(1);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
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
  58 |   await expect(page.getByText("You do not have permission to perform this activity.")).toBeVisible();
  59 | 
  60 |   await switchRole(page, "admin");
  61 |   page.once("dialog", (dialog) => dialog.accept());
  62 |   await page.getByTestId("repository-detail-delete").click();
  63 |   await expect(page.getByText(/deleted/i)).toBeVisible();
  64 | });
  65 | 
  66 | 
```