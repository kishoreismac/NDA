# CLM Frontend Service Contracts

## Purpose

This document defines frontend service contracts for the CLM demo application. These are not live backend APIs. They describe how React or Next.js modules should interact with local application data, localStorage, reusable utilities, validation rules, and state refresh behavior.

Each service should return predictable results, enforce permissions for mutations, update localStorage where needed, and create audit trail entries for material lifecycle events.

## Shared Contract Patterns

### Service Result

```ts
export type ServiceResult<T> = {
  ok: boolean;
  data?: T;
  error?: ServiceError;
};

export type ServiceError = {
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
};
```

### Current Actor

```ts
export type CurrentActor = {
  userId: string;
  roleId: string;
};
```

### Standard Error Messages

| Code | Message |
| --- | --- |
| `PERMISSION_DENIED` | You do not have permission to perform this activity. |
| `NOT_FOUND` | The requested record could not be found. |
| `VALIDATION_ERROR` | Please correct the highlighted fields. |
| `MISSING_PLACEHOLDERS` | Required placeholder values are missing. Complete mapping before generating the final NDA. |
| `INVALID_STATUS_TRANSITION` | This action is not available for the current status. |
| `TOKEN_INVALID` | This signing link is invalid or unavailable. |

## Auth / Role Selection Service

### Purpose

Manages the demo selected user, selected role, permission checks, and route/action access. This is a frontend simulation of authentication and authorization.

### Function Names

```ts
getCurrentActor(): ServiceResult<CurrentActor>
setSelectedUser(userId: string): ServiceResult<CurrentActor>
setSelectedRole(roleId: string): ServiceResult<CurrentActor>
canAccessRoute(routeKey: string, actor: CurrentActor): boolean
canPerform(permissionKey: string, actor: CurrentActor): boolean
requirePermission(permissionKey: string, actor: CurrentActor): ServiceResult<true>
```

### Input Shape

```ts
type SetSelectedRoleInput = {
  roleId: string;
};
```

### Output Shape

```ts
type AuthState = {
  selectedUserId: string;
  selectedRoleId: string;
  userDisplayName: string;
  roleName: string;
};
```

### Validation Rules

- Selected user must exist.
- Selected role must exist.
- Role selection must update `appSettings`.

### Error Cases

- `NOT_FOUND` when user or role does not exist.
- `PERMISSION_DENIED` when route/action is unavailable.

### Example Usage

```ts
const permission = authService.requirePermission("nda.approve", actor);
if (!permission.ok) showToast("error", permission.error.message);
```

### LocalStorage Behavior

- Reads `clm.v1.users`, `clm.v1.roles`, `clm.v1.permissions`, `clm.v1.appSettings`.
- Writes selected user and role to `clm.v1.appSettings`.

### Future Backend Replacement Notes

Replace role selector with authenticated session, JWT/session claims, and server-authorized permissions.

## User Service

### Purpose

Manages internal CLM users for Admin settings and user lookup.

### Function Names

```ts
listUsers(): ServiceResult<User[]>
getUserById(userId: string): ServiceResult<User>
createUser(input: CreateUserInput, actor: CurrentActor): ServiceResult<User>
updateUser(userId: string, input: UpdateUserInput, actor: CurrentActor): ServiceResult<User>
deactivateUser(userId: string, actor: CurrentActor): ServiceResult<User>
```

### Input Shape

```ts
type CreateUserInput = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  department?: string;
};
```

### Output Shape

```ts
type UserListItem = {
  id: string;
  displayName: string;
  email: string;
  roleId: string;
  department?: string;
  status: "Active" | "Inactive";
};
```

### Validation Rules

- Admin role required for create, update, and deactivate.
- First Name, Last Name, Email, and Role are required.
- Email must be unique.
- Role ID must exist.

### Error Cases

- `PERMISSION_DENIED` for non-admin mutation.
- `VALIDATION_ERROR` for missing or duplicate fields.
- `NOT_FOUND` for missing user.

