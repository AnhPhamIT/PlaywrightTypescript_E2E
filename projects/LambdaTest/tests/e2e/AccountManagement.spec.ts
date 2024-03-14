import { expect } from "@playwright/test";
import { test } from "../../fixtures/page.fixture";
import { AccountAPI } from "../../api/account";

test.beforeEach(async ({ app }) => {
    // let app = new App(page);
    await app.basePage.open();
});

test("Login with API", async ({ app, userLogin }) => {
    let api = new AccountAPI(app.page);
    const response = await api.login(userLogin.USERNAME, userLogin.PASSWORD);
    expect(response.status()).toBe(200);
    await app.page.goto(`?route=checkout/cart`);
});
