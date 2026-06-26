import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["test/unit/**/*.test.{js,jsx,ts,tsx}"],
    setupFiles: ["test/unit/setup.js"],
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "test-results/unit-coverage",
      reporter: ["text", "html"],
      include: ["lib/**/*.js"],
      exclude: ["lib/mockData.js"],
    },
  },
});