### Example Usage

```ts
const result = userService.createUser(formValues, actor);
if (result.ok) refreshUsers();
```

### LocalStorage Behavior

- Reads and writes `clm.v1.users`.
- Reads `clm.v1.roles`.
- Writes audit trail entry for user creation or deactivation if desired.

### Future Backend Replacement Notes

Replace with `/users` API endpoints and server-side uniqueness validation.

## Contract Service

### Purpose

Provides record type catalog and cross-contract dashboard helpers. NDA-specific operations remain in NDA services.

### Function Names

```ts
listRecordTypes(): ServiceResult<ContractRecordType[]>
getRecordTypeById(recordTypeId: string): ServiceResult<ContractRecordType>
getDashboardRecordTypeSummary(): ServiceResult<RecordTypeSummary[]>
```

### Input Shape

```ts
type RecordTypeSummary = {
  recordTypeId: string;
  name: string;
  count: number;
  enabled: boolean;
  supportsWorkflow: boolean;
};
```

### Output Shape

Returns record type catalog or dashboard summary view models.

### Validation Rules

- Record type ID must exist for lookup.

### Error Cases

- `NOT_FOUND` for unknown record type.

### Example Usage

```ts
const summary = contractService.getDashboardRecordTypeSummary();
```

### LocalStorage Behavior

- Reads `clm.v1.contractRecordTypes`.
- Reads `clm.v1.ndaRecords` to count NDA records.

### Future Backend Replacement Notes

Replace with contract metadata API and reporting service.

## NDA Request Service

### Purpose

Owns full-page NDA intake workflow operations, draft saving, validation, submit, edit, renew, and status-safe updates.

### Function Names

```ts
createDraft(input: Partial<NdaRecord>, actor: CurrentActor): ServiceResult<NdaDraft>
saveDraft(draftId: string, input: Partial<NdaRecord>, actor: CurrentActor): ServiceResult<NdaDraft>
getDraft(draftId: string): ServiceResult<NdaDraft>
submitRequest(input: SubmitNdaInput, actor: CurrentActor): ServiceResult<NdaRecord>
updateNda(ndaId: string, input: UpdateNdaInput, actor: CurrentActor): ServiceResult<NdaRecord>
renewNda(ndaId: string, input: RenewNdaInput, actor: CurrentActor): ServiceResult<NdaRecord>
calculateAgreementPeriod(input: AgreementPeriodInput): ServiceResult<AgreementPeriodResult>
```

### Input Shape

```ts
type SubmitNdaInput = {
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
  templateId: string;
  riskAnswers: Record<string, boolean>;
};
```

### Output Shape

```ts
type AgreementPeriodResult = {
  effectiveDate?: string;
  expiryDate?: string;
  ndaDuration?: string;
};
```

### Validation Rules

- Business User and Admin can submit new NDA requests.
- Legal Reviewer and Admin can update existing NDA details.
- Executive Viewer cannot create or edit.
- Required fields must be complete before submit.
- Email must be valid.
- Effective Date must be on or before Expiry Date.
- Submit always creates status `In Review`.

### Error Cases

- `PERMISSION_DENIED` for unauthorized create/edit.
- `VALIDATION_ERROR` for missing fields or invalid dates.
- `NOT_FOUND` for missing draft or NDA.

### Example Usage

```ts
const result = ndaRequestService.submitRequest(formData, actor);
if (result.ok) navigate(`/repository/${result.data.id}`);
```

### LocalStorage Behavior

- Reads and writes `clm.v1.ndaDrafts`.
- Reads and writes `clm.v1.ndaRecords`.
- Writes `clm.v1.auditTrail`.
- Refreshes `clm.v1.aiSearchIndex`.

### Future Backend Replacement Notes

Replace with workflow API for drafts, submissions, edits, and renewals.

## Template Service

### Purpose

Manages template library, admin template creation, template selection, and preview metadata.

