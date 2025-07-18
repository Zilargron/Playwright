import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {

    // Browser page instance
    readonly page: Page;

    // Locators to find elements on the page
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly swaglabsText: Locator;
    readonly productsText: Locator;
    readonly loginErrorMessage: Locator;

    // Connect LoginPage to the browser and set up page locator elements
    constructor(page:Page){

        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: "Login"});
        this.swaglabsText = page.getByText('Swag Labs');
        this.productsText = page.getByText('Products');
        this.loginErrorMessage = page.locator('[data-test="error"]');
    }
    // Go to Landing Page and verifies that it loads correctly
    async goto(url: string){

        await this.page.goto(url);
        await expect(this.page).toHaveURL(url);
        await expect(this.swaglabsText).toBeVisible();
    }
    // Fills Username and Password fields
    async fillCredentials(username: string, password: string){

        await this.usernameField.fill(username);
        await this.passwordField.fill(password);

    }
    // Verify that the username and password fields has values
    async verifyFieldsFilled(username: string, password: string){

        await expect(this.usernameField).toHaveValue(username);
        await expect(this.passwordField).toHaveValue(password);

    }
    // Clicks the Login button
    async clickLoginButton(){

        await this.loginButton.click();

    }
    // Check login error messages for username and password
    async checkLoginErrorMessage(errorText: string){

        await expect(this.loginErrorMessage).toBeVisible();
        await expect(this.loginErrorMessage).toHaveText(errorText);

    }
    // Check if the user successfully Loggedin using valid credentials
    async verifyLoginSuccessfully(url: string){

        await expect(this.page).toHaveURL(url);
        await expect(this.productsText).toBeVisible();
    }
    
}

