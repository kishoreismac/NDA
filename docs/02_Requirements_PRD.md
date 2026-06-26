# CLM Product Requirements Document

## Product Overview

CLM is a premium enterprise Contract Lifecycle Management web application. It supports the lifecycle of contracts from request through creation, review, approval, signature, repository storage, search, reporting, and renewal readiness.

NDA is a major contract use case inside the CLM platform. The product must support a structured NDA workflow that includes intake, template selection, placeholder mapping, risk review, legal approval, e-signature, signed document storage, repository actions, AI Search, settings, parties, rules, audit trail, CSV export, and PDF/DOCX downloads.

The experience should be designed for developers, QA, designers, legal operations teams, and business stakeholders. The implementation should feel like a premium enterprise SaaS product with clear workflows, strong role-based behavior, reliable state transitions, and complete data visibility.

## Functional Requirements

### FR-001: Application Shell

- The application name must be CLM.
- NDA must be presented as one contract use case, not the entire product.
- The application must include a sidebar, top navigation, role selector, theme selector or settings-based theme switch, and main content area.
- Users must be able to navigate to Dashboard, Repository, Templates, AI Search, Settings, Parties, and Rules based on role permissions.

### FR-002: Role-Based Access

- The system must support Business User, Legal Reviewer, Admin, and Executive Viewer.
- Role-based access must control both navigation visibility and action availability.
- Unauthorized restricted actions must show: "You do not have permission to perform this activity."

### FR-003: Contract Status Management

- The system must use only these NDA statuses:
  - In Review
  - Approved
  - Awaiting Signature
  - Signed
  - Archived
- Status transitions must be controlled by workflow actions and role permissions.

### FR-004: Request a New Contract

- Dashboard must include one combined Request a New Contract action.
- The request workflow must open as a full-page view.
- Users with permission must be able to start an NDA request from the dashboard.
- Executive Viewer must not be able to create NDA documents.

### FR-005: Draft and Submission

- Users must be able to save an NDA request as draft.
- Saving as draft must persist the current form state.
- Draft save must show: "Draft saved successfully".
- Draft records must not be assigned In Review status until submitted.
- Submitted requests must be added to repository and dashboard records with status In Review.

### FR-006: Repository

- Repository must be visible to all roles.
- Repository must show all documents to every user.
- Repository must include contract ID, contract type, counterparty, status, risk level, template used, effective date, expiry date, recent activity timestamp, owner, and actions.
- Role permissions must still control restricted actions.

### FR-007: Document Downloads

- The system must support PDF and DOCX downloads.
- Generated documents must use selected templates and populated placeholders.
- Signed records must download stored signed documents instead of regenerating unsigned documents.

### FR-008: CSV Export

- Export buttons must generate CSV files.
- CSV exports must include currently visible rows and table columns.
- Export must be supported for Repository, Parties, Legal Review Queue if present, Rules, Templates if export exists, and other visible data tables with export buttons.

## Non-Functional Requirements

### NFR-001: Usability

- Workflows must be clear, guided, and suitable for non-legal business users.
- Legal review actions must be grouped under a Legal Reviewer section.
- Required fields must be visually distinct and easy to identify.
- Toasts and validation messages must be precise and actionable.

### NFR-002: Accessibility

- Controls must be keyboard navigable where practical.
- Text contrast must be readable in both dark and white themes.
- Dropdowns must remain readable in both themes.
- Status, risk, and validation states should not rely on color alone.

### NFR-003: Performance

- Dashboard and repository counts should be derived efficiently from application records.
- AI Search should prefer direct field matching before broader document text search.
- Local persistence should avoid unnecessary full-page reloads.

### NFR-004: Auditability

- Material lifecycle actions must create audit trail entries.
- Audit entries must include event type, actor, timestamp, and record reference.

### NFR-005: Security and Permissions

- Permission checks must be enforced consistently at UI action level.
- Restricted actions must not be available to unauthorized users.
- External signing links must resolve only to the intended NDA record.

### NFR-006: Maintainability

- Statuses, roles, permissions, placeholder mapping, and audit event types should be defined centrally where possible.
- Document generation should be modular and reusable.
- CSV export should use a common utility.

