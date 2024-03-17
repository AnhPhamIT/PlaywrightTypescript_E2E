import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import User from "../../model/user.model";

test.beforeEach(async ({ app }) => {
    await app.basePage.open();
});

test("Should able to checkout a product with new registered user", async ({ app }) => {
    let productInfo: Product;
    let userDetails = new User();

    console.log("Register new account");
    await app.registerPage.registerAccount(userDetails);
    await app.topbarPage.goToHomePage();

    console.log("STEP 1: Select the a product of Collection section");
    await app.homePage.selectAProductByIndex(0);

    console.log("STEP 2: On product details, select quantity and Buy Now");
    productInfo = await app.productDetailsPage.inputOrderDetails(2);
    await app.productDetailsPage.selectBuyNow();

    console.log("STEP 3.1: On checkout page, validate product information");
    await app.checkoutPage.validateCheckoutItem(productInfo);

    console.log("STEP 3.2: Fill in customer information");
    await app.checkoutPage.inputBillingAddressAndContinue(userDetails);

    console.log("STEP 4: confirm the order and recieve Order Success");
    await app.confirmOrderPage.confirmOrder(productInfo);
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
        await app.homePage.selectAProductByIndex(1);
    });
    await test.step("On product details, input order details and Buy Now", async () => {
        productInfo = await app.productDetailsPage.inputOrderDetails(2);
        await app.productDetailsPage.selectBuyNow();
    });
    await test.step("On cart page, validate order details", async () => {
        await app.checkoutPage.validateCheckoutItem(productInfo);
    });
    await test.step("On Checkout page, Fill in shipping/ billing address and continue", async () => {
        await app.checkoutPage.inputBillingAddressAndContinue(userDetails);
    });
    await test.step("On Confirm Order page, confirm the order and recieve Order Success", async () => {
        await app.confirmOrderPage.confirmOrder(productInfo);
    });
});

test("@only Should able to search then checkout a product", async ({ app, api, userLogin }) => {
    let productInfo: Product;

    await app.page.setViewportSize({ width: 1600, height: 850 });
    await api.login(userLogin.USERNAME, userLogin.PASSWORD);
    await app.topbarPage.searchProductByName("Nikon D300");
    await app.searchPage.validateProductImageByIndex(1);
    productInfo = await app.searchPage.addProductToCartByIndex(1);
    await app.basePage.selectActionOnNotification("Checkout");
    // await app.checkoutPage.validateCheckoutItem(new ProductInfo("Nikon D300",98,1))
    await app.checkoutPage.validateCheckoutItem(productInfo);
});
