import { test, expect } from '@playwright/test';
import { loginwithcredentials } from '../utils/loginwithcredentials';
import { users } from '../test-data/users';

test('Login and add all to cart', async ({page}) => {
    
    await loginwithcredentials(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
    await page.click('#add-to-cart-sauce-labs-fleece-jacket');
    await page.click('#add-to-cart-sauce-labs-onesie');
    await page.locator('[data-test="add-to-cart-test\.allthethings\(\)-t-shirt-\(red\)"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toHaveCount(6);
});