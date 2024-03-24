// import { test as base } from "@playwright/test";
import { App } from "../pages/app";
import { AccountAPI } from "../api/account.api";
import { TestOptions } from "../../type";
import { test as base } from "@chromatic-com/playwright";
const config = process.env.TEST_ENV;
const env = require(`../../../config/${config}.env.json`); // load env from json

const website = "@webApp2";
type PageFixture = {
    app: any;
    api: any;
};

export const test = base.extend<PageFixture & TestOptions>({
    userLogin: [{ username: "", password: "" }, { option: true }],
    apiUrl: ["", { option: true }],
    app: async ({ page, isMobile, baseURL }, use, testInfo) => {
        let testTitle = testInfo.title;
        let app = new App(page, isMobile, testInfo);
        if (testTitle.includes(website)) {
            baseURL = env.webapp2.baseUrl;
            await app.basePage.open(baseURL);
        } else {
            await app.basePage.open();
        }
        await use(app);
    },
    api: async ({ page, apiUrl }, use) => {
        await use(new AccountAPI(page, apiUrl));
    }
});