### Function Names

```ts
listTemplates(): ServiceResult<Template[]>
getTemplateById(templateId: string): ServiceResult<Template>
createTemplate(input: CreateTemplateInput, actor: CurrentActor): ServiceResult<Template>
updateTemplate(templateId: string, input: UpdateTemplateInput, actor: CurrentActor): ServiceResult<Template>
selectTemplateForNda(ndaId: string, templateId: string, actor: CurrentActor): ServiceResult<NdaRecord>
previewTemplate(templateId: string, ndaId?: string, actor?: CurrentActor): ServiceResult<TemplatePreview>
```

### Input Shape

```ts
type CreateTemplateInput = {
  name: string;
  type: Template["type"];
  jurisdiction: string;
  version: string;
  status: "Active" | "Draft" | "Archived";
  body: string;
};
```

### Output Shape

```ts
type TemplatePreview = {
  template: Template;
  detectedPlaceholderKeys: string[];
  highlightedBody: string;
};
```

### Validation Rules

- Admin required for create and update.
- Legal Reviewer and Admin can view templates.
- Template name, type, jurisdiction, version, status, and body are required.
- Placeholder keys must be detected from body.

### Error Cases

- `PERMISSION_DENIED` for non-admin creation.
- `VALIDATION_ERROR` for missing template fields.
- `NOT_FOUND` for missing template.

### Example Usage

```ts
const preview = templateService.previewTemplate("tpl-standard-nda", ndaId, actor);
```

### LocalStorage Behavior

- Reads and writes `clm.v1.templates`.
- Reads `clm.v1.templatePlaceholders`.
- Writes audit entries for template previewed, selected, created, or updated.

### Future Backend Replacement Notes

Replace with template management API and file storage for DOCX template assets.

## Placeholder Service

### Purpose

Detects placeholders, maps template tokens to NDA fields, validates missing values, and performs replacement on generated document content.

### Function Names

```ts
detectPlaceholders(templateBody: string): ServiceResult<string[]>
buildPlaceholderMapping(templateId: string, ndaId: string): ServiceResult<PlaceholderMapping[]>
validatePlaceholderMapping(templateId: string, ndaId: string): ServiceResult<PlaceholderValidationResult>
replacePlaceholders(templateBody: string, mappings: PlaceholderMapping[]): ServiceResult<string>
```

### Input Shape

```ts
type PlaceholderMappingInput = {
  templateId: string;
  ndaId: string;
};
```

### Output Shape

```ts
type PlaceholderValidationResult = {
  ndaId: string;
  templateId: string;
  totalPlaceholders: number;
  mappedCount: number;
  missingRequiredKeys: string[];
  validForGeneration: boolean;
};
```

### Validation Rules

- Placeholder token format is `{{PlaceholderName}}`.
- Every detected placeholder must be represented in mapping output.
- Required placeholders must have non-empty values.

### Error Cases

- `NOT_FOUND` for missing template or NDA.
- `MISSING_PLACEHOLDERS` when required values are absent.

### Example Usage

```ts
const validation = placeholderService.validatePlaceholderMapping(templateId, ndaId);
if (!validation.data.validForGeneration) showMissingPlaceholders(validation.data);
```

### LocalStorage Behavior

- Reads `clm.v1.templates`, `clm.v1.templatePlaceholders`, `clm.v1.ndaRecords`.
- Writes audit entry for placeholder values validated.

### Future Backend Replacement Notes

Move placeholder validation and replacement to document automation backend while keeping preview mapping available in frontend.

## Risk Review Service

### Purpose

Calculates risk score, level, flags, explanations, recommendations, and approval workflow recommendations.

### Function Names

```ts
listRiskQuestions(): ServiceResult<RiskQuestion[]>
calculateRisk(input: RiskCalculationInput): ServiceResult<RiskReviewDraft>
completeRiskReview(ndaId: string, answers: Record<string, boolean>, actor: CurrentActor): ServiceResult<RiskReview>
getRiskReviewByNdaId(ndaId: string): ServiceResult<RiskReview>
```

