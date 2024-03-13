import { App } from "../pages/app";
import { expect } from "@playwright/test";
import { test } from "../fixtures/testOptions";

test.beforeEach(async ({ page }) => {
    let app = new App(page);
    await app.basePage.open();
});

test("Login with API", async ({ page, userLogin }) => {
    let app = new App(page);
    const response = await app.accountAPI.login(userLogin.USERNAME, userLogin.PASSWORD);
    expect(response.status()).toBe(200);
    await page.goto(`?route=checkout/cart`);
});
