import { test, expect } from '@playwright/test';
import { loginwithcredentials } from '../utils/loginwithcredentials';
import { users } from '../test-data/users';

test.describe('Login tests for all users', () => {
  for (const user of users) {
    test(`Login test for ${user.username}`, async ({ page }) => {
      await loginwithcredentials(page, user.username, user.password);

      if (user.valid) {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      } else {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
      }
    });
  }
});
