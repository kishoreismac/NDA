# CLM Development Phase Prompt Pack

**Purpose:** Structured prompts for building and refining the CLM platform with NDA as a use case.

**Usage:** Use the prompts sequentially during development. Each prompt focuses on one implementation area and preserves the current CLM application unless a change is explicitly requested.

---

## Document Scope

- 10 structured development prompts
- Role / Objective / Context / Output format included for each prompt
- Designed for iterative implementation without changing existing features unnecessarily
- Includes dashboard, intake, templates, risk review, documents, e-signature, repository, AI Search, admin, and regression requirements

## Prompt Index

Use these prompts sequentially during the development phase. Each prompt focuses on one implementation layer and should be applied without deploying until local verification is complete.

| Prompt | Focus Area |
| --- | --- |
| Prompt 1 | CLM Foundation, App Structure, Navigation, Roles, Theme |
| Prompt 2 | Dashboard, Status Summary, CTA Section, Record Types |
| Prompt 3 | Full-Page NDA Intake Workflow |
| Prompt 4 | Template Library, Template Creation, Placeholder Mapping |
| Prompt 5 | Risk Review, Approval Workflow, Legal Reviewer Actions |
| Prompt 6 | DOCX / PDF Document Generation and Downloads |
| Prompt 7 | E-Signature Workflow, Email Link, Signing Page, Signed Document Storage |
| Prompt 8 | Repository, Document View, Actions Menu, Audit Trail, Export, Delete |
| Prompt 9 | AI Search, Repository Q&A, Contract Analysis |
| Prompt 10 | Admin Settings, Users, Parties, Rules, Final Regression |

## Prompt 1 — CLM Foundation, App Structure, Navigation, Roles, Theme

### Role:

Act as a senior full-stack React / Next.js enterprise SaaS architect.

### Objective:

Create the foundation of a premium CLM web application where NDA is one use case inside a broader Contract Lifecycle Management platform.

### Context:

The application name must be CLM. NDA should be treated as one contract use case, not the entire website. The platform should support contract lifecycle actions such as Request a Contract, Create a Contract, Store a Contract, Search for a Contract, Report on Contracts, and Update or Renew a Contract.

Use React or Next.js with Tailwind CSS. Use mock data only. Use local state and localStorage for demo persistence.

Preserve the existing UI style if an app already exists. Do not rebuild from scratch unless absolutely required.

Design style:

- Modern enterprise SaaS
- Dark navy / indigo theme
- Gradient accents
- Glass cards
- Polished legal-tech dashboard
- Clean tables
- Professional spacing
- Responsive layout
Create the following core structure:

- App shell with left sidebar, top navigation, role selector, theme selector, and main content area
- Website name should be CLM everywhere
- NDA should appear as one record type / use case
Roles:

- Business User
- Legal Reviewer
- Admin
- Executive Viewer
Role permissions:

- Business User: can submit NDA requests, generate drafts, and run AI risk reviews.
- Legal Reviewer: can review, approve, reject, send to sign, preview documents, and edit NDA details.
- Admin: can perform all actions.
- Executive Viewer: view-only access across the application and must not be able to create NDA documents.
Sidebar visibility:

- Dashboard visible to all roles.
- Repository visible to all roles.
- Templates visible to Admin and Legal Reviewer.
- AI Search visible to Admin, Legal Reviewer, and Business User.
- Settings visible to Admin.
- Parties and Rules visible only to Admin.
- Remove New Contract Request from the sidebar.
If a user without permission tries to perform a restricted action, show: “You do not have permission to perform this activity.”

Theme support:

- In Settings, allow users to switch between Dark Theme and White Theme.
### Output format:

- Provide complete updated code for the affected files.
- Clearly mention new components created, existing files updated, role permission logic added, theme switching implementation, and any assumptions made.


## Prompt 2 — Dashboard, Status Summary, CTA Section, Record Types

### Role:

Act as a senior enterprise dashboard designer and React frontend engineer.

### Objective:

Build a polished CLM dashboard that shows all contract record types, correct NDA status counts, and a clear call-to-action section.

### Context:

The dashboard must show CLM as the platform, with NDA as one use case. The dashboard should feel like an enterprise contract operations dashboard.

Use only these NDA statuses:

- In Review
- Approved
- Awaiting Signature
- Signed
- Archived
Dashboard summary requirements:

