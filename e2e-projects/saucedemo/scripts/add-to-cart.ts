import { chromium } from 'playwright';

(async () => {
    let browser;

    try{
        browser = await chromium.launch({
            headless: false,
            slowMo: 1000
        });
        const page = await browser.newPage();
        await page.goto ('https://www.saucedemo.com')

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.getByRole('button', {name:'Login'}).click();

        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-bike-light');
        await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
        await page.click('#add-to-cart-sauce-labs-fleece-jacket');
        await page.click('#add-to-cart-sauce-labs-onesie');
        await page.locator('[data-test="add-to-cart-test\.allthethings\(\)-t-shirt-\(red\)"]').click();

        await page.locator('[data-test="shopping-cart-link"]').click();

    } catch (error){
        console.error('Something went wrong', error)
    } finally {
        if (browser){
            await browser.close();
        }
    }

})();