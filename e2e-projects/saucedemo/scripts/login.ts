// Import the chromium browser module from Playwright
import { chromium } from 'playwright';

// Start an immediately invoked async function expression (IIFE)
// This allows using 'await' at the top level
(async () => {
  // Declare a variable to hold the browser instance
  let browser;

  try {
    // Launch a new Chromium browser instance
    // headless: false makes the browser window visible (so you can watch the steps)
    // slowMo: 1000 slows down each action by 1 second to make it easier to follow
    browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
    });

    // Open a new browser tab (page)
    const page = await browser.newPage();

    // Navigate the page to the Sauce Demo login URL
    await page.goto('https://www.saucedemo.com');

    // Fill in the username field with 'standard_user'
    // '#user-name' is the CSS selector for the username input
    await page.fill('#user-name', 'standard_user');

    // Fill in the password field with 'secret_sauce'
    // '#password' is the CSS selector for the password input
    await page.fill('#password', 'secret_sauce');

    // Find the button with accessible name 'Login' and click it
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for 3 seconds so you can see the result before the browser closes
    await page.waitForTimeout(3000);
  }
  catch (error) {
    // If any error happens during execution, print it to the console
    console.error('Something went wrong', error);
  }
  finally {
    // Whether there was an error or not, close the browser if it was launched
    if (browser) {
      await browser.close();
    }
  }
})();
