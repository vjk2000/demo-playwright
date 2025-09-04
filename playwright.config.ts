import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    actionTimeout: 0,
    trace: 'on-first-retry'
  },
  webServer: {
    command: process.env.CI ? 'npm run preview' : 'npm run dev',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
