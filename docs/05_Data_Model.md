# CLM Data Model

## Data Model Overview

The CLM demo application uses frontend application state and localStorage for persistence. The data model should be structured enough to simulate an enterprise CLM platform while remaining simple for a local demo.

The recommended approach is a normalized local data store with stable IDs and related collections:

- Users, roles, and permissions control application behavior.
- NDA records hold primary workflow and repository metadata.
- Templates and placeholders support document generation.
- Parties provide reusable counterparty data.
- Risk questions, flags, rules, and workflows support review recommendations.
- Documents and signed documents track generated and executed files.
- E-signature tokens map external signing links to NDA records.
- Audit trail records lifecycle events.
- AI Search index provides searchable field and document text metadata.
- Theme settings and role selection are persisted separately.

## Entity List

| Entity | Purpose |
| --- | --- |
| User | Internal CLM user for role-based workflows. |
| Role | Internal or external role definition. |
| Permission | Action-level access control. |
| ContractRecordType | Record type catalog across CLM. |
| NdaRecord | Primary NDA lifecycle and repository record. |
| NdaDraft | Saved draft intake state before formal submission. |
| Template | Reusable contract template metadata and body. |
| TemplatePlaceholder | Supported placeholder definition and mapping source. |
| PlaceholderMapping | Runtime mapping of template placeholders to NDA values. |
| Party | Counterparty entity and contact data. |
| RiskQuestion | Intake question used for scoring. |
| RiskFlag | Risk indicator metadata and recommendations. |
| RiskReview | Calculated risk result for an NDA. |
| RoutingRule | Admin-defined assignment or review recommendation rule. |
| ApprovalWorkflow | Recommended approval path. |
| DocumentRecord | Generated or signed document metadata. |
| SignedDocument | Executed document and signature metadata. |
| ESignatureToken | External signing token mapped to NDA record. |
| AuditEntry | Lifecycle event history. |
| AiSearchIndexItem | Searchable field/document entry. |
| AppSettings | Theme, selected role, and app preferences. |
| ExportJob | CSV export history and audit support. |

## Entity Relationships

| Relationship | Description |
| --- | --- |
| User -> Role | Each internal user has one role. |
| Permission -> Role | A permission allows one or more roles. |
| NdaRecord -> User | NDA has owner and legal reviewer users. |
| NdaRecord -> Party | NDA references one counterparty party. |
| NdaRecord -> Template | NDA references selected template. |
| NdaRecord -> RiskReview | NDA can have one latest risk review and optional historical reviews. |
| RiskReview -> RiskFlag | Risk review includes zero or more flags. |
| NdaRecord -> DocumentRecord | NDA can have generated DOCX/PDF and signed DOCX/PDF documents. |
| NdaRecord -> SignedDocument | NDA can have one or more signed document records if re-signing is later supported. |
| ESignatureToken -> NdaRecord | Signing token maps to exactly one NDA. |
| AuditEntry -> Entity | Audit entry references NDA, document, template, party, rule, export, or settings entity. |
| Template -> TemplatePlaceholder | Template includes detected placeholder keys. |
| PlaceholderMapping -> NdaRecord | Mapping resolves template placeholders using NDA field values. |
| RoutingRule -> RiskFlag or RiskLevel | Rules evaluate NDA risk context. |
| ApprovalWorkflow -> Role | Workflow steps reference target roles. |
| AiSearchIndexItem -> NdaRecord | Search items reference source NDA or related document. |

## Field-Level Definitions

### Common Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Yes | Stable unique ID, usually prefixed by entity type. |
| createdAt | string | Recommended | ISO timestamp for creation. |
| updatedAt | string | Recommended | ISO timestamp for latest update. |
| status | string | Entity-specific | Current state. |

### NDA Required Intake Fields

| Field | Type | Required | Source |
| --- | --- | --- | --- |
| companyName | string | Yes | Counterparty Details |
| counterpartyName | string | Yes | Counterparty Details |
| counterpartyEmail | string | Yes | Counterparty Details |
| counterpartyAddress | string | Yes | Counterparty Details |
| companyAddress | string | Yes | Counterparty Details |
| effectiveDate | string | Yes | Start Date |
| expiryDate | string | Yes | End Date |
| ndaDuration | string | Yes | Calculated or entered Term Time |
| projectName | string | Yes | Counterparty Details |
| businessPurpose | string | Yes | Counterparty Details |
| jurisdiction | string | Yes | Counterparty Details |
| governingLaw | string | Yes | Counterparty Details |
| templateId | string | Yes before generation | Template & Placeholders |

