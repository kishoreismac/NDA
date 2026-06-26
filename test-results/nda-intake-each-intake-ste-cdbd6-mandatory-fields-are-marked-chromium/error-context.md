# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nda-intake.spec.ts >> each intake step is clickable and mandatory fields are marked
- Location: tests\e2e\nda-intake.spec.ts:17:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('*')
Expected: visible
Error: strict mode violation: getByText('*') resolved to 5 elements:
    1) <span class="text-rose-400">*</span> aka getByText('*').first()
    2) <span class="text-rose-400">*</span> aka getByText('*').nth(1)
    3) <span class="text-rose-400">*</span> aka getByText('*').nth(2)
    4) <span class="text-rose-400">*</span> aka getByText('*').nth(3)
    5) <span class="text-rose-400">*</span> aka getByText('*').nth(4)

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('*')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
          - heading "Guided Intake — Mutual NDA" [level=1] [ref=e63]
          - paragraph [ref=e64]: NDAFlow AI computes risk and routes the request. Final NDA is generated from the original template — no AI rewriting of legal content.
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img [ref=e67]
            - textbox "Search contracts, parties, clauses…" [ref=e70]
          - button "3" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - generic [ref=e75]: "3"
          - button "Change type" [ref=e76] [cursor=pointer]:
            - img [ref=e77]
            - text: Change type
          - button "SJ Sarah Johnson Business User" [ref=e80] [cursor=pointer]:
            - generic [ref=e81]: SJ
            - generic [ref=e82]:
              - generic [ref=e83]: Sarah Johnson
              - generic [ref=e84]:
                - img [ref=e85]
                - text: Business User
            - img [ref=e88]
      - list [ref=e91]:
        - listitem [ref=e92]:
          - button "1 Counterparty Details" [active] [ref=e93] [cursor=pointer]:
            - generic [ref=e94]: "1"
            - img [ref=e95]
            - generic [ref=e99]: Counterparty Details
        - listitem [ref=e101]:
          - button "2 Record Details" [ref=e102] [cursor=pointer]:
            - generic [ref=e103]: "2"
            - img [ref=e104]
            - generic [ref=e107]: Record Details
        - listitem [ref=e109]:
          - button "3 Template & Placeholders" [ref=e110] [cursor=pointer]:
            - generic [ref=e111]: "3"
            - img [ref=e112]
            - generic [ref=e115]: Template & Placeholders
        - listitem [ref=e117]:
          - button "4 Additional NDA Questions" [ref=e118] [cursor=pointer]:
            - generic [ref=e119]: "4"
            - img [ref=e120]
            - generic [ref=e123]: Additional NDA Questions
        - listitem [ref=e125]:
          - button "5 PII / Data Questions" [ref=e126] [cursor=pointer]:
            - generic [ref=e127]: "5"
            - img [ref=e128]
            - generic [ref=e130]: PII / Data Questions
        - listitem [ref=e132]:
          - button "6 Risk Review" [ref=e133] [cursor=pointer]:
            - generic [ref=e134]: "6"
            - img [ref=e135]
            - generic [ref=e138]: Risk Review
        - listitem [ref=e140]:
          - button "7 Generate Final NDA" [ref=e141] [cursor=pointer]:
            - generic [ref=e142]: "7"
            - img [ref=e143]
            - generic [ref=e146]: Generate Final NDA
      - generic [ref=e147]:
        - generic [ref=e148]:
          - generic [ref=e149]:
            - heading "Counterparty Details" [level=3] [ref=e150]
            - generic [ref=e151]:
              - generic [ref=e152]:
                - generic [ref=e153]: Pick from existing parties
                - combobox [ref=e154]:
                  - option "— New counterparty —" [selected]
                  - option "Acme Robotics Inc. (USA)"
                  - option "Northwind Pharma (Germany)"
                  - option "Globex Trading Co. (Singapore)"
                  - option "Initech Software (USA)"
                  - option "Umbrella Biotech (Switzerland)"
                  - option "Hooli Cloud (USA)"
                  - option "Stark Defense Systems (UK)"
                  - option "Wayne Enterprises (USA)"
              - generic [ref=e155]:
                - generic [ref=e156]: Legal name *
                - textbox "Acme Robotics Inc." [ref=e157]
              - generic [ref=e158]:
                - generic [ref=e159]: Country
                - textbox [ref=e160]
              - generic [ref=e161]:
                - generic [ref=e162]: Registered address *
                - textbox "500 Industrial Way, San Jose, CA 95110, USA" [ref=e163]
              - generic [ref=e164]:
                - generic [ref=e165]: Primary contact
                - textbox "Jane Doe, General Counsel" [ref=e166]
              - generic [ref=e167]:
                - generic [ref=e168]: Contact email *
                - textbox "jane.doe@acme.com" [ref=e169]
              - generic [ref=e170]:
                - generic [ref=e171]: Authorized signer name *
                - textbox "Jane Doe" [ref=e172]
              - generic [ref=e173]:
                - generic [ref=e174]: Authorized signer title
                - textbox "General Counsel" [ref=e175]: Authorized Signatory
            - generic [ref=e176]:
              - heading "Agreement Period" [level=4] [ref=e177]
              - paragraph [ref=e178]: Change any two of Start / End / Term and the third updates automatically.
              - generic [ref=e179]:
                - generic [ref=e180]:
                  - generic [ref=e181]: Start Date *
                  - textbox [ref=e182]: 2026-06-25
                - generic [ref=e183]:
                  - generic [ref=e184]: End Date
                  - textbox [ref=e185]
                - generic [ref=e186]:
                  - generic [ref=e187]: Term Time
                  - combobox [ref=e188]:
                    - option "one (1) year"
                    - option "two (2) years" [selected]
                    - option "three (3) years"
                    - option "five (5) years"
          - generic [ref=e189]:
            - button "Back" [disabled] [ref=e190]:
              - img [ref=e191]
              - text: Back
            - button "Continue" [ref=e193] [cursor=pointer]:
              - text: Continue
              - img [ref=e194]
        - complementary [ref=e196]:
          - generic [ref=e197]:
            - generic [ref=e198]:
              - generic [ref=e199]:
                - img [ref=e200]
                - text: AI Live Risk
              - generic [ref=e202]: Low
            - generic [ref=e203]: 0/100
            - generic [ref=e205]: Score updates live as you answer the intake questions.
          - generic [ref=e206]:
            - generic [ref=e207]:
              - img [ref=e208]
              - text: Selected template
            - generic [ref=e211]: Standard NDA
            - generic [ref=e212]: Standard · v1.0
            - generic [ref=e213]:
              - generic [ref=e214]: "Jurisdiction: Delaware, USA"
              - generic [ref=e215]: "Direction: mutual"
              - generic [ref=e216]: "Term: two (2) years"
            - generic [ref=e217]:
              - img [ref=e218]
              - text: 5 required missing
          - generic [ref=e220]:
            - generic [ref=e221]:
              - img [ref=e222]
              - text: Workflow (3 steps)
            - list [ref=e226]:
              - listitem [ref=e227]:
                - generic [ref=e228]: "1"
                - text: Legal Ops triage
              - listitem [ref=e229]:
                - generic [ref=e230]: "2"
                - text: Auto-approve (template match)
              - listitem [ref=e231]:
                - generic [ref=e232]: "3"
                - text: Send for signature
          - generic [ref=e233]:
            - generic [ref=e234]:
              - img [ref=e235]
              - text: Risk flags (0)
            - generic [ref=e237]: No flags raised yet.
  - alert [ref=e238]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | import {
  4  |   completeRequiredNdaIntakeThroughTemplate,
  5  |   fillCounterpartyDetails,
  6  |   ndaFixture,
  7  |   openNewNdaIntake,
  8  |   reachFinalDocument,
  9  | } from "./helpers/nda";
  10 | 
  11 | test.beforeEach(async ({ page }) => {
  12 |   await resetDemoState(page);
  13 |   await gotoApp(page);
  14 |   await switchRole(page, "business");
  15 | });
  16 | 
  17 | test("each intake step is clickable and mandatory fields are marked", async ({ page }) => {
  18 |   await openNewNdaIntake(page);
  19 |   for (const step of ["counterparty", "record", "template", "questions", "pii", "risk", "draft"]) {
  20 |     await expect(page.getByTestId(`intake-step-${step}`)).toBeVisible();
  21 |     await page.getByTestId(`intake-step-${step}`).click();
  22 |   }
  23 |   await page.getByTestId("intake-step-counterparty").click();
> 24 |   await expect(page.getByText("*")).toBeVisible();
     |                                     ^ Error: expect(locator).toBeVisible() failed
  25 | });
  26 | 
  27 | test("missing required Counterparty Details turns section red after Continue", async ({ page }) => {
  28 |   await openNewNdaIntake(page);
  29 |   await page.getByTestId("intake-continue").click();
  30 |   await expect(page.getByText("Missing required fields")).toBeVisible();
  31 |   await expect(page.getByTestId("intake-step-counterparty")).toHaveClass(/rose/);
  32 | });
  33 | 
  34 | test("completed sections turn green only after mandatory fields are filled", async ({ page }) => {
  35 |   await openNewNdaIntake(page);
  36 |   await fillCounterpartyDetails(page);
  37 |   await page.getByTestId("intake-continue").click();
  38 |   await expect(page.getByTestId("intake-step-counterparty")).toHaveClass(/emerald/);
  39 | });
  40 | 
  41 | test("agreement period calculates in both directions and displays exact duration", async ({ page }) => {
  42 |   await openNewNdaIntake(page);
  43 |   await page.getByTestId("field-effective-date").fill("2026-04-15");
  44 |   await page.getByTestId("field-term-time").selectOption("one (1) year");
  45 |   await expect(page.getByTestId("field-end-date")).toHaveValue("2027-04-15");
  46 | 
  47 |   await page.getByTestId("field-end-date").fill(ndaFixture.customEndDate);
  48 |   await expect(page.getByTestId("field-term-time")).toHaveValue("1 year 3 months 12 days");
  49 |   await expect(page.getByText("Custom Time")).toHaveCount(0);
  50 | });
  51 | 
  52 | test("Save as Draft persists and can be reopened from Repository", async ({ page }) => {
  53 |   await openNewNdaIntake(page);
  54 |   await reachFinalDocument(page);
  55 |   await page.getByTestId("save-draft").click();
  56 |   await expect(page.getByText("Draft saved successfully")).toBeVisible();
  57 |   await gotoApp(page, "/repository");
  58 |   await page.getByText(ndaFixture.recordTitle).click();
  59 |   await expect(page.getByTestId("repository-detail-drawer")).toBeVisible();
  60 | });
  61 | 
  62 | test("Submit validates fields and saves request", async ({ page }) => {
  63 |   await openNewNdaIntake(page);
  64 |   await reachFinalDocument(page);
  65 |   await page.getByTestId("submit-for-legal-review").click();
  66 |   await expect(page.getByText("Submitted for legal review")).toBeVisible();
  67 |   await gotoApp(page, "/repository?status=In%20Review");
  68 |   await expect(page.getByText(ndaFixture.recordTitle)).toBeVisible();
  69 | });
  70 | 
  71 | 
```