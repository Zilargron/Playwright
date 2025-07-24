import { test, expect } from '@playwright/test';

// dotenv 
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../envs/.env.saucedemo') });

import { LoginPage } from '../pages/loginPage';
import { InventoryItemPage } from '../pages/inventoryItemPage';

// Variables
const baseurl = process.env.BASE_URL || 'https://www.saucedemo.com';
const loggedinurl = process.env.LOGGEDIN_URL || 'https://www.saucedemo.com/inventory.html'
const user_standard = process.env.USER_STANDARD || '';
const pass_standard = process.env.PASS_STANDARD || '';

test.describe('Checking Item Pages', () => {

    test('Verify item name, description and price', async({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryItemPage = new InventoryItemPage(page);

        await test.step ('Go to Landing Page and login', async() => {

            await loginPage.goto(baseurl);
            await loginPage.fillCredentials(user_standard, pass_standard);
            await loginPage.clickLoginButton();
            await loginPage.verifyLoginSuccessfully(loggedinurl);

        });

        await test.step('Verify inventory list to have items', async() => {

            await inventoryItemPage.checkListToHaveCount(6);

        });

        await test.step('Open Sauce Labs Backpack item page and verify it\'s information', async() => {

            await inventoryItemPage.clickItemNameUsingIndex(0);
            await inventoryItemPage.verifyItemNamePriceDescription('Sauce Labs Backpack', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', '$29.99');
            await inventoryItemPage.goBackToInventoryPage();

        });

        await test.step('Open Sauce Labs Bike Light item page and verify it\'s information', async() => {

            await inventoryItemPage.clickItemNameUsingIndex(1);
            await inventoryItemPage.verifyItemNamePriceDescription('Sauce Labs Bike Light', 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.', '$9.99');
            await inventoryItemPage.goBackToInventoryPage();

        });

        await test.step('Open Sauce Labs Bolt T-Shirt item page and verify it\'s information', async() => {

            await inventoryItemPage.clickItemNameUsingIndex(2);
            await inventoryItemPage.verifyItemNamePriceDescription('Sauce Labs Bolt T-Shirt', 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', '$15.99');
            await inventoryItemPage.goBackToInventoryPage();

        });

        await test.step('Open Sauce Labs Fleece Jacket item page and verify it\'s information', async() => {

            await inventoryItemPage.clickItemNameUsingIndex(3);
            await inventoryItemPage.verifyItemNamePriceDescription('Sauce Labs Fleece Jacket', 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.', '$49.99');
            await inventoryItemPage.goBackToInventoryPage();

        });

        await test.step('Open Sauce Labs Onesie item page and verify it\'s information', async() => {

            await inventoryItemPage.clickItemNameUsingIndex(4);
            await inventoryItemPage.verifyItemNamePriceDescription('Sauce Labs Onesie', 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.', '$7.99');
            await inventoryItemPage.goBackToInventoryPage();

        });

        await test.step('Open Test.allTheThings() T-Shirt (Red) item page and verify it\'s information', async() => {

            await inventoryItemPage.clickItemNameUsingIndex(5);
            await inventoryItemPage.verifyItemNamePriceDescription('Test.allTheThings() T-Shirt (Red)', 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', '$15.99');
            await inventoryItemPage.goBackToInventoryPage();

        });

    });

});