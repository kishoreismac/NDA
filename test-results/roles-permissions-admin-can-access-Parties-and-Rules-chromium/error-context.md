# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: roles-permissions.spec.ts >> admin can access Parties and Rules
- Location: tests\e2e\roles-permissions.spec.ts:43:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Parties')
Expected: visible
Error: strict mode violation: getByText('Parties') resolved to 3 elements:
    1) <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-white">Parties</h1> aka getByRole('heading', { name: 'Parties' })
    2) <p class="text-sm text-slate-400 mt-1.5 max-w-2xl">Manage counterparties, view their NDA history and…</p> aka getByText('Manage counterparties, view')
    3) <span class="text-xs text-slate-400">…</span> aka getByText('8 parties')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Parties')

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
          - heading "Parties" [level=1] [ref=e63]
          - paragraph [ref=e64]: Manage counterparties, view their NDA history and risk profile.
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img [ref=e67]
            - textbox "Search contracts, parties, clauses…" [ref=e70]
          - button "3" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - generic [ref=e75]: "3"
          - generic [ref=e76]:
            - button "Export CSV" [ref=e77] [cursor=pointer]:
              - img [ref=e78]
              - text: Export CSV
            - button "Add Party" [ref=e81] [cursor=pointer]:
              - img [ref=e82]
              - text: Add Party
          - button "SJ Sarah Johnson Business User" [ref=e86] [cursor=pointer]:
            - generic [ref=e87]: SJ
            - generic [ref=e88]:
              - generic [ref=e89]: Sarah Johnson
              - generic [ref=e90]:
                - img [ref=e91]
                - text: Business User
            - img [ref=e94]
      - generic [ref=e96]:
        - img [ref=e97]
        - textbox "Search parties by name, country, industry…" [ref=e100]
        - generic [ref=e101]: 8 parties
      - generic [ref=e102]:
        - generic [ref=e103]:
          - generic [ref=e104]:
            - generic [ref=e105]:
              - img [ref=e107]
              - generic [ref=e111]:
                - generic [ref=e112]: Acme Robotics Inc.
                - generic [ref=e113]:
                  - img [ref=e114]
                  - text: USA
                  - generic [ref=e119]: ·
                  - img [ref=e120]
                  - text: Hardware
            - generic [ref=e123]: Medium
          - generic [ref=e124]:
            - generic [ref=e125]:
              - generic [ref=e126]: "12"
              - generic [ref=e127]: NDAs
            - generic [ref=e128]:
              - generic [ref=e129]: "4"
              - generic [ref=e130]: Active
            - generic [ref=e131]:
              - generic [ref=e132]: 90%
              - generic [ref=e133]: Trust
          - generic [ref=e134]:
            - button "View profile" [ref=e135] [cursor=pointer]:
              - img [ref=e136]
              - text: View profile
            - button "New NDA" [ref=e139] [cursor=pointer]:
              - img [ref=e140]
              - text: New NDA
        - generic [ref=e143]:
          - generic [ref=e144]:
            - generic [ref=e145]:
              - img [ref=e147]
              - generic [ref=e151]:
                - generic [ref=e152]: Northwind Pharma
                - generic [ref=e153]:
                  - img [ref=e154]
                  - text: Germany
                  - generic [ref=e159]: ·
                  - img [ref=e160]
                  - text: Pharma
            - generic [ref=e163]: High
          - generic [ref=e164]:
            - generic [ref=e165]:
              - generic [ref=e166]: "7"
              - generic [ref=e167]: NDAs
            - generic [ref=e168]:
              - generic [ref=e169]: "2"
              - generic [ref=e170]: Active
            - generic [ref=e171]:
              - generic [ref=e172]: 89%
              - generic [ref=e173]: Trust
          - generic [ref=e174]:
            - button "View profile" [ref=e175] [cursor=pointer]:
              - img [ref=e176]
              - text: View profile
            - button "New NDA" [ref=e179] [cursor=pointer]:
              - img [ref=e180]
              - text: New NDA
        - generic [ref=e183]:
          - generic [ref=e184]:
            - generic [ref=e185]:
              - img [ref=e187]
              - generic [ref=e191]:
                - generic [ref=e192]: Globex Trading Co.
                - generic [ref=e193]:
                  - img [ref=e194]
                  - text: Singapore
                  - generic [ref=e199]: ·
                  - img [ref=e200]
                  - text: Trading
            - generic [ref=e203]: Medium
          - generic [ref=e204]:
            - generic [ref=e205]:
              - generic [ref=e206]: "4"
              - generic [ref=e207]: NDAs
            - generic [ref=e208]:
              - generic [ref=e209]: "1"
              - generic [ref=e210]: Active
            - generic [ref=e211]:
              - generic [ref=e212]: 70%
              - generic [ref=e213]: Trust
          - generic [ref=e214]:
            - button "View profile" [ref=e215] [cursor=pointer]:
              - img [ref=e216]
              - text: View profile
            - button "New NDA" [ref=e219] [cursor=pointer]:
              - img [ref=e220]
              - text: New NDA
        - generic [ref=e223]:
          - generic [ref=e224]:
            - generic [ref=e225]:
              - img [ref=e227]
              - generic [ref=e231]:
                - generic [ref=e232]: Initech Software
                - generic [ref=e233]:
                  - img [ref=e234]
                  - text: USA
                  - generic [ref=e239]: ·
                  - img [ref=e240]
                  - text: Software
            - generic [ref=e243]: Low
          - generic [ref=e244]:
            - generic [ref=e245]:
              - generic [ref=e246]: "21"
              - generic [ref=e247]: NDAs
            - generic [ref=e248]:
              - generic [ref=e249]: "7"
              - generic [ref=e250]: Active
            - generic [ref=e251]:
              - generic [ref=e252]: 79%
              - generic [ref=e253]: Trust
          - generic [ref=e254]:
            - button "View profile" [ref=e255] [cursor=pointer]:
              - img [ref=e256]
              - text: View profile
            - button "New NDA" [ref=e259] [cursor=pointer]:
              - img [ref=e260]
              - text: New NDA
        - generic [ref=e263]:
          - generic [ref=e264]:
            - generic [ref=e265]:
              - img [ref=e267]
              - generic [ref=e271]:
                - generic [ref=e272]: Umbrella Biotech
                - generic [ref=e273]:
                  - img [ref=e274]
                  - text: Switzerland
                  - generic [ref=e279]: ·
                  - img [ref=e280]
                  - text: Biotech
            - generic [ref=e283]: High
          - generic [ref=e284]:
            - generic [ref=e285]:
              - generic [ref=e286]: "3"
              - generic [ref=e287]: NDAs
            - generic [ref=e288]:
              - generic [ref=e289]: "1"
              - generic [ref=e290]: Active
            - generic [ref=e291]:
              - generic [ref=e292]: 61%
              - generic [ref=e293]: Trust
          - generic [ref=e294]:
            - button "View profile" [ref=e295] [cursor=pointer]:
              - img [ref=e296]
              - text: View profile
            - button "New NDA" [ref=e299] [cursor=pointer]:
              - img [ref=e300]
              - text: New NDA
        - generic [ref=e303]:
          - generic [ref=e304]:
            - generic [ref=e305]:
              - img [ref=e307]
              - generic [ref=e311]:
                - generic [ref=e312]: Hooli Cloud
                - generic [ref=e313]:
                  - img [ref=e314]
                  - text: USA
                  - generic [ref=e319]: ·
                  - img [ref=e320]
                  - text: Cloud
            - generic [ref=e323]: Low
          - generic [ref=e324]:
            - generic [ref=e325]:
              - generic [ref=e326]: "18"
              - generic [ref=e327]: NDAs
            - generic [ref=e328]:
              - generic [ref=e329]: "6"
              - generic [ref=e330]: Active
            - generic [ref=e331]:
              - generic [ref=e332]: 89%
              - generic [ref=e333]: Trust
          - generic [ref=e334]:
            - button "View profile" [ref=e335] [cursor=pointer]:
              - img [ref=e336]
              - text: View profile
            - button "New NDA" [ref=e339] [cursor=pointer]:
              - img [ref=e340]
              - text: New NDA
        - generic [ref=e343]:
          - generic [ref=e344]:
            - generic [ref=e345]:
              - img [ref=e347]
              - generic [ref=e351]:
                - generic [ref=e352]: Stark Defense Systems
                - generic [ref=e353]:
                  - img [ref=e354]
                  - text: UK
                  - generic [ref=e359]: ·
                  - img [ref=e360]
                  - text: Defense
            - generic [ref=e363]: High
          - generic [ref=e364]:
            - generic [ref=e365]:
              - generic [ref=e366]: "2"
              - generic [ref=e367]: NDAs
            - generic [ref=e368]:
              - generic [ref=e369]: "1"
              - generic [ref=e370]: Active
            - generic [ref=e371]:
              - generic [ref=e372]: 95%
              - generic [ref=e373]: Trust
          - generic [ref=e374]:
            - button "View profile" [ref=e375] [cursor=pointer]:
              - img [ref=e376]
              - text: View profile
            - button "New NDA" [ref=e379] [cursor=pointer]:
              - img [ref=e380]
              - text: New NDA
        - generic [ref=e383]:
          - generic [ref=e384]:
            - generic [ref=e385]:
              - img [ref=e387]
              - generic [ref=e391]:
                - generic [ref=e392]: Wayne Enterprises
                - generic [ref=e393]:
                  - img [ref=e394]
                  - text: USA
                  - generic [ref=e399]: ·
                  - img [ref=e400]
                  - text: Conglomerate
            - generic [ref=e403]: Medium
          - generic [ref=e404]:
            - generic [ref=e405]:
              - generic [ref=e406]: "9"
              - generic [ref=e407]: NDAs
            - generic [ref=e408]:
              - generic [ref=e409]: "3"
              - generic [ref=e410]: Active
            - generic [ref=e411]:
              - generic [ref=e412]: 68%
              - generic [ref=e413]: Trust
          - generic [ref=e414]:
            - button "View profile" [ref=e415] [cursor=pointer]:
              - img [ref=e416]
              - text: View profile
            - button "New NDA" [ref=e419] [cursor=pointer]:
              - img [ref=e420]
              - text: New NDA
  - alert [ref=e423]
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
  19 |   await expect(page.getByText("Access restricted")).toBeVisible();
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
> 46 |   await expect(page.getByText("Parties")).toBeVisible();
     |                                           ^ Error: expect(locator).toBeVisible() failed
  47 |   await gotoApp(page, "/rules");
  48 |   await expect(page.getByText("Auto-Assignment & Routing Rules")).toBeVisible();
  49 | });
  50 | 
  51 | 
```