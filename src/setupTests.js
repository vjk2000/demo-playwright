// src/setupTests.js
// With globals: true in vitest config, expect is already available globally
import "@testing-library/jest-dom";

// Set up DOM cleanup after each test
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});