## Role-Based Permissions

| Capability | Business User | Legal Reviewer | Admin | Executive Viewer |
| --- | --- | --- | --- | --- |
| View Dashboard | Yes | Yes | Yes | Yes |
| View Repository | Yes | Yes | Yes | Yes |
| Request NDA | Yes | No, unless acting as Admin-equivalent is configured | Yes | No |
| Save Draft | Yes | Yes when editing allowed | Yes | No |
| Submit NDA Request | Yes | Yes when editing allowed | Yes | No |
| Run Risk Review | Yes | Yes | Yes | View only |
| View Templates | No | Yes | Yes | No |
| Create Templates | No | No | Yes | No |
| Preview Documents | Yes | Yes | Yes | Yes |
| Edit NDA Details | No | Yes | Yes | No |
| Approve NDA | No | Yes | Yes | No |
| Reject NDA | No | Yes | Yes | No |
| Send to Sign | No | Yes | Yes | No |
| Delete Document | No | No | Yes | No |
| Export CSV | Yes where table visible | Yes where table visible | Yes | Yes where table visible |
| Manage Users | No | No | Yes | No |
| Manage Parties | No | No | Yes | No |
| Manage Rules | No | No | Yes | No |
| Change Theme | Yes | Yes | Yes | Yes |
| Use AI Search | Yes | Yes | Yes | No unless explicitly enabled as view-only search |

## Dashboard Requirements

### Dashboard Summary

- Show all five NDA statuses in a single row:
  - In Review
  - Approved
  - Awaiting Signature
  - Signed
  - Archived
- Counts must match the records displayed when a status filter is selected.
- Clicking a status must show only NDAs with that status.
- Do not show all records after a specific status tab is clicked.
- Remove Priority Requests.
- Remove Renewals from the dashboard summary section.
- Do not show a Tasks section.

### Dashboard Call to Action

- Replace Request a Contract and Create from Template with one combined tab: Request a New Contract.
- Clicking Request a New Contract must open the full-page request workflow.
- Show quick-access templates:
  - Standard NDA
  - Mutual NDA
  - Employee / Contractor NDA
- Include a Select More Templates dropdown search.
- The dropdown must not render all templates directly below the CTA section.
- Remove Search Contracts, Calendar, and Tasks section from the dashboard CTA.

### Dashboard Content

- Show contract record type overview:
  - NDA
  - MSA
  - SOW
  - Vendor Agreement
  - Customer Agreement
  - Partner Agreement
  - Employee / Contractor Agreement
  - Amendment
  - Renewal
- Show recent contract activity.
- Show awaiting signature records.
- Show recently signed documents.
- Show expiring NDA indicators when expiry date is within 30 days.

## NDA Request Workflow Requirements

### Workflow Structure

The full-page NDA request workflow must include:

1. Counterparty Details
2. Record Details
3. Template & Placeholders
4. Additional NDA Questions
5. PII / Data Questions
6. Risk Summary
7. Generate Draft

### Required Counterparty Fields

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

### Step Navigation

- Step tabs must be clickable.
- The active step must be visually highlighted.
- Completed required sections must show green only when all mandatory fields are complete.
- Incomplete required sections must show red after the user tries to continue without required data.
- Incomplete sections must not be marked green.
- Continue must validate required fields for the current step.

### Agreement Period Logic

- If Start Date and Term Time are entered, calculate End Date.
- If Start Date and End Date are entered, calculate Term Time.
- If duration is not an exact year or month interval, show exact custom duration such as "1 year 3 months 12 days".
- Do not show the label "Custom Time".

### Draft Behavior

- Save as Draft must save the current form state.
- Save as Draft must show: "Draft saved successfully".
- Draft must be reopenable with details prefilled.
- Draft must not create status In Review until submitted.

### Submit Behavior

- Submit must validate all required fields.
- Submit must save the request.
- Submit must set status to In Review.
- Submit must add the request to Repository and dashboard records.
- Submit must show a success message.

## Template Management Requirements

### Template Library

Templates page must display:

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

### Example Templates

