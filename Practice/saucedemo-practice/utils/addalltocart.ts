import { Page } from '@playwright/test';

export async function addalltocart(page:Page){

    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
    await page.click('#add-to-cart-sauce-labs-fleece-jacket');
    await page.click('#add-to-cart-sauce-labs-onesie');
    await page.locator('[data-test="add-to-cart-test\.allthethings\(\)-t-shirt-\(red\)"]').click();
    
}