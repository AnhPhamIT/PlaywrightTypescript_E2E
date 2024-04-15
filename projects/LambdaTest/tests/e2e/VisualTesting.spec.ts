// import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import { takeSnapshot } from "@chromatic-com/playwright";

test.beforeEach(async ({ app }) => {
    await app.basePage.open();
});

test("@only Should able to search then checkout a product", async ({ app }, testInfo) => {
    let productInfo: Product;
    await app.topbarPage.searchProductByName("Nikon D300");
    await app.searchPage.validateProductImageByIndex(1);
    // await takeSnapshot(app.page, testInfo);
    await app.filterComponent.filterBy("In stock");
    productInfo = await app.itemComponent.addProductToCart(1);
    await app.basePage.selectActionOnNotification("Checkout");
    await app.checkoutPage.validateCheckoutItem(productInfo);
});