## Suggested TypeScript Interfaces

```ts
export type UserRole =
  | "Business User"
  | "Legal Reviewer"
  | "Admin"
  | "Executive Viewer"
  | "Counterparty Signer";

export type NdaStatus =
  | "In Review"
  | "Approved"
  | "Awaiting Signature"
  | "Signed"
  | "Archived";

export type RiskLevel = "Low" | "Medium" | "High";

export type ThemeMode = "dark" | "white";

export interface User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  roleId: string;
  department?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface Role {
  id: string;
  name: UserRole;
  label: string;
  description: string;
  isExternal: boolean;
}

export interface Permission {
  id: string;
  key: string;
  label: string;
  description: string;
  allowedRoleIds: string[];
}

export interface ContractRecordType {
  id: string;
  name:
    | "NDA"
    | "MSA"
    | "SOW"
    | "Vendor Agreement"
    | "Customer Agreement"
    | "Partner Agreement"
    | "Employee / Contractor Agreement"
    | "Amendment"
    | "Renewal";
  description: string;
  enabled: boolean;
  supportsWorkflow: boolean;
  displayOrder: number;
}

export interface NdaRecord {
  id: string;
  contractId: string;
  recordTypeId: string;
  title: string;
  status: NdaStatus;
  ownerUserId: string;
  legalReviewerUserId?: string;
  partyId?: string;
  templateId?: string;
  companyName: string;
  counterpartyName: string;
  counterpartyEmail: string;
  counterpartyAddress: string;
  companyAddress: string;
  effectiveDate: string;
  expiryDate: string;
  ndaDuration: string;
  projectName: string;
  businessPurpose: string;
  jurisdiction: string;
  governingLaw: string;
  confidentialInformation?: string;
  survivalPeriod?: string;
  employeeName?: string;
  authorizedSignerName?: string;
  authorizedSignerTitle?: string;
  counterpartySignerName?: string;
  counterpartySignerTitle?: string;
  riskAnswers: Record<string, boolean>;
  riskLevel?: RiskLevel;
  riskScore?: number;
  riskFlagIds: string[];
  signatureStatus: "Not Sent" | "Sent" | "Signed";
  documentIds: string[];
  signedDocumentIds: string[];
  tags: string[];
  renewalDetails?: RenewalDetails;
  createdAt: string;
  updatedAt: string;
  recentActivityAt: string;
  archivedAt?: string;
  archivedReason?: string;
}

export interface RenewalDetails {
  renewalEligible: boolean;
  renewalDate?: string;
  renewalNotes?: string;
  renewedFromNdaId?: string;
}

export interface NdaDraft {
  id: string;
  draftName: string;
  formData: Partial<NdaRecord>;
  activeStepId: string;
  completedStepIds: string[];
  invalidStepIds: string[];
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
}
```

## Template Structure

```ts
export interface Template {
  id: string;
  name: string;
  type:
    | "Standard NDA"
    | "Mutual NDA"
    | "One-Way NDA"
    | "Vendor NDA"
    | "Customer NDA"
    | "Partner NDA"
    | "Employee / Contractor NDA"
    | "International NDA";
  jurisdiction: string;
  version: string;
  status: "Active" | "Draft" | "Archived";
  lastUpdatedAt: string;
  createdByUserId: string;
  placeholderKeys: string[];
  body: string;
  docxAssetKey?: string;
}

export interface TemplatePlaceholder {
  key: string;
  token: string;
  label: string;
  sourceField: keyof NdaRecord | string;
  required: boolean;
  description: string;
}
```

## Placeholder Mapping Structure

```ts
export interface PlaceholderMapping {
  id: string;
  ndaId: string;
  templateId: string;
  placeholderKey: string;
  token: string;
  sourceField: string;
  value: string;
  required: boolean;
  status: "Mapped" | "Missing";
  updatedAt: string;
}

export interface PlaceholderValidationResult {
  ndaId: string;
  templateId: string;
  totalPlaceholders: number;
  mappedCount: number;
  missingRequiredKeys: string[];
  validForGeneration: boolean;
}
```

