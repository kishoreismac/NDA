# CLM Seed Data Catalog

## Purpose

This seed catalog defines consistent mock data for the CLM demo application. The application uses local state and localStorage for demo persistence, so seed records should be deterministic, easy to reset, and broad enough to support dashboard counts, NDA workflows, repository views, template mapping, risk review, legal approval, e-signature, audit trail, AI Search, exports, parties, rules, users, roles, and theme settings.

Seed data should be treated as product demo data, not production legal content.

## Seed Data Principles

- Use stable IDs so related records can be linked reliably.
- Use realistic enterprise names and dates.
- Cover every NDA status: In Review, Approved, Awaiting Signature, Signed, Archived.
- Include enough variation to test risk, template selection, signature state, expiry dates, exports, and AI Search answers.
- Keep record type data broader than NDA while implementing detailed lifecycle data for NDA records.
- Store signed documents as metadata and generated content references for demo use.
- Keep localStorage payloads normalized enough for easy updates but simple enough for frontend-only state.

## Users

### Dataset Name

`users`

### Purpose

Provides demo users for role switching, ownership, approval actions, audit entries, and user management.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable user ID. |
| title | string | Professional title such as Ms., Mr., Dr. |
| firstName | string | User first name. |
| lastName | string | User last name. |
| displayName | string | Full display name. |
| email | string | Unique email address. |
| roleId | string | Linked role ID. |
| department | string | Business function or department. |
| status | string | Active or Inactive. |
| createdAt | string | ISO timestamp. |
| lastLoginAt | string | ISO timestamp or empty. |

### Example Records

```json
[
  {
    "id": "usr-001",
    "title": "Ms.",
    "firstName": "Avery",
    "lastName": "Bennett",
    "displayName": "Avery Bennett",
    "email": "avery.bennett@clm-demo.com",
    "roleId": "role-business-user",
    "department": "Sales",
    "status": "Active",
    "createdAt": "2026-05-01T09:00:00.000Z",
    "lastLoginAt": "2026-06-24T14:20:00.000Z"
  },
  {
    "id": "usr-002",
    "title": "Mr.",
    "firstName": "Jordan",
    "lastName": "Reed",
    "displayName": "Jordan Reed",
    "email": "jordan.reed@clm-demo.com",
    "roleId": "role-legal-reviewer",
    "department": "Legal",
    "status": "Active",
    "createdAt": "2026-05-01T09:10:00.000Z",
    "lastLoginAt": "2026-06-25T08:45:00.000Z"
  },
  {
    "id": "usr-003",
    "title": "Ms.",
    "firstName": "Maya",
    "lastName": "Chen",
    "displayName": "Maya Chen",
    "email": "maya.chen@clm-demo.com",
    "roleId": "role-admin",
    "department": "Legal Operations",
    "status": "Active",
    "createdAt": "2026-05-01T09:20:00.000Z",
    "lastLoginAt": "2026-06-25T09:30:00.000Z"
  },
  {
    "id": "usr-004",
    "title": "Mr.",
    "firstName": "Elliot",
    "lastName": "Morgan",
    "displayName": "Elliot Morgan",
    "email": "elliot.morgan@clm-demo.com",
    "roleId": "role-executive-viewer",
    "department": "Executive Office",
    "status": "Active",
    "createdAt": "2026-05-01T09:30:00.000Z",
    "lastLoginAt": "2026-06-23T18:15:00.000Z"
  }
]
```

### Notes for Developers

- Use `usr-003` as default Admin for setup and seeded configuration changes.
- Use `usr-001` as default Business User for intake examples.
- Use `usr-002` as default Legal Reviewer for approval flow examples.
- Keep emails unique for user management validation.

## Roles

### Dataset Name

`roles`

### Purpose

Defines application roles and labels used in the role selector and permission checks.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable role ID. |
| name | string | Role enum value. |
| label | string | UI label. |
| description | string | Role description. |
| isExternal | boolean | True for external signer roles if represented. |

### Example Records

```json
[
  {
    "id": "role-business-user",
    "name": "Business User",
    "label": "Business User",
    "description": "Can submit NDA requests, generate drafts, and run risk reviews.",
    "isExternal": false
  },
  {
    "id": "role-legal-reviewer",
    "name": "Legal Reviewer",
    "label": "Legal Reviewer",
    "description": "Can review, edit, approve, reject, preview, and send NDAs to sign.",
    "isExternal": false
  },
  {
    "id": "role-admin",
    "name": "Admin",
    "label": "Admin",
    "description": "Can perform all actions and manage application settings.",
    "isExternal": false
  },
  {
    "id": "role-executive-viewer",
    "name": "Executive Viewer",
    "label": "Executive Viewer",
    "description": "Has view-only access across the application.",
    "isExternal": false
  },
  {
    "id": "role-counterparty-signer",
    "name": "Counterparty Signer",
    "label": "Counterparty Signer",
    "description": "External signer who can review, sign, and download signed documents.",
    "isExternal": true
  }
]
```

### Notes for Developers

- Counterparty Signer does not need to appear in the internal role selector.
- Use role names exactly as product documentation defines them.

