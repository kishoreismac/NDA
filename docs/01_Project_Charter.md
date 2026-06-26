# CLM Project Charter

## Project Title

CLM: Premium Contract Lifecycle Management Platform with NDA Lifecycle Automation

## Product Vision

CLM will be a premium enterprise Contract Lifecycle Management platform that helps business, legal, administrative, and executive teams request, create, review, approve, sign, store, search, report on, and renew contracts from a single governed workspace.

NDA will be one of the core contract use cases inside the broader CLM platform. The product should support a professional legal operations experience with clear workflows, role-based permissions, auditability, reusable templates, document generation, e-signature, repository management, AI-assisted search, and reporting.

## Business Problem

Organizations often manage NDAs and other contracts through disconnected email threads, shared drives, manual template edits, and informal approval processes. This creates several business problems:

- Contract requests lack consistent intake data.
- Legal teams spend time chasing missing information.
- Templates are manually edited and prone to placeholder errors.
- Risk review is inconsistent across teams and geographies.
- Approval and signature status is difficult to track.
- Signed documents are scattered across inboxes and file systems.
- Business stakeholders lack visibility into contract status, expiry, and risk.
- Audit history is incomplete or difficult to reconstruct.
- Reporting and CSV exports require manual spreadsheet work.

CLM solves these problems by providing a controlled end-to-end contract lifecycle system, beginning with NDA automation as a high-value core use case.

## Objectives

- Provide a centralized CLM application for contract lifecycle activities.
- Support NDA intake, template selection, placeholder mapping, risk review, legal approval, e-signature, repository storage, AI Search, reporting, and renewal readiness.
- Give each role a tailored experience based on permissions.
- Reduce manual drafting and review effort through structured intake and template automation.
- Improve legal review consistency through risk scoring and clear review recommendations.
- Ensure signed documents are stored and retrievable from the repository.
- Enable business and executive visibility into contract status, risk, expiry, and activity.
- Provide audit trails for key lifecycle events.
- Support CSV export and document downloads in DOCX and PDF formats.

## Scope

The initial scope includes the following capabilities:

- CLM dashboard with contract status summary.
- Request a New Contract flow.
- NDA intake workflow.
- NDA template library.
- Template placeholder detection and mapping.
- Risk review and risk scoring.
- Legal reviewer approval workflow.
- E-signature workflow.
- Repository for generated and signed documents.
- Signed document storage.
- AI Search for contract and repository questions.
- Role selector.
- Settings.
- Users management.
- Parties management.
- Rules and routing configuration.
- Theme switching.
- Audit trail.
- CSV export.
- Document download in PDF and DOCX.

## Out of Scope

The following items are not included in the initial release unless separately prioritized:

- Native integrations with enterprise identity providers such as Okta, Entra ID, or SAML SSO.
- Production-grade external e-signature provider integrations.
- Production-grade AI model integration for legal advice.
- Backend workflow engine orchestration.
- Advanced clause negotiation with tracked redlines.
- Contract obligation management beyond renewal indicators.
- Multi-language contract generation.
- Multi-entity subsidiary management.
- Payment, billing, or procurement integrations.
- Mobile-native applications.
- Deployment automation or production infrastructure setup.

## Target Users

- Business teams that request NDAs and need simple guided intake.
- Legal teams that review NDA details, evaluate risk, approve requests, and send documents for signature.
- Administrators who manage users, templates, parties, routing rules, settings, and permissions.
- Executives who need read-only visibility into contract volume, status, risk, and expiry.
- Counterparty signers who receive signing links and execute finalized NDAs.

## User Roles

| Role | Description |
| --- | --- |
| Business User | Submits NDA requests, generates drafts, and runs risk reviews. |
| Legal Reviewer | Reviews, edits, approves, rejects, sends to sign, and previews NDA documents. |
| Admin | Performs all actions across CLM, including configuration and administrative management. |
| Executive Viewer | Has view-only access across the application and cannot create, edit, approve, delete, or send contracts. |
| Counterparty Signer | External recipient who reviews, downloads, signs, and returns an NDA through a signing link. |

