import {chromium} from 'playwright';

(async () => {
    let browser;

    try{
    browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });
    const page = await browser.newPage();
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password','secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();

    await page.waitForTimeout(3000);   
} 
    catch (error) {
    console.error('Something went wrong', error);
} 
    finally {
    if (browser){
    await browser.close();
    }
}
})();