## Permissions

### Dataset Name

`permissions`

### Purpose

Defines action-level permissions for navigation, workflow actions, repository actions, settings, and exports.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable permission ID. |
| key | string | Permission key used by code. |
| label | string | Human-readable action name. |
| description | string | Permission description. |
| allowedRoleIds | string[] | Roles allowed to perform the action. |

### Example Records

```json
[
  {
    "id": "perm-view-dashboard",
    "key": "dashboard.view",
    "label": "View Dashboard",
    "description": "View CLM dashboard metrics and activity.",
    "allowedRoleIds": ["role-business-user", "role-legal-reviewer", "role-admin", "role-executive-viewer"]
  },
  {
    "id": "perm-nda-create",
    "key": "nda.create",
    "label": "Create NDA Request",
    "description": "Start and submit a new NDA request.",
    "allowedRoleIds": ["role-business-user", "role-admin"]
  },
  {
    "id": "perm-nda-approve",
    "key": "nda.approve",
    "label": "Approve NDA",
    "description": "Approve an NDA and move it to Approved status.",
    "allowedRoleIds": ["role-legal-reviewer", "role-admin"]
  },
  {
    "id": "perm-nda-send-sign",
    "key": "nda.sendToSign",
    "label": "Send NDA to Sign",
    "description": "Send an approved NDA to the counterparty for e-signature.",
    "allowedRoleIds": ["role-legal-reviewer", "role-admin"]
  },
  {
    "id": "perm-document-delete",
    "key": "document.delete",
    "label": "Delete Document",
    "description": "Delete or archive a document from active repository view.",
    "allowedRoleIds": ["role-admin"]
  }
]
```

### Notes for Developers

- Keep permission keys in a central constant file.
- For unauthorized restricted actions, always display: "You do not have permission to perform this activity."
- Navigation visibility can use the same permission map or a separate route permission map.

## Contract Record Types

### Dataset Name

`contractRecordTypes`

### Purpose

Supports dashboard record type overview and future expansion beyond NDA.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable record type ID. |
| name | string | Record type name. |
| description | string | Short description. |
| enabled | boolean | Whether available in current demo. |
| supportsWorkflow | boolean | Whether full workflow exists in current demo. |
| displayOrder | number | Dashboard ordering. |

### Example Records

```json
[
  { "id": "type-nda", "name": "NDA", "description": "Non-disclosure agreement workflow.", "enabled": true, "supportsWorkflow": true, "displayOrder": 1 },
  { "id": "type-msa", "name": "MSA", "description": "Master services agreement.", "enabled": true, "supportsWorkflow": false, "displayOrder": 2 },
  { "id": "type-sow", "name": "SOW", "description": "Statement of work.", "enabled": true, "supportsWorkflow": false, "displayOrder": 3 },
  { "id": "type-vendor", "name": "Vendor Agreement", "description": "Vendor contracting record type.", "enabled": true, "supportsWorkflow": false, "displayOrder": 4 },
  { "id": "type-customer", "name": "Customer Agreement", "description": "Customer contracting record type.", "enabled": true, "supportsWorkflow": false, "displayOrder": 5 },
  { "id": "type-partner", "name": "Partner Agreement", "description": "Partner contracting record type.", "enabled": true, "supportsWorkflow": false, "displayOrder": 6 },
  { "id": "type-employee-contractor", "name": "Employee / Contractor Agreement", "description": "Employee or contractor agreement.", "enabled": true, "supportsWorkflow": false, "displayOrder": 7 },
  { "id": "type-amendment", "name": "Amendment", "description": "Contract amendment.", "enabled": true, "supportsWorkflow": false, "displayOrder": 8 },
  { "id": "type-renewal", "name": "Renewal", "description": "Contract renewal record.", "enabled": true, "supportsWorkflow": false, "displayOrder": 9 }
]
```

### Notes for Developers

- Only NDA requires complete lifecycle data in the current demo.
- Other record types can be dashboard cards and seeded counts until workflows are added.

## NDA Records

### Dataset Name

`ndaRecords`

### Purpose

Primary repository and workflow records for NDA lifecycle testing.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable NDA ID. |
| contractId | string | Human-readable contract ID. |
| recordTypeId | string | Must reference `type-nda`. |
| title | string | NDA display title. |
| status | string | NDA status enum. |
| ownerUserId | string | Business owner user ID. |
| legalReviewerUserId | string | Assigned legal reviewer user ID. |
| partyId | string | Linked counterparty record. |
| templateId | string | Selected template ID. |
| counterpartyName | string | Counterparty signer or representative. |
| counterpartyEmail | string | Signing email. |
| counterpartyAddress | string | Counterparty address. |
| companyName | string | Internal company name. |
| companyAddress | string | Internal company address. |
| projectName | string | Project name. |
| businessPurpose | string | NDA purpose. |
| jurisdiction | string | Jurisdiction. |
| governingLaw | string | Governing law. |
| effectiveDate | string | Start date in YYYY-MM-DD. |
| expiryDate | string | End date in YYYY-MM-DD. |
| ndaDuration | string | Calculated duration text. |
| riskLevel | string | Low, Medium, or High. |
| riskScore | number | Numeric risk score. |
| riskFlagIds | string[] | Linked risk flags. |
| signatureStatus | string | Not Sent, Sent, Signed. |
| createdAt | string | ISO timestamp. |
| updatedAt | string | ISO timestamp. |
| recentActivityAt | string | ISO timestamp. |

