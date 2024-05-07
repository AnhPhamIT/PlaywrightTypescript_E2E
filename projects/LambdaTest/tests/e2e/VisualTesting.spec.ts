// import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import { takeSnapshot } from "@chromatic-com/playwright";

test.beforeEach(async ({ app }) => {
    await app.homePage.open();
});

test("@only Should able to search then checkout a product", async ({ app }, testInfo) => {
    let productInfo: Product;
    await app.topbarPage.searchProductByName("Nikon D300");
    await app.searchPage.validateProductImageByIndex(1);
    // await takeSnapshot(app.page, testInfo);
    // await app.filterComponent.filterBy("In stock");

    // productInfo = await app.productList.addAProductToCart(1);
    let proObj = await app.productList.selectProductByIndex(1);
    productInfo = await proObj.getItemInfo();
    await proObj.addToCart();
    await app.homePage.selectActionOnNotification("Checkout");
    await app.checkoutPage.validateCheckoutItem(productInfo);
});
