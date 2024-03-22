// import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";

test.beforeEach(async ({ app }) => {
    await app.basePage.open();
});

test("@only Should able to search then checkout a product", async ({ app, api, userLogin }) => {
    let productInfo: Product;
    await api.login(userLogin.USERNAME, userLogin.PASSWORD);
    await app.topbarPage.searchProductByName("Nikon D300");
    await app.searchPage.validateProductImageByIndex(1);
    productInfo = await app.searchPage.addProductToCartByIndex(1);
    await app.basePage.selectActionOnNotification("Checkout");
    await app.checkoutPage.validateCheckoutItem(productInfo);
});

// test("@only Homepage", async ({ page }, testInfo) => {
//     await page.goto("https://ecommerce-playground.lambdatest.io/");
//     await expect(page).toHaveTitle("Your Store");
//     await takeSnapshot(page, testInfo);

//     // ...
// });
