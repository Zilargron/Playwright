import {Page, expect, Locator} from '@playwright/test';

export class HomePage{

    readonly page: Page;

    readonly catphones: Locator;
    readonly catlaptops: Locator;
    readonly catmonitor: Locator;
    readonly samsungs6: Locator;
    readonly sonyi5: Locator;
    readonly apple24: Locator;

    readonly carousel: Locator;
    readonly carouselactive: Locator;
    readonly carouselnext: Locator;
    readonly carouselprev: Locator;

    readonly navbar: Locator;
    readonly homeLink: Locator;
    readonly contactLink: Locator;
    readonly aboutUsLink: Locator;
    readonly cartLink: Locator;

    readonly contactModal: Locator;
    readonly contactEmail: Locator;
    readonly contactName: Locator;
    readonly contactMessage: Locator;
    readonly contactSendMessageButton: Locator;
    readonly contactModalXButton: Locator;

    readonly aboutUsModal: Locator;



    constructor(page:Page){

        this.page = page;
        this.catphones = page.getByRole('link', {name: "Phones"});
        this.catlaptops = page.getByRole('link', {name: "Laptops"});
        this.catmonitor = page.getByRole('link', {name: "Monitors"});
        this.samsungs6 = page.getByRole('link', {name: "Samsung galaxy s6"});
        this.sonyi5 = page.getByRole('link', {name: "Sony vaio i5"});
        this.apple24 = page.getByRole('link', {name: "Apple monitor 24"});

        this.carousel = page.locator('#carouselExampleIndicators');
        this.carouselactive = this.carousel.locator('.carousel-item.active img');
        this.carouselnext = this.carousel.locator('.carousel-control-next');
        this.carouselprev = this.carousel.locator('.carousel-control-prev');

        this.navbar = page.locator('#navbarExample');
        this.homeLink = this.navbar.getByRole('link', {name: "Home"});
        this.contactLink = this.navbar.getByRole('link', {name: "Contact"});
        this.aboutUsLink = this.navbar.getByRole('link', {name: "About us"});
        this.cartLink = this.navbar.getByRole('link', {name: "Cart"});

        this.contactModal = page.locator('#exampleModal');
        this.contactEmail = this.contactModal.locator('#recipient-email');
        this.contactName = this.contactModal.locator('#recipient-name');
        this.contactMessage = this.contactModal.locator('#message-text');
        this.contactSendMessageButton = this.contactModal.getByRole('button', {name: "Send message"});
        this.contactModalXButton = this.contactModal.getByRole('button', {name: "Close"}).first();


        this.aboutUsModal = page.locator('#videoModal');
        

    }
    /*
        CATEGORIES AND LIST UPDATES - CODES
    */
    async clickphones(){

        await this.catphones.click();
        await expect(this.samsungs6).toBeVisible();
       
    }
    
    async clicklaptops(){

        await this.catlaptops.click();
        await expect(this.sonyi5).toBeVisible();

    }

    async clickmonitors(){

        await this.catmonitor.click();
        await expect(this.apple24).toBeVisible();

    }

    /*
        CAROUSEL - CODES
    */

    async waitForCarousel(timeout = 8000){

        await this.carousel.waitFor({state: 'attached', timeout});
        await expect(this.carousel).toBeVisible({timeout});
        await expect(this.carouselactive).toBeVisible({timeout});

    }

    async getActiveImgSrc(timeout = 5000): Promise<string>{

        await this.carouselactive.waitFor({state: 'attached', timeout});
        await expect(this.carouselactive).toBeVisible({timeout});
        const src = await this.carouselactive.getAttribute('src');
        if (!src) throw new Error('Active carousel image has no src');
        return src || '';

    }

    async carouselClickNext(timeout = 8000) {
        
        const prev = await this.getActiveImgSrc();
        await this.carouselnext.click();
        await expect(this.carouselactive).not.toHaveAttribute('src', prev, {timeout});
    
    }

    async carouselClickPrev(timeout = 8000){

        const prev = await this.getActiveImgSrc();
        await this.carouselprev.click();
        await expect(this.carouselactive).not.toHaveAttribute('src', prev, {timeout});

    }

    /* 
        NAVBAR HOME - CODES
    */

    async clickHomeLink(url: string){

        await this.homeLink.click();
        await expect(this.page).toHaveURL(url);
        await expect(this.navbar).toBeVisible();

    }
    
    /* 
        NAVBAR CONTACT - CODES
    */
    async clickContactLink(){

        await this.contactLink.click();
        await this.contactModal.waitFor({state: "visible"});
        await expect(this.contactModal).toBeVisible();

    }

    async fillContactModalMessages(email: string, name: string, message: string){

        await this.contactEmail.fill(email);
        await this.contactName.fill(name);
        await this.contactMessage.fill(message);

    }

    async closeContactModal(){

        await this.contactModal.waitFor({state: "visible"});
        await this.contactModalXButton.click();
        await this.contactModal.waitFor({state: "hidden"});
        await expect(this.contactModal).not.toBeVisible();

    }

    async clickContactSendMessage(){

        await this.contactSendMessageButton.click();

    }
    /* 
        NAVBAR ABOUTUS - CODES
    */
    async clickAboutUsLink(){

        await this.aboutUsLink.click();
        await this.aboutUsModal.waitFor({state: "attached"});
        await expect(this.aboutUsModal).toBeVisible();

    }

    /*
        NAVBAR CART -CODES
    */

    async clickCartLink(){

        

    }

}   