### Example Records

```json
[
  {
    "id": "nda-001",
    "contractId": "NDA-2026-0001",
    "recordTypeId": "type-nda",
    "title": "Standard NDA - Atlas Robotics",
    "status": "In Review",
    "ownerUserId": "usr-001",
    "legalReviewerUserId": "usr-002",
    "partyId": "party-001",
    "templateId": "tpl-standard-nda",
    "counterpartyName": "Morgan Ellis",
    "counterpartyEmail": "morgan.ellis@atlasrobotics.example",
    "counterpartyAddress": "455 Market Street, San Francisco, CA 94105",
    "companyName": "CLM Demo Inc.",
    "companyAddress": "100 Enterprise Avenue, New York, NY 10001",
    "projectName": "Autonomous Warehouse Pilot",
    "businessPurpose": "Evaluate potential commercial partnership for warehouse automation.",
    "jurisdiction": "United States",
    "governingLaw": "New York",
    "effectiveDate": "2026-06-10",
    "expiryDate": "2027-06-10",
    "ndaDuration": "1 year",
    "riskLevel": "Medium",
    "riskScore": 45,
    "riskFlagIds": ["risk-new-ip", "risk-third-party-info"],
    "signatureStatus": "Not Sent",
    "createdAt": "2026-06-10T10:15:00.000Z",
    "updatedAt": "2026-06-20T11:40:00.000Z",
    "recentActivityAt": "2026-06-20T11:40:00.000Z"
  },
  {
    "id": "nda-002",
    "contractId": "NDA-2026-0002",
    "recordTypeId": "type-nda",
    "title": "Mutual NDA - BrightWave Analytics",
    "status": "Approved",
    "ownerUserId": "usr-001",
    "legalReviewerUserId": "usr-002",
    "partyId": "party-002",
    "templateId": "tpl-mutual-nda",
    "counterpartyName": "Priya Shah",
    "counterpartyEmail": "priya.shah@brightwave.example",
    "counterpartyAddress": "200 Congress Avenue, Austin, TX 78701",
    "companyName": "CLM Demo Inc.",
    "companyAddress": "100 Enterprise Avenue, New York, NY 10001",
    "projectName": "Revenue Forecasting Evaluation",
    "businessPurpose": "Exchange confidential analytics information for product evaluation.",
    "jurisdiction": "United States",
    "governingLaw": "Delaware",
    "effectiveDate": "2026-05-01",
    "expiryDate": "2028-05-01",
    "ndaDuration": "2 years",
    "riskLevel": "Low",
    "riskScore": 20,
    "riskFlagIds": [],
    "signatureStatus": "Not Sent",
    "createdAt": "2026-05-01T13:30:00.000Z",
    "updatedAt": "2026-06-18T16:10:00.000Z",
    "recentActivityAt": "2026-06-18T16:10:00.000Z"
  },
  {
    "id": "nda-003",
    "contractId": "NDA-2026-0003",
    "recordTypeId": "type-nda",
    "title": "International NDA - Northstar BioHealth",
    "status": "Awaiting Signature",
    "ownerUserId": "usr-001",
    "legalReviewerUserId": "usr-002",
    "partyId": "party-003",
    "templateId": "tpl-international-nda",
    "counterpartyName": "Daniel Harper",
    "counterpartyEmail": "daniel.harper@northstarbio.example",
    "counterpartyAddress": "80 King Street, London EC2V 8BG, United Kingdom",
    "companyName": "CLM Demo Inc.",
    "companyAddress": "100 Enterprise Avenue, New York, NY 10001",
    "projectName": "Clinical Data Collaboration",
    "businessPurpose": "Review confidential research and data sharing options.",
    "jurisdiction": "United Kingdom",
    "governingLaw": "England and Wales",
    "effectiveDate": "2026-04-15",
    "expiryDate": "2027-07-27",
    "ndaDuration": "1 year 3 months 12 days",
    "riskLevel": "High",
    "riskScore": 85,
    "riskFlagIds": ["risk-pii", "risk-customer-data", "risk-cross-border", "risk-large-data"],
    "signatureStatus": "Sent",
    "createdAt": "2026-04-15T09:05:00.000Z",
    "updatedAt": "2026-06-21T12:25:00.000Z",
    "recentActivityAt": "2026-06-21T12:25:00.000Z"
  },
  {
    "id": "nda-004",
    "contractId": "NDA-2026-0004",
    "recordTypeId": "type-nda",
    "title": "Vendor NDA - Redwood Cloud Services",
    "status": "Signed",
    "ownerUserId": "usr-001",
    "legalReviewerUserId": "usr-002",
    "partyId": "party-004",
    "templateId": "tpl-vendor-nda",
    "counterpartyName": "Sofia Martinez",
    "counterpartyEmail": "sofia.martinez@redwoodcloud.example",
    "counterpartyAddress": "600 Pine Street, Seattle, WA 98101",
    "companyName": "CLM Demo Inc.",
    "companyAddress": "100 Enterprise Avenue, New York, NY 10001",
    "projectName": "Cloud Infrastructure Assessment",
    "businessPurpose": "Discuss confidential infrastructure requirements and vendor proposals.",
    "jurisdiction": "United States",
    "governingLaw": "Washington",
    "effectiveDate": "2026-03-01",
    "expiryDate": "2027-03-01",
    "ndaDuration": "1 year",
    "riskLevel": "Medium",
    "riskScore": 50,
    "riskFlagIds": ["risk-pricing-strategy", "risk-third-party-info"],
    "signatureStatus": "Signed",
    "createdAt": "2026-03-01T15:00:00.000Z",
    "updatedAt": "2026-03-04T10:10:00.000Z",
    "recentActivityAt": "2026-03-04T10:10:00.000Z"
  },
  {
    "id": "nda-005",
    "contractId": "NDA-2026-0005",
    "recordTypeId": "type-nda",
    "title": "One-Way NDA - Horizon Retail Group",
    "status": "Archived",
    "ownerUserId": "usr-001",
    "legalReviewerUserId": "usr-002",
    "partyId": "party-005",
    "templateId": "tpl-one-way-nda",
    "counterpartyName": "Nathan Brooks",
    "counterpartyEmail": "nathan.brooks@horizonretail.example",
    "counterpartyAddress": "310 Lake Shore Drive, Chicago, IL 60601",
    "companyName": "CLM Demo Inc.",
    "companyAddress": "100 Enterprise Avenue, New York, NY 10001",
    "projectName": "Legacy Retail Pilot",
    "businessPurpose": "Previously proposed retail data pilot.",
    "jurisdiction": "United States",
    "governingLaw": "Illinois",
    "effectiveDate": "2026-01-10",
    "expiryDate": "2026-12-31",
    "ndaDuration": "11 months 21 days",
    "riskLevel": "High",
    "riskScore": 75,
    "riskFlagIds": ["risk-competitor", "risk-similar-products"],
    "signatureStatus": "Not Sent",
    "createdAt": "2026-01-10T17:00:00.000Z",
    "updatedAt": "2026-02-03T09:15:00.000Z",
    "recentActivityAt": "2026-02-03T09:15:00.000Z"
  }
]
```

