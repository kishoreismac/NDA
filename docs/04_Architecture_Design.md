# CLM Architecture Design

## Architecture Overview

CLM is a premium enterprise SaaS web application for contract lifecycle management. The current implementation target is a React or Next.js frontend using Tailwind CSS, local component state, shared application state, and localStorage for demo persistence.

There is no live backend API at this stage. All domain services should be implemented as frontend service utilities that read from and write to localStorage-backed application state. The architecture should still be shaped like a backend-ready enterprise application so future API replacement is straightforward.

The application supports:

- Dashboard
- Request a New Contract
- NDA intake workflow
- Template Library
- Risk Review
- Legal Reviewer section
- Repository
- Document viewer
- E-signature signing page
- AI Search
- Settings
- Users
- Parties
- Rules
- Audit trail
- CSV export
- Theme switching
- Role-based access control

## Frontend Architecture

The frontend should use a modular architecture:

- Pages own routing and page-level layout.
- Feature modules own workflow-specific screens and orchestration.
- Components provide reusable UI building blocks.
- Services own data access, localStorage persistence, validation, and domain operations.
- Utilities own pure helper logic such as date math, CSV serialization, placeholder parsing, and permission checks.
- Constants and types centralize roles, statuses, permissions, and localStorage keys.

Recommended layers:

| Layer | Responsibility |
| --- | --- |
| App shell | Sidebar, top nav, role selector, theme selector, page outlet. |
| Pages | Route-level views and route-specific data loading. |
| Features | Dashboard, NDA request, templates, repository, AI Search, settings. |
| Components | Buttons, tables, drawers, forms, cards, tabs, toasts, menus. |
| Services | Frontend contracts for local data operations. |
| Store/context | Current user, current role, theme, loaded collections, toast state. |
| Utilities | Pure functions for mapping, scoring, exporting, document generation. |

## Folder Structure

Recommended Next.js-oriented structure:

```text
app/
  page.jsx
  dashboard/
    page.jsx
  request/
    new/
      page.jsx
  repository/
    page.jsx
    [id]/
      page.jsx
  templates/
    page.jsx
  ai-search/
    page.jsx
  settings/
    page.jsx
  parties/
    page.jsx
  rules/
    page.jsx
  sign/
    [token]/
      page.jsx

components/
  app/
    AppShell.jsx
    Sidebar.jsx
    TopNav.jsx
    RoleSelector.jsx
    ThemeToggle.jsx
  ui/
    Button.jsx
    IconButton.jsx
    DataTable.jsx
    StatusBadge.jsx
    RiskBadge.jsx
    ToastProvider.jsx
    Drawer.jsx
    Modal.jsx
    Dropdown.jsx
    Tabs.jsx
    Stepper.jsx
  forms/
    Field.jsx
    DateField.jsx
    SelectField.jsx
    TextAreaField.jsx
    ValidationSummary.jsx
  documents/
    DocumentViewer.jsx
    DocumentDownloadActions.jsx
    SignaturePanel.jsx

features/
  dashboard/
    DashboardPage.jsx
    StatusSummaryTabs.jsx
    ContractTypeOverview.jsx
    RecentActivity.jsx
  nda-request/
    NdaRequestPage.jsx
    NdaStepper.jsx
    CounterpartyStep.jsx
    TemplateStep.jsx
    RiskQuestionsStep.jsx
    GenerateDraftStep.jsx
  templates/
    TemplatesPage.jsx
    TemplatePreviewDrawer.jsx
    TemplateEditor.jsx
  risk-review/
    RiskReviewPanel.jsx
    RiskExplanationList.jsx
  legal-review/
    LegalReviewerActions.jsx
  repository/
    RepositoryPage.jsx
    RepositoryTable.jsx
    RepositoryDetail.jsx
    RowActionsMenu.jsx
  ai-search/
    AiSearchPage.jsx
    RepositorySelector.jsx
    SearchAnswerPanel.jsx
  settings/
    SettingsPage.jsx
    UsersPanel.jsx
  parties/
    PartiesPage.jsx
  rules/
    RulesPage.jsx

lib/
  constants/
    roles.js
    statuses.js
    permissions.js
    storageKeys.js
  services/
    authService.js
    userService.js
    contractService.js
    ndaRequestService.js
    templateService.js
    placeholderService.js
    riskReviewService.js
    documentGenerationService.js
    eSignatureService.js
    repositoryService.js
    auditTrailService.js
    exportService.js
    aiSearchService.js
    settingsService.js
    partiesService.js
    rulesService.js
  storage/
    localStorageClient.js
    seedData.js
    hydrateStore.js
  utils/
    permissions.js
    dates.js
    csv.js
    ids.js
    placeholders.js
    riskScoring.js
    documentText.js
```

