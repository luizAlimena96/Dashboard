import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Dashboard Industrial/);
  const header = page.getByRole('banner');
  await expect(header).toBeVisible();
  const mainContent = page.getByRole('main');
  await expect(mainContent).toBeVisible();
});
