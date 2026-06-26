# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: legal-reviewer.spec.ts >> Legal Reviewer can preview, edit existing NDA, and does not start from scratch
- Location: tests\e2e\legal-reviewer.spec.ts:10:5

# Error details

```
TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
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
            - option "In Review" [selected]
            - option "Approved"
            - option "Awaiting Signature"
            - option "Signed"
            - option "Archived"
        - generic [ref=e101]:
          - img [ref=e102]
          - text: Showing
          - generic [ref=e104]: "3"
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
          - row "NDA-2038 Wayne Ent. — JV Exploration M&A High In Review Alex Kim Apr 19, 2031 May 18, 2026, 10:22 AM View" [ref=e143] [cursor=pointer]:
            - cell "NDA-2038" [ref=e144]
            - cell "Wayne Ent. — JV Exploration" [ref=e145]:
              - generic [ref=e146]: Wayne Ent. — JV Exploration
            - cell "M&A" [ref=e147]
            - cell "High" [ref=e148]
            - cell "In Review" [ref=e149]
            - cell "Alex Kim" [ref=e150]
            - cell "Apr 19, 2031" [ref=e151]
            - cell [ref=e152]
            - cell "May 18, 2026, 10:22 AM" [ref=e153]
            - cell "View" [ref=e154]:
              - generic [ref=e155]:
                - button "View" [ref=e156]:
                  - img [ref=e157]
                  - text: View
                - button "More actions" [ref=e160]:
                  - img [ref=e161]
          - row "NDA-2043 sdsd Mutual NDA Low In Review Sara Patel May 19, 2027 May 19, 2026, 12:19 PM View" [ref=e165] [cursor=pointer]:
            - cell "NDA-2043" [ref=e166]
            - cell "sdsd" [ref=e167]:
              - generic [ref=e168]: sdsd
            - cell "Mutual NDA" [ref=e169]
            - cell "Low" [ref=e170]
            - cell "In Review" [ref=e171]
            - cell "Sara Patel" [ref=e172]
            - cell "May 19, 2027" [ref=e173]
            - cell [ref=e174]
            - cell "May 19, 2026, 12:19 PM" [ref=e175]
            - cell "View" [ref=e176]:
              - generic [ref=e177]:
                - button "View" [ref=e178]:
                  - img [ref=e179]
                  - text: View
                - button "More actions" [ref=e182]:
                  - img [ref=e183]
  - alert [ref=e187]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | 
  4  | test.beforeEach(async ({ page }) => {
  5  |   await resetDemoState(page);
  6  |   await gotoApp(page);
  7  |   await switchRole(page, "legal");
  8  | });
  9  | 
  10 | test("Legal Reviewer can preview, edit existing NDA, and does not start from scratch", async ({ page }) => {
  11 |   await gotoApp(page, "/repository?status=In%20Review");
  12 |   await page.getByTestId("repository-row-actions").first().click();
  13 |   await page.getByTestId("repository-edit-nda").first().click();
> 14 |   await page.waitForURL(/\/requests\/intake\?edit=/);
     |              ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  15 |   await expect(page.getByText(/editing record/i)).toBeVisible();
  16 |   await expect(page.getByTestId("field-counterparty-name")).not.toHaveValue("");
  17 | });
  18 | 
  19 | test("Legal Reviewer can approve and then send NDA for signature", async ({ page }) => {
  20 |   await gotoApp(page, "/legal-queue");
  21 |   await page.getByRole("button", { name: /^Approve$/ }).first().click();
  22 |   await expect(page.getByText("NDA approved")).toBeVisible();
  23 |   await page.getByRole("button", { name: /approved/i }).click();
  24 |   await page.getByRole("button", { name: /send to sign/i }).first().click();
  25 |   await expect(page.getByTestId("signature-sent-modal")).toBeVisible();
  26 |   await expect(page.getByTestId("signing-link-input")).toHaveValue(/\/sign\//);
  27 | });
  28 | 
  29 | 
```