- Standard NDA
- Mutual NDA
- One-Way NDA
- Vendor NDA
- Customer NDA
- Partner NDA
- Employee / Contractor NDA
- International NDA

### Template Creation

- Admin can add new NDA templates.
- Admin can save templates successfully.
- Admin can manage placeholders.
- Newly created templates must be available in the NDA request workflow.

### Template Preview

- Preview must show the original template with placeholders in place.
- Placeholders must be highlighted visually.
- A side panel must show detected placeholders.
- Each placeholder must show mapped or missing status.
- Preview must not modify the original template.

## Placeholder Replacement Requirements

### Supported Placeholders

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

### Mapping Rules

| Placeholder | Source Field |
| --- | --- |
| {{CompanyName}} | Company Name |
| {{CounterpartyName}} | Counterparty Name |
| {{EmployeeName}} | Employee Name, if applicable |
| {{CounterpartyAddress}} | Counterparty Address |
| {{CompanyAddress}} | Company Address |
| {{EffectiveDate}} | Start Date |
| {{ProjectName}} | Project Name |
| {{BusinessPurpose}} | Business Purpose |
| {{ConfidentialInformation}} | Confidential Information or derived NDA purpose text |
| {{Jurisdiction}} | Jurisdiction |
| {{GoverningLaw}} | Governing Law |
| {{NDADuration}} | Calculated Term Time |
| {{SurvivalPeriod}} | Survival Period, if captured or template default |
| {{AuthorizedSignerName}} | Authorized Signer Name |
| {{AuthorizedSignerTitle}} | Authorized Signer Title |
| {{CounterpartySignerName}} | Counterparty Signer Name |
| {{CounterpartySignerTitle}} | Counterparty Signer Title |
| {{Address}} | Counterparty Address or applicable party address |
| {{Purpose}} | Business Purpose |

### Validation

- Every placeholder in the selected template must be detected.
- Required placeholders must be mapped before final document generation.
- Missing required placeholders must block DOCX/PDF download and show an error toast.
- Placeholder status must be visible during template selection and final document generation.

## Risk Review Requirements

### Risk Inputs

Risk calculation must evaluate:

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

### Risk Output

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

### Risk Explanation Rules

- If PII is selected, show: "This NDA includes personal or sensitive data considerations. Privacy review is recommended before execution."
- If competitor risk is selected, show: "This NDA involves a counterparty that may create competitive sensitivity. Legal review is recommended."
- Risk explanations must be clear and based on selected risk flags.

### Risk Level Guidance

- Low: Few or no sensitive risk factors selected.
- Medium: One or more moderate risk factors selected.
- High: Competitive sensitivity, PII, employee data, customer data, cross-border transfer, M&A/JV, or multiple combined risk factors selected.

## Legal Review Requirements

### Legal Reviewer Section

The following actions must appear under a Legal Reviewer section:

- Preview document
- Edit NDA
- Approve
- Reject
- Send to Sign

### Edit NDA

- Legal Reviewer and Admin can edit existing NDA records.
- Edit must open the existing NDA with all details prefilled.
- Edit must include full NDA details, including counterparty details.
- Saving must update the existing NDA, not create a new request.

### Approve

- Allowed only for Legal Reviewer and Admin.
- Must update status to Approved.
- Must add audit trail entry.
- Must show success toast.

### Reject

- Allowed only for Legal Reviewer and Admin.
- Rejected records should move to Archived or be clearly marked through audit trail and review notes.
- Must add audit trail entry.
- Must show success toast.

### Send to Sign

- Allowed only for Legal Reviewer and Admin.
- Enabled only when status is Approved.
- Must change status to Awaiting Signature.
- Must trigger the e-signature workflow.
- Must add audit trail entry.
- Must show success message.

## E-Signature Requirements

### Send to Sign

- Use the counterparty email from Counterparty Details.
- Generate a valid, accessible, clickable signing URL.
- Signing URL must map to the specific NDA request.
- Recipient must be able to open signing page without authentication issues.
- Status must change to Awaiting Signature only when send action succeeds.
- Add audit trail entry.

### Email Content

