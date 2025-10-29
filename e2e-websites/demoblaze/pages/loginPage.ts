import {Page, expect, Locator} from '@playwright/test';

export class LoginPage{

    // Browser page instaance 
    readonly page: Page;

    // Locators
    readonly loginLink: Locator;
    readonly modal: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly closeButton: Locator;
    readonly xButton: Locator;
    readonly welcomeMessage: Locator;
    readonly logo: Locator;
    readonly logoutLink: Locator;
    readonly loginModalLabel: Locator;


    // Connect LoginPage to the browser and set up page locator elements
    constructor(page:Page){

        this.page = page;
        this.loginLink = page.getByRole('link', {name: "Log in"});
        this.logoutLink = page.getByRole('link', {name: "Log out"});
        this.modal = page.locator('#logInModal');
        this.loginModalLabel = this.modal.locator('#logInModalLabel');
        this.usernameField = this.modal.locator('#loginusername');
        this.passwordField = this.modal.locator('#loginpassword');
        this.loginButton = this.modal.getByRole('button', {name: "Log in"});
        this.xButton = this.modal.getByRole('button', {name: "Close"}).first();
        this.closeButton = this.modal.getByRole('button', {name: "Close"}).last();
        this.welcomeMessage = page.locator('#nameofuser')
        this.logo = page.locator('img[src="blazemeter-favicon-512x512.png"]').first();

    }

    async goto(url: string){

        await this.page.goto(url);
        await expect(this.page).toHaveURL(url);
        await expect(this.logo).toBeVisible();

    }

    async openLoginModal(){

        await this.loginLink.click();
        await this.modal.waitFor({state: 'visible'});
        await expect(this.loginModalLabel).toBeVisible();

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

    async waitForSuccessfulLogin(username: string){

        await expect(this.welcomeMessage).toBeVisible({timeout: 7000});
        await expect(this.welcomeMessage).toContainText(username, {timeout: 7000});

    }

    async clickLogOutLink(){

        await this.logoutLink.click();
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

    async closeLoginModalWithTheCloseButton(){
        await expect(this.loginModalLabel).toBeVisible();
        await this.closeButton.click();
        await expect(this.loginModalLabel).toBeHidden();

    }

    async closeLoginModalWithTheXButton(){
        await expect(this.loginModalLabel).toBeVisible();
        await this.xButton.click();
        await expect(this.loginModalLabel).toBeHidden();
    }

}