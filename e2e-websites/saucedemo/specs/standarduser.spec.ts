import { test, expect } from '@playwright/test';

import * as dotenv from 'dotenv';

import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../envs/.env.saucedemo')});

test.use({
    expect: { timeout: 3000 }
});

const baseurl = process.env.BASE_URL || 'https://www.saucedemo.com';
const loggedinurl = process.env.LOGGEDIN_URL || 'https://www.saucedemo.com/inventory.html';
const carturl = process.env.CART_URL || 'https://www.saucedemo.com/cart.html';
const checkout1url = process.env.CHECKOUT1_URL || 'https://www.saucedemo.com/checkout-step-one.html';
const checkout2url = process.env.CHECKOUT2_URL || 'https://www.saucedemo.com/checkout-step-two.html';
const user_standard = process.env.USER_STANDARD || '';
const pass_standard = process.env.PASS_STANDARD || '';

test.describe('end-to-end flow for standarduser', () => {

    test('Full end-to-end process ', async({ page }) => {

        await test.step('01 - Go to Landing page', async() => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.getByText('Swag Labs')).toBeVisible();

        });

        await test.step('02 - Enter username and password using Standard Users credentials', async() => {

            await page.getByPlaceholder('Username').fill(user_standard);

            await page.getByPlaceholder('Password').fill(pass_standard);

            await expect(page.getByPlaceholder('Username')).toHaveValue(user_standard);

            await expect(page.getByPlaceholder('Password')).toHaveValue(pass_standard);

        });

        await test.step('03 - Verify Login', async () => {

            await page.getByRole('button', {name: "Login"}).click();

            await expect(page).toHaveURL(loggedinurl);

            await expect(page.getByText('Products')).toBeVisible();

        })

        await test.step('04 - Verify Product page list and dropdown is displayed', async() => {

            await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

            await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
            
            await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('az');

        })

        await test.step('05 - Add items to cart and change item sort to high-low', async() => {

            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

            await page.locator('[data-test="product-sort-container"]').click();

            await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

            await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

            await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('4');

        });

        await test.step('06 - Remove items and go to cart to verify if the list and price is right', async() => {

            await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();

            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

            await page.locator('[data-test="shopping-cart-link"]').click();
            
            await expect(page).toHaveURL(carturl);

            await expect(page.getByText('Your Cart')).toBeVisible();

            const items = page.locator('[data-test="inventory-item"]');
            
            await expect(items).toHaveCount(3);

            await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
            
            await expect(items.nth(0).locator('[data-test="inventory-item-price"]')).toHaveText('$29.99')

            await expect(items.nth(1).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Bike Light');

            await expect(items.nth(1).locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

            await expect(items.nth(2).locator('[data-test="inventory-item-name"]')).toHaveText('Test.allTheThings() T-Shirt (Red)');

            await expect(items.nth(2).locator('[data-test="inventory-item-price"]')).toHaveText('$15.99');

        });

        await test.step('07 - Remove one item from cart and proceed to check out page', async() => {

            await page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();

            const items = page.locator('[data-test="inventory-item"]');
            
            await expect(items).toHaveCount(2);

            await page.getByRole('button', {name: 'checkout'}).click();

            await expect(page).toHaveURL(checkout1url);

            await expect(page.getByText('Checkout: Your Information')).toBeVisible();

        });

        await test.step('08 - Fill out checkout information', async() => {

            const error = await page.locator('[data-test="error"]');

            const continueclick = await page.getByRole('button', {name: 'Continue'});

            await continueclick.click();

            await expect(error).toHaveText('Error: First Name is required');

            await page.getByPlaceholder('First Name').fill('Mike');

            await continueclick.click();

            await expect(error).toHaveText ('Error: Last Name is required');

            await page.getByPlaceholder('Last Name').fill('Wazowski');

            await continueclick.click();

            await expect(error).toHaveText('Error: Postal Code is required');

            await page.getByPlaceholder('Zip/Postal Code').fill('1000');

            await continueclick.click();

            await expect(page).toHaveURL(checkout2url);

            await expect(page.getByText('Checkout: Overview')).toBeVisible();

        });

        await test.step('09 - Verify order summary', async() => {

            const items = page.locator('[data-test="inventory-item"]');

            await expect(items).toHaveCount(2);

            await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

            await expect(items.nth(0).locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');

            await expect(items.nth(1).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Bike Light');

            await expect(items.nth(1).locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

        });


        await test.step('10 - Complete checkout process', async() => {
            
            await page.getByRole('button', {name: 'Finish'}).click();

            await expect(page.getByText('Checkout: Complete!')).toBeVisible();

            await expect(page.getByAltText('Pony Express')).toBeVisible();

            await page.getByRole('button', {name: 'Back Home'}).click();

            await expect(page).toHaveURL(loggedinurl);

        });

        await test.step('11 - Logout', async() => {

            await page.getByRole('button', {name: 'Open Menu'}).click();

            await page.getByRole('link', {name: 'Logout'}).click();

            await expect(page).toHaveURL(baseurl);  

        });

    });

});