## Routing Structure

| Route | Page | Access |
| --- | --- | --- |
| `/` | Redirect or dashboard | All internal roles |
| `/dashboard` | Dashboard | All internal roles |
| `/request/new` | Full-page NDA request workflow | Business User, Admin |
| `/repository` | Repository list | All internal roles |
| `/repository/[id]` | Repository document detail | All internal roles |
| `/templates` | Template Library | Legal Reviewer, Admin |
| `/ai-search` | AI Search | Business User, Legal Reviewer, Admin |
| `/settings` | Settings and Users | Admin, or scoped user preferences if split |
| `/parties` | Parties management | Admin only |
| `/rules` | Rules management | Admin only |
| `/sign/[token]` | External counterparty signing page | Token-based external access |

The sidebar must not show New Contract Request. Request a New Contract is launched from the dashboard and opens `/request/new` as a full-page view.

## Page Structure

### Dashboard Page

- Status summary tabs for In Review, Approved, Awaiting Signature, Signed, Archived.
- Summary tabs filter records by exact status.
- Request a New Contract full-page CTA.
- Contract record type overview.
- Recent activity.
- Awaiting signature records.
- Recently signed documents.
- Expiring NDA indicators.

### NDA Request Page

- Full-page stepper workflow.
- Clickable steps.
- Required-field validation.
- Draft save.
- Submit to In Review.
- Template selection and placeholder status.
- Risk questions and Risk Summary.

### Templates Page

- Template table.
- Template preview drawer.
- Admin template creation.
- Placeholder detection and mapping status.
- CSV export if visible.

### Repository Page

- All documents visible to all internal roles.
- Role-based action controls.
- Three-dot row action menu.
- View opens final document section, not legacy preview.
- Admin-only delete.
- Download generated or signed PDF/DOCX.

### Signing Page

- External page resolved by token.
- No internal app sidebar.
- Preview and download before signing.
- Signature capture.
- Sign and Return.
- Confirmation with signed document downloads.

## Component Hierarchy

```text
AppShell
  Sidebar
  TopNav
    RoleSelector
    ThemeToggle
  PageContainer
    RoutePage
      FeatureSections
        Shared UI components
        Feature-specific panels
```

Recommended feature-level hierarchy for NDA request:

```text
NdaRequestPage
  NdaStepper
  StepContent
    CounterpartyStep
    RecordDetailsStep
    TemplateStep
      TemplateSelector
      PlaceholderStatusPanel
    AdditionalQuestionsStep
    DataQuestionsStep
    RiskSummaryStep
      RiskReviewPanel
    GenerateDraftStep
  StickyWorkflowActions
```

Recommended repository hierarchy:

```text
RepositoryPage
  RepositoryFilters
  RepositoryTable
    StatusBadge
    RiskBadge
    RowActionsMenu
  RepositoryDetailDrawer or RepositoryDetailPage
    DocumentViewer
    DocumentDownloadActions
    AuditTrailPanel
```

## State Management Approach

The app can use React context and local component state. If state grows, a lightweight store such as Zustand can be introduced, but the service contracts should remain the same.

Recommended contexts:

- `AppDataContext`: hydrated collections and refresh helpers.
- `AuthContext`: selected user, selected role, permission helpers.
- `ThemeContext`: current theme and setter.
- `ToastContext`: success, error, warning, info toasts.

State should follow this pattern:

1. Page calls a service function.
2. Service reads localStorage-backed data.
3. Service validates input and permissions.
4. Service writes updated collections.
5. Service returns a typed result.
6. Page updates state or triggers a refresh from storage.
7. Toast is shown based on service result.

## LocalStorage Persistence Strategy

Use versioned keys:

