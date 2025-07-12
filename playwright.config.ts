import { defineConfig } from '@playwright/test';

export default defineConfig({
      // Use "projects" if you have multiple websites
 projects: [
    {
      name: 'Saucedemo',
      testDir: './e2e-websites/saucedemo/specs',
    },
    {
      name: 'Saucedemo-Practice',
      testDir: './practice/saucedemo-practice/specs',
    },
    // Add more websites here later
 ],

  // 🕒 Maximum time for each test
  timeout: 30 * 1000,

  // ✅ Shared settings for all tests
  use: {
    headless: false,                  // Show browser window (good for debugging)
    viewport: { width: 1280, height: 720 },  // Browser window size
    video: 'retain-on-failure',       // Record video if a test fails
    trace: 'on-first-retry',          // Record trace on first retry (helpful for debugging)
  },

  // 🔄 Retry failed tests (optional)
  retries: 0,
});
