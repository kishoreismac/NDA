/**
 * StrykerJS mutation configuration for CLM frontend business logic.
 *
 * Targets source logic under lib/ and excludes UI-only surfaces, generated
 * output, reports, static assets, docs, and test files.
 */
// @ts-nocheck

module.exports = {
  packageManager: "npm",
  testRunner: "command",
  coverageAnalysis: "off",
  reporters: ["html", "clear-text", "progress"],
  commandRunner: {
    command: "npm.cmd test",
  },
  concurrency: 4,
  mutate: [
    "lib/permissions.js",
    "lib/dateMath.js",
    "lib/placeholders.js",
    "lib/riskEngine.js",
    "lib/requestStore.js",
    "lib/signatureService.js",
    "lib/aiRepo.js",
    "lib/csvExport.js",
    "lib/auditTrail.js",
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