### Notes for Developers

- Seed at least one record per allowed NDA status.
- Use `expiryDate` for dashboard expiring indicators and repository expiry column.
- Use `recentActivityAt` for recent activity sorting.
- Do not create a separate Rejected status; use Archived plus audit trail notes.

## Templates

### Dataset Name

`templates`

### Purpose

Defines reusable NDA templates and metadata for template library, intake selection, placeholder detection, preview, and document generation.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable template ID. |
| name | string | Template name. |
| type | string | NDA template type. |
| jurisdiction | string | Template jurisdiction. |
| version | string | Template version. |
| status | string | Active, Draft, Archived. |
| lastUpdatedAt | string | ISO timestamp. |
| createdByUserId | string | User who created template. |
| placeholderKeys | string[] | Placeholder keys included in template. |
| body | string | Template body with placeholders. |

### Example Records

```json
[
  {
    "id": "tpl-standard-nda",
    "name": "Standard NDA",
    "type": "Standard NDA",
    "jurisdiction": "United States",
    "version": "1.0",
    "status": "Active",
    "lastUpdatedAt": "2026-05-01T10:00:00.000Z",
    "createdByUserId": "usr-003",
    "placeholderKeys": ["CompanyName", "CounterpartyName", "EffectiveDate", "ProjectName", "BusinessPurpose", "Jurisdiction", "GoverningLaw", "NDADuration", "AuthorizedSignerName", "CounterpartySignerName"],
    "body": "This Standard NDA is entered into by {{CompanyName}} and {{CounterpartyName}} effective {{EffectiveDate}} for {{ProjectName}}. The purpose is {{BusinessPurpose}}. This agreement is governed by {{GoverningLaw}} and remains effective for {{NDADuration}}."
  },
  {
    "id": "tpl-mutual-nda",
    "name": "Mutual NDA",
    "type": "Mutual NDA",
    "jurisdiction": "United States",
    "version": "1.1",
    "status": "Active",
    "lastUpdatedAt": "2026-05-08T10:00:00.000Z",
    "createdByUserId": "usr-003",
    "placeholderKeys": ["CompanyName", "CounterpartyName", "CompanyAddress", "CounterpartyAddress", "EffectiveDate", "Purpose", "ConfidentialInformation", "SurvivalPeriod", "GoverningLaw"],
    "body": "{{CompanyName}} located at {{CompanyAddress}} and {{CounterpartyName}} located at {{CounterpartyAddress}} agree to exchange confidential information for {{Purpose}} beginning {{EffectiveDate}}."
  },
  {
    "id": "tpl-international-nda",
    "name": "International NDA",
    "type": "International NDA",
    "jurisdiction": "International",
    "version": "2.0",
    "status": "Active",
    "lastUpdatedAt": "2026-05-12T10:00:00.000Z",
    "createdByUserId": "usr-003",
    "placeholderKeys": ["CompanyName", "CounterpartyName", "CounterpartyAddress", "EffectiveDate", "BusinessPurpose", "Jurisdiction", "GoverningLaw", "NDADuration", "SurvivalPeriod"],
    "body": "This International NDA between {{CompanyName}} and {{CounterpartyName}} of {{CounterpartyAddress}} is effective {{EffectiveDate}} for {{BusinessPurpose}} under {{GoverningLaw}}."
  }
]
```

