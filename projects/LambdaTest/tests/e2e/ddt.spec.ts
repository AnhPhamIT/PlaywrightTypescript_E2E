import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import { takeSnapshot } from "@chromatic-com/playwright";
import testdata from "../../testdata/ddt.json";
import multipleProducts from "../../testdata/multipleProducts.json";
import { User } from "../../model/user.model";

test.beforeEach(async ({ app }) => {
    await app.homePage.open();
});

// test.describe.configure({ mode: "serial" });
testdata.forEach((data) => {
    test(`@ddt Should able to search then checkout product ${data.category}`, async ({ app }, testInfo) => {
        let productInfo: Product;
        await app.topbarPage.searchProductByName(data.products);
        await takeSnapshot(app.page, testInfo);
        let proObj = await app.productList.selectProductByIndex(1);
        productInfo = await proObj.getItemInfo();
        await proObj.addToCart();
        await app.homePage.selectActionOnNotification("Checkout");
        await app.checkoutPage.validateCheckoutItem(productInfo);
    });
});

multipleProducts.forEach((data) => {
    test(`@multiProducts Should able to checkout multiple products by category ${data.title}`, async ({ app }) => {
        let products: Product[];
        await test.step("On Home page, select a category", async () => {
            products = await app.topbarPage.selectCategory(data.title);
        });

        await test.step("On Home page, add multiple products to shopping cart", async () => {
            products = await app.productList.addProductsToCart(data.products);
        });
        await test.step("View shopping cart", async () => {
            await app.shoppingPage.gotoCart();
        });
        await test.step("On cart page, validate order details", async () => {
            await app.cartPage.validateListProduct(products);
            await app.cartPage.gotoCheckout();
        });
        await test.step("On Checkout page, checkout as guest and continue", async () => {
            await app.checkoutPage.checkoutAsGuest(User);
        });
    });
});
