import {Page, expect, Locator} from '@playwright/test';

export class LoginPage{

    // Browser page instaance 
    readonly page: Page;

    // Locators
    readonly loginLink: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly closeButton: Locator;
    readonly xButton: Locator;
    readonly welcomeMessage: Locator;
    readonly logo: Locator;
    readonly modaltitle: Locator;
    readonly logoutLink: Locator;


    // Connect LoginPage to the browser and set up page locator elements
    constructor(page:Page){

        this.page = page;
        this.loginLink = page.getByRole('link', {name: "Log in"});
        this.logoutLink = page.getByRole('link', {name: "Log out"});
        this.usernameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', {name: "Log in"});
        this.xButton = page.getByRole('button', {name: "Close"}).nth(0);
        this.closeButton = page.getByRole('button', {name: "Close"}).nth(1);
        this.welcomeMessage = page.locator('#nameofuser')
        this.logo = page.locator('img[src="blazemeter-favicon-512x512.png"]').nth(0);
        this.modaltitle = page.locator('#logInModalLabel');



    }

    async goto(url: string){

        await this.page.goto(url);
        await expect(this.page).toHaveURL(url);
        await expect(this.logo).toBeVisible();

    }

    async openLoginModal(){

        await this.loginLink.click();
        await expect(this.modaltitle).toBeVisible();

    }

    async fillCredentials(username: string, password: string){

        await this.usernameField.fill(username);
        await this.passwordField.fill(password);

    }

    async verifyFieldsContent(username: string, password: string){

        await expect(this.usernameField).toHaveValue(username);
        await expect(this.passwordField).toHaveValue(password);
    }

    async clickLogInButton(){

        await this.loginButton.click();

    }

    async clickLogOutLink(){

        await this.logoutLink.click();
        await this.page.waitForTimeout(2500);
        await expect(this.loginLink).toBeVisible();

    }

    async captureLoginAlert() {
        const [dialog] = await Promise.all([
        this.page.waitForEvent('dialog'),
        this.clickLogInButton(),
        ]);
        console.log('Alert message:', dialog.message());
        await dialog.accept();
        return dialog.message();
    }

    

}