- Email must include a clear clickable URL or button.
- Email must instruct recipient to review and sign.
- Email must work for any recipient email address.

### Signing Page

Route: `app/sign/[token]/page.jsx`

Counterparty signer must be able to:

- Preview full NDA before signing.
- Download the document before signing.
- Review complete NDA content.
- Complete a proper e-signature action.
- Sign and return the document.

### After Signing

- Embed completed signature into the final NDA document.
- Store signed PDF and signed DOCX against the NDA record.
- Change NDA status to Signed only after signed documents are stored.
- Update dashboard and repository counts.
- Repository must show status Signed.
- Signed document sections must not show "No Signed Documents" when signed documents exist.

### Signing Confirmation

- Show confirmation page after Sign and Return.
- Show Download Signed NDA option immediately.
- Allow download of Signed PDF and Signed DOCX when available.
- Remove Return to CLM Dashboard from the signer confirmation page.

## Repository Requirements

### Table Columns

- Contract ID
- Contract type
- Counterparty
- Status
- Risk level
- Template used
- Effective date
- Expiry date
- Timestamp or recent activity timestamp
- Owner
- Actions

### View Action

- View must open the final NDA document in the Document section.
- View must not open the old preview screen.
- Signed records must display the complete signed document with embedded signatures.
- Users must be able to download DOCX and PDF from the view.

### Document Section

Show:

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
- Preview or View full document

### Row Actions

Three-dot row action menu must include:

- Add tag
- Edit NDA
- Renew NDA
- Delete document

### Edit NDA

- Opens already created NDA with all details prefilled.
- Must not start from scratch.
- User can make changes and save updates if role permits.

### Renew NDA

- Opens already created NDA with all details prefilled.
- User can review agreement and update time or renewal details.
- Must not start from scratch.

### Delete Document

- Only Admin can delete.
- Non-admin users must see: "You do not have permission to perform this activity."

## AI Search Requirements

### Naming

- Rename AI Tools to AI Search everywhere.

### Capabilities

AI Search must answer questions about:

- NDA expiry date
- NDA status
- Counterparty details
- Contract purpose
- Contract summary
- Signature status
- Renewal details
- Risk highlights
- Clause-specific questions
- Repository-related questions
- Available application data

### Search Behavior

- User can select a specific NDA from Repository.
- If an NDA is selected, answers should use that selected NDA first.
- If no NDA is selected, search across repository data.
- Exact field data must be returned when available.
- Avoid generic fallback summaries when exact field data exists.
- Return "I could not find that information in the selected NDA record" only when data is truly missing.

### Field Mapping

| Query Terms | Data Fields |
| --- | --- |
| expiry, expiration, end date | expiryDate, endDate |
| status, stage | status |
| party, counterparty | counterparty |
| sign, signature | signatureStatus |
| renew, renewal | renewalDetails |
| purpose, business purpose | businessPurpose |
| risk | riskLevel, riskFlags |
| template | selectedTemplate |
| email | counterpartyEmail |
| address | counterpartyAddress |

### Contract Analysis

AI Search must include:

- Automated Contract Data Extraction
- Advanced Analysis & Risk Scoring
- Metadata extraction
- Important clause extraction
- Summary generation
- Risk insights
- Risk score and recommendations

## Settings Requirements

- Settings must be visible only to Admin unless a non-admin preference section is intentionally separated.
- Dark Theme and White Theme toggle must work.
- Role selector must work.
- Executive Viewer must remain view-only.
- Admin must be able to manage users.
- Dropdown styling must be readable in both themes.

## Parties and Rules Requirements

### Parties

- Parties page is Admin only.
- Admin can add, edit, search, and export counterparties.
- Dropdowns must be clear in dark and white themes.

### Rules

- Rules page is Admin only.
- Admin can add auto-assignment and routing rules.
- Rules must be shown while creating an NDA request.

### Example Routing Rules

- High risk -> Legal Reviewer
- PII involved -> Privacy Review
- International business -> Senior Legal Reviewer
- Large data files -> Privacy / Security Review
- Standard low-risk NDA -> Business approver

## Export Requirements