## Risk Review Structure

```ts
export interface RiskQuestion {
  id: string;
  label: string;
  category: "Business" | "IP" | "Data" | "Privacy" | "International";
  flagId: string;
  weight: number;
  helpText?: string;
}

export interface RiskFlag {
  id: string;
  label: string;
  severity: RiskLevel;
  explanation: string;
  recommendation: string;
}

export interface RiskReview {
  id: string;
  ndaId: string;
  score: number;
  level: RiskLevel;
  flagIds: string[];
  explanations: string[];
  recommendedTemplateId?: string;
  recommendedWorkflowId?: string;
  clauseRecommendations: string[];
  placeholderValidation: PlaceholderValidationResult;
  reviewedByUserId: string;
  reviewedAt: string;
}
```

## Document Generation Structure

```ts
export type DocumentType =
  | "Generated DOCX"
  | "Generated PDF"
  | "Signed DOCX"
  | "Signed PDF";

export interface DocumentRecord {
  id: string;
  ndaId: string;
  documentType: DocumentType;
  fileName: string;
  mimeType: string;
  storageType: "localStorage" | "blob" | "generatedOnDemand";
  storageKey: string;
  templateId: string;
  placeholderValidation: PlaceholderValidationResult;
  status: "Generated" | "Signed" | "Archived";
  generatedByUserId: string;
  generatedAt: string;
}

export interface DocumentGenerationRequest {
  ndaId: string;
  templateId: string;
  outputFormat: "docx" | "pdf";
  generatedByUserId: string;
}

export interface DocumentGenerationResult {
  success: boolean;
  documentId?: string;
  fileName?: string;
  errorMessage?: string;
  missingRequiredKeys?: string[];
}
```

## E-Signature Token Structure

```ts
export interface ESignatureToken {
  id: string;
  token: string;
  ndaId: string;
  counterpartyEmail: string;
  counterpartyName: string;
  status: "Active" | "Used" | "Revoked" | "Expired";
  signingUrl: string;
  createdByUserId: string;
  createdAt: string;
  expiresAt?: string;
  usedAt?: string;
}

export interface SignedDocument {
  id: string;
  ndaId: string;
  signerName: string;
  signerEmail: string;
  signedAt: string;
  signatureType: "Drawn" | "Typed" | "Clickwrap";
  signatureDataKey: string;
  signedPdfDocumentId: string;
  signedDocxDocumentId: string;
}
```

## Audit Trail Structure

```ts
export type AuditEventType =
  | "Draft saved"
  | "Request submitted"
  | "Template selected"
  | "Template previewed"
  | "Placeholder values validated"
  | "Risk review completed"
  | "Document generated"
  | "DOCX downloaded"
  | "PDF downloaded"
  | "Sent for signature"
  | "Signed"
  | "Rejected"
  | "Archived"
  | "Deleted"
  | "Export completed";

export interface AuditEntry {
  id: string;
  entityType: "NDA" | "Template" | "Party" | "Rule" | "Export" | "Document" | "Settings";
  entityId: string;
  eventType: AuditEventType;
  actorUserId: string;
  actorRoleId: string;
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
```

## AI Search Index Structure

```ts
export interface AiSearchIndexItem {
  id: string;
  sourceType: "NDA" | "Document" | "Party" | "Template" | "Audit";
  sourceId: string;
  ndaId?: string;
  fieldName?: string;
  fieldLabel?: string;
  text: string;
  normalizedText: string;
  keywords: string[];
  updatedAt: string;
}

export interface AiSearchQuery {
  id: string;
  query: string;
  selectedNdaId?: string;
  userId: string;
  createdAt: string;
}

export interface AiSearchAnswer {
  queryId: string;
  answer: string;
  confidence: "High" | "Medium" | "Low";
  sourceIds: string[];
  matchedField?: string;
  createdAt: string;
}
```

## Repository Record Structure

The repository can render directly from `NdaRecord` plus related template, party, risk, document, and audit data. If a view model is useful, derive it instead of duplicating state.