```text
clm.v1.users
clm.v1.roles
clm.v1.permissions
clm.v1.contractRecordTypes
clm.v1.ndaRecords
clm.v1.ndaDrafts
clm.v1.templates
clm.v1.templatePlaceholders
clm.v1.parties
clm.v1.riskQuestions
clm.v1.riskFlags
clm.v1.riskReviews
clm.v1.routingRules
clm.v1.approvalWorkflows
clm.v1.documents
clm.v1.signedDocuments
clm.v1.eSignatureTokens
clm.v1.auditTrail
clm.v1.aiSearchIndex
clm.v1.appSettings
clm.v1.exports
clm.v1.seedVersion
```

Persistence rules:

- Initialize seed data when seed version is missing.
- Hydrate collections once on app load.
- Persist collection updates after successful service actions.
- Keep dashboard metrics derived from `ndaRecords`, not stored as the source of truth.
- Store document metadata separately from document content.
- Store signed document references so signed records download stored signed files.

## Role-Based Access Control Design

RBAC should be enforced through a central permission utility and service-level validation.

Core rules:

- Dashboard visible to all internal roles.
- Repository visible to all internal roles.
- Templates visible to Legal Reviewer and Admin.
- AI Search visible to Business User, Legal Reviewer, and Admin.
- Settings visible to Admin, unless user preference settings are split out.
- Parties visible only to Admin.
- Rules visible only to Admin.
- Executive Viewer has view-only access.
- Admin can perform all actions.
- Admin-only delete must be enforced.
- Business User cannot approve, reject, send to sign, or delete.
- Legal Reviewer can review, edit, approve, reject, preview, and send to sign.

Permission checks should exist in:

- Navigation rendering.
- Button/action rendering.
- Service functions before mutation.

Unauthorized restricted action message:

```text
You do not have permission to perform this activity.
```

## Theme Design

Theme switching should support:

- Dark Theme
- White Theme

Theme state should be stored in `clm.v1.appSettings`.

Implementation guidance:

- Use a root class such as `theme-dark` or `theme-white`.
- Define Tailwind theme tokens or CSS variables for backgrounds, text, borders, surfaces, accents, focus states, and dropdowns.
- Ensure dropdowns remain readable in both themes.
- Avoid hardcoded colors in feature components where tokens are available.

## Document Generation Design

Document generation is client-side in the demo architecture.

Inputs:

- NDA record.
- Selected template.
- Placeholder mappings.
- Output format: DOCX or PDF.
- Current user.

Flow:

1. Validate user permission where needed.
2. Load NDA record and selected template.
3. Detect template placeholders.
4. Map placeholders to NDA fields.
5. Validate required placeholder values.
6. Generate document content.
7. Create document metadata record.
8. Store generated file content or generated content reference.
9. Add audit trail entry.
10. Return download-ready result.

Download rules:

- Cannot download final NDA when required placeholders are missing.
- Signed records must download stored signed documents.
- Generated records can use generated current content if not signed.

## Template Placeholder Replacement Flow

1. User selects template during intake.
2. `templateService` returns selected template.
3. `placeholderService.detectPlaceholders(template.body)` finds tokens.
4. `placeholderService.buildMapping(template, ndaRecord)` maps each placeholder to a source field.
5. UI shows mapped or missing status.
6. On document generation, mapping is validated again.
7. Replacement happens on a copy of template content.
8. Original template remains unchanged.

Supported placeholder token format:

```text
{{PlaceholderName}}
```

## E-Signature Flow

1. Legal Reviewer or Admin approves NDA.
2. Legal Reviewer or Admin clicks Send to Sign.
3. `eSignatureService.createSigningToken` creates token linked to NDA.
4. NDA status changes to Awaiting Signature.
5. Email content or demo link is generated from token.
6. Counterparty opens `/sign/[token]`.
7. Signing page validates token and loads NDA.
8. Counterparty previews or downloads document if desired.
9. Counterparty signs and returns.
10. Signature is embedded into final document content.
11. Signed PDF and signed DOCX metadata are stored.
12. Token becomes Used.
13. NDA status changes to Signed only after signed docs are stored.
14. Audit trail records Signed.
15. Confirmation page shows signed downloads.

The signing page must not show Return to CLM Dashboard.

## Repository Document Access Flow

Repository visibility:

- All internal roles can see all repository documents.
- Actions remain permission controlled.

View flow:

