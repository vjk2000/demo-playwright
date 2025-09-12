
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    actionTimeout: 0,
    trace: 'on-first-retry'
  },
  webServer: {
    // In CI run a small static server that serves dist; locally still use dev for convenience
    command: process.env.CI
      ? 'npx http-server ./dist -p 5173 -s'
      : 'npm run dev',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 5 * 60 * 1000 // 5 minutes
  }
});
