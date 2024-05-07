import { test as base, expect } from "@playwright/test";
import { AccountAPI } from "../api/account.api";
import BaseAPI from "../api/base.api";
import * as dotenv from "dotenv";
import { CustomFixture } from "../../type";
import playwrightConfig from "../../../playwright.config";

dotenv.config();

const test = base.extend<CustomFixture>({
    api: async ({ page }, use) => {
        // let username = process.env.USER_NAME!;
        // let password = process.env.PASSWORD!;
        let username = process.env.USER_NAME || playwrightConfig.projects![0].use?.userLogin.username;
        let password = process.env.PASSWORD || playwrightConfig.projects![0].use?.userLogin.password;
        console.log(`${username} --- ${password}`);
        let account = new AccountAPI(page);
        const response = await account.login(username, password);
        expect(await response.text()).toContain("Shop by Category");
        expect(await response.text()).not.toContain("Warning:");
        let api = new BaseAPI(page);
        api.customVariables["email"] = username;
        await use(api);
    }
});

export { test, expect };
