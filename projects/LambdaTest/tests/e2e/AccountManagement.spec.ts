import { expect } from "@playwright/test";
import { test } from "../../fixtures/page.fixture";

test("@my test Login with API", async ({ app, api, userLogin }) => {
    const response = await api.login(userLogin.USERNAME, userLogin.PASSWORD);
    expect(response.status()).toBe(200);
    await app.page.goto(`?route=checkout/cart`);
});