### Notes for Developers

- Seed all template examples even if only three bodies are fully detailed in early implementation.
- Use `body` for browser preview and demo PDF generation.
- If DOCX templates are later added as binary assets, keep metadata and placeholder keys in this dataset.

## Template Placeholders

### Dataset Name

`templatePlaceholders`

### Purpose

Defines all supported placeholders, source field mapping, required behavior, and display labels.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| key | string | Placeholder key without braces. |
| token | string | Full placeholder token. |
| label | string | UI label. |
| sourceField | string | NDA field used for value. |
| required | boolean | Whether required for final generation. |
| description | string | Meaning of placeholder. |

### Example Records

```json
[
  { "key": "CompanyName", "token": "{{CompanyName}}", "label": "Company Name", "sourceField": "companyName", "required": true, "description": "Internal company legal name." },
  { "key": "CounterpartyName", "token": "{{CounterpartyName}}", "label": "Counterparty Name", "sourceField": "counterpartyName", "required": true, "description": "Counterparty representative or entity name." },
  { "key": "EmployeeName", "token": "{{EmployeeName}}", "label": "Employee Name", "sourceField": "employeeName", "required": false, "description": "Employee or contractor name for employee NDA templates." },
  { "key": "CounterpartyAddress", "token": "{{CounterpartyAddress}}", "label": "Counterparty Address", "sourceField": "counterpartyAddress", "required": true, "description": "Counterparty mailing address." },
  { "key": "CompanyAddress", "token": "{{CompanyAddress}}", "label": "Company Address", "sourceField": "companyAddress", "required": true, "description": "Internal company address." },
  { "key": "EffectiveDate", "token": "{{EffectiveDate}}", "label": "Effective Date", "sourceField": "effectiveDate", "required": true, "description": "NDA start date." },
  { "key": "ProjectName", "token": "{{ProjectName}}", "label": "Project Name", "sourceField": "projectName", "required": true, "description": "Project or initiative name." },
  { "key": "BusinessPurpose", "token": "{{BusinessPurpose}}", "label": "Business Purpose", "sourceField": "businessPurpose", "required": true, "description": "Business purpose for disclosure." },
  { "key": "ConfidentialInformation", "token": "{{ConfidentialInformation}}", "label": "Confidential Information", "sourceField": "confidentialInformation", "required": false, "description": "Description of information disclosed." },
  { "key": "Jurisdiction", "token": "{{Jurisdiction}}", "label": "Jurisdiction", "sourceField": "jurisdiction", "required": true, "description": "Applicable jurisdiction." },
  { "key": "GoverningLaw", "token": "{{GoverningLaw}}", "label": "Governing Law", "sourceField": "governingLaw", "required": true, "description": "Governing law." },
  { "key": "NDADuration", "token": "{{NDADuration}}", "label": "NDA Duration", "sourceField": "ndaDuration", "required": true, "description": "Calculated agreement duration." },
  { "key": "SurvivalPeriod", "token": "{{SurvivalPeriod}}", "label": "Survival Period", "sourceField": "survivalPeriod", "required": false, "description": "Confidentiality survival period." },
  { "key": "AuthorizedSignerName", "token": "{{AuthorizedSignerName}}", "label": "Authorized Signer Name", "sourceField": "authorizedSignerName", "required": false, "description": "Internal authorized signer name." },
  { "key": "AuthorizedSignerTitle", "token": "{{AuthorizedSignerTitle}}", "label": "Authorized Signer Title", "sourceField": "authorizedSignerTitle", "required": false, "description": "Internal authorized signer title." },
  { "key": "CounterpartySignerName", "token": "{{CounterpartySignerName}}", "label": "Counterparty Signer Name", "sourceField": "counterpartySignerName", "required": false, "description": "External signer name." },
  { "key": "CounterpartySignerTitle", "token": "{{CounterpartySignerTitle}}", "label": "Counterparty Signer Title", "sourceField": "counterpartySignerTitle", "required": false, "description": "External signer title." },
  { "key": "Address", "token": "{{Address}}", "label": "Address", "sourceField": "counterpartyAddress", "required": false, "description": "Generic address fallback." },
  { "key": "Purpose", "token": "{{Purpose}}", "label": "Purpose", "sourceField": "businessPurpose", "required": true, "description": "Generic purpose fallback." }
]
```

### Notes for Developers

