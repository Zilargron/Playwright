import { Page, expect, Locator } from '@playwright/test';

export class Complete{

    // Browser initialized
    readonly page: Page;
    readonly checkOutComplete: Locator;
    readonly ponyExpress: Locator;
    readonly backHomeButton: Locator;

    // Locators

    constructor(page:Page){

        this.page = page;
        this.checkOutComplete = page.getByText('Checkout: Complete!');
        this.ponyExpress = page.getByAltText('Pony Express');
        this.backHomeButton = page.getByRole('button', {name: 'Back Home'});

    }

    async checkoutCompleteDisplayed(){

        await expect(this.checkOutComplete).toBeVisible();
        await expect(this.ponyExpress).toBeVisible();

    }

    async clickBackHomeButton(url: string){

        await this.backHomeButton.click();
        await expect(this.page).toHaveURL(url);
    }

}

