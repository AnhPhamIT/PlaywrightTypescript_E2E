// import { test as base } from "@playwright/test";
import { App } from "../pages/app";
import { AccountAPI } from "../api/account.api";
import { test as base } from "@chromatic-com/playwright";
import { TestOptions } from "../../type";
import { userInfo } from "os";
const config = process.env.TEST_ENV;
const env = require(`../../../config/${config}.env.json`); // load env from json
const website = "@webApp2";
type PageFixture = {
    app: any;
    api: any;
};

export const test = base.extend<PageFixture & TestOptions>({
    // userLogin: [{ username: "", password: "" }, { option: true }],
    apiUrl: ["", { option: true }],
    userLogin: async ({}, use, testInfo) => {
        let testTitle = testInfo.title;
        let userLogin;
        userLogin = testTitle.includes(website)
            ? (userLogin = { username: env.webapp2.userName, password: env.webapp2.password })
            : (userLogin = { username: env.webapp1.userName, password: env.webapp1.password });
        await use(userLogin);
    },
    app: async ({ page, isMobile, baseURL }, use, testInfo) => {
        let testTitle = testInfo.title;
        let app = new App(page, isMobile, testInfo);
        if (testTitle.includes(website)) {
            baseURL = env.webapp2.baseUrl;
            await app.basePage.open(baseURL);
        } else {
            await app.basePage.open();
        }
        await use(new App(page, isMobile, testInfo));
    },
    api: async ({ page, apiUrl }, use) => {
        await use(new AccountAPI(page, apiUrl));
    }
});
//https://stackoverflow.com/questions/77476850/how-do-you-add-a-custom-property-to-the-playwright-config-file
