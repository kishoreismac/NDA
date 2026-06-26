# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: template-placeholders.spec.ts >> newly created Admin templates are available during NDA creation
- Location: tests\e2e\template-placeholders.spec.ts:32:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /new template|add template|create template/i }).first()

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
          - heading "NDA Template Library" [level=1] [ref=e63]
          - paragraph [ref=e64]: Approved NDA templates. Final documents are generated from these originals — never rewritten by AI.
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img [ref=e67]
            - textbox "Search contracts, parties, clauses…" [ref=e70]
          - button "3" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - generic [ref=e75]: "3"
          - button "SJ Sarah Johnson Business User" [ref=e77] [cursor=pointer]:
            - generic [ref=e78]: SJ
            - generic [ref=e79]:
              - generic [ref=e80]: Sarah Johnson
              - generic [ref=e81]:
                - img [ref=e82]
                - text: Business User
            - img [ref=e85]
      - generic [ref=e88]:
        - generic [ref=e89]:
          - img [ref=e90]
          - textbox "Search by name, type, jurisdiction…" [ref=e93]
        - combobox [ref=e94]:
          - option "All" [selected]
          - option "Standard"
          - option "Mutual"
          - option "One-Way (Incoming)"
          - option "One-Way (Outgoing)"
          - option "Vendor"
          - option "Customer"
          - option "Partner"
          - option "Employee"
          - option "International"
        - generic [ref=e95]:
          - generic [ref=e96]: "9"
          - text: of 9 templates
      - generic [ref=e97]:
        - generic [ref=e98]:
          - generic [ref=e100]:
            - img [ref=e102]
            - generic [ref=e106]:
              - img [ref=e107]
              - text: Active
          - generic [ref=e110]:
            - generic [ref=e111]: Standard NDA
            - generic [ref=e112]: Standard · v1.0
            - paragraph [ref=e113]: General-purpose mutual NDA suitable for most low-risk engagements.
          - generic [ref=e114]:
            - generic [ref=e115]:
              - img [ref=e116]
              - generic [ref=e121]: Global
            - generic [ref=e122]:
              - img [ref=e123]
              - generic [ref=e127]: 16 fields
            - generic [ref=e128]:
              - img [ref=e129]
              - generic [ref=e131]: 2026-01-04
          - generic [ref=e132]:
            - button "Preview" [ref=e133] [cursor=pointer]:
              - img [ref=e134]
              - text: Preview
            - button "Use Template" [ref=e137] [cursor=pointer]:
              - text: Use Template
              - img [ref=e138]
        - generic [ref=e140]:
          - generic [ref=e142]:
            - img [ref=e144]
            - generic [ref=e148]:
              - img [ref=e149]
              - text: Active
          - generic [ref=e152]:
            - generic [ref=e153]: Mutual NDA
            - generic [ref=e154]: Mutual · v4.2
            - paragraph [ref=e155]: Bilateral confidentiality agreement where both parties may exchange confidential information.
          - generic [ref=e156]:
            - generic [ref=e157]:
              - img [ref=e158]
              - generic [ref=e163]: USA
            - generic [ref=e164]:
              - img [ref=e165]
              - generic [ref=e169]: 16 fields
            - generic [ref=e170]:
              - img [ref=e171]
              - generic [ref=e173]: 2026-04-22
          - generic [ref=e174]:
            - button "Preview" [ref=e175] [cursor=pointer]:
              - img [ref=e176]
              - text: Preview
            - button "Use Template" [ref=e179] [cursor=pointer]:
              - text: Use Template
              - img [ref=e180]
        - generic [ref=e182]:
          - generic [ref=e184]:
            - img [ref=e186]
            - generic [ref=e190]:
              - img [ref=e191]
              - text: Active
          - generic [ref=e194]:
            - generic [ref=e195]: One-Way NDA (Incoming)
            - generic [ref=e196]: One-Way (Incoming) · v3.0
            - paragraph [ref=e197]: Unilateral NDA — Counterparty discloses confidential information to Company.
          - generic [ref=e198]:
            - generic [ref=e199]:
              - img [ref=e200]
              - generic [ref=e205]: Global
            - generic [ref=e206]:
              - img [ref=e207]
              - generic [ref=e211]: 16 fields
            - generic [ref=e212]:
              - img [ref=e213]
              - generic [ref=e215]: 2026-02-18
          - generic [ref=e216]:
            - button "Preview" [ref=e217] [cursor=pointer]:
              - img [ref=e218]
              - text: Preview
            - button "Use Template" [ref=e221] [cursor=pointer]:
              - text: Use Template
              - img [ref=e222]
        - generic [ref=e224]:
          - generic [ref=e226]:
            - img [ref=e228]
            - generic [ref=e232]:
              - img [ref=e233]
              - text: Active
          - generic [ref=e236]:
            - generic [ref=e237]: One-Way NDA (Outgoing)
            - generic [ref=e238]: One-Way (Outgoing) · v3.1
            - paragraph [ref=e239]: Unilateral NDA — Company discloses confidential information to Counterparty.
          - generic [ref=e240]:
            - generic [ref=e241]:
              - img [ref=e242]
              - generic [ref=e247]: Global
            - generic [ref=e248]:
              - img [ref=e249]
              - generic [ref=e253]: 16 fields
            - generic [ref=e254]:
              - img [ref=e255]
              - generic [ref=e257]: 2026-02-18
          - generic [ref=e258]:
            - button "Preview" [ref=e259] [cursor=pointer]:
              - img [ref=e260]
              - text: Preview
            - button "Use Template" [ref=e263] [cursor=pointer]:
              - text: Use Template
              - img [ref=e264]
        - generic [ref=e266]:
          - generic [ref=e268]:
            - img [ref=e270]
            - generic [ref=e274]:
              - img [ref=e275]
              - text: Active
          - generic [ref=e278]:
            - generic [ref=e279]: Vendor / Supplier NDA
            - generic [ref=e280]: Vendor · v3.0
            - paragraph [ref=e281]: Confidentiality terms for engagements with vendors, suppliers, and contractors.
          - generic [ref=e282]:
            - generic [ref=e283]:
              - img [ref=e284]
              - generic [ref=e289]: Global
            - generic [ref=e290]:
              - img [ref=e291]
              - generic [ref=e295]: 15 fields
            - generic [ref=e296]:
              - img [ref=e297]
              - generic [ref=e299]: 2026-01-15
          - generic [ref=e300]:
            - button "Preview" [ref=e301] [cursor=pointer]:
              - img [ref=e302]
              - text: Preview
            - button "Use Template" [ref=e305] [cursor=pointer]:
              - text: Use Template
              - img [ref=e306]
        - generic [ref=e308]:
          - generic [ref=e310]:
            - img [ref=e312]
            - generic [ref=e316]:
              - img [ref=e317]
              - text: Active
          - generic [ref=e320]:
            - generic [ref=e321]: Customer NDA
            - generic [ref=e322]: Customer · v2.4
            - paragraph [ref=e323]: Confidentiality for customer evaluations, pilots, and pre-sales discussions.
          - generic [ref=e324]:
            - generic [ref=e325]:
              - img [ref=e326]
              - generic [ref=e331]: Global
            - generic [ref=e332]:
              - img [ref=e333]
              - generic [ref=e337]: 15 fields
            - generic [ref=e338]:
              - img [ref=e339]
              - generic [ref=e341]: 2026-03-04
          - generic [ref=e342]:
            - button "Preview" [ref=e343] [cursor=pointer]:
              - img [ref=e344]
              - text: Preview
            - button "Use Template" [ref=e347] [cursor=pointer]:
              - text: Use Template
              - img [ref=e348]
        - generic [ref=e350]:
          - generic [ref=e352]:
            - img [ref=e354]
            - generic [ref=e358]:
              - img [ref=e359]
              - text: Active
          - generic [ref=e362]:
            - generic [ref=e363]: Partner / Channel NDA
            - generic [ref=e364]: Partner · v2.1
            - paragraph [ref=e365]: For strategic partners, resellers, and channel discussions.
          - generic [ref=e366]:
            - generic [ref=e367]:
              - img [ref=e368]
              - generic [ref=e373]: Global
            - generic [ref=e374]:
              - img [ref=e375]
              - generic [ref=e379]: 16 fields
            - generic [ref=e380]:
              - img [ref=e381]
              - generic [ref=e383]: 2026-02-28
          - generic [ref=e384]:
            - button "Preview" [ref=e385] [cursor=pointer]:
              - img [ref=e386]
              - text: Preview
            - button "Use Template" [ref=e389] [cursor=pointer]:
              - text: Use Template
              - img [ref=e390]
        - generic [ref=e392]:
          - generic [ref=e394]:
            - img [ref=e396]
            - generic [ref=e400]:
              - img [ref=e401]
              - text: Active
          - generic [ref=e404]:
            - generic [ref=e405]: Employee / Contractor NDA
            - generic [ref=e406]: Employee · v5.0
            - paragraph [ref=e407]: For new hires, contractors, interns, and internal personnel.
          - generic [ref=e408]:
            - generic [ref=e409]:
              - img [ref=e410]
              - generic [ref=e415]: USA
            - generic [ref=e416]:
              - img [ref=e417]
              - generic [ref=e421]: 11 fields
            - generic [ref=e422]:
              - img [ref=e423]
              - generic [ref=e425]: 2026-04-09
          - generic [ref=e426]:
            - button "Preview" [ref=e427] [cursor=pointer]:
              - img [ref=e428]
              - text: Preview
            - button "Use Template" [ref=e431] [cursor=pointer]:
              - text: Use Template
              - img [ref=e432]
        - generic [ref=e434]:
          - generic [ref=e436]:
            - img [ref=e438]
            - generic [ref=e442]:
              - img [ref=e443]
              - text: Active
          - generic [ref=e446]:
            - generic [ref=e447]: International NDA (GDPR / SCCs)
            - generic [ref=e448]: International · v3.3
            - paragraph [ref=e449]: Cross-border NDA with GDPR Standard Contractual Clauses references.
          - generic [ref=e450]:
            - generic [ref=e451]:
              - img [ref=e452]
              - generic [ref=e457]: EU + USA
            - generic [ref=e458]:
              - img [ref=e459]
              - generic [ref=e463]: 16 fields
            - generic [ref=e464]:
              - img [ref=e465]
              - generic [ref=e467]: 2026-04-25
          - generic [ref=e468]:
            - button "Preview" [ref=e469] [cursor=pointer]:
              - img [ref=e470]
              - text: Preview
            - button "Use Template" [ref=e473] [cursor=pointer]:
              - text: Use Template
              - img [ref=e474]
  - alert [ref=e476]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | import { completeRequiredNdaIntakeThroughTemplate, openNewNdaIntake } from "./helpers/nda";
  4  | 
  5  | test.beforeEach(async ({ page }) => {
  6  |   await resetDemoState(page);
  7  |   await gotoApp(page);
  8  | });
  9  | 
  10 | test("template selection, preview, placeholders, and single Continue behavior work", async ({ page }) => {
  11 |   await switchRole(page, "business");
  12 |   await openNewNdaIntake(page);
  13 |   await completeRequiredNdaIntakeThroughTemplate(page);
  14 |   await page.getByTestId("template-option-tpl-mutual").click();
  15 |   await page.getByTestId("view-template-preview-placeholders").click();
  16 | 
  17 |   await expect(page.getByTestId("template-preview-panel")).toBeVisible();
  18 |   await expect(page.getByTestId("placeholder-validation-panel")).toBeVisible();
  19 |   await expect(page.getByText(/\{\{CompanyName\}\}/)).toBeVisible();
  20 |   await expect(page.getByTestId("intake-section-template").getByRole("button", { name: /continue/i })).toHaveCount(0);
  21 |   await expect(page.getByTestId("intake-continue")).toHaveCount(1);
  22 | });
  23 | 
  24 | test("placeholder warnings appear if required values are missing", async ({ page }) => {
  25 |   await switchRole(page, "business");
  26 |   await openNewNdaIntake(page);
  27 |   await page.getByTestId("intake-step-template").click();
  28 |   await page.getByTestId("view-template-preview-placeholders").click();
  29 |   await expect(page.getByTestId("placeholder-validation-panel")).toContainText(/missing|required/i);
  30 | });
  31 | 
  32 | test("newly created Admin templates are available during NDA creation", async ({ page }) => {
  33 |   await switchRole(page, "admin");
  34 |   await gotoApp(page, "/templates");
> 35 |   await page.getByRole("button", { name: /new template|add template|create template/i }).first().click();
     |                                                                                                  ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  36 |   await page.getByPlaceholder(/template name|name/i).first().fill("QA Admin NDA Template");
  37 |   await page.getByRole("button", { name: /save/i }).last().click();
  38 | 
  39 |   await gotoApp(page, "/requests/new-contract");
  40 |   await expect(page.getByTestId("select-more-templates-dropdown")).toContainText("QA Admin NDA Template");
  41 | });
  42 | 
  43 | 
```