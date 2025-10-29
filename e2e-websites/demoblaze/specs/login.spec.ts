import {test,expect} from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({path: path.resolve(__dirname, '../../../envs/.env.demoblaze')});

import {LoginPage} from '../pages/loginPage';
import { log } from 'console';

const baseurl = process.env.BASE_URL || 'https://www.demoblaze.com/index.html';
const username = process.env.DEMOBLAZE_USERNAME || '';
const password = process.env.DEMOBLAZE_PASSWORD || '';
const wrongusername = process.env.DEMOBLAZE_WRONGUSERNAME || '';
const wrongpassword = process.env.DEMOBLAZE_WRONGPASSWORD || '';


test.describe('Login Feature', () => {

    test('Verify that user can log-in successfully', async({page}) => {

        const loginPage = new LoginPage(page);

        await test.step ('01 - Go to the landing page', async() => {

            await loginPage.goto(baseurl);
        });

        await test.step ('02 - Click the Log-in link', async() => {

            await loginPage.openLoginModal();

        });

        await test.step ('03 - Fill and verify credentials input', async() => {

            await loginPage.fillCredentials(username, password);
            await loginPage.verifyFieldsContent(username, password);

        });

        await test.step ('04 - CLick the login button and click logout', async() => {

           await loginPage.clickLogInButton();
           await loginPage.waitForSuccessfulLogin(username);
           await loginPage.clickLogOutLink();
            
        });
        
    });

    test('Verify that the user cannot login with an invalid credentials', async({page}) => {

        const loginPage = new LoginPage(page);

        await test.step('01 - Go to the landing page', async() => {

            await loginPage.goto(baseurl);

        });

        await test.step ('02 - Login using wrong credentials', async() => {

            await loginPage.openLoginModal();
            await loginPage.fillCredentials(wrongusername, wrongpassword);
            const alertMsg = await loginPage.captureLoginAlert();
            expect(alertMsg).toContain('User does not exist.');
            await loginPage.closeLoginModalWithTheCloseButton();
            
        });

        await test.step ('03 - Login using right username and wrong password', async() => {

            await loginPage.openLoginModal();
            await loginPage.fillCredentials(username, wrongpassword);
            const alertMsg = await loginPage.captureLoginAlert();
            expect(alertMsg).toContain('Wrong password.');
            await loginPage.closeLoginModalWithTheXButton();

        });

    });

});