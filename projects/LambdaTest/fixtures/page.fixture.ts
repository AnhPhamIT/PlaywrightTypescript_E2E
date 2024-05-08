// import { test as base } from "@playwright/test";
import { App } from "../pages/app";
import { CustomFixture } from "../../type";
import { AccountAPI } from "../api/account.api";
import { test as base } from "@chromatic-com/playwright";
const config = process.env.TEST_ENVIRONMENT;
const env = require(`../../../config/${config}.env.json`);

const enum webApp {
    web1 = "@webApp1",
    web2 = "@webApp2"
}
export const test = base.extend<CustomFixture>({
    userLogin: [{ username: "", password: "" }, { option: true }],
    apiURL: ["", { option: true }],
    app: async ({ page, isMobile, baseURL }, use, testInfo) => {
        let testTitle = testInfo.title;
        let app = new App(page, isMobile, testInfo);
        if (testTitle.includes(webApp.web2)) {
            baseURL = process.env.BASE_URL || env.webapp2.baseUrl;
            await app.homePage.open(baseURL);
        } else {
            await app.homePage.open();
        }
        await use(app);
    },
    api: async ({ page }, use) => {
        await use(new AccountAPI(page));
    }
});
//https://stackoverflow.com/questions/77476850/how-do-you-add-a-custom-property-to-the-playwright-config-file