- Show all 5 NDA status tabs in a single row.
- Remove Priority Requests.
- Remove Renewals from the dashboard summary section.
- Counts must always match the filtered records shown after clicking a tab.
- When the user clicks a status tab, show only NDAs related to that status.
- Do not show all records after clicking a specific tab.
Dashboard call-to-action section:

- Replace Request a Contract and Create from Template with one combined tab: Request a New Contract.
- When clicking Request a New Contract, open the new request as a full-page view, not a popup.
- Show quick-access templates for only Standard NDA, Mutual NDA, and Employee / Contractor NDA.
Select More Templates dropdown:

- Add a dropdown search bar.
- It should be a dropdown only.
- It should not display all templates directly below the section.
- Users should be able to select any other template from the dropdown if needed.
- All templates must still remain available in the Templates section.
Remove from dashboard CTA:

- Search Contracts
- Calendar
- Tasks section
Dashboard should also show:

- Contract record type overview
- Recent contract activity
- Awaiting signature records
- Recently signed documents
- Expiring NDA indicators if expiry date is within 30 days, but do not show Renewals as a dashboard summary tab
Record types to display:

- NDA
- MSA
- SOW
- Vendor Agreement
- Customer Agreement
- Partner Agreement
- Employee / Contractor Agreement
- Amendment
- Renewal
### Output format:

- Provide complete updated code for the dashboard and related components.
- Include correct count calculation logic, status filter logic, CTA implementation, full-page request navigation, and responsive layout updates.


## Prompt 3 — Full-Page NDA Intake Workflow

### Role:

Act as a senior product engineer specializing in enterprise legal intake workflows.

### Objective:

Create or fix the full-page NDA request workflow with clickable steps, required-field validation, risk questions, agreement period calculation, and draft submission behavior.

### Context:

The NDA request flow must open as a full-page experience when the user clicks Request a New Contract from the dashboard.

Create these intake steps:

- Counterparty Details
- Record Details
- Template & Placeholders
- Additional NDA Questions
- PII / Data Questions
- Risk Summary
- Generate Draft
Counterparty Details must include:

- Company Name *
- Counterparty Name *
- Counterparty Email *
- Counterparty Address *
- Company Address *
- Start Date *
- End Date *
- Term Time *
- Project Name *
- Business Purpose *
- Jurisdiction *
- Governing Law *
Agreement period logic:

- If Start Date and Term Time are entered, automatically calculate End Date.
- If Start Date and End Date are entered, automatically calculate Term Time.
- If the period is not exactly one year, two years, etc., display the exact custom duration.
- Example: “1 year 3 months 12 days”.
- Do not show the label “Custom Time.” Show the exact calculated duration.
Step navigation:

- Each step tab should be clickable.
- Completed sections with all mandatory fields should show green.
- Incomplete required sections should show red if the user tries to continue without filling required fields.
- Current active section should be visually highlighted.
- Do not mark incomplete sections green.
Required fields:

- Add a star (*) next to all mandatory fields.
- If required fields are missed and user clicks Continue, show validation errors and highlight that section in red.
Template & Placeholders step:

- Show Select NDA Template.
- Show View Template Preview and Placeholders as optional.
- Add only one Continue button after Select NDA Template.
- Remove the duplicate Continue button beside View Preview & Placeholders.
- If the user wants to review preview and placeholders, allow it.
- If the user wants to skip preview, allow continuing.
- Do not show placeholders again in Risk Review.
Risk questions:

- Competitor risk
- M&A / JV
- International business
- New IP
- Similar products
- Third-party information
- Pricing / strategy / roadmap
- PII
- Employee data
- Customer data
- Large data files
- Cross-border data transfer
Save as Draft:

- Save current form state.
- Set status to In Review only after submission, not draft.
- Store draft locally.
- Show success message: “Draft saved successfully”.
- Allow reopening the draft with all details prefilled.
Submit:

- Validate required fields.
- Save request.
- Set status to In Review.
- Add request to Repository and dashboard records.
- Show success message.
- Do not create a separate Tasks section.
### Output format:

- Provide complete updated code for full-page request workflow, stepper component, validation logic, agreement period calculation, draft saving and reopening, and submit logic.


## Prompt 4 — Template Library, Template Creation, Placeholder Mapping

### Role:

Act as a senior CLM template management engineer.