- Use `key` to match detected placeholders from regex `/{{\s*([A-Za-z0-9_]+)\s*}}/g`.
- Use `sourceField` to map values from NDA records.
- Missing required mapped values should block final document generation.

## Parties

### Dataset Name

`parties`

### Purpose

Stores reusable counterparty data for NDA intake, repository details, AI Search, and party management.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable party ID. |
| legalName | string | Counterparty legal name. |
| primaryContactName | string | Main contact. |
| primaryContactEmail | string | Main contact email. |
| address | string | Mailing address. |
| country | string | Country. |
| industry | string | Industry. |
| riskTier | string | Low, Medium, High. |
| status | string | Active, Inactive. |
| createdAt | string | ISO timestamp. |

### Example Records

```json
[
  {
    "id": "party-001",
    "legalName": "Atlas Robotics, Inc.",
    "primaryContactName": "Morgan Ellis",
    "primaryContactEmail": "morgan.ellis@atlasrobotics.example",
    "address": "455 Market Street, San Francisco, CA 94105",
    "country": "United States",
    "industry": "Robotics",
    "riskTier": "Medium",
    "status": "Active",
    "createdAt": "2026-05-01T10:00:00.000Z"
  },
  {
    "id": "party-003",
    "legalName": "Northstar BioHealth Ltd.",
    "primaryContactName": "Daniel Harper",
    "primaryContactEmail": "daniel.harper@northstarbio.example",
    "address": "80 King Street, London EC2V 8BG, United Kingdom",
    "country": "United Kingdom",
    "industry": "Healthcare",
    "riskTier": "High",
    "status": "Active",
    "createdAt": "2026-05-04T10:00:00.000Z"
  }
]
```

### Notes for Developers

- Parties page should support add, edit, search, and CSV export.
- Party records can prefill NDA intake fields when selected.

## Rules

### Dataset Name

`routingRules`

### Purpose

Defines auto-assignment and review routing logic shown during NDA intake and risk review.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable rule ID. |
| name | string | Rule name. |
| conditionType | string | RiskFlag, RiskLevel, TemplateType, Country, DataUse. |
| conditionValue | string | Matching value. |
| action | string | Assignment or workflow recommendation. |
| assigneeRoleId | string | Target role ID. |
| active | boolean | Whether rule is active. |
| priority | number | Rule priority. |

### Example Records

```json
[
  {
    "id": "rule-high-risk-legal",
    "name": "High risk -> Legal Reviewer",
    "conditionType": "RiskLevel",
    "conditionValue": "High",
    "action": "Assign to Legal Reviewer",
    "assigneeRoleId": "role-legal-reviewer",
    "active": true,
    "priority": 1
  },
  {
    "id": "rule-pii-privacy",
    "name": "PII involved -> Privacy Review",
    "conditionType": "RiskFlag",
    "conditionValue": "risk-pii",
    "action": "Add Privacy Review",
    "assigneeRoleId": "role-legal-reviewer",
    "active": true,
    "priority": 2
  },
  {
    "id": "rule-international-senior",
    "name": "International business -> Senior Legal Reviewer",
    "conditionType": "RiskFlag",
    "conditionValue": "risk-international",
    "action": "Assign to Senior Legal Reviewer",
    "assigneeRoleId": "role-legal-reviewer",
    "active": true,
    "priority": 3
  }
]
```

### Notes for Developers

- Show matching rules in NDA intake and Risk Review.
- Rules are Admin-only to manage.

## Risk Questions

### Dataset Name

`riskQuestions`

### Purpose

Defines intake questions used to calculate risk score and flags.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable question ID. |
| label | string | UI question text. |
| category | string | Business, IP, Data, Privacy, International. |
| flagId | string | Risk flag created when true. |
| weight | number | Risk score contribution. |
| helpText | string | Supporting UI text. |

### Example Records

```json
[
  {
    "id": "rq-competitor",
    "label": "Does the counterparty create competitor risk?",
    "category": "Business",
    "flagId": "risk-competitor",
    "weight": 25,
    "helpText": "Select yes when the counterparty competes with the company or a business unit."
  },
  {
    "id": "rq-pii",
    "label": "Will the NDA involve personal or sensitive data?",
    "category": "Privacy",
    "flagId": "risk-pii",
    "weight": 30,
    "helpText": "Select yes when personal information or sensitive data may be disclosed."
  },
  {
    "id": "rq-cross-border",
    "label": "Will confidential information cross borders?",
    "category": "International",
    "flagId": "risk-cross-border",
    "weight": 20,
    "helpText": "Select yes when data or information is shared across countries."
  }
]
```

### Notes for Developers

- Seed all 12 risk inputs from the PRD.
- Boolean answers can be stored on NDA record as `riskAnswers`.

## Risk Scoring Flags

### Dataset Name

`riskFlags`

### Purpose

Defines risk flag metadata, explanations, and clause recommendations.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable flag ID. |
| label | string | Display label. |
| severity | string | Low, Medium, High. |
| explanation | string | Risk explanation. |
| recommendation | string | Review or clause recommendation. |

### Example Records

