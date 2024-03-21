import { test as base, expect } from "@playwright/test";
import { AccountAPI } from "../api/account.api";
import BaseAPI from "../api/base.api";
import * as dotenv from "dotenv";
import { TestOptions } from "../../type";
const config = process.env.TEST_ENV;
const env = require(`../../../config/${config}.env.json`);

type APIFixtures = {
    api: BaseAPI;
};

const test = base.extend<APIFixtures & TestOptions>({
    userLogin: [{ username: "", password: "" }, { option: true }],
    apiUrl: ["", { option: true }],
    api: async ({ page, apiUrl }, use) => {
        let username = process.env.USER_NAME!;
        let password = process.env.PASSWORD!; //??????
        let account = new AccountAPI(page, apiUrl);
        const response = await account.login(username, password);
        expect(await response.text()).toContain("Shop by Category");
        expect(await response.text()).not.toContain("Warning:");
        let api = new BaseAPI(page, apiUrl);
        api.customVariables["email"] = username;
        await use(api);
    }
});

export { test, expect };
