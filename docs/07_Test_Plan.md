# CLM Test Plan

## Test Strategy

The CLM test strategy validates that the application behaves as a premium enterprise SaaS contract lifecycle platform with NDA as a core use case. Testing will focus on workflow correctness, role-based access, state persistence, document generation, e-signature behavior, repository integrity, AI Search accuracy, exports, auditability, theme behavior, and regression stability.

Because the current application uses frontend state and localStorage for demo persistence, testing must verify both user-visible behavior and local data updates. Tests should cover happy paths, validation failures, permission boundaries, status transitions, and data consistency across dashboard, repository, document views, AI Search, and audit trail.

## Scope

In scope:

- Dashboard status counts and status filters.
- Request a New Contract full-page flow.
- NDA intake workflow and validation.
- Agreement period calculation in both directions.
- Template selection and Admin template creation.
- Template placeholder mapping and replacement.
- Risk review scoring and explanations.
- Legal Reviewer approval, rejection, edit, preview, and Send to Sign.
- Counterparty signing page.
- Signed document storage and repository display.
- Repository list, detail view, downloads, actions, and admin-only delete.
- AI Search exact answers from repository/application data.
- Admin settings, users, parties, and rules.
- Role-based access controls.
- Theme switching.
- CSV export.
- Audit trail events.
- Responsive and browser behavior.
- Accessibility checks for primary workflows.

## Out of Scope

Out of scope for this test planning phase:

- Production backend API testing.
- Real authentication provider testing.
- Real external e-signature provider testing.
- Real email delivery verification.
- Production security penetration testing.
- Load testing against backend infrastructure.
- Legal enforceability review of generated NDA text.
- Production-grade AI model evaluation.
- Deployment testing.

## Test Objectives

- Confirm the product requirements are implemented consistently across roles.
- Confirm all NDA statuses are used correctly: In Review, Approved, Awaiting Signature, Signed, Archived.
- Confirm dashboard counts match filtered records.
- Confirm repository visibility applies to every internal role.
- Confirm restricted actions are blocked with the required permission message.
- Confirm required-field validation and step status indicators work.
- Confirm draft save, submit, review, approval, send to sign, signing, and repository storage work end to end.
- Confirm generated and signed DOCX/PDF downloads work.
- Confirm AI Search returns exact field answers when data exists.
- Confirm exports generate valid CSV files from visible rows.
- Confirm audit trail entries are created for material events.

## Test Environments

| Environment | Purpose | Data |
| --- | --- | --- |
| Local development | Developer and QA functional testing. | Seed data and localStorage. |
| Browser localStorage reset state | Repeatable clean regression runs. | Default seed catalog. |
| Browser persisted state | Persistence and draft/signature workflow testing. | User-created data. |
| Responsive browser emulation | Mobile/tablet/desktop layout testing. | Default seed catalog. |

## Test Data Strategy

Use seeded mock data from `docs/04_Seed_Catalog.md`.

Required seed coverage:

- At least one user per role: Business User, Legal Reviewer, Admin, Executive Viewer.
- At least one NDA per status.
- At least one signed NDA with stored signed PDF and DOCX metadata.
- At least one high-risk NDA with PII or cross-border data.
- At least one approved NDA ready to Send to Sign.
- Templates covering Standard NDA, Mutual NDA, One-Way NDA, Vendor NDA, Customer NDA, Partner NDA, Employee / Contractor NDA, and International NDA.
- Placeholder catalog covering every required placeholder.
- Parties and rules records for Admin-only pages.
- AI Search sample questions with known expected answers.

Testers should reset localStorage before baseline regression runs. For workflow tests, testers may create new records and verify that created data persists after refresh.

## Role-Based Testing Approach

Each major flow must be tested with the correct role and at least one unauthorized role.

| Role | Primary Testing Focus |
| --- | --- |
| Business User | Request NDA, save draft, submit, run risk review, repository visibility, AI Search. |
| Legal Reviewer | Review NDA, edit details, approve, reject, send to sign, preview/download, repository visibility. |
| Admin | All actions, template creation, users, parties, rules, delete, exports, settings. |
| Executive Viewer | View-only dashboard and repository access, blocked mutation actions. |
| Counterparty Signer | Token link access, preview, download, sign, confirmation, signed downloads. |

## Functional Testing

Functional testing must cover:

- Navigation visibility by role.
- Dashboard summary tabs and counts.
- Full-page NDA request workflow.
- Required-field validation.
- Draft save and reopen.
- Submission into repository.
- Template selection and placeholder mapping.
- Risk review scoring.
- Legal Reviewer actions.
- Send to Sign workflow.
- Signing page.
- Repository document view.
- Document downloads.
- AI Search.
- Settings, users, parties, and rules.
- CSV export.
- Audit trail.

## UI Testing

UI testing must verify:

- Sidebar does not show New Contract Request.
- Request a New Contract appears on dashboard and opens a full-page view.
- Status tabs are clear and visually distinct.
- Required fields show a star.
- Incomplete sections show red after validation.
- Completed sections show green only when complete.
- Legal Reviewer actions appear under the Legal Reviewer section.
- Repository row actions are discoverable and usable.
- Dropdowns are readable in dark and white themes.
- Sign confirmation page does not show Return to CLM Dashboard.
- Tasks section is not visible anywhere.

## Regression Testing

Regression testing must be performed after any change to:

- Role permissions.
- Status transitions.
- Dashboard counts.
- Repository filters.
- LocalStorage schema.
- Template mapping.
- Risk scoring.
- Document generation.
- Signing tokens.
- AI Search parser.
- CSV export.
- Theme classes.

Regression suite must include an end-to-end NDA lifecycle from draft to signed repository record.

## Document Generation Testing

