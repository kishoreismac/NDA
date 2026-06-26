# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: legal-reviewer.spec.ts >> Legal Reviewer can approve and then send NDA for signature
- Location: tests\e2e\legal-reviewer.spec.ts:19:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /^Approve$/ }).first()

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
          - heading "Legal Review Queue" [level=1] [ref=e63]
          - paragraph [ref=e64]: All NDAs requiring counsel attention. AI-prioritized by risk and SLA.
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
      - generic [ref=e92]:
        - generic [ref=e93]:
          - button "All" [ref=e94] [cursor=pointer]
          - button "Mine" [ref=e95] [cursor=pointer]
          - button "High risk" [ref=e96] [cursor=pointer]
          - button "Overdue" [ref=e97] [cursor=pointer]
          - button "Approved" [ref=e98] [cursor=pointer]
          - button "Awaiting Signature" [ref=e99] [cursor=pointer]
        - generic [ref=e101]:
          - img [ref=e102]
          - textbox "Search queue…" [ref=e105]
      - generic [ref=e106]:
        - table [ref=e109]:
          - rowgroup [ref=e110]:
            - row "ID Title Risk Status Owner Actions" [ref=e111]:
              - columnheader "ID" [ref=e112]
              - columnheader "Title" [ref=e113]
              - columnheader "Risk" [ref=e114]
              - columnheader "Status" [ref=e115]
              - columnheader "Owner" [ref=e116]
              - columnheader "Actions" [ref=e117]
          - rowgroup [ref=e118]:
            - row "NDA-2041 Acme Robotics — Joint R&D Mutual Medium In Review Sara Patel" [ref=e119]:
              - cell "NDA-2041" [ref=e120]
              - cell "Acme Robotics — Joint R&D Mutual" [ref=e121]:
                - generic [ref=e122]: Acme Robotics — Joint R&D
                - generic [ref=e123]: Mutual
              - cell "Medium" [ref=e124]
              - cell "In Review" [ref=e125]
              - cell "Sara Patel" [ref=e126]
              - cell [ref=e127]:
                - button [ref=e130] [cursor=pointer]:
                  - img [ref=e131]
            - row "NDA-2040 Northwind Pharma — Clinical Data One-Way In High Awaiting Signature Jordan Nguyen" [ref=e135]:
              - cell "NDA-2040" [ref=e136]
              - cell "Northwind Pharma — Clinical Data One-Way In" [ref=e137]:
                - generic [ref=e138]: Northwind Pharma — Clinical Data
                - generic [ref=e139]: One-Way In
              - cell "High" [ref=e140]
              - cell "Awaiting Signature" [ref=e141]
              - cell "Jordan Nguyen" [ref=e142]
              - cell [ref=e143]:
                - button [ref=e146] [cursor=pointer]:
                  - img [ref=e147]
            - row "NDA-2039 Hooli Cloud — Hosting Eval Vendor Low Approved Maya Davis" [ref=e151]:
              - cell "NDA-2039" [ref=e152]
              - cell "Hooli Cloud — Hosting Eval Vendor" [ref=e153]:
                - generic [ref=e154]: Hooli Cloud — Hosting Eval
                - generic [ref=e155]: Vendor
              - cell "Low" [ref=e156]
              - cell "Approved" [ref=e157]
              - cell "Maya Davis" [ref=e158]
              - cell [ref=e159]:
                - button [ref=e162] [cursor=pointer]:
                  - img [ref=e163]
            - row "NDA-2038 Wayne Ent. — JV Exploration M&A High In Review Alex Kim" [ref=e167]:
              - cell "NDA-2038" [ref=e168]
              - cell "Wayne Ent. — JV Exploration M&A" [ref=e169]:
                - generic [ref=e170]: Wayne Ent. — JV Exploration
                - generic [ref=e171]: M&A
              - cell "High" [ref=e172]
              - cell "In Review" [ref=e173]
              - cell "Alex Kim" [ref=e174]
              - cell [ref=e175]:
                - button [ref=e178] [cursor=pointer]:
                  - img [ref=e179]
            - row "NDA-2034 Umbrella — Bio Sample MTA Mutual High In Review J. Nguyen" [ref=e183]:
              - cell "NDA-2034" [ref=e184]
              - cell "Umbrella — Bio Sample MTA Mutual" [ref=e185]:
                - generic [ref=e186]: Umbrella — Bio Sample MTA
                - generic [ref=e187]: Mutual
              - cell "High" [ref=e188]
              - cell "In Review" [ref=e189]
              - cell "J. Nguyen" [ref=e190]
              - cell [ref=e191]:
                - button [ref=e194] [cursor=pointer]:
                  - img [ref=e195]
            - row "NDA-2033 Gringotts Bank — Custody Talks Mutual High In Review A. Kim" [ref=e199]:
              - cell "NDA-2033" [ref=e200]
              - cell "Gringotts Bank — Custody Talks Mutual" [ref=e201]:
                - generic [ref=e202]: Gringotts Bank — Custody Talks
                - generic [ref=e203]: Mutual
              - cell "High" [ref=e204]
              - cell "In Review" [ref=e205]
              - cell "A. Kim" [ref=e206]
              - cell [ref=e207]:
                - button [ref=e210] [cursor=pointer]:
                  - img [ref=e211]
            - row "NDA-2031 Tyrell Corp — Genome Pilot One-Way In High In Review J. Nguyen" [ref=e215]:
              - cell "NDA-2031" [ref=e216]
              - cell "Tyrell Corp — Genome Pilot One-Way In" [ref=e217]:
                - generic [ref=e218]: Tyrell Corp — Genome Pilot
                - generic [ref=e219]: One-Way In
              - cell "High" [ref=e220]
              - cell "In Review" [ref=e221]
              - cell "J. Nguyen" [ref=e222]
              - cell [ref=e223]:
                - button [ref=e226] [cursor=pointer]:
                  - img [ref=e227]
            - row "NDA-2029 Soylent — Supply Discussion Vendor Medium In Review M. Davis" [ref=e231]:
              - cell "NDA-2029" [ref=e232]
              - cell "Soylent — Supply Discussion Vendor" [ref=e233]:
                - generic [ref=e234]: Soylent — Supply Discussion
                - generic [ref=e235]: Vendor
              - cell "Medium" [ref=e236]
              - cell "In Review" [ref=e237]
              - cell "M. Davis" [ref=e238]
              - cell [ref=e239]:
                - button [ref=e242] [cursor=pointer]:
                  - img [ref=e243]
        - generic [ref=e247]:
          - generic [ref=e248]:
            - generic [ref=e249]:
              - img [ref=e250]
              - text: AI Triage Suggestions
            - list [ref=e252]:
              - listitem [ref=e253]:
                - generic [ref=e254]: NDA-2036 → assign to CISO
                - generic [ref=e255]: Defense + High risk. SLA at risk.
              - listitem [ref=e256]:
                - generic [ref=e257]: NDA-2040 → loop in Privacy Office
                - generic [ref=e258]: PII + cross-border detected.
              - listitem [ref=e259]:
                - generic [ref=e260]: NDA-2029 → fast-track approve
                - generic [ref=e261]: Standard vendor template, low risk.
          - generic [ref=e262]:
            - generic [ref=e263]:
              - img [ref=e264]
              - text: SLA at risk
            - generic [ref=e266]: "5"
            - generic [ref=e267]: high-risk items in current view.
  - alert [ref=e268]
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
  14 |   await page.waitForURL(/\/requests\/intake\?edit=/);
  15 |   await expect(page.getByText(/editing record/i)).toBeVisible();
  16 |   await expect(page.getByTestId("field-counterparty-name")).not.toHaveValue("");
  17 | });
  18 | 
  19 | test("Legal Reviewer can approve and then send NDA for signature", async ({ page }) => {
  20 |   await gotoApp(page, "/legal-queue");
> 21 |   await page.getByRole("button", { name: /^Approve$/ }).first().click();
     |                                                                 ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  22 |   await expect(page.getByText("NDA approved")).toBeVisible();
  23 |   await page.getByRole("button", { name: /approved/i }).click();
  24 |   await page.getByRole("button", { name: /send to sign/i }).first().click();
  25 |   await expect(page.getByTestId("signature-sent-modal")).toBeVisible();
  26 |   await expect(page.getByTestId("signing-link-input")).toHaveValue(/\/sign\//);
  27 | });
  28 | 
  29 | 
```