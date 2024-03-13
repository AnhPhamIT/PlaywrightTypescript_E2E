import { App } from "../../pages/app";
import { expect } from "@playwright/test";
import { test } from "../../fixtures/page.fixture";

test.beforeEach(async ({ app }) => {
    // let app = new App(page);
    await app.basePage.open();
});

test("Login with API", async ({ app, userLogin }) => {
    const response = await app.accountAPI.login(userLogin.USERNAME, userLogin.PASSWORD);
    expect(response.status()).toBe(200);
    await app.page.goto(`?route=checkout/cart`);
});