### Input Shape

```ts
type RiskCalculationInput = {
  answers: Record<string, boolean>;
  templateId?: string;
  jurisdiction?: string;
};
```

### Output Shape

```ts
type RiskReviewDraft = {
  score: number;
  level: "Low" | "Medium" | "High";
  flagIds: string[];
  explanations: string[];
  recommendedTemplateId?: string;
  recommendedWorkflowId?: string;
  clauseRecommendations: string[];
};
```

### Validation Rules

- Answers must map to known risk question IDs.
- Risk level must be Low, Medium, or High.
- PII explanation must use required product copy.
- Competitor risk explanation must use required product copy.

### Error Cases

- `VALIDATION_ERROR` for unknown question IDs.
- `NOT_FOUND` for missing NDA when completing review.

### Example Usage

```ts
const risk = riskReviewService.completeRiskReview(ndaId, answers, actor);
```

### LocalStorage Behavior

- Reads `clm.v1.riskQuestions`, `clm.v1.riskFlags`, `clm.v1.routingRules`, `clm.v1.approvalWorkflows`.
- Writes `clm.v1.riskReviews`.
- Updates risk fields on `clm.v1.ndaRecords`.
- Writes audit trail and refreshes AI Search index.

### Future Backend Replacement Notes

Move scoring rules to backend policy service and optionally add AI-assisted analysis.

## Document Generation Service

### Purpose

Generates preview, DOCX, and PDF document outputs from selected templates and placeholder mappings.

### Function Names

```ts
previewFinalDocument(ndaId: string): ServiceResult<DocumentPreview>
generateDocx(input: DocumentGenerationRequest, actor: CurrentActor): ServiceResult<DocumentRecord>
generatePdf(input: DocumentGenerationRequest, actor: CurrentActor): ServiceResult<DocumentRecord>
downloadDocument(documentId: string, actor: CurrentActor): ServiceResult<DownloadPayload>
getDocumentsForNda(ndaId: string): ServiceResult<DocumentRecord[]>
```

### Input Shape

```ts
type DocumentGenerationRequest = {
  ndaId: string;
  templateId: string;
  outputFormat: "docx" | "pdf";
};
```

### Output Shape

```ts
type DownloadPayload = {
  fileName: string;
  mimeType: string;
  blob?: Blob;
  textContent?: string;
  storageKey: string;
};
```

### Validation Rules

- NDA and template must exist.
- Required placeholders must be complete.
- Signed records must download stored signed documents where applicable.
- DOCX/PDF audit event must be created when downloaded.

### Error Cases

- `MISSING_PLACEHOLDERS` for incomplete required mappings.
- `NOT_FOUND` for missing document.
- `VALIDATION_ERROR` for unsupported format.

### Example Usage

```ts
const doc = documentGenerationService.generatePdf({ ndaId, templateId, outputFormat: "pdf" }, actor);
```

### LocalStorage Behavior

- Reads NDA, template, placeholder, document, and signed document collections.
- Writes `clm.v1.documents`.
- Stores file content under document-specific keys if needed.
- Writes audit trail entries.

### Future Backend Replacement Notes

Replace with server-side document generation and secure object storage URLs.

## E-Signature Service

### Purpose

Creates signing tokens, resolves signing pages, captures signature, stores signed documents, and updates NDA status.

### Function Names

```ts
createSigningToken(ndaId: string, actor: CurrentActor): ServiceResult<ESignatureToken>
sendToSign(ndaId: string, actor: CurrentActor): ServiceResult<SendToSignResult>
resolveSigningToken(token: string): ServiceResult<SigningSession>
signAndReturn(input: SignAndReturnInput): ServiceResult<SignedDocument>
getSignedDocumentsForNda(ndaId: string): ServiceResult<SignedDocument[]>
```

