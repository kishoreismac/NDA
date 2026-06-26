# Mutation Testing Summary

## Execution Date

June 26, 2026

## Tool Used

StrykerJS with `@stryker-mutator/vitest-runner`.

## Test Command

Pre-mutation gates:

```bash
npm test
npm run test:e2e
```

Mutation command:

```bash
npm run mutation
```

The mutation command was run with elevated process permissions because StrykerJS needed to manage worker process cleanup on Windows.

## Files Tested

The capped mutation run targeted five logic-heavy source files:

- `lib/permissions.js`
- `lib/dateMath.js`
- `lib/placeholders.js`
- `lib/csvExport.js`
- `lib/auditTrail.js`

## Overall Mutation Score

Final mutation score: **72.32%**

Covered mutation score: **83.83%**

Threshold result:

- High threshold: 80, not reached.
- Low threshold: 60, reached.
- Break threshold: 50, reached.

## Total Mutants

- Mutants instrumented: 591
- Mutants executed after static-mutant filtering: 466
- Ignored/static mutants: 125

## Killed Mutants

Killed mutants: 333

## Survived Mutants

Survived mutants: 65

## Timeout Mutants

Timeout mutants: 4

## No Coverage Mutants

No coverage mutants: 64

Most no-coverage mutants are concentrated in static/default branches and React hook helper code in `permissions.js`, plus seed/fallback branches in audit utilities.

## Module-Wise Summary

| File | Mutation Score | Covered Score | Killed | Timeout | Survived | No Coverage |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| All files | 72.32 | 83.83 | 333 | 4 | 65 | 64 |
| `lib/auditTrail.js` | 58.90 | 71.67 | 41 | 2 | 17 | 13 |
| `lib/csvExport.js` | 70.73 | 70.73 | 29 | 0 | 12 | 0 |
| `lib/dateMath.js` | 79.53 | 86.32 | 101 | 0 | 16 | 10 |
| `lib/permissions.js` | 9.30 | 100.00 | 4 | 0 | 0 | 39 |
| `lib/placeholders.js` | 87.91 | 88.89 | 158 | 2 | 20 | 2 |

## Critical Survived Mutants

High-priority survived areas:

- Audit trail sorting and localStorage fallback branches.
- Generated document sorting and fallback branches.
- CSV export branch behavior for uncommon data shapes.
- Placeholder extraction branches around signature block fields.
- Placeholder readiness logic for whitespace and optional values.

Lower-priority survived areas:

- Browser/server guard branches such as `typeof window === "undefined"`.
- Static React hook helper branches in `permissions.js`.
- String literal changes in low-risk default labels or fallback text.

## Risk Impact

The highest business-risk areas improved during this pass:

- Placeholder mapping improved from a weak area to 87.91.
- Date calculation reached 79.53, just under High threshold.
- CSV export reached 70.73.
- Audit trail remains below the desired module target and should receive additional tests for storage fallback, capped history, and generated document ordering.
- Permission core matrix had no survived mutants, but static/hook helper no-coverage mutants pulled the file score down.

## Final Summary

Mutation testing executed successfully after unit and Playwright gates passed. The final capped mutation run stayed under 1000 mutants, instrumenting 591 mutants and executing 466 after static-mutant filtering. The final score improved from the initial completed baseline of 53.00 to 72.32 after adding focused unit tests.

Final recommendation: accept this as the first mutation baseline for major CLM frontend logic, then add a second expanded mutation phase for `riskEngine`, `requestStore`, `signatureService`, and `aiRepo` once their browser/localStorage dependencies are further isolated.
