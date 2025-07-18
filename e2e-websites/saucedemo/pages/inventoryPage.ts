import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {

    // Browser instance
    readonly page: Page;

    // Locators
    readonly productSort : Locator;
    readonly inventoryList: Locator;
    readonly cartBadge: Locator

    // Connect InventoryPage to the browser and set up page locator elements
    constructor(page:Page){

        this.page = page;
        this.productSort = page.locator('[data-test="product-sort-container"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    }
    // Verify that the product list and item sorter is displayed in the inventory page
    async verifyProductsListAndSorterDisplayed(){

        await expect(this.inventoryList).toBeVisible();
        await expect(this.productSort).toBeVisible();

    }
    // Add item to cart
    async addItemToCart(itemTestID: string){

        await this.page.locator(`[data-test="add-to-cart-${itemTestID}"]`).click();

    }
    // Verify that the the sorting option default value is Name (A to Z)
    async verifyDefaultSortOption(defaultSort: string){

        await expect(this.productSort).toHaveValue(defaultSort);

    }
    // Select different sort options and check if the list is sorted correctly
    async selectAndVerifySortOption(sort: string){

        await this.productSort.selectOption(sort);
        await expect(this.productSort).toHaveValue(sort);

    }
    // Check if the cart icon has the right amount of items with the cartbadge locator
    async verifyCartItemCount(itemCount: string){

        await expect(this.cartBadge).toHaveText(itemCount);

    }
    // Remove item from cart
    async removeItemFromCart(itemTestID: string){

        await this.page.locator(`[data-test="remove-${itemTestID}"]`).click();

    }


}