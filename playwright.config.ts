
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { TestOptions } from './projects/type'


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config()
/**
 * See https://playwright.dev/docs/test-configuration.
 */

// if(process.env.ENVIRONMENT==='DEV'){
//   // require('dotenv').config({'./'});
// }
// Read from default ".env" file.

const environmentVar = (process.env.TEST_ENVIRONMENT === undefined) ? '' : process.env.TEST_ENVIRONMENT
const projectVar = process.env.PROJECT
const { WEB_CONFIG } = require(`./projects/${projectVar}/constants/webConfig`)

export default defineConfig<TestOptions>({
  testDir: resolve(__dirname, `projects/${projectVar}/tests`),
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
      // ["junit", { outputFile: "results.xml" }],
      ["html", { open: "never" }],
    ]
    : [
      ["html", { open: "on-failure" }],
      ["junit", { outputFile: "results.xml" }]
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || WEB_CONFIG[environmentVar].WEBAPP,
    apiURL: process.env.API_URL || WEB_CONFIG[environmentVar].API_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: 500,
    },

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
          args: ["--start-maximized"],
        },
        // userLogin: WEB_CONFIG[environmentVar].UserLOGIN[0]
      },

      // fullyParallel: true,
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      },
    },

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
