/**
 * StrykerJS mutation configuration for CLM frontend business logic.
 *
 * Targets focused source logic under lib/ and excludes UI-only surfaces,
 * generated output, reports, static assets, docs, and test files.
 *
 * The first executable mutation gate intentionally focuses on pure, fast
 * business logic. Larger browser/localStorage-backed modules are handled in
 * the documented phase-two plan because they generated thousands of mutants
 * and multi-hour runtime on this Windows demo environment.
 */
// @ts-nocheck

module.exports = {
  packageManager: "npm",
  testRunner: "vitest",
  coverageAnalysis: "perTest",
  reporters: ["html", "clear-text", "progress"],
  vitest: {
    configFile: "vitest.config.mjs",
    related: true,
  },
  concurrency: 2,
  mutate: [
    "lib/permissions.js",
    "lib/dateMath.js",
    "lib/placeholders.js",
    "lib/csvExport.js",
    "lib/auditTrail.js",
    "!lib/riskEngine.js",
    "!lib/requestStore.js",
    "!lib/signatureService.js",
    "!lib/aiRepo.js",
    "!lib/mockData.js",
    "!lib/documentGenerator.js",
    "!lib/templates.js",
    "!lib/roleStore.js",
    "!lib/userStore.js",
    "!lib/customTemplates.js",
    "!lib/autoAssignmentRules.js",
    "!lib/aiAnalysis.js",
    "!lib/aiChat.js",
    "!lib/aiClauses.js",
    "!lib/aiExtract.js",
    "!**/*.test.js",
    "!**/*.spec.ts",
    "!**/*.config.*",
  ],
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "coverage/**",
    "test-results/**",
    "playwright-report/**",
    "docs/**",
    "doc/**",
    "deploy/**",
    "stage_logs/**",
    "app/**/*.css",
    "components/**",
    "**/*.zip",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.svg",
    "**/*.webp",
  ],
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
  htmlReporter: {
    fileName: "test-results/mutation/index.html",
  },
  tempDirName: "test-results/stryker-tmp",
  timeoutMS: 10_000,
  timeoutFactor: 1.5,
};
