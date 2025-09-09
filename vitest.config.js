import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Add React plugin for JSX support
  test: {
    environment: "jsdom",
    globals: true, // This makes expect available globally
    include: ["src/__tests__/**/*.test.{js,jsx,ts,tsx}"], // ✅ only React unit tests
    exclude: [
      "node_modules",
      "e2e",                   // exclude Playwright e2e folder
      "tests",                 // or wherever Playwright tests live
      "**/*.spec.{js,ts,jsx,tsx}" // exclude Playwright *.spec.js files
    ],
    setupFiles: "./src/setupTests.js",
  },
});