```json
[
  {
    "id": "risk-pii",
    "label": "PII / Sensitive Data",
    "severity": "High",
    "explanation": "This NDA includes personal or sensitive data considerations. Privacy review is recommended before execution.",
    "recommendation": "Add privacy review and confirm data handling limitations."
  },
  {
    "id": "risk-competitor",
    "label": "Competitor Risk",
    "severity": "High",
    "explanation": "This NDA involves a counterparty that may create competitive sensitivity. Legal review is recommended.",
    "recommendation": "Include competitive sensitivity restrictions and limit disclosure scope."
  },
  {
    "id": "risk-pricing-strategy",
    "label": "Pricing / Strategy / Roadmap",
    "severity": "Medium",
    "explanation": "The NDA may involve strategic commercial information.",
    "recommendation": "Confirm disclosure scope and limit recipient access."
  }
]
```

### Notes for Developers

- Risk level can be calculated from total score and high-severity flags.
- Use exact required explanation text for PII and competitor risk.

## Approval Workflows

### Dataset Name

`approvalWorkflows`

### Purpose

Defines recommended workflow paths based on risk level and routing rules.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable workflow ID. |
| name | string | Workflow name. |
| trigger | string | Trigger condition. |
| steps | object[] | Workflow step definitions. |
| active | boolean | Whether workflow is active. |

### Example Records

```json
[
  {
    "id": "wf-standard-low-risk",
    "name": "Standard Low-Risk NDA Review",
    "trigger": "riskLevel == Low",
    "active": true,
    "steps": [
      { "order": 1, "name": "Business Submission", "roleId": "role-business-user" },
      { "order": 2, "name": "Legal Reviewer Approval", "roleId": "role-legal-reviewer" },
      { "order": 3, "name": "Counterparty Signature", "roleId": "role-counterparty-signer" }
    ]
  },
  {
    "id": "wf-high-risk-privacy",
    "name": "High-Risk Privacy NDA Review",
    "trigger": "riskLevel == High && riskFlags includes risk-pii",
    "active": true,
    "steps": [
      { "order": 1, "name": "Business Submission", "roleId": "role-business-user" },
      { "order": 2, "name": "Privacy Review", "roleId": "role-legal-reviewer" },
      { "order": 3, "name": "Legal Reviewer Approval", "roleId": "role-legal-reviewer" },
      { "order": 4, "name": "Counterparty Signature", "roleId": "role-counterparty-signer" }
    ]
  }
]
```

### Notes for Developers

- Initial implementation can show workflow recommendation without a full workflow engine.
- Keep steps visible in Risk Review.

## Audit Trail Examples

### Dataset Name

`auditTrail`

### Purpose

Stores lifecycle history for compliance, traceability, and repository details.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable audit ID. |
| entityType | string | NDA, Template, Party, Rule, Export, Document. |
| entityId | string | Linked entity ID. |
| eventType | string | Event name. |
| actorUserId | string | User who performed event. |
| actorRoleId | string | Role at time of event. |
| message | string | Human-readable audit text. |
| createdAt | string | ISO timestamp. |

### Example Records

```json
[
  {
    "id": "audit-001",
    "entityType": "NDA",
    "entityId": "nda-004",
    "eventType": "Request submitted",
    "actorUserId": "usr-001",
    "actorRoleId": "role-business-user",
    "message": "Avery Bennett submitted Vendor NDA - Redwood Cloud Services.",
    "createdAt": "2026-03-01T15:00:00.000Z"
  },
  {
    "id": "audit-002",
    "entityType": "NDA",
    "entityId": "nda-004",
    "eventType": "Sent for signature",
    "actorUserId": "usr-002",
    "actorRoleId": "role-legal-reviewer",
    "message": "Jordan Reed sent NDA-2026-0004 for counterparty signature.",
    "createdAt": "2026-03-03T10:00:00.000Z"
  },
  {
    "id": "audit-003",
    "entityType": "NDA",
    "entityId": "nda-004",
    "eventType": "Signed",
    "actorUserId": "external-sofia-martinez",
    "actorRoleId": "role-counterparty-signer",
    "message": "Sofia Martinez signed NDA-2026-0004.",
    "createdAt": "2026-03-04T10:10:00.000Z"
  }
]
```

### Notes for Developers

- Required events include draft saved, request submitted, template selected, template previewed, placeholder values validated, risk review completed, document generated, DOCX downloaded, PDF downloaded, sent for signature, signed, rejected, archived, deleted, and export completed.

## Document Records

### Dataset Name

`documents`

### Purpose

Tracks generated and signed document files or local demo references.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable document ID. |
| ndaId | string | Linked NDA record. |
| documentType | string | Generated DOCX, Generated PDF, Signed DOCX, Signed PDF. |
| fileName | string | Download file name. |
| mimeType | string | MIME type. |
| storageType | string | localStorage, blob, generatedOnDemand. |
| storageKey | string | Local storage key or generated reference. |
| status | string | Generated, Signed, Archived. |
| generatedByUserId | string | User who generated document. |
| generatedAt | string | ISO timestamp. |

### Example Records

