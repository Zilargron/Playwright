import { test, expect } from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';

import  { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPageOne } from '../pages/checkoutPageOne';
import { CheckoutPageTwo } from '../pages/checkoutPageTwo';
import { Complete } from '../pages/completePage';

dotenv.config({ path: path.resolve(__dirname, '../../../envs/.env.saucedemo') });

const baseurl = process.env.BASE_URL || 'https://www.saucedemo.com';
const loggedinurl = process.env.LOGGEDIN_URL || 'https://www.saucedemo.com/inventory.html';
const carturl = process.env.CART_URL || 'https://www.saucedemo.com/cart.html';
const checkout1url = process.env.CHECKOUT1_URL || 'https://www.saucedemo.com/checkout-step-one.html';
const checkout2url = process.env.CHECKOUT2_URL || 'https://www.saucedemo.com/checkout-step-two.html';
const user_standard = process.env.USER_STANDARD || '';
const pass_standard = process.env.PASS_STANDARD || '';

test.describe('end-to-end flow for standarduser', () => {

    test('Full end-to-end process', async({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPageOne = new CheckoutPageOne(page);
        const checkoutPageTwo = new CheckoutPageTwo(page);
        const complete = new Complete(page);

        await test.step('01 - Go to Landing page', async() => {

            await loginPage.goto(baseurl);

        });

        await test.step('02 - Enter username and password using Standard Users credentials', async() => {
            
            await loginPage.fillCredentials('', '');
            await loginPage.clickLoginButton();
            await loginPage.checkLoginErrorMessage('Epic sadface: Username is required');

            await loginPage.fillCredentials(user_standard, '');
            await loginPage.clickLoginButton();
            await loginPage.checkLoginErrorMessage('Epic sadface: Password is required');

            await loginPage.fillCredentials(user_standard, 'wrong_password');
            await loginPage.clickLoginButton();
            await loginPage.checkLoginErrorMessage('Epic sadface: Username and password do not match any user in this service');


            await loginPage.fillCredentials(user_standard, pass_standard);
            await loginPage.verifyFieldsFilled(user_standard, pass_standard);

        });

        await test.step('03 - Verify Login', async () => {

            await loginPage.clickLoginButton();
            await loginPage.verifyLoginSuccessfully(loggedinurl);

        })

        await test.step('04 - Verify Product page list and dropdown is displayed', async() => {

            await inventoryPage.verifyProductsListAndSorterDisplayed();
            await inventoryPage.verifyDefaultSortOption('az');

        })

        await test.step('05 - Add items to cart and change item sort oprions', async() => {
            
            await inventoryPage.selectAndVerifySortOption('za');
            await inventoryPage.selectAndVerifySortOption('lohi');
            await inventoryPage.selectAndVerifySortOption('hilo');        
            await inventoryPage.addItemToCart('sauce-labs-backpack');
            await inventoryPage.addItemToCart('sauce-labs-bike-light');
 
            await inventoryPage.verifyCartItemCount('2');

            await inventoryPage.addItemToCart('test.allthethings()-t-shirt-(red)');
            await inventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');

            await inventoryPage.verifyCartItemCount('4');

            await inventoryPage.addItemToCart('sauce-labs-fleece-jacket');
            await inventoryPage.addItemToCart('sauce-labs-onesie');

            await inventoryPage.verifyCartItemCount('6');

        });

        await test.step('06 - Remove items and go to cart to verify if the list and price is right', async() => {

            await inventoryPage.removeItemFromCart('sauce-labs-bolt-t-shirt');
            await inventoryPage.verifyCartItemCount('5');

            await cartPage.clickCartIconAndCheckCartVisible(carturl);
            
            await cartPage.verifyCartItemsCount(5);

            await cartPage.verifyItemNameAndPrice(0, 'Sauce Labs Backpack', '$29.99');
            await cartPage.verifyItemNameAndPrice(1, 'Sauce Labs Bike Light', '$9.99');
            await cartPage.verifyItemNameAndPrice(2, 'Test.allTheThings() T-Shirt (Red)', '$15.99');
            await cartPage.verifyItemNameAndPrice(3, 'Sauce Labs Fleece Jacket', '$49.99');
            await cartPage.verifyItemNameAndPrice(4, 'Sauce Labs Onesie', '$7.99');

        });

        await test.step('07 - Remove one item from cart and proceed to check out page', async() => {

            await cartPage.removeItemFromCartPage('sauce-labs-backpack');
            await cartPage.removeItemFromCartPage('test.allthethings()-t-shirt-(red)');

            await cartPage.verifyCartItemsCount(3);

            await cartPage.clickCheckoutButton(checkout1url);

        });

        await test.step('08 - Fill out checkout information', async() => {

            await checkoutPageOne.checkErrorMessage('Error: First Name is required');

            await checkoutPageOne.fillCredential('Mike', '', '');
            await checkoutPageOne.checkErrorMessage('Error: Last Name is required');

            await checkoutPageOne.fillCredential('Mike', 'Wazowski', '');
            await checkoutPageOne.checkErrorMessage('Error: Postal Code is required');

            await checkoutPageOne.fillCredential('Mike', 'Wazowski', '1002');
            await checkoutPageOne.clickContinueAfterFillingAllCredentials(checkout2url);

        });

        await test.step('09 - Verify order summary', async() => {

            await checkoutPageTwo.itemCountInOverviewPage(3);

            await checkoutPageTwo.verifyTheCartListInTheOverviewPage(0, 'Sauce Labs Bike Light', '$9.99')
            await checkoutPageTwo.verifyTheCartListInTheOverviewPage(1, 'Sauce Labs Fleece Jacket', '$49.99')
            await checkoutPageTwo.verifyTheCartListInTheOverviewPage(2, 'Sauce Labs Onesie', '$7.99')

        });


        await test.step('10 - Complete checkout process', async() => {
            
            await checkoutPageTwo.clickTheFinishButton(baseurl + '/checkout-complete.html');
            
            await complete.checkoutCompleteDisplayed();
            await complete.clickBackHomeButton(loggedinurl);

        });

        await test.step('11 - Logout', async() => {

            await page.getByRole('button', {name: 'Open Menu'}).click();
            await page.getByRole('link', {name: 'Logout'}).click();

            await expect(page).toHaveURL(baseurl);  

        });

    });

});