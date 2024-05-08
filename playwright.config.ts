import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { resolve } from "path";
import { CustomFixture } from "./projects/type";
import { ChromaticConfig } from "@chromatic-com/playwright";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */

// if(process.env.ENVIRONMENT==='DEV'){
//   // require('dotenv').config({'./'});
// }
// Read from default ".env" file.
const projectVar = process.env.PROJECT;
const config = process.env.TEST_ENVIRONMENT;
const env = require(`./config/${config}.env.json`);
export default defineConfig<CustomFixture & ChromaticConfig>({
    testDir: resolve(__dirname, `projects/${projectVar}/tests`),
    snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
    // https://www.linkedin.com/pulse/how-screenshots-naming-works-playwright-change-eugene-truuts-r1atf
    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: "test-results",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: process.env.CI ? "blob" : "html",
    // reporter: process.env.CI
    //     ? [
    //           ["junit", { outputFile: "results.xml" }],
    //           ["html", { open: "never" }]
    //       ]
    //     : [
    //           ["html", { open: "on-failure" }],
    //           ["junit", { outputFile: "results.xml" }]
    //       ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL || env.webapp1.baseUrl,
        apiURL: process.env.API_URL || env.webapp1.apiUrl,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "retain-on-failure",
        launchOptions: {
            // slowMo: 500
        },
        disableAutoSnapshot: true
    },
    // Test timeout
    timeout: 3 * 60 * 1000,

    /* Configure projects for major browsers */
    projects: [
        {
            name: "api",
            testMatch: "/tests/api/*",
            use: {
                userLogin: {
                    username: env.webapp1.userName,
                    password: env.webapp1.password
                }
            }
        },
        {
            name: "chromium",
            testIgnore: "/tests/api/*",
            use: {
                ...devices["Desktop Chromium"]
            }
        },
        // {
        //     name: "firefox",
        //     testIgnore: "/tests/api/*",
        //     use: {
        //         ...devices["Desktop Firefox"],
        //         viewport: { width: 1600, height: 1200 }
        //     }
        // },
        // {
        //     name: "webkit",
        //     testIgnore: "/tests/api/*",
        //     use: {
        //         ...devices["Desktop Safari"],
        //         viewport: { width: 1280, height: 1050 }
        //     }
        // },

        /* Test against mobile viewports. */
        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] }
        }
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
    ]

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
