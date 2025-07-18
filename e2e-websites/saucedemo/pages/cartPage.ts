import { Page, expect, Locator } from '@playwright/test';

export class CartPage{

    // Browser instance
    readonly page: Page;
    // Locators
    readonly cartIcon: Locator;
    readonly yourCartText: Locator;
    readonly itemHolder: Locator;
    readonly checkoutButton: Locator;
    readonly checkoutInformation: Locator;

    // Connect CartPage to the browser and set up page locator elements    
    constructor(page:Page){   

        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.yourCartText = page.getByText('Your Cart');
        this.itemHolder = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.getByRole('button', {name: 'checkout'});
        this.checkoutInformation = page.getByText('Checkout: Your Information');
        
        
    }
    // Verify that the user is redirected to cart item page
    async clickCartIconAndCheckCartVisible(url: string){

        await this.cartIcon.click();
        await expect(this.page).toHaveURL(url);
        await expect(this.yourCartText).toBeVisible();

    }
    // Verify that the cart page has the right amount of items added to cart
    async verifyCartItemsCount(cartCount: number){

        await expect(this.itemHolder).toHaveCount(cartCount);

    }
    // Verify Cart item name, price and index
    async verifyItemNameAndPrice(index: number, name: string, price: string){

        const itemindex = this.itemHolder.nth(index);
        const itemnamelocator = itemindex.locator('[data-test="inventory-item-name"]');
        const itempricelocator = itemindex.locator('[data-test="inventory-item-price"]');

        await expect(itemnamelocator).toHaveText(name);
        await expect(itempricelocator).toHaveText(price);

    }
    // Remove an item from Cart page
    async removeItemFromCartPage(itemID: string){

        await this.page.locator(`[data-test="remove-${itemID}"]`).click();

    }
    // Click the Checkout button and check if it redirects the user to a different page
    async clickCheckoutButton(url: string){

        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(url);
        await expect(this.checkoutInformation).toBeVisible();

    }

    
}