- Every Export button must generate a CSV.
- CSV must include currently visible rows and table columns.
- Export must add an audit trail entry: Export completed.
- Export file names should be meaningful and include table context and date where practical.

## Audit Trail Requirements

Audit trail must support these events:

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

Each audit entry must include:

- Event name
- Contract ID or record reference
- Actor
- Role
- Timestamp
- Optional notes

## Status Flow

### Standard Flow

1. Draft saved outside formal status or as draft metadata.
2. Submitted request -> In Review.
3. Legal approval -> Approved.
4. Send to Sign -> Awaiting Signature.
5. Counterparty signs and signed documents are stored -> Signed.
6. Archive, reject, or retire -> Archived.

### Transition Rules

| From | Action | To | Allowed Roles |
| --- | --- | --- | --- |
| Draft | Submit | In Review | Business User, Admin |
| In Review | Approve | Approved | Legal Reviewer, Admin |
| In Review | Reject | Archived | Legal Reviewer, Admin |
| Approved | Send to Sign | Awaiting Signature | Legal Reviewer, Admin |
| Awaiting Signature | Sign and Store | Signed | Counterparty Signer workflow |
| Any active status | Archive | Archived | Legal Reviewer, Admin |
| Any status | Delete | Archived or removed from active list | Admin |

## Validation Rules

- Required fields must display a star.
- Required field errors must appear when user continues or submits without required data.
- Counterparty email must be valid email format.
- Start Date must be on or before End Date.
- Term Time must be calculable from Start Date and End Date or entered in an accepted format.
- End Date must be calculated when Start Date and Term Time are present.
- Term Time must be calculated when Start Date and End Date are present.
- Template selection is required before final document generation.
- Required placeholders must be complete before DOCX/PDF download.
- Send to Sign requires Approved status.
- Signed status requires stored signed PDF and signed DOCX.
- Admin-only actions must block non-admin users.

## Error and Toast Behavior

| Scenario | Message |
| --- | --- |
| Unauthorized restricted action | You do not have permission to perform this activity. |
| Draft saved | Draft saved successfully |
| Required fields missing | Please complete all required fields before continuing. |
| Invalid email | Enter a valid counterparty email address. |
| Template missing | Select an NDA template before continuing. |
| Placeholder values missing | Required placeholder values are missing. Complete mapping before generating the final NDA. |
| Risk review complete | Risk review completed successfully. |
| NDA submitted | NDA request submitted successfully. |
| NDA approved | NDA approved successfully. |
| NDA rejected | NDA rejected and archived successfully. |
| Sent to sign | NDA sent for signature successfully. |
| Signed document stored | Signed NDA stored successfully. |
| DOCX downloaded | DOCX downloaded successfully. |
| PDF downloaded | PDF downloaded successfully. |
| Export complete | Export completed successfully. |
| Delete blocked | You do not have permission to perform this activity. |
| Document deleted | Document deleted successfully. |

## Acceptance Criteria

- CLM appears as the platform name throughout the product.
- NDA appears as one major contract use case inside CLM.
- Dashboard shows accurate status counts and filters.
- Request a New Contract opens the full-page NDA intake workflow.
- NDA intake has all required steps, required fields, validation, and agreement period logic.
- Draft save and reopen works.
- Submit sets status to In Review and updates repository and dashboard.
- Template library supports preview, placeholder detection, admin creation, and usage in intake.
- Placeholders map correctly from intake fields.
- Missing required placeholders block final document downloads.
- Risk Review shows score, level, flags, explanation, recommendations, placeholder status, and final document status.
- Legal Reviewer actions are permission-protected and audit logged.
- Approve, reject, and send to sign update statuses correctly.
- E-signature link opens the signing page and maps to the correct NDA.
- Counterparty can preview, download, sign, and download signed documents.
- Signed documents are stored before status changes to Signed.
- Repository shows all documents for every role.
- Repository View opens final document view and supports signed document downloads.
- Admin-only delete is enforced.
- AI Search returns exact answers from selected NDA or repository data.
- Settings, Users, Parties, and Rules behave according to role permissions.
- Theme switching works.
- Export buttons generate CSV files for visible data.
- Audit trail records all required lifecycle events.

