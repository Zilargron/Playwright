import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPageTwo{

    // Broswer instance
    readonly page: Page;


    // Locators
    readonly itemHolder: Locator;
    readonly finishButton: Locator;  

    constructor(page:Page){

        this.page = page;
        this.itemHolder = page.locator('[data-test="inventory-item"]');
        this.finishButton = page.getByRole('button', {name: 'Finish'});
        

    }

    async itemCountInOverviewPage(itemcount: number){

        await expect(this.itemHolder).toHaveCount(itemcount);

    }

    async verifyTheCartListInTheOverviewPage(index: number, itemname: string, itemprice: string){

        const itemsindex = this.itemHolder.nth(index);
        const itemnamelocator = itemsindex.locator('[data-test="inventory-item-name"]');
        const itempricelocator = itemsindex.locator('[data-test="inventory-item-price"]');

        await expect(itemnamelocator).toHaveText(itemname);
        await expect(itempricelocator).toHaveText(itemprice);

    }

    async clickTheFinishButton(url: string){

        await this.finishButton.click();
        await expect(this.page).toHaveURL(url);
        

    }

}