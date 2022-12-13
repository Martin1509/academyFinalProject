import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  const hello = page.locator('#root');
  await expect(hello).toHaveText('Hello World');
});
