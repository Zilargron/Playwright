import {test, expect} from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({path: path.resolve(__dirname, '../../../envs/.env.demoblaze')});

import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';

const baseurl = process.env.BASE_URL || '';
const email = process.env.CONTACT_EMAIL || '';
const name = process.env.CONTACT_NAME || '';
const message = process.env.CONTACT_MESSAGE || '';

test.describe('Home features', () => {

    test('Categories', async({page}) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await test.step('01 - Go to the landing page', async() => {

            await loginPage.goto(baseurl);

        });

        await test.step('02 - Click the phones category and check the list update', async() => {

            await homePage.clickphones();

        });

        await test.step('03 - Click the laptops category and check the list update', async() => {

            await homePage.clicklaptops();

        });

        await test.step('04 - Click the monitors category and check the list update', async() => {

            await homePage.clickmonitors();

        });

    });

    test('Carousel', async({page}) => {

        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await test.step('01 - Go to the Landing page and wait for carousel to be ready', async() => {

            await loginPage.goto(baseurl);
            await homePage.waitForCarousel();
        });

        await test.step('02 - Get the information of the active images and click next and previous', async() => {

            const firstImg = await homePage.getActiveImgSrc();
            await homePage.carouselClickNext();
            const secondImg = await homePage.getActiveImgSrc();
            expect(firstImg).not.toBe(secondImg);

            await homePage.carouselClickNext();
            const thirdImg = await homePage.getActiveImgSrc();
            expect(thirdImg).not.toBe(secondImg);

            await homePage.carouselClickPrev();
            const goingBack = await homePage.getActiveImgSrc();
            expect(goingBack).not.toBe(thirdImg);

        });

    });

    test('Navbar Links', async({page}) => {

        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await test.step('01 - Go to the landing page', async() => {

            await loginPage.goto(baseurl);

        });

        await test.step('02 - Home navbar link', async() => {

            await homePage.clickHomeLink(baseurl);

        });

        await test.step('03 - Contact navbar link, Click Fill and Send', async() => {
            
            await homePage.clickContactLink();
            await homePage.fillContactModalMessages(email, name, message);
            await homePage.clickContactSendMessage();

        });

        await test.step('04 - About us', async() => {



        });
        /*
        LOGIN PAGE ALREADY COVERED IN LOGIN.SPEC.TS
        */

        await test.step('05 -   Sign UP', async() => {



        });


    });

    test('Cart', async({page}) => {
        
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await test.step('01 - Go to the landing page', async() => {

            await loginPage.goto(baseurl);

        });

        await test.step('02 - Click the Cart Navbar Link', async() => {

            

        });

    });
});
