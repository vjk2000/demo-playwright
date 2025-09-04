// import { test, expect } from '@playwright/test';

// test('counter increments and loads message (with network interception)', async ({ page }) => {
//   await page.goto('/');
//   await expect(page.locator('text=Counter: 0')).toBeVisible();

//   await page.click('text=Increment');
//   await expect(page.locator('text=Counter: 1')).toBeVisible();

//   // Intercept frontend call to /api/message and return stable response
//   await page.route('**/api/message', route =>
//     route.fulfill({
//       status: 200,
//       contentType: 'application/json',
//       body: JSON.stringify({ message: 'Hello from intercepted API' })
//     })
//   );

//   await page.click('text=Load message');
//   await expect(page.locator('text=Hello from intercepted API')).toBeVisible();
// });
