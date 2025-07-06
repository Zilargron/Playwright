    import {Page} from '@playwright/test';

    export async function loginwithcredentials(page:Page, username:string, password:string) {

        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.getByRole('button', {name:'Login'}).click();
    }