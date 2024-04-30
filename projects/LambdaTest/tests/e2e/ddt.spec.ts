import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import { takeSnapshot } from "@chromatic-com/playwright";
import testdata from "../../testdata/ddt.json";

test.beforeEach(async ({ app }) => {
    await app.homePage.open();
});

// test.describe.configure({ mode: "serial" });
testdata.forEach((data) => {
    test(`@ddt Should able to search then checkout product ${data.category}`, async ({ app }, testInfo) => {
        let productInfo: Product;
        await app.topbarPage.searchProductByName(data.products);
        await takeSnapshot(app.page, testInfo);
        productInfo = await app.itemComponent.addProductToCart(1);
        await app.homePage.selectActionOnNotification("Checkout");
        await app.checkoutPage.validateCheckoutItem(productInfo);
    });
});