1. User opens Repository.
2. `repositoryService.listRepositoryRecords` returns joined view models.
3. User clicks View.
4. Document section opens final document view.
5. If record is Signed, show signed PDF/DOCX.
6. If record is not Signed, show generated PDF/DOCX when available.
7. Downloads call `documentGenerationService` or return stored signed document.

Delete flow:

- Only Admin can delete.
- Non-admin users receive the required permission message.

## AI Search Design

AI Search is repository-based and data-aware. It should use a deterministic local query parser before any future AI integration.

Sources:

- NDA records.
- Parties.
- Templates.
- Risk reviews.
- Documents.
- Audit entries.

Search behavior:

- If user selects an NDA, answer from selected NDA first.
- If no NDA is selected, search across repository records.
- Exact field matches take priority over summaries.
- If data is missing, respond: "I could not find that information in the selected NDA record".

Field mapping:

| Query Terms | Data Fields |
| --- | --- |
| expiry, expiration, end date | `expiryDate` |
| status, stage | `status` |
| party, counterparty | `counterpartyName`, party data |
| sign, signature | `signatureStatus` |
| renew, renewal | `renewalDetails` |
| purpose, business purpose | `businessPurpose` |
| risk | `riskLevel`, `riskFlagIds` |
| template | `templateId` |
| email | `counterpartyEmail` |
| address | `counterpartyAddress` |

## Audit Trail Design

Audit entries should be append-only.

Each mutation service should create audit entries for material lifecycle events:

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

Audit trail should be visible in repository details and useful for QA verification.

## CSV Export Design

CSV export should be a reusable utility.

Inputs:

- Table name.
- Visible rows.
- Visible columns.
- Current user.

Flow:

1. Receive currently visible filtered rows.
2. Serialize only visible table columns.
3. Escape CSV values correctly.
4. Generate meaningful filename.
5. Trigger browser download.
6. Store optional export job metadata.
7. Add audit trail entry: Export completed.

## Error Handling and Toast Strategy

Use consistent service result shapes:

```ts
type ServiceResult<T> = {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
  };
};
```

Toast categories:

- Success for completed actions.
- Error for blocked or failed actions.
- Warning for incomplete placeholders or validation concerns.
- Info for non-destructive state changes.

Required permission error:

```text
You do not have permission to perform this activity.
```

Common toast examples:

- Draft saved successfully
- NDA request submitted successfully
- Risk review completed successfully
- NDA approved successfully
- NDA sent for signature successfully
- Signed NDA stored successfully
- Export completed successfully

## Responsive Design Approach

The application should feel like a dense but polished enterprise SaaS product.

Responsive guidance:

- Sidebar may collapse on tablet and mobile.
- Tables should support horizontal scrolling or responsive card rows.
- Action menus should remain reachable on narrow screens.
- Intake workflow steps should wrap or become a vertical stepper on mobile.
- Document viewer should prioritize readable document content and sticky download actions.
- Dashboard summary tabs should remain in a single row on desktop and scroll horizontally on mobile if needed.
- Form controls should use stable widths and avoid text overlap.

## Security and Demo Limitations

Current limitations:

- localStorage is not secure for sensitive production data.
- Role selector is a demo convenience, not authentication.
- Signing links are local/demo tokens, not production-grade secure links.
- Document generation is client-side and may not preserve all DOCX formatting.
- AI Search is deterministic local matching, not legal advice.
- Audit trail is local and can be modified by users with browser access.

Demo safeguards:

- Use mock company and email data.
- Avoid real confidential data.
- Make permission checks consistent even in demo state.
- Keep future backend boundaries clear through service contracts.

## Future Backend Integration Notes

The service layer should be designed so localStorage calls can be replaced by HTTP API calls later.

Future backend responsibilities:

- Authentication and authorization.
- Persistent database storage.
- Server-side document generation.
- Secure e-signature token generation.
- Email delivery.
- External e-signature provider integration.
- Immutable audit logs.
- AI Search indexing and retrieval.
- File storage for generated and signed documents.
- Reporting and export jobs.

Recommended migration path:

1. Keep frontend service function names stable.
2. Replace localStorage implementations with API client implementations.
3. Move validation rules to shared client/server schema where possible.
4. Preserve TypeScript interfaces as API DTOs or view models.
5. Add backend-generated IDs and timestamps.
6. Replace role selector with authenticated user context.

