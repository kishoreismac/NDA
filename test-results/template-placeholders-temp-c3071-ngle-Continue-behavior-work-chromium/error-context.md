# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: template-placeholders.spec.ts >> template selection, preview, placeholders, and single Continue behavior work
- Location: tests\e2e\template-placeholders.spec.ts:10:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/\{\{CompanyName\}\}/)
Expected: visible
Error: strict mode violation: getByText(/\{\{CompanyName\}\}/) resolved to 3 elements:
    1) <span class="px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 font-mono text-[12px] mx-0.5">{{CompanyName}}</span> aka getByText('{{CompanyName}}').first()
    2) <span class="px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 font-mono text-[12px] mx-0.5">{{CompanyName}}</span> aka getByText('{{CompanyName}}').nth(1)
    3) <td class="px-2 py-2.5 font-mono text-[11px] text-slate-200">{{CompanyName}}</td> aka getByRole('cell', { name: '{{CompanyName}}' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/\{\{CompanyName\}\}/)

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
          - button "Counterparty Details" [ref=e93] [cursor=pointer]:
            - img [ref=e95]
            - img [ref=e97]
            - generic [ref=e101]: Counterparty Details
        - listitem [ref=e103]:
          - button "Record Details" [ref=e104] [cursor=pointer]:
            - img [ref=e106]
            - img [ref=e108]
            - generic [ref=e111]: Record Details
        - listitem [ref=e113]:
          - button "3 Template & Placeholders" [ref=e114] [cursor=pointer]:
            - generic [ref=e115]: "3"
            - img [ref=e116]
            - generic [ref=e119]: Template & Placeholders
        - listitem [ref=e121]:
          - button "4 Additional NDA Questions" [ref=e122] [cursor=pointer]:
            - generic [ref=e123]: "4"
            - img [ref=e124]
            - generic [ref=e127]: Additional NDA Questions
        - listitem [ref=e129]:
          - button "5 PII / Data Questions" [ref=e130] [cursor=pointer]:
            - generic [ref=e131]: "5"
            - img [ref=e132]
            - generic [ref=e134]: PII / Data Questions
        - listitem [ref=e136]:
          - button "6 Risk Review" [ref=e137] [cursor=pointer]:
            - generic [ref=e138]: "6"
            - img [ref=e139]
            - generic [ref=e142]: Risk Review
        - listitem [ref=e144]:
          - button "7 Generate Final NDA" [ref=e145] [cursor=pointer]:
            - generic [ref=e146]: "7"
            - img [ref=e147]
            - generic [ref=e150]: Generate Final NDA
      - generic [ref=e151]:
        - generic [ref=e152]:
          - generic [ref=e153]:
            - generic [ref=e154]:
              - generic [ref=e155]:
                - heading "Select NDA Template" [level=3] [ref=e156]
                - generic [ref=e157]: 9 approved templates
              - generic [ref=e158]:
                - button "Standard NDA Standard · v1.0 · Global 16 placeholders" [ref=e159] [cursor=pointer]:
                  - generic [ref=e161]: Standard NDA
                  - generic [ref=e162]: Standard · v1.0 · Global
                  - generic [ref=e163]: 16 placeholders
                - button "Mutual NDA Mutual · v4.2 · USA 16 placeholders" [ref=e164] [cursor=pointer]:
                  - generic [ref=e165]:
                    - generic [ref=e166]: Mutual NDA
                    - img [ref=e167]
                  - generic [ref=e170]: Mutual · v4.2 · USA
                  - generic [ref=e171]: 16 placeholders
                - button "One-Way NDA (Incoming) One-Way (Incoming) · v3.0 · Global 16 placeholders" [ref=e172] [cursor=pointer]:
                  - generic [ref=e174]: One-Way NDA (Incoming)
                  - generic [ref=e175]: One-Way (Incoming) · v3.0 · Global
                  - generic [ref=e176]: 16 placeholders
                - button "One-Way NDA (Outgoing) One-Way (Outgoing) · v3.1 · Global 16 placeholders" [ref=e177] [cursor=pointer]:
                  - generic [ref=e179]: One-Way NDA (Outgoing)
                  - generic [ref=e180]: One-Way (Outgoing) · v3.1 · Global
                  - generic [ref=e181]: 16 placeholders
                - button "Vendor / Supplier NDA Vendor · v3.0 · Global 15 placeholders" [ref=e182] [cursor=pointer]:
                  - generic [ref=e184]: Vendor / Supplier NDA
                  - generic [ref=e185]: Vendor · v3.0 · Global
                  - generic [ref=e186]: 15 placeholders
                - button "Customer NDA Customer · v2.4 · Global 15 placeholders" [ref=e187] [cursor=pointer]:
                  - generic [ref=e189]: Customer NDA
                  - generic [ref=e190]: Customer · v2.4 · Global
                  - generic [ref=e191]: 15 placeholders
                - button "Partner / Channel NDA Partner · v2.1 · Global 16 placeholders" [ref=e192] [cursor=pointer]:
                  - generic [ref=e194]: Partner / Channel NDA
                  - generic [ref=e195]: Partner · v2.1 · Global
                  - generic [ref=e196]: 16 placeholders
                - button "Employee / Contractor NDA Employee · v5.0 · USA 11 placeholders" [ref=e197] [cursor=pointer]:
                  - generic [ref=e199]: Employee / Contractor NDA
                  - generic [ref=e200]: Employee · v5.0 · USA
                  - generic [ref=e201]: 11 placeholders
                - button "International NDA (GDPR / SCCs) International · v3.3 · EU + USA 16 placeholders" [ref=e202] [cursor=pointer]:
                  - generic [ref=e204]: International NDA (GDPR / SCCs)
                  - generic [ref=e205]: International · v3.3 · EU + USA
                  - generic [ref=e206]: 16 placeholders
              - generic [ref=e207]:
                - generic [ref=e208]:
                  - generic [ref=e209]: Governing law *
                  - combobox [ref=e210]:
                    - option "Delaware, USA" [selected]
                    - option "New York, USA"
                    - option "California, USA"
                    - option "England & Wales"
                    - option "Singapore"
                    - option "Germany"
                - generic [ref=e211]:
                  - generic [ref=e212]: Jurisdiction *
                  - textbox [ref=e213]: Delaware, USA
              - generic [ref=e214]:
                - generic [ref=e215]: Preview shown below. Use Continue at the bottom when you're ready.
                - button "Hide Preview" [active] [ref=e216] [cursor=pointer]
            - generic [ref=e217]:
              - generic [ref=e218]:
                - generic [ref=e219]:
                  - generic [ref=e220]: Template Preview — Mutual NDA
                  - generic [ref=e221]: Detected placeholders are highlighted. Switch view to see filled-in values.
                - generic [ref=e222]:
                  - button "Raw" [ref=e223] [cursor=pointer]:
                    - img [ref=e224]
                    - text: Raw
                  - button "Filled" [ref=e227] [cursor=pointer]:
                    - img [ref=e228]
                    - text: Filled
              - generic [ref=e232]:
                - generic [ref=e233]:
                  - generic [ref=e234]: Contoso Corporation
                  - generic [ref=e235]: Mutual NDA · v4.2
                - generic [ref=e236]:
                  - heading "MUTUAL NON-DISCLOSURE AGREEMENT" [level=1] [ref=e237]
                  - generic [ref=e238]: "Project: {{ProjectName}}"
                  - paragraph [ref=e239]: "This Mutual Non-Disclosure Agreement (this “Agreement”) is entered into and effective as of {{EffectiveDate}} (the “Effective Date”) by and between:"
                  - paragraph [ref=e240]: "{{CompanyName}}, with its principal place of business at {{CompanyAddress}} (“Company”); and"
                  - paragraph [ref=e241]: "{{CounterpartyName}}, with its principal place of business at {{CounterpartyAddress}} (“Counterparty”)."
                  - paragraph [ref=e242]: Each a “Party” and collectively the “Parties.”
                  - heading "1. PURPOSE" [level=2] [ref=e243]
                  - paragraph [ref=e244]: "The Parties wish to explore a potential business relationship in connection with: {{BusinessPurpose}} (the “Purpose”). In furtherance of the Purpose, each Party may disclose to the other certain Confidential Information."
                  - heading "2. CONFIDENTIAL INFORMATION" [level=2] [ref=e245]
                  - paragraph [ref=e246]: "\"Confidential Information\" means any non-public business, technical, financial, or other information disclosed by one party (\"Disclosing Party\") to the other (\"Receiving Party\"), whether orally, in writing, electronically, or by inspection of tangible objects, that is designated as confidential at the time of disclosure or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure, including without limitation: {{ConfidentialInformation}}."
                  - heading "3. OBLIGATIONS OF THE PARTIES" [level=2] [ref=e247]
                  - paragraph [ref=e248]: The Receiving Party shall (a) hold the Confidential Information in strict confidence, (b) use the Confidential Information solely for the Purpose, (c) protect such information using at least the same degree of care it uses to protect its own confidential information of like importance, but in no event less than a reasonable degree of care, and (d) not disclose Confidential Information to any third party without the prior written consent of the Disclosing Party.
                  - heading "4. EXCLUSIONS" [level=2] [ref=e249]
                  - paragraph [ref=e250]: "Confidential Information shall not include information that: (a) is or becomes publicly known through no fault of the Receiving Party; (b) was rightfully in the Receiving Party's possession prior to disclosure; (c) is rightfully obtained from a third party without restriction; or (d) is independently developed by the Receiving Party without reference to the Confidential Information."
                  - heading "5. TERM AND TERMINATION" [level=2] [ref=e251]
                  - paragraph [ref=e252]: "This Agreement shall commence on the Effective Date and remain in effect for {{NDADuration}}, unless earlier terminated by either Party upon thirty (30) days’ prior written notice. The confidentiality obligations set forth herein shall survive termination for {{SurvivalPeriod}}."
                  - heading "6. RETURN OR DESTRUCTION" [level=2] [ref=e253]
                  - paragraph [ref=e254]: Upon written request of the Disclosing Party, the Receiving Party shall promptly return or destroy all Confidential Information in its possession and certify such return or destruction in writing.
                  - heading "7. NO LICENSE" [level=2] [ref=e255]
                  - paragraph [ref=e256]: Nothing in this Agreement shall be construed as granting any license or right under any patent, copyright, trademark, trade secret, or other intellectual property right of either Party.
                  - heading "8. EQUITABLE REMEDIES" [level=2] [ref=e257]
                  - paragraph [ref=e258]: The Receiving Party acknowledges that any unauthorized disclosure or use of Confidential Information may cause irreparable harm to the Disclosing Party for which monetary damages may be inadequate, and the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law or in equity.
                  - heading "9. GOVERNING LAW AND JURISDICTION" [level=2] [ref=e259]
                  - paragraph [ref=e260]: "This Agreement shall be governed by and construed in accordance with the laws of {{GoverningLaw}}, without regard to its conflict of law principles. The Parties consent to the exclusive jurisdiction of the courts located in {{Jurisdiction}}."
                  - heading "10. ENTIRE AGREEMENT" [level=2] [ref=e261]
                  - paragraph [ref=e262]: This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior or contemporaneous agreements. No modification shall be effective unless in writing and signed by both Parties.
                  - heading "11. COUNTERPARTS" [level=2] [ref=e263]
                  - paragraph [ref=e264]: This Agreement may be executed in counterparts, including by electronic signature, each of which shall be deemed an original and together shall constitute one instrument.
                  - paragraph [ref=e266]: IN WITNESS WHEREOF, the Parties have caused this Agreement to be executed by their duly authorized representatives as of the Effective Date.
                  - generic [ref=e267]:
                    - paragraph [ref=e268]: IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date.
                    - generic [ref=e269]:
                      - generic [ref=e270]:
                        - generic [ref=e271]: "{{CompanyName}}"
                        - generic [ref=e272]:
                          - generic [ref=e273]: "By: ____________________________________"
                          - generic [ref=e274]:
                            - text: "Name:"
                            - text: "{{AuthorizedSignerName}}"
                          - generic [ref=e275]:
                            - text: "Title:"
                            - text: "{{AuthorizedSignerTitle}}"
                          - generic [ref=e276]: "Date: __________________________"
                      - generic [ref=e277]:
                        - generic [ref=e278]: "{{CounterpartyName}}"
                        - generic [ref=e279]:
                          - generic [ref=e280]: "By: ____________________________________"
                          - generic [ref=e281]:
                            - text: "Name:"
                            - text: "{{CounterpartySignerName}}"
                          - generic [ref=e282]:
                            - text: "Title:"
                            - text: "{{CounterpartySignerTitle}}"
                          - generic [ref=e283]: "Date: __________________________"
                - generic [ref=e284]:
                  - generic [ref=e285]: Generated by NDAFlow · Template-based · No AI rewriting
                  - generic [ref=e286]: tpl-mutual · v4.2
            - generic [ref=e288]:
              - generic [ref=e289]:
                - img [ref=e290]
                - generic [ref=e293]: All required placeholders are populated. Document ready to generate.
              - table [ref=e295]:
                - rowgroup [ref=e296]:
                  - row "Placeholder Source field Current value Status" [ref=e297]:
                    - columnheader "Placeholder" [ref=e298]
                    - columnheader "Source field" [ref=e299]
                    - columnheader "Current value" [ref=e300]
                    - columnheader "Status" [ref=e301]
                - rowgroup [ref=e302]:
                  - 'row "{{ProjectName}} record.projectName QA Automation Mutual NDA Ready" [ref=e303]':
                    - 'cell "{{ProjectName}}" [ref=e304]'
                    - cell "record.projectName" [ref=e305]
                    - cell "QA Automation Mutual NDA" [ref=e306]
                    - cell "Ready" [ref=e307]:
                      - generic [ref=e308]:
                        - img [ref=e309]
                        - text: Ready
                  - 'row "{{EffectiveDate}} record.effectiveDate April 15, 2026 Ready" [ref=e312]':
                    - 'cell "{{EffectiveDate}}" [ref=e313]'
                    - cell "record.effectiveDate" [ref=e314]
                    - cell "April 15, 2026" [ref=e315]
                    - cell "Ready" [ref=e316]:
                      - generic [ref=e317]:
                        - img [ref=e318]
                        - text: Ready
                  - 'row "{{CompanyName}} company.name Contoso Corporation Ready" [ref=e321]':
                    - 'cell "{{CompanyName}}" [ref=e322]'
                    - cell "company.name" [ref=e323]
                    - cell "Contoso Corporation" [ref=e324]
                    - cell "Ready" [ref=e325]:
                      - generic [ref=e326]:
                        - img [ref=e327]
                        - text: Ready
                  - 'row "{{CompanyAddress}} company.address 1 Microsoft Way, Redmond, WA 98052, USA Ready" [ref=e330]':
                    - 'cell "{{CompanyAddress}}" [ref=e331]'
                    - cell "company.address" [ref=e332]
                    - cell "1 Microsoft Way, Redmond, WA 98052, USA" [ref=e333]
                    - cell "Ready" [ref=e334]:
                      - generic [ref=e335]:
                        - img [ref=e336]
                        - text: Ready
                  - 'row "{{CounterpartyName}} counterparty.name Atlas Robotics QA Inc. Ready" [ref=e339]':
                    - 'cell "{{CounterpartyName}}" [ref=e340]'
                    - cell "counterparty.name" [ref=e341]
                    - cell "Atlas Robotics QA Inc." [ref=e342]
                    - cell "Ready" [ref=e343]:
                      - generic [ref=e344]:
                        - img [ref=e345]
                        - text: Ready
                  - 'row "{{CounterpartyAddress}} counterparty.address 455 Market Street, San Francisco, CA 94105 Ready" [ref=e348]':
                    - 'cell "{{CounterpartyAddress}}" [ref=e349]'
                    - cell "counterparty.address" [ref=e350]
                    - cell "455 Market Street, San Francisco, CA 94105" [ref=e351]
                    - cell "Ready" [ref=e352]:
                      - generic [ref=e353]:
                        - img [ref=e354]
                        - text: Ready
                  - 'row "{{BusinessPurpose}} record.purpose Evaluate a confidential product integration for automated testing. Ready" [ref=e357]':
                    - 'cell "{{BusinessPurpose}}" [ref=e358]'
                    - cell "record.purpose" [ref=e359]
                    - cell "Evaluate a confidential product integration for automated testing." [ref=e360]
                    - cell "Ready" [ref=e361]:
                      - generic [ref=e362]:
                        - img [ref=e363]
                        - text: Ready
                  - 'row "{{ConfidentialInformation}} record.confidentialInformation business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential Ready" [ref=e366]':
                    - 'cell "{{ConfidentialInformation}}" [ref=e367]'
                    - cell "record.confidentialInformation" [ref=e368]
                    - cell "business plans, technical know-how, financial information, customer data, and any other materials marked or treated as confidential" [ref=e369]
                    - cell "Ready" [ref=e370]:
                      - generic [ref=e371]:
                        - img [ref=e372]
                        - text: Ready
                  - 'row "{{NDADuration}} record.term two (2) years Ready" [ref=e375]':
                    - 'cell "{{NDADuration}}" [ref=e376]'
                    - cell "record.term" [ref=e377]
                    - cell "two (2) years" [ref=e378]
                    - cell "Ready" [ref=e379]:
                      - generic [ref=e380]:
                        - img [ref=e381]
                        - text: Ready
                  - 'row "{{SurvivalPeriod}} record.survival three (3) years Ready" [ref=e384]':
                    - 'cell "{{SurvivalPeriod}}" [ref=e385]'
                    - cell "record.survival" [ref=e386]
                    - cell "three (3) years" [ref=e387]
                    - cell "Ready" [ref=e388]:
                      - generic [ref=e389]:
                        - img [ref=e390]
                        - text: Ready
                  - 'row "{{GoverningLaw}} record.governingLaw Delaware, USA Ready" [ref=e393]':
                    - 'cell "{{GoverningLaw}}" [ref=e394]'
                    - cell "record.governingLaw" [ref=e395]
                    - cell "Delaware, USA" [ref=e396]
                    - cell "Ready" [ref=e397]:
                      - generic [ref=e398]:
                        - img [ref=e399]
                        - text: Ready
                  - 'row "{{Jurisdiction}} record.jurisdiction Delaware, USA Ready" [ref=e402]':
                    - 'cell "{{Jurisdiction}}" [ref=e403]'
                    - cell "record.jurisdiction" [ref=e404]
                    - cell "Delaware, USA" [ref=e405]
                    - cell "Ready" [ref=e406]:
                      - generic [ref=e407]:
                        - img [ref=e408]
                        - text: Ready
                  - 'row "{{AuthorizedSignerName}} company.signerName Sara Patel Ready" [ref=e411]':
                    - 'cell "{{AuthorizedSignerName}}" [ref=e412]'
                    - cell "company.signerName" [ref=e413]
                    - cell "Sara Patel" [ref=e414]
                    - cell "Ready" [ref=e415]:
                      - generic [ref=e416]:
                        - img [ref=e417]
                        - text: Ready
                  - 'row "{{AuthorizedSignerTitle}} company.signerTitle VP, Legal Ready" [ref=e420]':
                    - 'cell "{{AuthorizedSignerTitle}}" [ref=e421]'
                    - cell "company.signerTitle" [ref=e422]
                    - cell "VP, Legal" [ref=e423]
                    - cell "Ready" [ref=e424]:
                      - generic [ref=e425]:
                        - img [ref=e426]
                        - text: Ready
                  - 'row "{{CounterpartySignerName}} counterparty.signerName Morgan QA Ellis Ready" [ref=e429]':
                    - 'cell "{{CounterpartySignerName}}" [ref=e430]'
                    - cell "counterparty.signerName" [ref=e431]
                    - cell "Morgan QA Ellis" [ref=e432]
                    - cell "Ready" [ref=e433]:
                      - generic [ref=e434]:
                        - img [ref=e435]
                        - text: Ready
                  - 'row "{{CounterpartySignerTitle}} counterparty.signerTitle Authorized Signatory Ready" [ref=e438]':
                    - 'cell "{{CounterpartySignerTitle}}" [ref=e439]'
                    - cell "counterparty.signerTitle" [ref=e440]
                    - cell "Authorized Signatory" [ref=e441]
                    - cell "Ready" [ref=e442]:
                      - generic [ref=e443]:
                        - img [ref=e444]
                        - text: Ready
          - generic [ref=e447]:
            - button "Back" [ref=e448] [cursor=pointer]:
              - img [ref=e449]
              - text: Back
            - button "Continue" [ref=e451] [cursor=pointer]:
              - text: Continue
              - img [ref=e452]
        - complementary [ref=e454]:
          - generic [ref=e455]:
            - generic [ref=e456]:
              - generic [ref=e457]:
                - img [ref=e458]
                - text: AI Live Risk
              - generic [ref=e460]: Low
            - generic [ref=e461]: 0/100
            - generic [ref=e463]: Score updates live as you answer the intake questions.
          - generic [ref=e464]:
            - generic [ref=e465]:
              - img [ref=e466]
              - text: Selected template
            - generic [ref=e469]: Mutual NDA
            - generic [ref=e470]: Mutual · v4.2
            - generic [ref=e471]:
              - generic [ref=e472]: "Jurisdiction: Delaware, USA"
              - generic [ref=e473]: "Direction: mutual"
              - generic [ref=e474]: "Term: two (2) years"
            - generic [ref=e475]:
              - img [ref=e476]
              - text: All placeholders ready
          - generic [ref=e479]:
            - generic [ref=e480]:
              - img [ref=e481]
              - text: Workflow (3 steps)
            - list [ref=e485]:
              - listitem [ref=e486]:
                - generic [ref=e487]: "1"
                - text: Legal Ops triage
              - listitem [ref=e488]:
                - generic [ref=e489]: "2"
                - text: Auto-approve (template match)
              - listitem [ref=e490]:
                - generic [ref=e491]: "3"
                - text: Send for signature
          - generic [ref=e492]:
            - generic [ref=e493]:
              - img [ref=e494]
              - text: Risk flags (0)
            - generic [ref=e496]: No flags raised yet.
  - alert [ref=e497]
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
> 19 |   await expect(page.getByText(/\{\{CompanyName\}\}/)).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
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
  35 |   await page.getByRole("button", { name: /new template|add template|create template/i }).first().click();
  36 |   await page.getByPlaceholder(/template name|name/i).first().fill("QA Admin NDA Template");
  37 |   await page.getByRole("button", { name: /save/i }).last().click();
  38 | 
  39 |   await gotoApp(page, "/requests/new-contract");
  40 |   await expect(page.getByTestId("select-more-templates-dropdown")).toContainText("QA Admin NDA Template");
  41 | });
  42 | 
  43 | 
```