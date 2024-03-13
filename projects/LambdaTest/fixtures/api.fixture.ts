import { test as base, expect } from "@playwright/test";
import { AccountAPI } from "../api/account";
import BaseAPI from "../api/base";
import * as dotenv from "dotenv";

dotenv.config();

const test = base.extend({
    api: async ({ page }, use) => {
        let username = process.env.USER_NAME!;
        let password = process.env.PASSWORD!;
        console.log(username + password);
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
