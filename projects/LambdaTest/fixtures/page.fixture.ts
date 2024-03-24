// import { test as base } from "@playwright/test";
import { App } from "../pages/app";
import { PageFixture } from "../../type";
import { AccountAPI } from "../api/account.api";
import { test as base } from "@chromatic-com/playwright";

export const test = base.extend<PageFixture>({
    userLogin: [{ username: "", password: "" }, { option: true }],
    app: async ({ page, isMobile }, use, testInfo) => {
        await use(new App(page, isMobile, testInfo));
    },
    api: async ({ page }, use) => {
        await use(new AccountAPI(page));
    }
});
//https://stackoverflow.com/questions/77476850/how-do-you-add-a-custom-property-to-the-playwright-config-file