### Input Shape

```ts
type SignAndReturnInput = {
  token: string;
  signerName: string;
  signerEmail: string;
  signatureType: "Drawn" | "Typed" | "Clickwrap";
  signatureData: string;
};
```

### Output Shape

```ts
type SendToSignResult = {
  nda: NdaRecord;
  token: ESignatureToken;
  signingUrl: string;
  emailTo: string;
};
```

### Validation Rules

- Send to Sign requires Legal Reviewer or Admin.
- NDA status must be Approved before Send to Sign.
- Token must be Active to sign.
- Token must map to one NDA.
- Signed PDF and signed DOCX must be stored before status becomes Signed.

### Error Cases

- `PERMISSION_DENIED` for unauthorized send.
- `INVALID_STATUS_TRANSITION` when NDA is not Approved.
- `TOKEN_INVALID` for missing, used, revoked, or expired token.
- `VALIDATION_ERROR` for missing signature data.

### Example Usage

```ts
const result = eSignatureService.sendToSign(ndaId, actor);
if (result.ok) showSigningLink(result.data.signingUrl);
```

### LocalStorage Behavior

- Reads and writes `clm.v1.eSignatureTokens`.
- Updates `clm.v1.ndaRecords`.
- Writes `clm.v1.documents` and `clm.v1.signedDocuments`.
- Writes audit trail and refreshes AI Search index.

### Future Backend Replacement Notes

Replace with secure token API, email service, external e-signature provider, and server-side signed document storage.

## Repository Service

### Purpose

Provides repository list, detail view models, filters, document access, row actions, edit launch data, renew launch data, and admin-only delete.

### Function Names

```ts
listRepositoryRecords(filters?: RepositoryFilters): ServiceResult<RepositoryRecord[]>
getRepositoryRecord(ndaId: string): ServiceResult<RepositoryDetail>
getDocumentAccessModel(ndaId: string, actor: CurrentActor): ServiceResult<DocumentAccessModel>
addTag(ndaId: string, tag: string, actor: CurrentActor): ServiceResult<NdaRecord>
deleteDocument(ndaId: string, actor: CurrentActor): ServiceResult<NdaRecord>
```

### Input Shape

```ts
type RepositoryFilters = {
  status?: NdaStatus;
  riskLevel?: RiskLevel;
  searchText?: string;
  expiringWithinDays?: number;
};
```

### Output Shape

```ts
type RepositoryDetail = {
  record: RepositoryRecord;
  nda: NdaRecord;
  documents: DocumentRecord[];
  signedDocuments: SignedDocument[];
  auditTrail: AuditEntry[];
};
```

### Validation Rules

- Repository records are visible to all internal roles.
- Delete requires Admin.
- View must show final document section.
- Signed records must prioritize signed documents.

### Error Cases

- `NOT_FOUND` for missing NDA.
- `PERMISSION_DENIED` for non-admin delete.

### Example Usage

```ts
const records = repositoryService.listRepositoryRecords({ status: "Signed" });
```

### LocalStorage Behavior

- Reads NDA, users, templates, parties, documents, signed documents, audit trail.
- Writes NDA records for tags or delete/archive behavior.
- Writes audit trail for deleted or archived actions.

### Future Backend Replacement Notes

Replace with repository search/list/detail API and file access endpoints.

## Audit Trail Service

### Purpose

Creates and retrieves append-only audit events for all major lifecycle activity.

### Function Names

```ts
addAuditEntry(input: AddAuditEntryInput): ServiceResult<AuditEntry>
listAuditEntries(filters?: AuditFilters): ServiceResult<AuditEntry[]>
listAuditForEntity(entityType: string, entityId: string): ServiceResult<AuditEntry[]>
```

### Input Shape

```ts
type AddAuditEntryInput = {
  entityType: AuditEntry["entityType"];
  entityId: string;
  eventType: AuditEventType;
  actorUserId: string;
  actorRoleId: string;
  message: string;
  metadata?: Record<string, unknown>;
};
```

