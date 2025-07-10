import { test, expect} from '@playwright/test';
import { loginwithcredentials } from '../utils/loginwithcredentials';
import { users } from '../test-data/users';
import { addalltocart } from '../utils/addalltocart';

test('Remove all items from cart', async ({page}) => {

    await loginwithcredentials(page, 'standard_user', 'secret_sauce');

    await addalltocart(page);
    await page.click('.shopping_cart_link');

    const cartItems = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ];


});