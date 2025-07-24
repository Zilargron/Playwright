// Import the chromium browser from Playwright
import { chromium } from 'playwright';

// Start an immediately invoked async function so we can use 'await' at the top level
(async () => {
  // Declare a variable to hold our browser instance
  let browser;

  try {
    // Launch a new Chromium browser instance
    // headless: false means the browser window will be visible (so you can watch it)
    // slowMo: 1000 slows down each operation by 1 second for demonstration
    browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
    });

    // Open a new tab (page) in the browser
    const page = await browser.newPage();

    // Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com');

    // Fill in the username input field with the value 'standard_user'
    await page.fill('#user-name', 'standard_user');

    // Fill in the password input field with the value 'secret_sauce'
    await page.fill('#password', 'secret_sauce');

    // Find the button with accessible name 'Login' and click it
    await page.getByRole('button', { name: 'Login' }).click();

    // Click the burger menu button to open the side navigation menu
    // We use its id selector here because it's more reliable
    await page.click('#react-burger-menu-btn');

    // In the side menu, find the link with accessible name 'Logout' and click it
    await page.getByRole('link', { name: 'Logout' }).click();

    // Wait for 3 seconds so you can see that the logout worked before closing the browser
    await page.waitForTimeout(3000);
  }
  catch (error) {
    // If any error happens during the script, print the error to the console
    console.error('Something went wrong', error);
  }
  finally {
    // In any case (success or error), close the browser if it was launched
    if (browser) {
      await browser.close();
    }
  }
})();
