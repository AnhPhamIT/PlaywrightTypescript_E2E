import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import UserDetails from "../model/userDetails";
import ProductInfo from "../model/productInfo";

export class Checkout extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    get billingAddressForm() {
        return this.page.locator("div#payment-new");
    }
    get agreeChbox() {
        return this.page.locator('label[for="input-agree"]');
    }
    get continueBtn() {
        return this.page.locator("button#button-save");
    }
    get guestRadio() {
        return this.page.locator('label[for="input-account-guest"]');
    }

    async waitForCheckoutPage() {
        await this.waitForPageFullyLoaded("**/index.php?route=checkout/cart");
    }

    async userInputField(field: any) {
        return this.page.locator(`#${field}`);
    }

    getSelectedProduct(name: any) {
        let normalizeName = name.replace('"', "");
        return this.page.locator("div#checkout-cart tr:has-text('" + normalizeName + "')");
    }

    async validateCheckoutItem(productInfo: ProductInfo) {
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

    async addGuestInfo(userDetails: UserDetails) {
        await this.guestRadio.click();
        await (await this.userInputField("input-payment-firstname")).fill(userDetails.firstName);
        await (await this.userInputField("input-payment-lastname")).fill(userDetails.lastName);
        await (await this.userInputField("input-payment-email")).fill(userDetails.email);
        await (await this.userInputField("input-payment-telephone")).fill(userDetails.phoneNumber);
        await (await this.userInputField("input-payment-company")).fill(userDetails.company);
        await (await this.userInputField("input-payment-address-1")).fill(userDetails.address01);
        await (await this.userInputField("input-payment-address-2")).fill(userDetails.address02);
        await (await this.userInputField("input-payment-city")).fill(userDetails.city);
        await (await this.userInputField("input-payment-postcode")).fill(userDetails.postcode);

        // common function for selectOption
        await this.page.selectOption("#input-payment-country", userDetails.country);
        await this.page.selectOption("#input-payment-zone", userDetails.zone);
    }

    async addBillingAddress(userDetails: UserDetails) {
        await (await this.userInputField("input-payment-firstname")).fill(userDetails.firstName);
        await (await this.userInputField("input-payment-lastname")).fill(userDetails.lastName);
        await (await this.userInputField("input-payment-company")).fill(userDetails.company);
        await (await this.userInputField("input-payment-address-1")).fill(userDetails.address01);
        await (await this.userInputField("input-payment-address-2")).fill(userDetails.address02);
        await (await this.userInputField("input-payment-city")).fill(userDetails.city);
        await (await this.userInputField("input-payment-postcode")).fill(userDetails.postcode);
    }

    async agreeAndContinueCheckout(userDetails: UserDetails) {
        if (await this.billingAddressForm.isVisible()) {
            await this.addBillingAddress(userDetails);
        }
        await this.agreeChbox.click();
        await this.continueBtn.click();
        await this.page.waitForURL("**/checkout/confirm");
    }
}