```json
[
  {
    "id": "doc-001",
    "ndaId": "nda-004",
    "documentType": "Generated PDF",
    "fileName": "NDA_Redwood_Cloud_Services_2026-03-01.pdf",
    "mimeType": "application/pdf",
    "storageType": "localStorage",
    "storageKey": "clm.document.doc-001",
    "status": "Generated",
    "generatedByUserId": "usr-002",
    "generatedAt": "2026-03-03T09:45:00.000Z"
  },
  {
    "id": "doc-002",
    "ndaId": "nda-004",
    "documentType": "Signed PDF",
    "fileName": "NDA_Redwood_Cloud_Services_2026-03-04_signed.pdf",
    "mimeType": "application/pdf",
    "storageType": "localStorage",
    "storageKey": "clm.document.doc-002",
    "status": "Signed",
    "generatedByUserId": "external-sofia-martinez",
    "generatedAt": "2026-03-04T10:10:00.000Z"
  }
]
```

### Notes for Developers

- Store document metadata separately from large generated content where possible.
- Signed records must download stored signed files rather than regenerate unsigned content.

## Signed Document Examples

### Dataset Name

`signedDocuments`

### Purpose

Represents signed document metadata and signature details.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable signed document ID. |
| ndaId | string | Linked NDA. |
| signerName | string | Counterparty signer name. |
| signerEmail | string | Counterparty signer email. |
| signedAt | string | ISO timestamp. |
| signatureType | string | Drawn, Typed, Clickwrap. |
| signatureDataKey | string | Local storage key for signature image/data. |
| signedPdfDocumentId | string | Linked signed PDF document. |
| signedDocxDocumentId | string | Linked signed DOCX document. |

### Example Records

```json
[
  {
    "id": "sigdoc-001",
    "ndaId": "nda-004",
    "signerName": "Sofia Martinez",
    "signerEmail": "sofia.martinez@redwoodcloud.example",
    "signedAt": "2026-03-04T10:10:00.000Z",
    "signatureType": "Drawn",
    "signatureDataKey": "clm.signature.sigdoc-001",
    "signedPdfDocumentId": "doc-002",
    "signedDocxDocumentId": "doc-003"
  }
]
```

### Notes for Developers

- Set NDA status to Signed only after signed document records are created.
- Keep signer confirmation page independent from internal app navigation.

## AI Search Sample Questions

### Dataset Name

`aiSearchSamples`

### Purpose

Provides example prompts for testing AI Search field matching and selected-record answers.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Stable sample ID. |
| question | string | Sample user question. |
| expectedIntent | string | Parsed intent. |
| expectedField | string | Primary field to answer from. |
| exampleNdaId | string | Optional selected NDA context. |
| expectedAnswer | string | Expected answer for seeded data. |

### Example Records

```json
[
  {
    "id": "ais-001",
    "question": "What is the expiry date of Northstar BioHealth NDA?",
    "expectedIntent": "fieldLookup",
    "expectedField": "expiryDate",
    "exampleNdaId": "nda-003",
    "expectedAnswer": "The expiry date is 2027-07-27."
  },
  {
    "id": "ais-002",
    "question": "What is the status of the Mutual NDA with BrightWave Analytics?",
    "expectedIntent": "fieldLookup",
    "expectedField": "status",
    "exampleNdaId": "nda-002",
    "expectedAnswer": "The status is Approved."
  },
  {
    "id": "ais-003",
    "question": "Who is the counterparty signer for Redwood Cloud Services?",
    "expectedIntent": "fieldLookup",
    "expectedField": "counterpartyName",
    "exampleNdaId": "nda-004",
    "expectedAnswer": "The counterparty signer is Sofia Martinez."
  }
]
```

### Notes for Developers

- Use these as QA fixtures for query parser behavior.
- Exact field answers should take priority over generated summaries.

## Dashboard Metrics Sample Data

### Dataset Name

`dashboardMetrics`

### Purpose

Provides derived or cached dashboard summary examples for initial rendering and QA.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Metric ID. |
| metricKey | string | Metric key. |
| label | string | Display label. |
| value | number | Metric value. |
| source | string | Source dataset or calculation. |

### Example Records

```json
[
  { "id": "metric-in-review", "metricKey": "nda.status.inReview", "label": "In Review", "value": 1, "source": "calculatedFromNdaRecords" },
  { "id": "metric-approved", "metricKey": "nda.status.approved", "label": "Approved", "value": 1, "source": "calculatedFromNdaRecords" },
  { "id": "metric-awaiting-signature", "metricKey": "nda.status.awaitingSignature", "label": "Awaiting Signature", "value": 1, "source": "calculatedFromNdaRecords" },
  { "id": "metric-signed", "metricKey": "nda.status.signed", "label": "Signed", "value": 1, "source": "calculatedFromNdaRecords" },
  { "id": "metric-archived", "metricKey": "nda.status.archived", "label": "Archived", "value": 1, "source": "calculatedFromNdaRecords" }
]
```

### Notes for Developers

- Prefer calculating dashboard metrics from `ndaRecords` at runtime.
- Use cached sample metrics only for UI skeletons or tests.
- Dashboard tabs must filter records by exact status.

