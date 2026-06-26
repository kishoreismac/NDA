# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: request-contract.spec.ts >> quick templates and select more template dropdown behave correctly
- Location: tests\e2e\request-contract.spec.ts:17:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText('One-Way NDA').first()
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByText('One-Way NDA').first()
    22 × locator resolved to 1 element
       - unexpected value "1"

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
          - heading "Request a New Contract" [level=1] [ref=e63]
          - paragraph [ref=e64]: Pick a quick-start template, choose from the full library, or start a blank request.
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img [ref=e67]
            - textbox "Search contracts, parties, clauses…" [ref=e70]
          - button "3" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - generic [ref=e75]: "3"
          - link "Back" [ref=e76] [cursor=pointer]:
            - /url: /dashboard
            - img [ref=e77]
            - text: Back
          - button "SJ Sarah Johnson Business User" [ref=e80] [cursor=pointer]:
            - generic [ref=e81]: SJ
            - generic [ref=e82]:
              - generic [ref=e83]: Sarah Johnson
              - generic [ref=e84]:
                - img [ref=e85]
                - text: Business User
            - img [ref=e88]
      - generic [ref=e90]:
        - generic [ref=e91]: Quick Templates
        - generic [ref=e92]:
          - button "Standard NDA General-purpose mutual NDA suitable for most low-risk engagements. Standard · v1.0" [ref=e93] [cursor=pointer]:
            - generic [ref=e94]:
              - img [ref=e95]
              - generic [ref=e98]: Standard NDA
            - generic [ref=e99]: General-purpose mutual NDA suitable for most low-risk engagements.
            - generic [ref=e100]: Standard · v1.0
          - button "Mutual NDA Bilateral confidentiality agreement where both parties may exchange confidential information. Mutual · v4.2" [ref=e101] [cursor=pointer]:
            - generic [ref=e102]:
              - img [ref=e103]
              - generic [ref=e106]: Mutual NDA
            - generic [ref=e107]: Bilateral confidentiality agreement where both parties may exchange confidential information.
            - generic [ref=e108]: Mutual · v4.2
          - button "Employee / Contractor NDA For new hires, contractors, interns, and internal personnel. Employee · v5.0" [ref=e109] [cursor=pointer]:
            - generic [ref=e110]:
              - img [ref=e111]
              - generic [ref=e114]: Employee / Contractor NDA
            - generic [ref=e115]: For new hires, contractors, interns, and internal personnel.
            - generic [ref=e116]: Employee · v5.0
      - generic [ref=e117]:
        - generic [ref=e118]: Select More Templates
        - generic [ref=e119]:
          - generic [ref=e120]:
            - combobox [ref=e121]:
              - option "— Choose a template from the full library —" [selected]
              - option "One-Way NDA (Incoming) · One-Way (Incoming) · Global · v3.0"
              - option "One-Way NDA (Outgoing) · One-Way (Outgoing) · Global · v3.1"
              - option "Vendor / Supplier NDA · Vendor · Global · v3.0"
              - option "Customer NDA · Customer · Global · v2.4"
              - option "Partner / Channel NDA · Partner · Global · v2.1"
              - option "International NDA (GDPR / SCCs) · International · EU + USA · v3.3"
            - img
          - button "Continue" [disabled] [ref=e122]:
            - text: Continue
            - img [ref=e123]
      - generic [ref=e125]:
        - generic [ref=e126]: Need a custom flow? Start a blank request and pick the template later during intake.
        - generic [ref=e127]:
          - link "Browse all templates →" [ref=e128] [cursor=pointer]:
            - /url: /templates
          - button "Start a blank request" [ref=e129] [cursor=pointer]
  - alert [ref=e130]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole } from "./helpers/app";
  3  | 
  4  | test.beforeEach(async ({ page }) => {
  5  |   await resetDemoState(page);
  6  |   await gotoApp(page);
  7  |   await switchRole(page, "business");
  8  | });
  9  | 
  10 | test("Request a New Contract opens a full-page view, not a popup", async ({ page }) => {
  11 |   await page.getByTestId("dashboard-cta-request-a-new-contract").click();
  12 |   await page.waitForURL(/\/requests\/new-contract/);
  13 |   await expect(page.getByText("Pick a quick-start template")).toBeVisible();
  14 |   await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  15 | });
  16 | 
  17 | test("quick templates and select more template dropdown behave correctly", async ({ page }) => {
  18 |   await gotoApp(page, "/requests/new-contract");
  19 |   const quick = page.locator('[data-testid^="quick-template-"]');
  20 |   await expect(quick).toHaveCount(3);
  21 |   await expect(page.getByTestId("quick-template-standard-nda")).toBeVisible();
  22 |   await expect(page.getByTestId("quick-template-mutual-nda")).toBeVisible();
  23 |   await expect(page.getByTestId("quick-template-employee-contractor-nda")).toBeVisible();
  24 | 
  25 |   await expect(page.getByTestId("select-more-templates-dropdown")).toBeVisible();
> 26 |   await expect(page.getByText("One-Way NDA").first()).toHaveCount(0);
     |                                                       ^ Error: expect(locator).toHaveCount(expected) failed
  27 |   await page.getByTestId("select-more-templates-dropdown").selectOption({ index: 1 });
  28 |   await expect(page.getByTestId("select-more-templates-continue")).toBeEnabled();
  29 | });
  30 | 
  31 | 
```