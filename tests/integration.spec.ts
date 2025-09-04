import { test, expect } from '@playwright/test';

test('example API check (external)', async ({ request }) => {
  const res = await request.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toHaveProperty('id', 1);
});
