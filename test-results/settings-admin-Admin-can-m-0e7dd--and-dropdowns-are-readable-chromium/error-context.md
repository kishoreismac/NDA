# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: settings-admin.spec.ts >> Admin can manage Parties and Rules and dropdowns are readable
- Location: tests\e2e\settings-admin.spec.ts:30:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('QA Partner LLC')
Expected: visible
Error: strict mode violation: getByText('QA Partner LLC') resolved to 2 elements:
    1) <div class="font-semibold text-white">QA Partner LLC</div> aka getByText('QA Partner LLC', { exact: true })
    2) <div class="text-xs text-slate-300 mt-0.5">QA Partner LLC added to directory.</div> aka getByText('QA Partner LLC added to')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('QA Partner LLC')

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
        - generic [ref=e101]: 9 parties
      - generic [ref=e102]:
        - generic [ref=e103]:
          - generic [ref=e104]:
            - generic [ref=e105]:
              - img [ref=e107]
              - generic [ref=e111]:
                - generic [ref=e112]: QA Partner LLC
                - generic [ref=e113]:
                  - img [ref=e114]
                  - text: United States
                  - generic [ref=e119]: ·
                  - img [ref=e120]
                  - text: Software
            - generic [ref=e123]: Medium
          - generic [ref=e124]:
            - generic [ref=e125]:
              - generic [ref=e126]: "0"
              - generic [ref=e127]: NDAs
            - generic [ref=e128]:
              - generic [ref=e129]: "1"
              - generic [ref=e130]: Active
            - generic [ref=e131]:
              - generic [ref=e132]: 74%
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
                - generic [ref=e152]: Acme Robotics Inc.
                - generic [ref=e153]:
                  - img [ref=e154]
                  - text: USA
                  - generic [ref=e159]: ·
                  - img [ref=e160]
                  - text: Hardware
            - generic [ref=e163]: Medium
          - generic [ref=e164]:
            - generic [ref=e165]:
              - generic [ref=e166]: "12"
              - generic [ref=e167]: NDAs
            - generic [ref=e168]:
              - generic [ref=e169]: "4"
              - generic [ref=e170]: Active
            - generic [ref=e171]:
              - generic [ref=e172]: 90%
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
                - generic [ref=e192]: Northwind Pharma
                - generic [ref=e193]:
                  - img [ref=e194]
                  - text: Germany
                  - generic [ref=e199]: ·
                  - img [ref=e200]
                  - text: Pharma
            - generic [ref=e203]: High
          - generic [ref=e204]:
            - generic [ref=e205]:
              - generic [ref=e206]: "7"
              - generic [ref=e207]: NDAs
            - generic [ref=e208]:
              - generic [ref=e209]: "2"
              - generic [ref=e210]: Active
            - generic [ref=e211]:
              - generic [ref=e212]: 89%
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
                - generic [ref=e232]: Globex Trading Co.
                - generic [ref=e233]:
                  - img [ref=e234]
                  - text: Singapore
                  - generic [ref=e239]: ·
                  - img [ref=e240]
                  - text: Trading
            - generic [ref=e243]: Medium
          - generic [ref=e244]:
            - generic [ref=e245]:
              - generic [ref=e246]: "4"
              - generic [ref=e247]: NDAs
            - generic [ref=e248]:
              - generic [ref=e249]: "1"
              - generic [ref=e250]: Active
            - generic [ref=e251]:
              - generic [ref=e252]: 70%
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
                - generic [ref=e272]: Initech Software
                - generic [ref=e273]:
                  - img [ref=e274]
                  - text: USA
                  - generic [ref=e279]: ·
                  - img [ref=e280]
                  - text: Software
            - generic [ref=e283]: Low
          - generic [ref=e284]:
            - generic [ref=e285]:
              - generic [ref=e286]: "21"
              - generic [ref=e287]: NDAs
            - generic [ref=e288]:
              - generic [ref=e289]: "7"
              - generic [ref=e290]: Active
            - generic [ref=e291]:
              - generic [ref=e292]: 79%
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
                - generic [ref=e312]: Umbrella Biotech
                - generic [ref=e313]:
                  - img [ref=e314]
                  - text: Switzerland
                  - generic [ref=e319]: ·
                  - img [ref=e320]
                  - text: Biotech
            - generic [ref=e323]: High
          - generic [ref=e324]:
            - generic [ref=e325]:
              - generic [ref=e326]: "3"
              - generic [ref=e327]: NDAs
            - generic [ref=e328]:
              - generic [ref=e329]: "1"
              - generic [ref=e330]: Active
            - generic [ref=e331]:
              - generic [ref=e332]: 61%
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
                - generic [ref=e352]: Hooli Cloud
                - generic [ref=e353]:
                  - img [ref=e354]
                  - text: USA
                  - generic [ref=e359]: ·
                  - img [ref=e360]
                  - text: Cloud
            - generic [ref=e363]: Low
          - generic [ref=e364]:
            - generic [ref=e365]:
              - generic [ref=e366]: "18"
              - generic [ref=e367]: NDAs
            - generic [ref=e368]:
              - generic [ref=e369]: "6"
              - generic [ref=e370]: Active
            - generic [ref=e371]:
              - generic [ref=e372]: 89%
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
                - generic [ref=e392]: Stark Defense Systems
                - generic [ref=e393]:
                  - img [ref=e394]
                  - text: UK
                  - generic [ref=e399]: ·
                  - img [ref=e400]
                  - text: Defense
            - generic [ref=e403]: High
          - generic [ref=e404]:
            - generic [ref=e405]:
              - generic [ref=e406]: "2"
              - generic [ref=e407]: NDAs
            - generic [ref=e408]:
              - generic [ref=e409]: "1"
              - generic [ref=e410]: Active
            - generic [ref=e411]:
              - generic [ref=e412]: 95%
              - generic [ref=e413]: Trust
          - generic [ref=e414]:
            - button "View profile" [ref=e415] [cursor=pointer]:
              - img [ref=e416]
              - text: View profile
            - button "New NDA" [ref=e419] [cursor=pointer]:
              - img [ref=e420]
              - text: New NDA
        - generic [ref=e423]:
          - generic [ref=e424]:
            - generic [ref=e425]:
              - img [ref=e427]
              - generic [ref=e431]:
                - generic [ref=e432]: Wayne Enterprises
                - generic [ref=e433]:
                  - img [ref=e434]
                  - text: USA
                  - generic [ref=e439]: ·
                  - img [ref=e440]
                  - text: Conglomerate
            - generic [ref=e443]: Medium
          - generic [ref=e444]:
            - generic [ref=e445]:
              - generic [ref=e446]: "9"
              - generic [ref=e447]: NDAs
            - generic [ref=e448]:
              - generic [ref=e449]: "3"
              - generic [ref=e450]: Active
            - generic [ref=e451]:
              - generic [ref=e452]: 68%
              - generic [ref=e453]: Trust
          - generic [ref=e454]:
            - button "View profile" [ref=e455] [cursor=pointer]:
              - img [ref=e456]
              - text: View profile
            - button "New NDA" [ref=e459] [cursor=pointer]:
              - img [ref=e460]
              - text: New NDA
  - generic [ref=e463]:
    - img [ref=e465]
    - generic [ref=e468]:
      - generic [ref=e469]: Party added
      - generic [ref=e470]: QA Partner LLC added to directory.
    - button [ref=e471] [cursor=pointer]:
      - img [ref=e472]
  - alert [ref=e475]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | 
  4  | test.beforeEach(async ({ page }) => {
  5  |   await resetDemoState(page);
  6  |   await gotoApp(page);
  7  |   await switchRole(page, "admin");
  8  | });
  9  | 
  10 | test("Admin can access settings, add users, and switch themes", async ({ page }) => {
  11 |   await gotoApp(page, "/admin");
  12 |   await expect(page.getByText("Admin Settings")).toBeVisible();
  13 | 
  14 |   await page.getByRole("button", { name: /appearance/i }).click();
  15 |   await page.getByTestId("theme-white").click();
  16 |   await expect(page.locator("html, body").first()).toBeVisible();
  17 |   await page.getByTestId("theme-dark").click();
  18 | 
  19 |   await page.getByRole("button", { name: /users/i }).click();
  20 |   await page.getByTestId("user-title").selectOption("Ms.");
  21 |   await page.getByTestId("user-first-name").fill("Olivia");
  22 |   await page.getByTestId("user-last-name").fill("Carter");
  23 |   await page.getByTestId("user-role").selectOption("Business User");
  24 |   await page.getByTestId("user-email").fill("olivia.carter@contoso.com");
  25 |   await page.getByTestId("add-user-submit").click();
  26 |   await expect(page.getByText("Olivia")).toBeVisible();
  27 |   await expect(page.getByText("Carter")).toBeVisible();
  28 | });
  29 | 
  30 | test("Admin can manage Parties and Rules and dropdowns are readable", async ({ page }) => {
  31 |   await gotoApp(page, "/parties");
  32 |   await page.getByTestId("add-party-open").click();
  33 |   await page.getByTestId("party-name").fill("QA Partner LLC");
  34 |   await page.getByTestId("party-country").fill("United States");
  35 |   await page.getByTestId("party-industry").fill("Software");
  36 |   await page.getByTestId("party-risk").selectOption("Medium");
  37 |   await page.getByTestId("add-party-submit").click();
> 38 |   await expect(page.getByText("QA Partner LLC")).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  39 | 
  40 |   await gotoApp(page, "/rules");
  41 |   await page.getByTestId("add-rule-open").click();
  42 |   await page.getByTestId("rule-name").fill("QA High Risk Escalation");
  43 |   await page.getByTestId("rule-condition").fill("Risk = High");
  44 |   await page.getByTestId("rule-action").fill("Assign to Senior Counsel");
  45 |   await page.getByTestId("add-rule-submit").click();
  46 |   await expect(page.getByText("QA High Risk Escalation")).toBeVisible();
  47 | });
  48 | 
  49 | 
```