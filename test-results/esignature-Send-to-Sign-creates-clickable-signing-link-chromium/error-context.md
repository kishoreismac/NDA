# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: esignature.spec.ts >> Send to Sign creates clickable signing link
- Location: tests\e2e\esignature.spec.ts:18:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByTestId('repository-detail-send-for-sign')
    - locator resolved to <button disabled title="Available after Approved" data-testid="repository-detail-send-for-sign" class="btn-ghost text-xs disabled:opacity-40 disabled:cursor-not-allowed">Send for Sign</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    27 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

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
            - option "Approved" [selected]
            - option "Awaiting Signature"
            - option "Signed"
            - option "Archived"
        - generic [ref=e101]:
          - img [ref=e102]
          - text: Showing
          - generic [ref=e104]: "1"
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
          - row "NDA-2039 Hooli Cloud — Hosting Eval Vendor Low Approved Maya Davis Feb 10, 2027 May 18, 2026, 10:22 AM View" [ref=e121] [cursor=pointer]:
            - cell "NDA-2039" [ref=e122]
            - cell "Hooli Cloud — Hosting Eval" [ref=e123]:
              - generic [ref=e124]: Hooli Cloud — Hosting Eval
            - cell "Vendor" [ref=e125]
            - cell "Low" [ref=e126]
            - cell "Approved" [ref=e127]
            - cell "Maya Davis" [ref=e128]
            - cell "Feb 10, 2027" [ref=e129]
            - cell [ref=e130]
            - cell "May 18, 2026, 10:22 AM" [ref=e131]
            - cell "View" [ref=e132]:
              - generic [ref=e133]:
                - button "View" [ref=e134]:
                  - img [ref=e135]
                  - text: View
                - button "More actions" [ref=e138]:
                  - img [ref=e139]
      - complementary [ref=e145]:
        - generic [ref=e146]:
          - generic [ref=e147]:
            - generic [ref=e148]: NDA-2041
            - generic [ref=e149]: Acme Robotics — Joint R&D
            - generic [ref=e150]:
              - generic [ref=e151]: Medium
              - generic [ref=e152]: In Review
              - generic [ref=e153]: Mutual
          - button "Close" [ref=e154] [cursor=pointer]:
            - img [ref=e155]
            - text: Close
        - generic [ref=e158]:
          - generic [ref=e160]:
            - generic [ref=e161]:
              - img [ref=e163]
              - generic [ref=e166]:
                - generic [ref=e167]: Owner
                - generic [ref=e168]: Sara Patel
            - generic [ref=e169]:
              - img [ref=e171]
              - generic [ref=e173]:
                - generic [ref=e174]: Updated
                - generic [ref=e175]: May 19, 2026, 08:22 AM
          - generic [ref=e176]:
            - generic [ref=e177]: Workflow Actions
            - generic [ref=e178]:
              - button "Send for Sign" [disabled] [ref=e179]
              - button "Mark Signed" [disabled] [ref=e180]
              - button "Cancel NDA" [ref=e181] [cursor=pointer]
              - button "Delete" [ref=e182] [cursor=pointer]:
                - img [ref=e183]
                - text: Delete
          - generic [ref=e188]:
            - generic [ref=e189]:
              - generic [ref=e190]:
                - img [ref=e191]
                - heading "NDA Document" [level=4] [ref=e194]
              - generic [ref=e195]: Mutual NDA · v4.2
            - generic [ref=e196]:
              - button "Preview" [ref=e197] [cursor=pointer]:
                - img [ref=e198]
                - text: Preview
              - button "Download DOCX" [ref=e201] [cursor=pointer]:
                - img [ref=e202]
                - text: Download DOCX
              - button "Download PDF" [ref=e206] [cursor=pointer]:
                - img [ref=e207]
                - text: Download PDF
          - generic [ref=e210]:
            - generic [ref=e212]:
              - img [ref=e213]
              - text: Record Audit Trail
            - table [ref=e218]:
              - rowgroup [ref=e219]:
                - row "Timestamp Actor Action Target" [ref=e220]:
                  - columnheader "Timestamp" [ref=e221]
                  - columnheader "Actor" [ref=e222]
                  - columnheader "Action" [ref=e223]
                  - columnheader "Target" [ref=e224]
              - rowgroup [ref=e225]:
                - row "Jun 25, 2026, 11:55 AM Jordan Nguyen Risk Review document downloaded DOC-AB12CD.pdf" [ref=e226]:
                  - cell "Jun 25, 2026, 11:55 AM" [ref=e227]
                  - cell "Jordan Nguyen" [ref=e228]
                  - cell "Risk Review document downloaded" [ref=e229]
                  - cell "DOC-AB12CD.pdf" [ref=e230]
                - row "Jun 24, 2026, 11:55 PM Sara Patel DOCX downloaded DOC-AB12CD.docx" [ref=e231]:
                  - cell "Jun 24, 2026, 11:55 PM" [ref=e232]
                  - cell "Sara Patel" [ref=e233]
                  - cell "DOCX downloaded" [ref=e234]
                  - cell "DOC-AB12CD.docx" [ref=e235]
                - row "Jun 24, 2026, 10:55 PM Sara Patel Final NDA generated Mutual NDA v4.2 → DOC-AB12CD" [ref=e236]:
                  - cell "Jun 24, 2026, 10:55 PM" [ref=e237]
                  - cell "Sara Patel" [ref=e238]
                  - cell "Final NDA generated" [ref=e239]
                  - cell "Mutual NDA v4.2 → DOC-AB12CD" [ref=e240]
                - row "Jun 24, 2026, 09:55 PM NDAFlow Placeholder values validated 16/16 ready" [ref=e241]:
                  - cell "Jun 24, 2026, 09:55 PM" [ref=e242]
                  - cell "NDAFlow" [ref=e243]
                  - cell "Placeholder values validated" [ref=e244]
                  - cell "16/16 ready" [ref=e245]
                - row "Jun 24, 2026, 07:55 PM Sara Patel Template previewed Mutual NDA v4.2" [ref=e246]:
                  - cell "Jun 24, 2026, 07:55 PM" [ref=e247]
                  - cell "Sara Patel" [ref=e248]
                  - cell "Template previewed" [ref=e249]
                  - cell "Mutual NDA v4.2" [ref=e250]
                - row "Jun 24, 2026, 05:55 PM Sara Patel Template selected Mutual NDA v4.2" [ref=e251]:
                  - cell "Jun 24, 2026, 05:55 PM" [ref=e252]
                  - cell "Sara Patel" [ref=e253]
                  - cell "Template selected" [ref=e254]
                  - cell "Mutual NDA v4.2" [ref=e255]
  - alert [ref=e256]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { gotoApp, resetDemoState, switchRole, expectDownloadFrom } from "./helpers/app";
  3  | 
  4  | test.beforeEach(async ({ page }) => {
  5  |   await resetDemoState(page);
  6  |   await gotoApp(page);
  7  |   await switchRole(page, "legal");
  8  | });
  9  | 
  10 | async function createSigningLink(page) {
  11 |   await gotoApp(page, "/repository?status=Approved");
  12 |   await page.getByTestId("repository-row").first().click();
> 13 |   await page.getByTestId("repository-detail-send-for-sign").click();
     |                                                             ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  14 |   await expect(page.getByTestId("signature-sent-modal")).toBeVisible();
  15 |   return page.getByTestId("signing-link-input").inputValue();
  16 | }
  17 | 
  18 | test("Send to Sign creates clickable signing link", async ({ page }) => {
  19 |   const url = await createSigningLink(page);
  20 |   expect(url).toContain("/sign/");
  21 |   await expect(page.getByTestId("open-signing-page")).toHaveAttribute("href", url);
  22 | });
  23 | 
  24 | test("counterparty can open signing page, preview/download, sign, and see confirmation", async ({ page, context }) => {
  25 |   const url = await createSigningLink(page);
  26 |   const signer = await context.newPage();
  27 |   await signer.goto(url);
  28 |   await signer.waitForLoadState("networkidle");
  29 |   await expect(signer.getByTestId("signing-page-root")).toBeVisible();
  30 | 
  31 |   await signer.getByTestId("signing-preview-document").click();
  32 |   await expect(signer.getByText("Review the Full NDA Document")).toBeVisible();
  33 |   await expectDownloadFrom(signer, () => signer.getByTestId("signing-download-pdf").click(), "pdf");
  34 | 
  35 |   await signer.getByTestId("signer-name").fill("Morgan QA Ellis");
  36 |   await signer.getByTestId("signer-title").fill("Authorized Signatory");
  37 |   await signer.getByPlaceholder(/type your name/i).fill("Morgan QA Ellis");
  38 |   await signer.getByTestId("signing-agreement-checkbox").check();
  39 |   await signer.getByTestId("sign-and-return").click();
  40 | 
  41 |   await expect(signer.getByTestId("signing-confirmation-page")).toBeVisible();
  42 |   await expect(signer.getByText("Return to CLM Dashboard")).toHaveCount(0);
  43 |   await expect(signer.getByTestId("download-signed-nda")).toBeVisible();
  44 | });
  45 | 
  46 | 
```