Test generated DOCX and PDF behavior:

- Required placeholders block downloads when missing.
- Every supported placeholder maps to expected NDA fields.
- Generated document includes company, counterparty, dates, purpose, duration, jurisdiction, governing law, and signer fields when available.
- DOCX download creates a downloadable file.
- PDF download creates a downloadable file.
- Signed record downloads stored signed documents instead of regenerating unsigned documents.
- Audit entries are created for document generated, DOCX downloaded, and PDF downloaded.

## E-Signature Testing

E-signature tests must verify:

- Send to Sign only works for Approved NDAs.
- Send to Sign works for any valid counterparty email.
- Signing token maps to the correct NDA.
- Signing link is clickable and accessible.
- Counterparty can preview before signing.
- Counterparty can download before signing.
- Sign action remains enabled even if preview/download is skipped.
- Signature is embedded into final document.
- Signed PDF and signed DOCX are stored before status changes to Signed.
- Confirmation page shows Download Signed NDA.
- Confirmation page does not show Return to CLM Dashboard.
- Repository shows signed status and signed documents.

## Repository Testing

Repository tests must verify:

- Repository is visible to all internal roles.
- Repository shows all documents to all internal roles.
- Role permissions control actions.
- Expiry Date displays correctly.
- View opens full final document view, not old preview screen.
- Signed documents are visible and downloadable.
- Three-dot actions include Add tag, Edit NDA, Renew NDA, Delete document.
- Delete is Admin-only.
- Non-admin delete attempt shows required permission message.
- CSV export includes visible rows and columns.

## AI Search Testing

AI Search tests must verify exact field answers:

- Expiry date.
- NDA status.
- Counterparty details.
- Contract purpose.
- Signature status.
- Renewal details.
- Risk level and flags.
- Template used.
- Email and address.

Selected NDA behavior:

- If selected NDA is set, answer from selected NDA first.
- If no selected NDA is set, search across repository records.
- Missing selected-record data returns: "I could not find that information in the selected NDA record".

## Security and Permission Testing

Permission testing must verify:

- Executive Viewer cannot create, edit, approve, reject, send to sign, delete, or manage settings.
- Business User cannot approve, reject, send to sign, delete, or access Admin-only pages.
- Legal Reviewer cannot access Admin-only Settings, Parties, or Rules.
- Admin can perform all actions.
- Parties and Rules visible only to Admin.
- Admin-only delete enforced in UI and service layer.
- Unauthorized restricted action shows: "You do not have permission to perform this activity."

## Accessibility Testing

Accessibility checks should include:

- Keyboard access to navigation, tabs, forms, dropdowns, and action menus.
- Visible focus states.
- Sufficient contrast in dark and white themes.
- Form labels associated with fields.
- Required fields announced visually and textually.
- Error messages close to fields and summarized where useful.
- Status and risk indicators include text, not color only.
- Signing page usable without internal navigation.

## Responsive Testing

Test these viewports:

- Mobile: 390 x 844.
- Tablet: 768 x 1024.
- Desktop: 1440 x 900.
- Wide desktop: 1920 x 1080.

Responsive checks:

- Sidebar collapses or remains usable.
- Dashboard status tabs do not overlap.
- Tables scroll or adapt cleanly.
- Forms remain readable.
- Stepper remains usable.
- Document viewer does not obscure download actions.
- Signing page is usable on mobile.

## Browser Testing

Minimum browser coverage:

- Chrome latest.
- Microsoft Edge latest.
- Firefox latest.
- Safari latest if available.

Browser checks:

- localStorage persistence.
- File downloads.
- Blob generation.
- Date input behavior.
- PDF/DOCX generation compatibility.
- Clipboard or signing link behavior if used.

## Acceptance Criteria

Testing is acceptable when:

- All high-priority test cases pass.
- All role permission tests pass.
- Full NDA lifecycle passes from draft to signed repository record.
- Dashboard counts match filtered records.
- Repository displays all documents to all internal roles.
- Signed document downloads work from repository.
- AI Search exact-answer tests pass.
- CSV export tests pass.
- No critical or high-severity defects remain open.
- Medium defects have documented workarounds or business approval.
- Test evidence is captured for key workflows.

## Entry Criteria

Testing may begin when:

- Required planning docs are available.
- Seed data is available or manually reproducible.
- App runs locally.
- Primary routes are accessible.
- Role selector works.
- localStorage can be reset.
- Testers have expected role and status rules.

## Exit Criteria

Testing may close when:

- Planned test cases are executed.
- Pass/fail status is recorded.
- Defects are logged with severity and reproduction steps.
- Critical and high defects are fixed and retested.
- Regression testing is complete.
- Test summary report is delivered.

## Defect Severity Levels

| Severity | Definition | Examples |
| --- | --- | --- |
| Critical | Blocks core workflow or causes data loss/security breach. | Signed document not stored, unauthorized delete succeeds, app cannot load. |
| High | Major feature broken with no reasonable workaround. | Send to Sign fails, dashboard counts incorrect, required validation bypassed. |
| Medium | Important issue with workaround or limited scope. | Export missing a column, incorrect toast, layout issue on one viewport. |
| Low | Cosmetic or minor usability issue. | Spacing inconsistency, non-blocking label typo. |

## Test Reporting Format

Use this format for daily or milestone test reporting:

```text
Test Report Date:
Build/Commit:
Tester:
Environment:

Summary:
- Total test cases:
- Passed:
- Failed:
- Blocked:
- Not run:

Defects:
- Critical:
- High:
- Medium:
- Low:

Key risks:
- 

Evidence captured:
- Screenshots:
- Downloaded files:
- Console logs:
- localStorage snapshots:

Recommendation:
- Proceed / Proceed with risks / Do not proceed
```

