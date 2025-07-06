import {Page} from 'playwright';

export async function validlogin(page : Page){

    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password','secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();
}