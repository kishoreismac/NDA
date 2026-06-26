# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: settings-admin.spec.ts >> Admin can access settings, add users, and switch themes
- Location: tests\e2e\settings-admin.spec.ts:10:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Admin Settings')
Expected: visible
Error: strict mode violation: getByText('Admin Settings') resolved to 2 elements:
    1) <span>Admin Settings</span> aka getByTestId('sidebar-link-admin-settings')
    2) <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-white">Admin Settings</h1> aka getByRole('heading', { name: 'Admin Settings' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Admin Settings')

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
          - heading "Admin Settings" [level=1] [ref=e63]
          - paragraph [ref=e64]: Configure your organization, AI behavior, security and integrations.
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img [ref=e67]
            - textbox "Search contracts, parties, clauses…" [ref=e70]
          - button "3" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - generic [ref=e75]: "3"
          - button "Save Changes" [ref=e76] [cursor=pointer]:
            - img [ref=e77]
            - text: Save Changes
          - button "SJ Sarah Johnson Business User" [ref=e82] [cursor=pointer]:
            - generic [ref=e83]: SJ
            - generic [ref=e84]:
              - generic [ref=e85]: Sarah Johnson
              - generic [ref=e86]:
                - img [ref=e87]
                - text: Business User
            - img [ref=e90]
      - generic [ref=e92]:
        - list [ref=e94]:
          - listitem [ref=e95]:
            - button "Organization" [ref=e96] [cursor=pointer]:
              - img [ref=e97]
              - text: Organization
          - listitem [ref=e101]:
            - button "Appearance" [ref=e102] [cursor=pointer]:
              - img [ref=e103]
              - text: Appearance
          - listitem [ref=e109]:
            - button "AI Settings" [ref=e110] [cursor=pointer]:
              - img [ref=e111]
              - text: AI Settings
          - listitem [ref=e113]:
            - button "Security & Compliance" [ref=e114] [cursor=pointer]:
              - img [ref=e115]
              - text: Security & Compliance
          - listitem [ref=e117]:
            - button "Users & Roles" [ref=e118] [cursor=pointer]:
              - img [ref=e119]
              - text: Users & Roles
          - listitem [ref=e124]:
            - button "Notifications" [ref=e125] [cursor=pointer]:
              - img [ref=e126]
              - text: Notifications
          - listitem [ref=e129]:
            - button "Integrations" [ref=e130] [cursor=pointer]:
              - img [ref=e131]
              - text: Integrations
        - generic [ref=e133]:
          - heading "Organization" [level=3] [ref=e134]
          - generic [ref=e135]:
            - generic [ref=e136]:
              - generic [ref=e137]: Legal entity name
              - textbox [ref=e138]: Contoso Corporation
            - generic [ref=e139]:
              - generic [ref=e140]: Default jurisdiction
              - combobox [ref=e141]:
                - option "Delaware, USA" [selected]
                - option "England & Wales"
            - generic [ref=e142]:
              - generic [ref=e143]: Default NDA term
              - combobox [ref=e144]:
                - option "2 years" [selected]
                - option "3 years"
                - option "5 years"
            - generic [ref=e145]:
              - generic [ref=e146]: Time zone
              - combobox [ref=e147]:
                - option "America/Los_Angeles" [selected]
                - option "America/New_York"
                - option "Europe/London"
  - alert [ref=e148]
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
> 12 |   await expect(page.getByText("Admin Settings")).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
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
  38 |   await expect(page.getByText("QA Partner LLC")).toBeVisible();
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