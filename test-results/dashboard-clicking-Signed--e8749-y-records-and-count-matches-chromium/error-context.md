# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> clicking Signed tab shows only matching repository records and count matches
- Location: tests\e2e\dashboard.spec.ts:39:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('repository-row')
Expected: 1
Received: 5
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('repository-row')
    23 × locator resolved to 5 elements
       - unexpected value "5"

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
            - option "All"
            - option "In Review"
            - option "Approved"
            - option "Awaiting Signature"
            - option "Signed" [selected]
            - option "Archived"
        - generic [ref=e101]:
          - img [ref=e102]
          - text: Showing
          - generic [ref=e104]: "5"
          - text: of 12 records
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
          - row "NDA-2037 Initech — Beta Software One-Way Out Low Signed Riley Gomez Jan 5, 2027 May 17, 2026, 10:22 AM View Signed PDF" [ref=e121] [cursor=pointer]:
            - cell "NDA-2037" [ref=e122]
            - cell "Initech — Beta Software" [ref=e123]:
              - generic [ref=e124]: Initech — Beta Software
            - cell "One-Way Out" [ref=e125]
            - cell "Low" [ref=e126]
            - cell "Signed" [ref=e127]
            - cell "Riley Gomez" [ref=e128]
            - cell "Jan 5, 2027" [ref=e129]
            - cell [ref=e130]
            - cell "May 17, 2026, 10:22 AM" [ref=e131]
            - cell "View Signed PDF" [ref=e132]:
              - generic [ref=e133]:
                - button "View" [ref=e134]:
                  - img [ref=e135]
                  - text: View
                - button "Signed PDF" [ref=e138]:
                  - img [ref=e139]
                  - text: Signed PDF
                - button "More actions" [ref=e142]:
                  - img [ref=e143]
          - row "NDA-2044 asdasdasdas Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 11:42 AM View Signed PDF" [ref=e147] [cursor=pointer]:
            - cell "NDA-2044" [ref=e148]
            - cell "asdasdasdas" [ref=e149]:
              - generic [ref=e150]: asdasdasdas
            - cell "Mutual NDA" [ref=e151]
            - cell "Low" [ref=e152]
            - cell "Signed" [ref=e153]
            - cell "Sara Patel" [ref=e154]
            - cell "May 19, 2027" [ref=e155]
            - cell [ref=e156]
            - cell "May 19, 2026, 11:42 AM" [ref=e157]
            - cell "View Signed PDF" [ref=e158]:
              - generic [ref=e159]:
                - button "View" [ref=e160]:
                  - img [ref=e161]
                  - text: View
                - button "Signed PDF" [ref=e164]:
                  - img [ref=e165]
                  - text: Signed PDF
                - button "More actions" [ref=e168]:
                  - img [ref=e169]
          - row "NDA-2074 dsadsad Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 12:10 PM View Signed PDF" [ref=e173] [cursor=pointer]:
            - cell "NDA-2074" [ref=e174]
            - cell "dsadsad" [ref=e175]:
              - generic [ref=e176]: dsadsad
            - cell "Mutual NDA" [ref=e177]
            - cell "Low" [ref=e178]
            - cell "Signed" [ref=e179]
            - cell "Sara Patel" [ref=e180]
            - cell "May 19, 2027" [ref=e181]
            - cell [ref=e182]
            - cell "May 19, 2026, 12:10 PM" [ref=e183]
            - cell "View Signed PDF" [ref=e184]:
              - generic [ref=e185]:
                - button "View" [ref=e186]:
                  - img [ref=e187]
                  - text: View
                - button "Signed PDF" [ref=e190]:
                  - img [ref=e191]
                  - text: Signed PDF
                - button "More actions" [ref=e194]:
                  - img [ref=e195]
          - row "NDA-2053 scdsad Mutual NDA Low Signed Sara Patel May 23, 2026Expired May 19, 2026, 12:14 PM View Signed PDF" [ref=e199] [cursor=pointer]:
            - cell "NDA-2053" [ref=e200]
            - cell "scdsad" [ref=e201]:
              - generic [ref=e202]: scdsad
            - cell "Mutual NDA" [ref=e203]
            - cell "Low" [ref=e204]
            - cell "Signed" [ref=e205]
            - cell "Sara Patel" [ref=e206]
            - cell "May 23, 2026Expired" [ref=e207]:
              - generic [ref=e208]: May 23, 2026Expired
            - cell [ref=e209]
            - cell "May 19, 2026, 12:14 PM" [ref=e210]
            - cell "View Signed PDF" [ref=e211]:
              - generic [ref=e212]:
                - button "View" [ref=e213]:
                  - img [ref=e214]
                  - text: View
                - button "Signed PDF" [ref=e217]:
                  - img [ref=e218]
                  - text: Signed PDF
                - button "More actions" [ref=e221]:
                  - img [ref=e222]
          - row "NDA-2066 test Mutual NDA Low Signed Sara Patel May 19, 2027 May 19, 2026, 03:44 PM View Signed PDF" [ref=e226] [cursor=pointer]:
            - cell "NDA-2066" [ref=e227]
            - cell "test" [ref=e228]:
              - generic [ref=e229]: test
            - cell "Mutual NDA" [ref=e230]
            - cell "Low" [ref=e231]
            - cell "Signed" [ref=e232]
            - cell "Sara Patel" [ref=e233]
            - cell "May 19, 2027" [ref=e234]
            - cell [ref=e235]
            - cell "May 19, 2026, 03:44 PM" [ref=e236]
            - cell "View Signed PDF" [ref=e237]:
              - generic [ref=e238]:
                - button "View" [ref=e239]:
                  - img [ref=e240]
                  - text: View
                - button "Signed PDF" [ref=e243]:
                  - img [ref=e244]
                  - text: Signed PDF
                - button "More actions" [ref=e247]:
                  - img [ref=e248]
  - alert [ref=e252]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { resetDemoState } from "./helpers/app";
  3  | import { DashboardPage } from "./pages/DashboardPage";
  4  | 
  5  | const STATUSES = ["In Review", "Approved", "Awaiting Signature", "Signed", "Archived"];
  6  | 
  7  | test.beforeEach(async ({ page }) => {
  8  |   await resetDemoState(page);
  9  | });
  10 | 
  11 | test("dashboard loads and exposes required dashboard actions", async ({ page }) => {
  12 |   const dashboard = new DashboardPage(page);
  13 |   await dashboard.goto();
  14 |   await dashboard.expectLoaded();
  15 | 
  16 |   await expect(page.getByTestId("dashboard-cta-request-a-new-contract")).toBeVisible();
  17 |   await expect(page.getByText("Priority Requests")).toHaveCount(0);
  18 |   await expect(page.getByText("Tasks")).toHaveCount(0);
  19 |   await expect(page.getByTestId("dashboard-cta-search-contracts")).toHaveCount(0);
  20 |   await expect(page.getByTestId("dashboard-cta-calendar")).toHaveCount(0);
  21 | });
  22 | 
  23 | test("status summary tabs are visible in one row", async ({ page }) => {
  24 |   const dashboard = new DashboardPage(page);
  25 |   await dashboard.goto();
  26 | 
  27 |   const boxes = [];
  28 |   for (const status of STATUSES) {
  29 |     const tab = dashboard.statusTab(status);
  30 |     await expect(tab).toBeVisible();
  31 |     boxes.push(await tab.boundingBox());
  32 |   }
  33 | 
  34 |   const yValues = boxes.map((b) => Math.round(b?.y || 0));
  35 |   expect(Math.max(...yValues) - Math.min(...yValues)).toBeLessThan(24);
  36 | });
  37 | 
  38 | for (const status of STATUSES) {
  39 |   test(`clicking ${status} tab shows only matching repository records and count matches`, async ({ page }) => {
  40 |     const dashboard = new DashboardPage(page);
  41 |     await dashboard.goto();
  42 |     const tab = dashboard.statusTab(status);
  43 |     const text = await tab.innerText();
  44 |     const expectedCount = Number(text.match(/\d+/)?.[0] || 0);
  45 | 
  46 |     await tab.click();
  47 |     await page.waitForURL(/\/repository/);
  48 |     await expect(page.getByText("Contract Repository")).toBeVisible();
  49 | 
  50 |     const rows = page.getByTestId("repository-row");
> 51 |     await expect(rows).toHaveCount(expectedCount);
     |                        ^ Error: expect(locator).toHaveCount(expected) failed
  52 |     for (let i = 0; i < expectedCount; i += 1) {
  53 |       await expect(rows.nth(i)).toHaveAttribute("data-status", status);
  54 |     }
  55 |   });
  56 | }
  57 | 
  58 | 
```