import { test, expect } from '@playwright/test';
import { loginwithcredentials } from '../utils/loginwithcredentials';
import { users } from '../test-data/validusers';

test.describe('Login and Logout for valid users', () => {
    for (const user of users){
        test(`Login and logout for ${user.username}`, async ({page}) => {
            await loginwithcredentials(page, user.username, user.password);

            if (user.valid){
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

                await page.click('#react-burger-menu-btn');
                await page.getByRole('link', {name:'Logout'}).click();

                await expect(page).toHaveURL('https://www.saucedemo.com');
            } else {
                await expect(page.locator('[data-test="error"]')).toBeVisible();
            }
        });
    }
});