### Output Shape

Returns created audit entry or filtered audit entries.

### Validation Rules

- Event type must be known.
- Entity type and entity ID are required.
- Actor user and role are required.

### Error Cases

- `VALIDATION_ERROR` for missing event data.

### Example Usage

```ts
auditTrailService.addAuditEntry({
  entityType: "NDA",
  entityId: ndaId,
  eventType: "Request submitted",
  actorUserId: actor.userId,
  actorRoleId: actor.roleId,
  message: "NDA request submitted."
});
```

### LocalStorage Behavior

- Appends to `clm.v1.auditTrail`.

### Future Backend Replacement Notes

Replace with immutable server-side audit log service.

## Export Service

### Purpose

Exports visible table data to CSV and records export audit events.

### Function Names

```ts
exportCsv(input: ExportCsvInput, actor: CurrentActor): ServiceResult<ExportJob>
serializeCsv(rows: unknown[], columns: ExportColumn[]): ServiceResult<string>
```

### Input Shape

```ts
type ExportCsvInput = {
  tableName: string;
  fileName?: string;
  rows: Record<string, unknown>[];
  columns: ExportColumn[];
};

type ExportColumn = {
  key: string;
  label: string;
};
```

### Output Shape

```ts
type ExportJob = {
  id: string;
  tableName: string;
  fileName: string;
  rowCount: number;
  columnKeys: string[];
  exportedByUserId: string;
  exportedAt: string;
};
```

### Validation Rules

- Export rows must be currently visible rows.
- Export columns must be currently visible table columns.
- Table name is required.

### Error Cases

- `VALIDATION_ERROR` for missing table name or columns.

### Example Usage

```ts
exportService.exportCsv({ tableName: "Repository", rows: visibleRows, columns }, actor);
```

### LocalStorage Behavior

- Writes optional `clm.v1.exports`.
- Writes audit event Export completed.

### Future Backend Replacement Notes

Replace with backend export job for large datasets while preserving client-side CSV for small views if desired.

## AI Search Service

### Purpose

Answers natural language questions from application data and repository records using local deterministic query parsing.

### Function Names

```ts
buildSearchIndex(): ServiceResult<AiSearchIndexItem[]>
answerQuestion(input: AiSearchInput, actor: CurrentActor): ServiceResult<AiSearchAnswer>
parseQuery(query: string): ServiceResult<ParsedAiQuery>
searchRepository(query: string, selectedNdaId?: string): ServiceResult<AiSearchMatch[]>
```

### Input Shape

```ts
type AiSearchInput = {
  query: string;
  selectedNdaId?: string;
};
```

### Output Shape

```ts
type ParsedAiQuery = {
  intent: "fieldLookup" | "summary" | "risk" | "documentSearch" | "unknown";
  fieldKey?: string;
  normalizedQuery: string;
};
```

### Validation Rules

- Query is required.
- If selected NDA is provided, it must exist.
- Exact field answers must be returned when field data exists.

### Error Cases

- `VALIDATION_ERROR` for empty query.
- `NOT_FOUND` for unknown selected NDA.
- Missing selected-record data returns answer text: "I could not find that information in the selected NDA record".

### Example Usage

```ts
const answer = aiSearchService.answerQuestion({
  query: "What is the expiry date?",
  selectedNdaId: ndaId
}, actor);
```

### LocalStorage Behavior

- Reads repository data, NDA records, parties, templates, risk reviews, documents, audit entries.
- Reads and writes `clm.v1.aiSearchIndex`.

### Future Backend Replacement Notes

Replace local parser with backend retrieval, vector index, field-aware search, and model-based response generation.

## Settings Service

### Purpose

Manages theme setting, selected role/user preference, and seed reset support.

### Function Names

