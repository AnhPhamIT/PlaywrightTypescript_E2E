import { expect } from "@playwright/test";
import { test } from "../../fixtures/page.fixture";

test("@webApp2 Login with API", async ({ app, api, userLogin }) => {
    const response = await api.login(userLogin.username, userLogin.password);
    console.log("---------- " + userLogin.username);
    expect(response.status()).toBe(200);
    await app.page.goto(`?route=checkout/cart`);
});

test("Login with API", async ({ app, api, userLogin }) => {
    const response = await api.login(userLogin.username, userLogin.password);
    console.log("----------2 " + userLogin.username);
    expect(response.status()).toBe(200);
    await app.page.goto(`?route=checkout/cart`);
});
