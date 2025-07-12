// import the Playwright testing functions 'test' and 'expect' to write tests and assertions.
import { test, expect } from '@playwright/test';

// import the dotenv package to load environment variables from a .env file.
// This allows us to use sensitive information like usernames and passwords without hardcoding them in the code.
import * as dotenv from 'dotenv';

// import 'path' to help build the file path to the .env file.
// This is useful for locating the .env file relative to the current file's location.
import * as path from 'path';

// Load environment variables from the .env.saucedemo file.
// __dirname is the current file's directory, and we resolve the path to the .env.sacusedemo file.
// This allows us to access the variables defined in that file.
dotenv.config({ path: path.resolve(__dirname, '../../../envs/.env.saucedemo') });

//Variables
const baseurl = process.env.BASE_URL || 'https://www.saucedemo.com';
const user_standard = process.env.USER_STANDARD || '';
const pass_standard = process.env.PASS_STANDARD || '';
const user_locked = process.env.USER_LOCKED || '';
const pass_locked = process.env.PASS_LOCKED || '';
const user_problem = process.env.USER_PROBLEM || '';
const pass_problem = process.env.PASS_PROBLEM || '';
const user_performance = process.env.USER_PERFORMANCE || '';
const pass_performance = process.env.PASS_PERFORMANCE || '';
const user_error = process.env.USER_ERROR || '';
const pass_error = process.env.PASS_ERROR || '';
const user_visual = process.env.USER_VISUAL || '';
const pass_visual = process.env.PASS_VISUAL || '';
const user_nomatch = process.env.USER_NOMATCH || '';
const pass_nomatch = process.env.USER_NOMATCH || '';

// Describe a test suite for the login flow of the SauceDemo application.
// This is a logical grouping of tests that will run together, making it easier to manage and
test.describe('00 - Login flow for SauceDemo', () => {
    
    test('01 - Log in as user_standard', async ({ page }) => {

        await test.step('Go to the landing page', async () => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();

        });

        await test.step('Enter username and password as user standard', async () => {

            await page.locator('input[data-test="username"]').fill(user_standard);
            
            await page.locator('input[data-test="password"]').fill(pass_standard);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_standard);

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_standard);

        });

        await test.step('Verify login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            await expect(page.locator('[data-test="title"]')).toBeVisible();

            await expect(page.locator('.inventory_container')).toBeVisible();

        });


    });

    test('02 - Login as user locked', async ({ page }) => {

        await test.step('Go to Landing page', async () => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();
        });

        await test.step('Enter username and password as user locked', async () => {

            await page.locator('input[data-test="username"]').fill(user_locked);

            await page.locator('input[data-test="password"]').fill(pass_locked);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_locked);

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_locked);

        });

        await test.step('Verify login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            const error = page.locator('[data-test="error"]');
            
            await expect(error).toBeVisible();

            await expect(error).toContainText('locked out');

        });

    });

    test('03 - Login as user problem', async ({ page }) => {

        await test.step('Got to Landing page', async () => {
            
            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();

        });

        await test.step('Enter username and password as user problem', async () => {

            await page.locator('input[data-test="username"]').fill(user_problem);
            
            await page.locator('input[data-test="password"]').fill(pass_problem);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_problem);

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_problem);

        });

        await test.step('Verify login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            await expect(page.locator('[data-test="title"]')).toBeVisible();

            await expect(page.locator('.inventory_container')).toBeVisible();

        });

    });

    test('04 - Login as user performance', async ({ page }) => {

        await test.step('Go to Landing page', async () => {
            
            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();

        });

       await test.step('Enter username and password as user performance', async () => {

            await page.locator('input[data-test="username"]').fill(user_performance);
            
            await page.locator('input[data-test="password"]').fill(pass_performance);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_performance);

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_performance);

        });

        await test.step('Verify login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            await expect(page.locator('[data-test="title"]')).toBeVisible();

            await expect(page.locator('.inventory_container')).toBeVisible();

        });

    });

    test('05 - Login as user error', async ({ page }) => {
        
        await test.step('Go to Landing page', async () => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();
            
        })

        await test.step('Enter username and password as user error', async () => {

            await page.locator('input[data-test="username"]').fill(user_error);
            
            await page.locator('input[data-test="password"]').fill(pass_error);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_error);

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_error);            

        });

        await test.step('Verify login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            await expect(page.locator('[data-test="title"]')).toBeVisible();

            await expect(page.locator('.inventory_container')).toBeVisible();

        });

    });

    test('06 - Login as user visual', async ({ page }) => {
        
        await test.step('Go to Landing page', async () => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();
            
        })

        await test.step('Enter username and password as user visual', async () => {

            await page.locator('input[data-test="username"]').fill(user_visual);
            
            await page.locator('input[data-test="password"]').fill(pass_visual);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_visual);

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_visual);            

        });

        await test.step('Verify login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            await expect(page.locator('[data-test="title"]')).toBeVisible();

            await expect(page.locator('.inventory_container')).toBeVisible();

        });

    });

    test('07 - Login as a user with no matching credentials', async ({ page }) => {

        await test.step('Go to Landing page', async () => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();

        });

        await test.step('Enter username and password with no matching credentials', async () => {

            await page.locator('input[data-test="username"]').fill(user_nomatch);

            await page.locator('input[data-test="password"]').fill(pass_nomatch);

            await expect(page.locator('input[data-test="username"]')).toHaveValue(user_nomatch)

            await expect(page.locator('input[data-test="password"]')).toHaveValue(pass_nomatch);

        });

        await test.step('Verify Login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            const error2 = page.locator('[data-test="error"]');
            
            await expect(error2).toBeVisible();

            await expect(error2).toContainText('not match any user in this service');
        });

    });

    test('08 - Login without entering username or password', async({ page }) => {

        await test.step('Go to Landing page', async () => {

            await page.goto(baseurl);

            await expect(page).toHaveURL(baseurl);

            await expect(page.locator('.login_logo')).toBeVisible();

        });

        await test.step('Click Login', async () => {

            await page.getByRole('button', {name: 'Login'}).click();

            const error3 = page.locator('[data-test="error"]');

            await expect(error3).toBeVisible();

            await expect(error3).toContainText('Username is required');

        });

    });


});