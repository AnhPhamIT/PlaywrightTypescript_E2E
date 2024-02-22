import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { TestOptions } from './e2e/fixtures/model/credentials';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const environmentVar = (process.env.TEST_ENVIRONMENT === undefined) ? 'qa' : process.env.TEST_ENVIRONMENT
const { webConfig } = require(`./e2e/constants/webConfig`)
// Read from default ".env" file.
dotenv.config();
export default defineConfig<TestOptions>({
  testDir: './e2e/tests',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
      ["junit", { outputFile: "results.xml" }],
      ["html", { open: "never" }],
    ]
    : [["html", { open: "on-failure" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: webConfig[environmentVar].WEBAPP,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },
  // Test timeout
  timeout: 2 * 60 * 1000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chromium'],
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"]
        },
        userLogin: webConfig[environmentVar].UserLOGIN[0]
      },

      // fullyParallel: true,
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        userLogin: webConfig[environmentVar].UserLOGIN[1],
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
