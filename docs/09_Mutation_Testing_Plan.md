# CLM Mutation Testing Plan

## Mutation Testing Objective

Use mutation testing to measure whether the CLM automated tests detect defects in critical frontend business logic. This run is intentionally capped below 1000 generated mutants and focuses on major logic areas that can be tested quickly and deterministically with Vitest.

Mutation testing must run only after the normal functional gates pass.

## Scope

In scope for the current capped run:

- Role-based permission logic.
- Executive Viewer view-only enforcement.
- Agreement period and date helper calculations.
- Template placeholder extraction, mapping, replacement, and validation.
- CSV export escaping and filename handling.
- Audit trail generation.
- Generated/signed document metadata storage.

Covered by existing unit and Playwright tests, but kept out of this capped Stryker run to stay under 1000 mutants and avoid long browser/localStorage mutation cycles:

- Dashboard status filtering and counts through Playwright.
- NDA intake validation and section state through Playwright.
- Legal Reviewer approval rules through Playwright.
- Send-to-sign and signed-status transitions through unit and Playwright tests.
- Repository document visibility and downloads through Playwright.
- AI Search exact field matching through unit and Playwright tests.
- Risk scoring through unit and Playwright tests.

## Tool Selection

Tool: StrykerJS.

Runner: `@stryker-mutator/vitest-runner`.

Reason: Vitest runner with per-test coverage is significantly faster than the command runner because Stryker can run only the tests that cover each mutant.

## Setup Steps

Dependencies:

```bash
npm install --save-dev vitest jsdom @stryker-mutator/core @stryker-mutator/vitest-runner
```

Configuration:

- `stryker.conf.js`
- `vitest.config.mjs`
- Unit tests under `test/unit/`

## Target Files

Current capped mutation target set:

| Logic area | File |
| --- | --- |
| Role permission matrix | `lib/permissions.js` |
| Agreement period calculations | `lib/dateMath.js` |
| Placeholder mapping and validation | `lib/placeholders.js` |
| CSV export utility | `lib/csvExport.js` |
| Audit trail and generated document records | `lib/auditTrail.js` |

This target set generated 591 mutants, satisfying the requested limit of testing major functionality only and keeping the run under 1000 mutants.

## Excluded Files

Excluded by configuration:

- `node_modules/**`
- `.next/**`
- `coverage/**`
- `test-results/**`
- `playwright-report/**`
- `docs/**`
- `doc/**`
- `deploy/**`
- `stage_logs/**`
- CSS files
- static assets and image files
- UI-only components
- test files
- config files

Excluded from the current capped mutation target set:

- `lib/riskEngine.js`
- `lib/requestStore.js`
- `lib/signatureService.js`
- `lib/aiRepo.js`
- `lib/documentGenerator.js`
- `lib/templates.js`
- store and UI-adjacent helper modules

These should be considered for a later expanded mutation run after more granular unit isolation is added.

## Mutation Thresholds

Configured thresholds:

| Threshold | Score |
| --- | ---: |
| High | 80 |
| Low | 60 |
| Break | 50 |

Current run target: meet or exceed Low threshold while keeping the mutant count under 1000.

## Execution Commands

Unit gate:

```bash
npm test
```

Playwright gate:

```bash
npm run test:e2e
```

Mutation run:

```bash
npm run mutation
```

HTML report:

```text
test-results/mutation/index.html
```

## Reporting Format

Stryker reports:

- Console clear-text report.
- Progress report.
- HTML report at `test-results/mutation/index.html`.

Project documentation:

- `docs/mutation-testing-summary.md`
- `docs/mutation-testing-improvement-summary.md`

## Review Process

1. Run `npm test`.
2. Run `npm run test:e2e`.
3. Run `npm run mutation`.
4. Review module scores, survived mutants, timeout mutants, and no-coverage mutants.
5. Add tests for meaningful survived mutants.
6. Do not weaken production logic to improve score.
7. Rerun `npm test`.
8. Rerun `npm run mutation`.
9. Update summary documentation from the actual Stryker output.

## Current Execution Notes

- Unit gate passed: 41 tests across 9 files.
- Playwright gate passed: 40 tests.
- Final mutation score: 72.32.
- Instrumented mutants: 591.
- Executed mutants after `ignoreStatic`: 466.
- The final score is above the Low threshold and above the Break threshold, but below the High threshold.
