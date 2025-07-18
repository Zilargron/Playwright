import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPageOne{

    // Browser instance
    readonly page: Page;

    //Locators
    readonly continueClick: Locator;
    readonly errorMessage: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipOrPostalField: Locator;
    readonly checkoutOverview: Locator;


    constructor(page: Page){

        this.page = page;
        this.continueClick = page.getByRole('button', {name: 'Continue'});
        this.errorMessage = page.locator('[data-test="error"]');
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.zipOrPostalField = page.getByPlaceholder('Zip/Postal Code');
        this.checkoutOverview = page.getByText('Checkout: Overview');

    }
    // Verify that error message appears upon encountering an error
    async checkErrorMessage(errorText: string){

        await this.continueClick.click();
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(errorText);

    }
    // Fill input textbox with text
    async fillCredential(firstName: string, lastName: string, zipOrPostal: string){

        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipOrPostalField.fill(zipOrPostal);

    }
    // Click the continue button after filling up required input textbox
    async clickContinueAfterFillingAllCredentials(url: string){

        await this.continueClick.click();
        await expect(this.page).toHaveURL(url);
        await expect(this.checkoutOverview).toBeVisible();

    }



}