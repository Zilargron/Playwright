import { Page, expect, Locator } from '@playwright/test';

export class InventoryItemPage {

    // Browser instance
    readonly page: Page;

    // Locators
    readonly inventoryItemHolder: Locator;
    readonly itemname: Locator;
    readonly itemdesc: Locator;
    readonly itemprice: Locator;
    readonly goBack: Locator;

    constructor(page:Page){

        this.page = page;
        this.inventoryItemHolder = page.locator('[data-test="inventory-item"]');
        this.goBack = page.getByRole('button', {name: 'Back to products'});
        this.itemname = page.locator('[data-test="inventory-item-name"]');
        this.itemdesc = page.locator('[data-test="inventory-item-desc"]');
        this. itemprice = page.locator('[data-test="inventory-item-price"]');

    }

    async checkListToHaveCount(count: number){

        await expect(this.inventoryItemHolder).toHaveCount(count);

    }

    async clickItemNameUsingIndex(index: number){

        const itemindex = this.inventoryItemHolder.nth(index);
        const itemnameclick = itemindex.locator('[data-test="inventory-item-name"]');
        
        await itemnameclick.click();

    }

    async verifyItemNamePriceDescription(name: string, desc: string, price: string){

        await expect(this.itemname).toHaveText(name);
        await expect(this.itemdesc).toHaveText(desc);
        await expect(this.itemprice).toHaveText(price);

    }

    async goBackToInventoryPage(){

        await this.goBack.click();
    }



}