```ts
export interface RepositoryRecord {
  id: string;
  contractId: string;
  contractType: string;
  counterparty: string;
  status: NdaStatus;
  riskLevel?: RiskLevel;
  templateUsed?: string;
  effectiveDate: string;
  expiryDate: string;
  recentActivityAt: string;
  ownerName: string;
  documentIds: string[];
  signedDocumentIds: string[];
  tags: string[];
}
```

## Status Enums

```ts
export const NDA_STATUSES = [
  "In Review",
  "Approved",
  "Awaiting Signature",
  "Signed",
  "Archived"
] as const;

export const DOCUMENT_STATUSES = [
  "Generated",
  "Signed",
  "Archived"
] as const;

export const TOKEN_STATUSES = [
  "Active",
  "Used",
  "Revoked",
  "Expired"
] as const;
```

## Role Enums

```ts
export const USER_ROLES = [
  "Business User",
  "Legal Reviewer",
  "Admin",
  "Executive Viewer",
  "Counterparty Signer"
] as const;
```

## LocalStorage Keys

Use a single versioned namespace so seeded data can be reset safely.

| Key | Purpose |
| --- | --- |
| `clm.v1.users` | User records. |
| `clm.v1.roles` | Role records. |
| `clm.v1.permissions` | Permission records. |
| `clm.v1.contractRecordTypes` | Contract record type catalog. |
| `clm.v1.ndaRecords` | Submitted NDA records. |
| `clm.v1.ndaDrafts` | Saved draft intake records. |
| `clm.v1.templates` | Template library. |
| `clm.v1.templatePlaceholders` | Placeholder catalog. |
| `clm.v1.parties` | Counterparty records. |
| `clm.v1.riskQuestions` | Risk intake questions. |
| `clm.v1.riskFlags` | Risk flag definitions. |
| `clm.v1.riskReviews` | Calculated risk reviews. |
| `clm.v1.routingRules` | Admin routing rules. |
| `clm.v1.approvalWorkflows` | Approval workflow definitions. |
| `clm.v1.documents` | Document metadata. |
| `clm.v1.signedDocuments` | Signed document metadata. |
| `clm.v1.eSignatureTokens` | Signing tokens. |
| `clm.v1.auditTrail` | Audit events. |
| `clm.v1.aiSearchIndex` | Search index entries. |
| `clm.v1.appSettings` | Theme, current role, and app settings. |
| `clm.v1.exports` | Optional export job history. |
| `clm.v1.seedVersion` | Current seed version marker. |

## App Settings Structure

```ts
export interface AppSettings {
  themeMode: ThemeMode;
  selectedRoleId: string;
  selectedUserId: string;
  seedVersion: string;
  lastResetAt?: string;
}
```

## Export Structure

```ts
export interface ExportJob {
  id: string;
  tableName: string;
  fileName: string;
  rowCount: number;
  columnKeys: string[];
  exportedByUserId: string;
  exportedAt: string;
}
```

## Validation Rules

### User Validation

- Email is required and must be unique.
- First Name, Last Name, Email, and Role are required.
- Role ID must exist in roles dataset.

### NDA Validation

- Company Name, Counterparty Name, Counterparty Email, Counterparty Address, Company Address, Start Date, End Date, Term Time, Project Name, Business Purpose, Jurisdiction, and Governing Law are required before submission.
- Counterparty Email must be valid email format.
- Effective Date must be on or before Expiry Date.
- Duration must be calculated when Effective Date and Expiry Date are present.
- Expiry Date must be calculated when Effective Date and valid term input are present.
- Submitted NDA status must be In Review.

### Template Validation

- Template name, type, jurisdiction, version, status, and body are required.
- Placeholder keys must match placeholders detected in body.
- Admin role is required for template creation.

### Placeholder Validation

- Every placeholder detected in selected template must produce a mapping record.
- Required placeholders must have non-empty mapped values.
- Final document generation and downloads must be blocked when required placeholder values are missing.

### Risk Validation

- Risk answers must map to known risk question IDs.
- Risk score must be calculated from selected risk questions.
- Risk level must be Low, Medium, or High.
- PII and competitor risk explanations must use the required product copy.

### Status Transition Validation

