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

    }
    
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
    

}   
