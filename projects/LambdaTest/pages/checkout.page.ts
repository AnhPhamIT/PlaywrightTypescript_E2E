import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { IUser, User } from "../model/user.model";
import Product from "../model/product.model";

export class Checkout extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    get billingAddressForm() {
        // return this.page.locator("div#payment-new, div#payment-address");
        return this.page.locator("div#payment-new");
    }
    get agreeChbox() {
        return this.page.locator('label[for="input-agree"]');
    }
    get continueBtn() {
        return this.page.locator("button#button-save");
    }

    get loginBtn() {
        return this.page.getByRole("button", { name: "Login" });
    }

    billingAddress(type: string) {
        return this.page.locator(`this.page.locator("label[for='input-payment-address-${type}']")`);
    }
    checkoutAs(name: string) {
        return this.page.getByText(name);
    }

    async userInputField(field: any) {
        return this.page.locator(`input#${field}`);
    }

    getSelectedProduct(name: any) {
        // let normalizeName = name.replace('"', "");
        // return this.page.locator("div#checkout-cart tr:has-text('" + normalizeName + "')");
        return this.page.getByRole("row").filter({ hasText: name }).nth(1);
    }

    async validateCheckoutItem(productInfo: Product) {
        // await this.page.waitForURL("**/index.php?route=checkout/cart");
        console.log(`Product Info ${JSON.stringify(productInfo)}`);
        const productRow = this.getSelectedProduct(productInfo.name);
        const actualQuantity = await productRow.locator("input").inputValue();
        expect(actualQuantity).toEqual(productInfo.quantity.toString());
        const unitPrice = await productRow.locator("td").nth(3).textContent();
        expect(unitPrice).toContain(productInfo.price.toString());
        let quantityPrice = await productRow.locator("td").nth(4).textContent();
        let calPrice = productInfo.price * productInfo.quantity;
        console.log(`---Expected ${quantityPrice} vs ${calPrice}`);
        expect(quantityPrice).toContain(calPrice.toString());
    }

    async addYourPersonalDetails(userDetails: IUser, isGuest?: boolean) {
        await (await this.userInputField("input-payment-firstname")).fill(userDetails.firstName);
        await (await this.userInputField("input-payment-lastname")).fill(userDetails.lastName);
        await (await this.userInputField("input-payment-email")).fill(userDetails.email);
        await (await this.userInputField("input-payment-telephone")).fill(userDetails.phoneNumber);
        if (!isGuest) {
            await (await this.userInputField("input-payment-company")).fill(userDetails.company);
            await (await this.userInputField("input-payment-address-1")).fill(userDetails.address01);
            await (await this.userInputField("input-payment-address-2")).fill(userDetails.address02);
            await (await this.userInputField("input-payment-city")).fill(userDetails.city);
            await (await this.userInputField("input-payment-postcode")).fill(userDetails.postcode);

            // common function for selectOption
            await this.page.selectOption("#input-payment-country", userDetails.country);
            await this.page.selectOption("#input-payment-zone", userDetails.zone);
        }
    }

    async addBillingAddress(userDetails: IUser) {
        await (await this.userInputField("input-payment-firstname")).fill(userDetails.firstName);
        await (await this.userInputField("input-payment-lastname")).fill(userDetails.lastName);
        await (await this.userInputField("input-payment-company")).fill(userDetails.company);
        await (await this.userInputField("input-payment-address-1")).fill(userDetails.address01);
        await (await this.userInputField("input-payment-address-2")).fill(userDetails.address02);
        await (await this.userInputField("input-payment-city")).fill(userDetails.city);
        await (await this.userInputField("input-payment-postcode")).fill(userDetails.postcode);
    }

    async continueCheckout() {
        await this.agreeChbox.click();
        await this.continueBtn.click();
        await this.page.waitForURL("**/checkout/confirm");
    }
    async login(userDetails: IUser) {
        await (await this.userInputField("input-login-email")).fill(userDetails.email);
        await (await this.userInputField("input-login-password")).fill(userDetails.password);
        await this.loginBtn.click();
    }
    async checkout(userDetails: IUser) {
        await this.waitForPageFullyLoaded("checkout/checkout");
        if (await this.billingAddressForm.isVisible()) {
            await this.addBillingAddress(userDetails);
        }
        await this.continueCheckout();
    }

    async checkoutAsLoginAccount(userDetails: IUser) {
        await this.waitForPageFullyLoaded("checkout/checkout");
        await this.checkoutAs("Login").click();
        await this.login(userDetails);
        await this.billingAddress("existing").click();
        await this.continueCheckout();
    }
    async checkoutAsRegisterAccount(userDetails: IUser) {
        await this.waitForPageFullyLoaded("checkout/checkout");
        await this.checkoutAs("Register Account").click();
        await this.addYourPersonalDetails(userDetails);
        await this.addBillingAddress(userDetails);
        await this.continueCheckout();
    }

    async checkoutAsGuest(userDetails: IUser) {
        await this.waitForPageFullyLoaded("checkout/checkout");
        await this.checkoutAs("Guest Checkout").click();
        await this.addYourPersonalDetails(userDetails, true);
        await this.addBillingAddress(userDetails);
        await this.continueCheckout();
    }
}