- Draft -> In Review requires submit.
- In Review -> Approved requires Legal Reviewer or Admin.
- In Review -> Archived through Reject requires Legal Reviewer or Admin.
- Approved -> Awaiting Signature requires Legal Reviewer or Admin.
- Awaiting Signature -> Signed requires stored signed documents.
- Delete requires Admin.

### E-Signature Validation

- Signing token must map to one NDA.
- Token must be Active before signing.
- Counterparty email must match token metadata.
- Signed PDF and signed DOCX records must be created before NDA status changes to Signed.

### Export Validation

- Export must include visible rows only.
- Export must include visible table columns only.
- Export must create AuditEntry with event type Export completed.

## Data Persistence Approach

### Initialization

1. On app load, check `clm.v1.seedVersion`.
2. If missing or outdated, write seed datasets to localStorage.
3. If present and current, hydrate application state from localStorage.
4. Keep a reset seed action available for demos and QA.

### State Updates

- Read from localStorage into React state on initial load.
- Update React state first for immediate UI feedback.
- Persist updated collection back to localStorage after each successful action.
- For multi-collection actions, update all affected collections in one application-level transaction function.

Examples of multi-collection actions:

- Submit NDA: write `ndaRecords`, `auditTrail`, and possibly `aiSearchIndex`.
- Select template: update draft or NDA, write audit trail, refresh placeholder mappings.
- Run risk review: write `riskReviews`, update NDA risk fields, write audit trail, refresh AI Search index.
- Generate document: validate placeholders, write `documents`, update NDA document IDs, write audit trail.
- Send to sign: write `eSignatureTokens`, update NDA status/signatureStatus, write audit trail.
- Sign NDA: write signed documents, update NDA status to Signed, mark token Used, write audit trail, refresh dashboard and AI Search index.

### Derived Data

Calculate these values from source collections rather than storing duplicate copies:

- Dashboard status counts from `ndaRecords`.
- Recent activity from `recentActivityAt` on NDA records and audit entries.
- Awaiting signature records from status `Awaiting Signature`.
- Recently signed documents from `signedDocuments` and NDA status `Signed`.
- Expiring NDAs from `expiryDate` within 30 days.
- Repository rows from NDA records joined to templates, users, parties, and documents.

### AI Search Index Refresh

Refresh index items when:

- NDA is submitted or edited.
- Risk review is completed.
- Document is generated.
- NDA is sent for signature.
- NDA is signed.
- Party data changes.
- Template metadata changes.

For exact answers, query parser should check direct fields first:

- expiry, expiration, end date -> `expiryDate`
- status, stage -> `status`
- party, counterparty -> `counterpartyName`, `partyId`
- sign, signature -> `signatureStatus`
- renew, renewal -> `renewalDetails`
- purpose, business purpose -> `businessPurpose`
- risk -> `riskLevel`, `riskFlagIds`
- template -> `templateId`
- email -> `counterpartyEmail`
- address -> `counterpartyAddress`

### LocalStorage Size Guidance

- Store large generated binary documents sparingly in localStorage.
- Prefer generated text/HTML content for demo preview and regenerate simple PDF/DOCX blobs where acceptable.
- For signed records, store a stable signed document payload or metadata that can reproduce the signed file consistently.
- Keep document metadata in `clm.v1.documents` and content in `clm.document.{documentId}` if needed.

### Seed Reset Strategy

Use a seed version such as:

```ts
export const CLM_SEED_VERSION = "2026-06-25.v1";
```

When reset is triggered:

1. Remove all `clm.v1.*` keys.
2. Reinsert seed datasets.
3. Rebuild AI Search index.
4. Set default settings:

```json
{
  "themeMode": "dark",
  "selectedRoleId": "role-admin",
  "selectedUserId": "usr-003",
  "seedVersion": "2026-06-25.v1"
}
```

## Implementation Notes

- Keep enums centralized to prevent invalid statuses or role names.
- Use stable IDs rather than array indexes.
- Avoid storing derived dashboard metrics as the source of truth.
- Use helper functions for permission checks, status transitions, placeholder validation, risk scoring, document generation, audit creation, and AI Search indexing.
- Use ISO timestamps internally and format dates only for display.
- Ensure every table export uses the currently visible filtered rows.
- Ensure repository records are visible to all internal roles while restricted actions remain permission protected.

