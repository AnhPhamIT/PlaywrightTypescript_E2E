import { Faker } from "@faker-js/faker";
import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import { User, IUser } from "../../model/user.model";
import { ShopByCategory } from "../../constants/menuItem";

test.describe("Checkout flow", async () => {
    test.beforeEach(async ({ app }) => {
        await app.homePage.open();
    });

    test("@mytest Should able to checkout a product with new registered user", async ({ app }) => {
        let productInfo: Product;
        await test.step("STEP 1: Register new account", async () => {
            await app.registerPage.registerAccount(User);
            await app.topbarPage.goToHomePage();
        });
        await test.step("STEP 2: Select the a product of Collection section", async () => {
            await app.homePage.gotoProductDetails(0, "Top Collection");
        });
        await test.step("STEP 3: On product details, select quantity and Buy Now", async () => {
            productInfo = await app.productDetailsPage.inputOrderDetails(2);
            await app.productDetailsPage.selectBuyNow();
        });
        await test.step("STEP 4.1: On checkout page, validate product information", async () => {
            await app.checkoutPage.validateCheckoutItem(productInfo);
        });
        await test.step("STEP 4.2: Fill in customer information", async () => {
            await app.checkoutPage.checkout(User);
        });
        await test.step("STEP 5: confirm the order and recieve Order Success", async () => {
            await app.confirmOrderPage.confirmOrder(productInfo);
        });
    });

    test("Should able to checkout product as returning user", async ({ app, api }) => {
        let productInfo: Product;
        await test.step("Create account", async () => {
            await api.registerAccount(User);
            await api.logOut();
        });
        await test.step("Login with existing account", async () => {
            await app.loginPage.login(User.email, User.password);
            await app.topbarPage.goToHomePage();
        });
        await test.step("On Home page, select a product from Collection section", async () => {
            await app.homePage.gotoProductDetails(2, "Top Products");
        });
        await test.step("On product details, input order details and Buy Now", async () => {
            productInfo = await app.productDetailsPage.inputOrderDetails(1);
            await app.productDetailsPage.selectBuyNow();
        });
        await test.step("On cart page, validate order details", async () => {
            await app.checkoutPage.validateCheckoutItem(productInfo);
        });
        await test.step("On Checkout page, Fill in shipping/ billing address and continue", async () => {
            await app.checkoutPage.checkout(User);
        });
        await test.step("On Confirm Order page, confirm the order and recieve Order Success", async () => {
            // await app.confirmOrderPage.confirmOrder(new Product("iMac", 170, 2));
            await app.confirmOrderPage.confirmOrder(productInfo);
        });
    });

    test("Should able to checkout multiple products as Guest user", async ({ app }) => {
        // let userDetails = new User();
        let orders = [
            { sectionName: "Top Collection", index: 0 },
            { sectionName: "Top Products", index: 2 }
        ];
        let products: Product[];

        await test.step("On Home page, add multiple products to shopping cart", async () => {
            products = await app.homePage.addProductsToCart(orders);
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
