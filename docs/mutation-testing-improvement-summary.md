# Mutation Testing Improvement Summary

## Weak Areas Identified

The first completed mutation baseline scored 53.00 and exposed weak assertions in:

- Placeholder default value mapping.
- Placeholder blank and whitespace replacement.
- Audit trail ordering and metadata checks.
- Generated document deduplication and sorting.
- CSV export handling for null, boolean, numeric, and explicit filename values.
- Date helper edge cases for five-year terms and singular duration output.

The final rerun improved the score to 72.32.

Remaining weak areas:

- `lib/auditTrail.js` still has survived mutants around storage fallback, sorting, and cap behavior.
- `lib/csvExport.js` still has survived mutants around edge formatting branches.
- `lib/dateMath.js` is close to High threshold but still has no-coverage branches for invalid/fallback paths.
- `lib/permissions.js` has no survived mutants in the permission matrix, but file score is low because React hook helper and static branches are not covered by the current pure unit tests.

## Survived Mutant Analysis

Meaningful survived mutants:

- Audit trail sorting mutants survived for some seeded/localStorage fallback paths.
- Audit trail capped-history mutants survived because the test suite does not yet create more than 200 audit records.
- Generated document capped-history mutants survived because the test suite does not yet create more than 100 document records.
- CSV export mutants survived where data did not exercise every branch of string conversion and escaping.
- Placeholder extraction mutants survived around signature block `party`, `name`, and `title` placeholder scanning.

Likely low-value or environment-guard survived/no-coverage mutants:

- `typeof window === "undefined"` branches.
- React hook helper code in `permissions.js`.
- Some string-literal defaults where product impact is low.

## Recommended Test Improvements

- Add localStorage fallback tests that clear storage and assert seeded audit/doc records are written and sorted.
- Add cap tests for 201 audit records and 101 generated document records.
- Add CSV tests for labels containing quotes/newlines and rows with undefined values.
- Add placeholder extraction tests using custom templates with signature block placeholders only.
- Add component-level tests for permission hooks, or exclude hook helper code from the pure mutation target and keep Playwright as the UI permission gate.

## Additional Unit Tests Added

Updated `test/unit/placeholders.test.js`:

- Added full placeholder field mapping assertions.
- Added CLM default placeholder value assertions.
- Added whitespace placeholder replacement assertion.
- Added optional placeholder summary value assertion.

Updated `test/unit/auditTrail.test.js`:

- Added audit ID prefix assertion.
- Added default actor assertion.
- Added audit ordering assertion.
- Added generated document deduplication assertion.
- Added generated document sorting assertion.
- Added timestamp formatting assertion.

Updated `test/unit/csvExport.test.js`:

- Added numeric value export assertion.
- Added null/empty value export assertion.
- Added explicit `.csv` filename preservation assertion.
- Added boolean export assertion.

Updated `test/unit/dateMath.test.js`:

- Added five-year term end-date assertion.
- Added singular month/day duration assertion.
- Added singular day duration assertion.
- Added five-year preset mapping assertion.
- Added non-preset mismatch assertion.

## Additional Integration Tests Recommended

- Repository detail integration test for audit ordering after multiple actions.
- Repository document integration test that creates multiple generated/signed docs and validates newest-first display.
- Export integration test for CSV files containing quotes, commas, and blank values.
- Permission hook component test for `usePermission` and `useCurrentRole`.

## Role Permission Test Improvements

Already covered:

- Executive Viewer is view-only.
- Admin can perform all defined actions.
- Business User cannot approve, send for sign, or delete.
- Legal Reviewer can review/approve/send but cannot delete or perform admin actions.
- Unknown roles and unknown actions are denied.

Recommended next step:

- Add React hook tests for `usePermission` and `useCurrentRole`, or keep those branches out of mutation scope and rely on Playwright for UI role behavior.

## Placeholder Replacement Test Improvements

Completed:

- Defaults for company, jurisdiction, governing law, NDA duration, survival period, signer titles.
- Full explicit field mapping for signer names/titles, confidential information, project name, and addresses.
- Repeated placeholder replacement.
- Missing values replaced with legal blank lines.
- Whitespace-only values treated as missing.
- Unknown optional placeholders do not block validation.

Recommended next step:

- Add a custom signature-block-only template to kill remaining extraction mutants for `party`, `name`, and `title` fields.

## Status Transition Test Improvements

Already covered outside the capped mutation target:

- Request status normalization.
- Dashboard count alignment with filtered records.
- Missing record updates return `null`.
- Unsupported statuses are excluded from canonical counts.
- Send for signature requires `Approved`.
- Signature completion updates status to `Signed`.

Recommended next step:

- Include `lib/requestStore.js` and `lib/signatureService.js` in a future expanded mutation run after isolating localStorage/server-mirroring branches.

## AI Search Test Improvements

Already covered outside the capped mutation target:

- Record resolution by NDA ID, title, and counterparty mention.
- Exact status, counterparty, purpose, and expiry summary behavior.
- Rendered template text does not expose raw placeholders.

Recommended next step:

- Include `lib/aiRepo.js` in a future expanded mutation run and add tests for exact field answers for renewal, signature status, and unknown-record fallback.

## Dashboard Count Test Improvements

Already covered:

- Unit tests compare status counts with repository filters.
- Playwright tests click each dashboard summary tab and verify filtered records.

Recommended next step:

- Extract dashboard count calculation into a small pure utility if more dashboard mutation testing is desired.

## E-Signature Test Improvements

Already covered:

- Missing counterparty email blocks send.
- Unapproved NDA blocks send.
- Approved NDA moves to `Awaiting Signature`.
- Counterparty completion updates signature status and NDA status to `Signed`.
- Duplicate signing is blocked.

Recommended next step:

- Add mutation coverage for signed PDF generation and signature sync reconciliation in a future expanded run.

## Final QA Recommendations

- Treat 72.32 as the first accepted capped mutation baseline.
- Keep the configured thresholds at High 80, Low 60, Break 50.
- Do not weaken production code to chase score.
- Prioritize audit trail, CSV edge cases, permission hook tests, and signature-block placeholder extraction next.
- Run the expanded mutation phase separately from the capped major-functionality baseline to avoid multi-hour runs.

## Retest Plan

1. Run `npm test`.
2. Run `npm run test:e2e`.
3. Run `npm run mutation`.
4. Review `test-results/mutation/index.html`.
5. Add tests for meaningful survived mutants.
6. Rerun `npm test`.
7. Rerun `npm run mutation`.
8. Update `docs/mutation-testing-summary.md` with actual final results.
