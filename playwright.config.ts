import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where Playwright looks for test files.
  testDir: './tests',

  // Maximum time each test can run before it fails.
  timeout: 30000,

  // Run tests from different files in parallel for faster execution.
  fullyParallel: true,

  // Fail the build on CI when test.only is accidentally committed.
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, but do not retry locally.
  retries: process.env.CI ? 1 : 0,

  // Generate an HTML report without opening it and also print progress in the terminal.
  reporter: [['html', { open: 'never' }], ['list']],

  // Shared settings applied to every browser project.
  use: {
    // Base URL used by page.goto('/') and other relative navigation helpers.
    baseURL: 'https://the-internet.herokuapp.com',

    // Capture traces only when retrying a failed test.
    trace: 'on-first-retry',
  },

  // Browser projects used for cross-browser test execution.
  projects: [
    {
      // Run tests in Chromium using the Desktop Chrome device profile.
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // Run tests in Firefox using the Desktop Firefox device profile.
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