## Core Modules

### Dashboard

The dashboard provides an enterprise contract operations overview, including NDA status counts, record type overview, recent activity, awaiting signature records, recently signed documents, and expiring NDA indicators.

### Request a New Contract

The request flow allows users with permission to start a structured full-page NDA intake workflow.

### NDA Intake Workflow

The intake workflow captures counterparty details, record details, template selection, placeholders, additional NDA questions, PII/data questions, risk summary, and draft generation.

### Template Library

The template library stores reusable NDA templates, metadata, preview, placeholder inventory, and template creation capabilities.

### Placeholder Mapping

The placeholder mapping module detects template placeholders and maps intake values into final document fields.

### Risk Review

Risk review evaluates NDA intake answers, assigns Low, Medium, or High risk, provides risk flags, explanations, recommendations, and approval guidance.

### Legal Review

Legal reviewers and admins can review NDA details, edit the request, approve, reject, preview documents, and send approved NDAs for signature.

### E-Signature

The e-signature workflow generates a signing link, allows the counterparty to review and sign the NDA, embeds the signature, stores signed documents, and updates status.

### Repository

The repository stores all generated, awaiting signature, signed, archived, and related NDA records. It supports view, download, edit, renew, tag, export, and admin-only delete actions.

### AI Search

AI Search answers natural language questions using repository records and selected NDA data, including expiry, status, counterparty, purpose, signature status, renewal details, risk, template, and document content.

### Settings

Settings include theme switching, role selector behavior, user management, and administrative configuration.

### Parties

The parties module manages counterparties and reusable party details.

### Rules

Rules define routing and assignment behavior based on risk, data use, international scope, and other attributes.

### Audit Trail

The audit trail records lifecycle events such as draft saved, request submitted, template selected, risk review completed, document generated, sent for signature, signed, archived, deleted, and exported.

### Export and Downloads

The application supports CSV exports for visible table data and PDF/DOCX downloads for generated and signed documents.

## NDA Statuses

The platform uses the following NDA statuses:

| Status | Meaning |
| --- | --- |
| In Review | NDA request has been submitted and is awaiting or undergoing review. |
| Approved | NDA has been approved by Legal Reviewer or Admin. |
| Awaiting Signature | NDA has been sent to the counterparty for signature. |
| Signed | NDA has been signed and signed documents are stored. |
| Archived | NDA has been archived, rejected, deleted from active workflow, or closed from active processing. |

## Success Criteria

- Business Users can submit NDA requests through a complete guided intake workflow.
- Legal Reviewers can review, edit, approve, reject, preview, and send NDAs for signature.
- Admins can perform all actions and manage users, templates, parties, rules, settings, and deletion.
- Executive Viewers can view dashboards and repository data without creating or modifying records.
- Dashboard status counts match filtered record lists.
- NDA records move correctly through In Review, Approved, Awaiting Signature, Signed, and Archived.
- Required fields are clearly indicated and validated.
- Templates can be selected, previewed, and mapped to placeholders.
- Risk review produces score, level, flags, explanations, and recommendations.
- DOCX and PDF downloads are generated from selected templates with populated placeholders.
- Counterparty signing links work and produce stored signed documents.
- Repository shows complete document metadata and final signed documents.
- AI Search provides precise answers from available repository data.
- Export buttons generate CSV files for visible table data.
- Audit trail entries are created for key lifecycle events.

## Assumptions

- The initial implementation may use mock data, local state, or localStorage for demo persistence.
- NDA is a core use case but the platform should be structured to support additional contract types.
- E-signature may be implemented as an internal demo workflow before integrating an external signing provider.
- AI Search may initially use local query parsing and deterministic field matching before connecting to an AI service.
- Document generation may use client-side libraries for DOCX and PDF generation.
- The role selector may be used to simulate role behavior in non-production environments.
- The application should maintain a premium enterprise SaaS look and feel.

## Constraints