```ts
getSettings(): ServiceResult<AppSettings>
updateTheme(themeMode: ThemeMode): ServiceResult<AppSettings>
updateSelectedActor(input: UpdateSelectedActorInput): ServiceResult<AppSettings>
resetSeedData(actor: CurrentActor): ServiceResult<AppSettings>
```

### Input Shape

```ts
type UpdateSelectedActorInput = {
  selectedUserId?: string;
  selectedRoleId?: string;
};
```

### Output Shape

Returns updated `AppSettings`.

### Validation Rules

- Theme must be `dark` or `white`.
- Selected user and role must exist.
- Seed reset may require Admin if exposed in UI.

### Error Cases

- `VALIDATION_ERROR` for invalid theme or actor.
- `PERMISSION_DENIED` for non-admin seed reset if restricted.

### Example Usage

```ts
settingsService.updateTheme("white");
```

### LocalStorage Behavior

- Reads and writes `clm.v1.appSettings`.
- Seed reset rewrites all `clm.v1.*` seed collections.

### Future Backend Replacement Notes

Move persistent user preferences to user profile API.

## Parties Service

### Purpose

Manages counterparties for Admin-only Parties page and intake prefill.

### Function Names

```ts
listParties(filters?: PartyFilters): ServiceResult<Party[]>
getPartyById(partyId: string): ServiceResult<Party>
createParty(input: CreatePartyInput, actor: CurrentActor): ServiceResult<Party>
updateParty(partyId: string, input: UpdatePartyInput, actor: CurrentActor): ServiceResult<Party>
searchParties(query: string): ServiceResult<Party[]>
```

### Input Shape

```ts
type CreatePartyInput = {
  legalName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  address: string;
  country: string;
  industry?: string;
  riskTier?: "Low" | "Medium" | "High";
};
```

### Output Shape

Returns party record or party list.

### Validation Rules

- Parties page management is Admin only.
- Legal name, contact name, email, address, and country are required.
- Email must be valid.

### Error Cases

- `PERMISSION_DENIED` for non-admin create/update.
- `VALIDATION_ERROR` for missing fields.
- `NOT_FOUND` for missing party.

### Example Usage

```ts
const parties = partiesService.searchParties("Northstar");
```

### LocalStorage Behavior

- Reads and writes `clm.v1.parties`.
- Writes audit events for party changes if needed.
- Refreshes AI Search index when party data changes.

### Future Backend Replacement Notes

Replace with counterparty master data API.

## Rules Service

### Purpose

Manages Admin-only routing and review rules and evaluates matching rules during NDA intake and risk review.

### Function Names

```ts
listRules(): ServiceResult<RoutingRule[]>
createRule(input: CreateRuleInput, actor: CurrentActor): ServiceResult<RoutingRule>
updateRule(ruleId: string, input: UpdateRuleInput, actor: CurrentActor): ServiceResult<RoutingRule>
deleteRule(ruleId: string, actor: CurrentActor): ServiceResult<RoutingRule>
evaluateRules(input: RuleEvaluationInput): ServiceResult<RoutingRule[]>
```

### Input Shape

```ts
type RuleEvaluationInput = {
  riskLevel?: RiskLevel;
  riskFlagIds?: string[];
  templateId?: string;
  jurisdiction?: string;
};
```

### Output Shape

Returns matching active routing rules ordered by priority.

### Validation Rules

- Rules management is Admin only.
- Rule name, condition type, condition value, action, and priority are required.
- Only active rules participate in evaluation.

### Error Cases

- `PERMISSION_DENIED` for non-admin mutation.
- `VALIDATION_ERROR` for malformed rule.
- `NOT_FOUND` for missing rule.

### Example Usage

```ts
const matches = rulesService.evaluateRules({
  riskLevel: "High",
  riskFlagIds: ["risk-pii"]
});
```

### LocalStorage Behavior

- Reads and writes `clm.v1.routingRules`.
- Writes audit entries for rule changes.

### Future Backend Replacement Notes

Replace with rules engine or workflow configuration API.