### Objective:

Implement a complete NDA Template Library with preview, placeholder detection, admin template creation, and template selection during intake.

### Context:

Templates must be used for document generation. The final NDA must be created from the original selected template with predefined placeholders replaced by user-provided values from the NDA request form.

Templates page requirements:

- Template name
- Template type
- Jurisdiction
- Version
- Last updated date
- Status
- Available placeholders
- Preview button
- Use Template button
- Export button if table export exists
Example templates:

- Standard NDA
- Mutual NDA
- One-Way NDA
- Vendor NDA
- Customer NDA
- Partner NDA
- Employee / Contractor NDA
- International NDA
Template placeholders:

- {{CompanyName}}
- {{CounterpartyName}}
- {{EmployeeName}}
- {{CounterpartyAddress}}
- {{CompanyAddress}}
- {{EffectiveDate}}
- {{ProjectName}}
- {{BusinessPurpose}}
- {{ConfidentialInformation}}
- {{Jurisdiction}}
- {{GoverningLaw}}
- {{NDADuration}}
- {{SurvivalPeriod}}
- {{AuthorizedSignerName}}
- {{AuthorizedSignerTitle}}
- {{CounterpartySignerName}}
- {{CounterpartySignerTitle}}
- {{Address}}
- {{Purpose}}
Map values from the NDA intake form to placeholders. Every placeholder in the selected template must be replaced correctly with corresponding values from the NDA request form.

Template preview:

- Show original template preview.
- Display placeholders exactly where they exist.
- Highlight placeholders visually.
- Show side panel with all detected placeholders.
- Show mapped / missing status for each placeholder.
- Do not modify the original template during preview.
Template creation:

- Admin role must be able to add new NDA templates.
- Admin role must be able to save templates successfully.
- Admin role must be able to manage placeholders.
- Newly created templates must be usable during NDA request creation.
Template selection during intake:

- Allow users to select an NDA template.
- Show detected placeholders.
- Show which placeholders will be populated.
- Warn if required placeholder values are missing.
- Store selected template as part of the NDA request.
### Output format:

- Provide complete updated code for Templates page, template creation form, template preview modal or drawer, placeholder detection logic, placeholder mapping logic, intake template selection integration, and Export CSV for templates if export exists.


## Prompt 5 — Risk Review, Approval Workflow, Legal Reviewer Actions

### Role:

Act as a senior legal-tech workflow engineer.

### Objective:

Implement NDA risk scoring, risk review output, approval workflow, and Legal Reviewer actions with strict role-based access.

### Context:

Risk review should be handled within the application using the answers provided in the NDA intake form. The system should evaluate the answers, identify risk indicators, assign a risk level, and show clear recommendations for review and approval.

Risk Review must show:

- Risk score
- Risk level: Low, Medium, or High
- Risk flags
- Risk explanation
- Recommended NDA template
- Recommended approval workflow
- Clause recommendations
- Mock generated NDA preview
- Placeholder completion status
- Final document status
Risk calculation:

- Calculate Low / Medium / High based on answers to competitor risk, M&A / JV, international business, new IP, similar products, third-party information, pricing / strategy / roadmap, PII, employee data, customer data, large data files, and cross-border data transfer.
Risk explanation logic:

- Show clear explanation text based on selected risk flags.
- If PII is selected, show: “This NDA includes personal or sensitive data considerations. Privacy review is recommended before execution.”
- If competitor risk is selected, show: “This NDA involves a counterparty that may create competitive sensitivity. Legal review is recommended.”
Approval status flow:

- In Review
- Approved
- Awaiting Signature
- Signed
- Archived
Legal Reviewer section:

- Move Preview document, Edit NDA, Approve, Reject, and Send to Sign under the Legal Reviewer section, not under Tasks.
Legal Reviewer behavior:

- Legal Reviewer can preview document.
- Legal Reviewer can open Edit.
- Edit must open the existing NDA with all details prefilled.
- Edit must include full NDA details, including counterparty details.
- Legal Reviewer can update the existing NDA without starting from scratch.
Approve:

- Allowed only for Legal Reviewer and Admin.
- Update NDA status to Approved.
- Add audit trail entry.
- Show success toast.
Reject:

- Allowed only for Legal Reviewer and Admin.
- Since only these statuses are allowed, rejected records should be moved to Archived or clearly marked through audit trail and review notes.
- Add audit trail entry.
- Show success toast.
Send to Sign:

- Enabled only when status is Approved.
- Allowed only for Legal Reviewer and Admin.
- Change status to Awaiting Signature.
- Trigger the e-signature workflow.
- Add audit trail entry.
- Show success message.
If unauthorized user tries restricted action, show: “You do not have permission to perform this activity.”

### Output format:

- Provide complete updated code for risk scoring logic, Risk Review screen, risk explanation templates, Legal Reviewer section, Approve / Reject / Send to Sign actions, role-based access enforcement, and audit trail updates.


## Prompt 6 — DOCX / PDF Document Generation and Downloads

### Role:

Act as a senior document automation engineer for legal-tech platforms.

### Objective:

Make final NDA document generation and downloads work in DOCX and PDF formats using the selected template and populated placeholders.

### Context:

The final NDA document must be created from the selected NDA template. The system must replace predefined placeholders with values from the NDA request form while preserving the original template structure as much as technically possible.

DOCX generation:

- Download DOCX must generate a real downloadable DOCX file.
- Use the selected NDA template.
- Replace every placeholder with the mapped value.
- Include parties, effective date, project name, business purpose, confidential information, duration, governing law, signer details, address, purpose, and all other mapped fields.
- Use meaningful file name: NDA_ABC_Pvt_Ltd_2026-05-15.docx
PDF generation:

- Download PDF must generate a real downloadable PDF file.
- PDF must contain the same populated values as the DOCX.
- Use client-side PDF generation if needed, such as jsPDF, html2pdf.js, or similar.
- Use meaningful file name: NDA_ABC_Pvt_Ltd_2026-05-15.pdf
Risk Review Final NDA Document section:

- Selected template name
- Template version
- Risk level
- Placeholder completion status
- Final document status
- Download DOCX button
- Download PDF button
- Preview Final NDA button
Download rules:

- Cannot download final NDA if required placeholders are missing.
- Show clear error toast if missing values exist.
- Download buttons must work after Risk Review is completed.
- Add audit trail entries for DOCX downloaded and PDF downloaded.
Repository:

- Generated DOCX and PDF must be available from the Repository.
- For signed records, repository PDF download should download the stored signed PDF directly, not regenerate an unsigned one.
- Repository drawer/document section must show original template used, generated DOCX, generated PDF, generated date, generated by, Download DOCX, Download PDF, and Preview document.
Recommended libraries:

- docxtemplater or similar for DOCX placeholder replacement
- pizzip for reading DOCX templates
- file-saver for downloading files
- docx-preview for browser preview
- jsPDF or html2pdf.js for PDF generation
### Output format:

- Provide complete updated code for DOCX generation utility, PDF generation utility, placeholder validation, Final NDA Document section, Repository document downloads, and audit trail entries.


## Prompt 7 — E-Signature Workflow, Email Link, Signing Page, Signed Document Storage

### Role:

Act as a senior e-signature workflow engineer for a CLM application.

### Objective:

Fix and complete the e-signature workflow so the counterparty receives a functional signing link, signs the NDA, and the signed document is stored and downloadable.

### Context:

After an NDA is approved by the Legal Reviewer, the Send to Sign action should send the finalized NDA document to the email ID entered in Counterparty Details. The email workflow must work for any recipient email address, not only specific test emails.

Send to Sign behavior:

- Use the counterparty email from Counterparty Details.
- Generate a valid, accessible, clickable signing URL.
- Link must not expire immediately after sending.
- Link must map correctly to the specific NDA request.
- Recipient must be able to open the link without authentication issues.
- Status changes to Awaiting Signature.
- Add audit trail entry.
Email content:

- Must include a proper clickable URL or button.
- The link should open the signing page directly.
- The email should clearly instruct the recipient to review and sign.
Create or fix the signing route: app/sign/[token]/page.jsx

Counterparty signing page must allow the recipient to:

- Preview the full NDA before signing.
- Download the document before signing.
- Review complete NDA content.
- Complete a proper e-signature action, not just type a name.
- Sign and return the document.
After signing:

- Embed the completed signature into the final NDA document.
- Update the original final NDA document with the signature.
- Store the signed PDF and signed DOCX against the NDA record.
- Change NDA status to Signed only after the signed document is successfully stored.
- Dashboard and repository counts must update.
- Repository must show status as Signed.
- “No Signed Documents” should not appear if signed documents exist.
Sign confirmation page:

- After the user clicks Sign and Return, show a confirmation page.
- Show Download Signed NDA option immediately.
- Allow counterparty to download Signed PDF and Signed DOCX if available.
- Remove the “Return to CLM Dashboard” button/link.
Repository after signing:

- Users should be able to view the final signed NDA document in full document view.
- Users should be able to download signed PDF.
- Users should be able to download signed DOCX.
- Users should see document status as Signed.
Important:

- After Send to Sign, Download and Preview before signing should not be mandatory.
- Sign action must remain enabled.
- Do not mark the workflow completed until the signed document is embedded and stored.
### Output format:

- Provide complete updated code for Send to Sign action, email signing link generation, signing token handling, app/sign/[token]/page.jsx, signature capture, signed document generation/storage, confirmation page download buttons, Repository signed document display/download, and status update logic.


## Prompt 8 — Repository, Document View, Actions Menu, Audit Trail, Export, Delete

### Role:

Act as a senior frontend engineer for enterprise records management systems.

### Objective:

Fix and complete the Repository so every user can see all documents, view final signed NDA documents, download files, export records, and use row actions.

### Context:

Everyone who accesses the web app must be able to see all documents in the Repository, regardless of role. Role permissions should still control restricted actions.

Repository table/card requirements:

- Contract ID
- Contract type
- Counterparty
- Status
- Risk level
- Template used
- Effective date
- Expiry date
- Timestamp / recent activity timestamp
- Owner
- Actions
Expiry Date:

- Repository must show correct Expiry Date for each NDA.
- Expiry Date should come from End Date / Agreement Period logic.
- Expiring NDAs within 30 days should be identifiable for renewal flows.
View action:

- Clicking View should not open the old Preview screen.
- It should directly show the final NDA document in the Document section.
- The final signed document must appear as a complete document view with all populated details and embedded signatures.
- Users should be able to download DOCX and PDF from this view.
Documents section:

- Original template used
- Generated DOCX
- Generated PDF
- Signed DOCX if signed
- Signed PDF if signed
- Generated date
- Signed date
- Generated by
- Download DOCX
- Download PDF
- Preview / View full document
Three-dot row action menu:

- Add tag
- Edit NDA
- Renew NDA
- Delete document
Edit NDA:

- Must open the already created NDA with all details prefilled.
- Must not start from scratch.
- User can make changes and save updates.
Renew NDA:

- Must open the already created NDA with all details prefilled.
- User can review the agreement and update time / renewal details.
- Must not start from scratch.
Delete document:

- Only Admin can delete.
- Non-admin users should see: “You do not have permission to perform this activity.”
Export:

- Make every Export button functional.
- Export visible table data as CSV for Repository records, Parties table, Legal Review Queue if present, Rules table, Templates table if export exists, and any other visible data table with export button.
- CSV export must include currently visible records and table columns.
Audit trail:

- Draft saved
- Request submitted
- Template selected
- Template previewed
- Placeholder values validated
- Risk review completed
- Document generated
- DOCX downloaded
- PDF downloaded
- Sent for signature
- Signed
- Rejected
- Archived
- Deleted
- Export completed
### Output format:

- Provide complete updated code for Repository table/card, Repository detail drawer/page, Document section, three-dot action menu, Edit and Renew prefilled flows, Admin-only delete, CSV export utility, and audit trail component.


## Prompt 9 — AI Search, Repository Q&A, Contract Analysis

### Role:

Act as a senior frontend engineer building an enterprise AI Search experience for a CLM system.

### Objective:

Rename AI Tools to AI Search and make the AI Search feature accurately answer questions based on repository records and selected NDA documents.

### Context:

AI Search should help users ask natural language questions about NDA records, repository documents, contract metadata, risk details, signatures, renewals, and related application data.

Rename:

- Rename AI Tools to AI Search everywhere.
AI Search capabilities:

- NDA expiry date
- NDA status
- Counterparty details
- Contract purpose
- Contract summary
- Signature status
- Renewal details
- Risk highlights
- Clause-specific questions
- Any repository-related question
- Any available application data
Accuracy requirement:

- If user asks “What is the expiry date of ABC Pvt Ltd NDA?”, the system must return the exact expiry date from the NDA record.
- If user asks “What is the status of the Mutual NDA with ABC Pvt Ltd?”, the system must return the exact status.
- If user asks “Who is the counterparty?”, the system must return the correct counterparty details from the selected NDA.
Repository Q&A:

- Allow user to select a specific NDA from the internal repository.
- Answers should be based on the selected NDA when selected.
- If no NDA is selected, search across repository data.
- Match natural language questions to fields and document content.
- Return precise contextual answers.
- Avoid generic fallback summaries when exact field data exists.
Contract analysis sections:

- Automated Contract Data Extraction
- Advanced Analysis & Risk Scoring
The system should:

- Allow document selection from Repository.
- Analyze selected NDA information.
- Extract metadata.
- Extract important clauses.
- Generate summaries.
- Generate risk insights.
- Show risk score and recommendations.
- Support enterprise-level search and filtering.
Implementation guidance:

- Build a local query parser / intent matcher.
- Map common terms to fields.
- Search document text if a field match is not found.
- Return “I could not find that information in the selected NDA record” only when data is truly missing.
Field mapping examples:

- expiry / expiration / end date → expiryDate / endDate
- status / stage → status
- party / counterparty → counterparty
- sign / signature → signatureStatus
- renew / renewal → renewalDetails
- purpose / business purpose → businessPurpose
- risk → riskLevel / riskFlags
- template → selectedTemplate
- email → counterpartyEmail
- address → counterpartyAddress
### Output format:

- Provide complete updated code for AI Search page, Repository document selector, query parser, field mapping logic, contract extraction panel, risk analysis panel, accurate answer rendering, and rename from AI Tools to AI Search.


## Prompt 10 — Admin Settings, Users, Parties, Rules, Final Regression

### Role:

Act as a senior QA-focused enterprise application engineer.

### Objective:

Complete Admin settings, users, parties, rules, auto-assignment, final permission checks, and regression testing across the CLM application.

### Context:

Admin must be able to manage users, templates, parties, and routing rules. Other roles should only see sections they are allowed to access.

Settings > Users:

- Admin should be able to add users with Title, First Name, Last Name, Email, and Role.
- Update existing demo user names to use professional US-based names.
Parties page:

- Admin only.
- Manage counterparties.
- Add, edit, search, and export parties.
- Fix dropdown styling issue where white background makes text unreadable.
- Dropdowns should be visually clear in both dark and white themes.
Rules page:

- Admin only.
- Add auto-assignment and routing rules similar to enterprise legal workflow rules.
- Show these rules while creating an NDA request.
Routing rule examples:

- High risk → Legal Reviewer
- PII involved → Privacy Review
- International business → Senior Legal Reviewer
- Large data files → Privacy / Security Review
- Standard low-risk NDA → Business approver
Settings:

- Dark Theme / White Theme toggle must work.
- Role selector must work.
- Executive Viewer must be view-only across the application.
- Executive Viewer must not create NDA documents.
- Business User must not approve or send to sign.
- Legal Reviewer must not access Admin-only settings unless allowed by role.
- Admin can perform all actions.
Final regression verification:

- Dashboard status counts match filtered record lists.
- Summary tabs show only matching NDAs.
- Repository shows all documents to every user.
- Expiry Date displays correctly.
- Agreement period calculates both directions.
- Required fields show star.
- Incomplete sections show red.
- Completed sections show green.
- Save as Draft works.
- Submit works.
- Template creation works.
- Placeholder replacement works for all fields.
- DOCX download works.
- PDF download works.
- Send to Sign works for any email.
- Signing link is clickable and accessible.
- Counterparty can preview/download before signing.
- Signature embeds into final document.
- Signed document stores in Repository.
- Sign confirmation page shows Download Signed NDA.
- Return to CLM Dashboard is removed.
- Repository View opens full final document, not old Preview screen.
- Signed document downloads from Repository.
- Admin-only delete works.
- AI Search gives exact answers.
- Export buttons generate CSV.
- Parties and Rules are visible only to Admin.
- No Tasks section is visible.
- No deployment is performed.
### Output format:

- Provide complete updated code for Settings, Users management, Parties, Rules, dropdown styling, auto-assignment display during NDA creation, role permission final checks, and regression fixes.
- Also provide a final checklist confirming each acceptance item is completed.