- Only the approved NDA statuses should be used in the product workflow.
- Executive Viewer must remain view-only across the application.
- Business User must not approve, reject, send to sign, delete, or manage administrative settings.
- Legal Reviewer must not access Admin-only settings, users, parties, or rules unless explicitly allowed by Admin role.
- Admin-only delete must be enforced.
- All restricted actions must show: "You do not have permission to perform this activity."
- Repository must be visible to every role.
- Request a New Contract should open as a full-page workflow.
- Signed documents must be stored before status changes to Signed.
- Dashboard, repository, and signed document sections must remain consistent after status changes.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Placeholder mapping errors | Incorrect legal documents may be generated. | Validate required placeholders before generation and show mapped/missing status. |
| Role permission gaps | Unauthorized users may perform restricted actions. | Centralize permission checks and test each role. |
| E-signature token mismatch | Counterparty may sign the wrong NDA or fail to access the signing page. | Generate unique tokens mapped to specific NDA records and validate token resolution. |
| Signed document storage failure | Status may show Signed without a retrievable signed file. | Update status only after signed PDF and DOCX are stored. |
| Risk scoring ambiguity | Review recommendations may be inconsistent. | Define deterministic scoring rules and explanatory text for each risk flag. |
| Dashboard count mismatch | Users may lose trust in reporting. | Calculate counts from the same filtered repository data used by visible lists. |
| Local-only persistence limitations | Demo data may not behave like production data. | Clearly document assumptions and isolate persistence logic for future backend replacement. |
| AI Search overgeneralization | Answers may be vague or inaccurate. | Prefer exact field matching before document text search or summaries. |

## Milestones

| Milestone | Description | Target Outcome |
| --- | --- | --- |
| M1: Product Foundation | App shell, navigation, roles, theme, and core CLM structure. | Users can navigate the CLM platform by role. |
| M2: Dashboard and Intake | Dashboard summary and full-page NDA request workflow. | Users can start, save, and submit NDA requests. |
| M3: Templates and Placeholders | Template library, preview, creation, and placeholder mapping. | NDA drafts can be generated from selected templates. |
| M4: Risk and Legal Review | Risk scoring and legal approval workflow. | Legal Reviewers can evaluate and approve NDA requests. |
| M5: Document Generation | DOCX/PDF generation and final document preview. | Users can download generated NDA documents. |
| M6: E-Signature | Signing link, signing page, signed document storage. | Counterparties can sign and signed documents are stored. |
| M7: Repository and Audit | Repository actions, detail view, export, delete, and audit trail. | Users can manage and inspect contract records. |
| M8: AI Search and Admin | AI Search, settings, users, parties, and rules. | Admin and search capabilities are complete. |
| M9: Regression Readiness | Final permission and workflow validation. | Application is ready for stakeholder review. |

## Acceptance Criteria

- The CLM platform treats NDA as one major use case within a broader contract lifecycle application.
- The platform includes dashboard, request flow, templates, placeholder mapping, risk review, legal review, e-signature, repository, AI Search, role selector, settings, users, parties, rules, theme switching, audit trail, CSV export, and document downloads.
- Business User can submit NDA requests, generate drafts, and run risk reviews.
- Legal Reviewer can review, approve, reject, send to sign, preview documents, and edit NDA details.
- Admin can perform all actions.
- Executive Viewer has view-only access.
- Counterparty Signer can access a signing link, review, download, sign, and download signed documents.
- NDA statuses are limited to In Review, Approved, Awaiting Signature, Signed, and Archived.
- Unauthorized restricted actions show the required permission message.
- Dashboard counts and filters are accurate.
- Required intake fields show stars and validation errors when incomplete.
- Draft saving persists current form details and does not set status to In Review until submission.
- Template placeholders are detected, mapped, validated, and replaced.
- Risk scoring generates level, flags, explanations, and recommendations.
- Final NDA documents can be downloaded in DOCX and PDF after required placeholders are complete.
- Signed documents are stored and available from the repository.
- CSV exports include currently visible table data.
- Audit trail records all major lifecycle events.

