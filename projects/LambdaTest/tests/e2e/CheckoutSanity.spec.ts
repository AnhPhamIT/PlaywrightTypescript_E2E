import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import User from "../../model/user.model";

test.describe("Checkout flow", async () => {
    test.beforeEach(async ({ app }) => {
        await app.basePage.open();
    });

    test("Should able to checkout a product with new registered user", async ({ app }) => {
        let productInfo: Product;
        let userDetails = new User();
        await test.step("STEP 1: Register new account", async () => {
            await app.registerPage.registerAccount(userDetails);
            await app.topbarPage.goToHomePage();
        });
        await test.step("STEP 2: Select the a product of Collection section", async () => {
            await app.homePage.selectAProductByIndex("Top Collection", 0);
        });
        await test.step("STEP 3: On product details, select quantity and Buy Now", async () => {
            productInfo = await app.productDetailsPage.inputOrderDetails(2);
            await app.productDetailsPage.selectBuyNow();
        });
        await test.step("STEP 4.1: On checkout page, validate product information", async () => {
            await app.checkoutPage.validateCheckoutItem(productInfo);
            // await app.cart.validateShoppingCart(productInfo);
        });
        await test.step("STEP 4.2: Fill in customer information", async () => {
            await app.checkoutPage.inputBillingAddressAndContinue(userDetails);
        });
        await test.step("STEP 5: confirm the order and recieve Order Success", async () => {
            await app.confirmOrderPage.confirmOrder(productInfo);
        });
    });

    test("Should able to checkout product as returning user", async ({ app, api }) => {
        let productInfo: Product;
        let userDetails = new User();
        await test.step("Create account", async () => {
            await api.registerAccount(userDetails);
            await api.logOut();
        });
        await test.step("Login with existing account", async () => {
            await app.loginPage.login(userDetails.email, userDetails.password);
            await app.topbarPage.goToHomePage();
        });
        await test.step("On Home page, select a product from Collection section", async () => {
            await app.homePage.selectAProductByIndex("Top Products", 2);
        });
        await test.step("On product details, input order details and Buy Now", async () => {
            productInfo = await app.productDetailsPage.inputOrderDetails(1);
            await app.productDetailsPage.selectBuyNow();
        });
        await test.step("On cart page, validate order details", async () => {
            await app.checkoutPage.validateCheckoutItem(productInfo);
        });
        await test.step("On Checkout page, Fill in shipping/ billing address and continue", async () => {
            await app.checkoutPage.inputBillingAddressAndContinue(userDetails);
        });
        await test.step("On Confirm Order page, confirm the order and recieve Order Success", async () => {
            await app.confirmOrderPage.confirmOrder(new Product("iMac", 170, 2));
            // await app.confirmOrderPage.confirmOrder(productInfo);
        });
    });
});
