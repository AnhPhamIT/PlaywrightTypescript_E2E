import { Page, expect } from '@playwright/test'
import { BasePage } from './base.page'
import UserDetails from '../fixtures/model/userDetails'
import ProductInfo from '../fixtures/model/productInfo'
import { CHECKOUT } from '../fixtures/objectRepo/checkout.locators'
import CommonUtils from '../support/util/commonUtils'

export class Checkout extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    async waitForCheckoutPage(){
        await this.waitForPageFullyLoaded('**/index.php?route=checkout/cart')
    }

    get billingAddress_form() { return this.page.locator('div#payment-new') }
    async userInputField(field: any) { return this.page.locator(`#${field}`) } // why need to return Promise<locator> ????
    userTestField(field: any) { return this.page.locator(`input#${field}`) }

    getSelectedProduct(name: any) {
        let normalizeName = name.replace('"', '')
        return this.page.locator("div#checkout-cart tr:has-text('" + normalizeName + "')")
    }
    //--------------------------------------------
    async getSelectedProduct2(name: any) {
        let normalizeName = this.escapeString("div#checkout-cart tr:has-text('" + name + "')")
        return await this.page.$(normalizeName)
    }
    escapeString(selector: string) {
        return selector.replace(/(")/g, function ($1, $2) {
            return "\\\\" + $2;
        });
    }

    async validateCheckoutItem(productInfo: ProductInfo) {
        console.log(`Product Info ${JSON.stringify(productInfo)}`)
        const productRow = this.getSelectedProduct(productInfo.name)
        const unitPrice = await productRow.locator('td').nth(3).textContent()
        expect(unitPrice).toContain(productInfo.price.toString())
        let quantityPrice = await productRow.locator('td').nth(4).textContent()
        let calPrice = productInfo.price * productInfo.quantity
        expect(quantityPrice).toContain(calPrice.toString())
    }

    //----------- add userDetails in fixtures or model
    async addGuestInfo(userDetails: UserDetails) {
        await this.page.locator(CHECKOUT.GUEST_RADIO).click()
        await (this.userTestField('input-payment-firstname')).fill(userDetails.firstName)
        await (this.userTestField('input-payment-lastname')).fill(userDetails.lastName)
        await (await this.userInputField('input-payment-email')).fill(userDetails.email)
        await (await this.userInputField('input-payment-telephone')).fill(userDetails.phoneNumber)
        await (await this.userInputField('input-payment-company')).fill(userDetails.company)
        await (await this.userInputField('input-payment-address-1')).fill(userDetails.address01)
        await (await this.userInputField('input-payment-address-2')).fill(userDetails.address02)
        await (await this.userInputField('input-payment-city')).fill(userDetails.city)
        await (await this.userInputField('input-payment-postcode')).fill(userDetails.postcode)

        // common function for selectOption
        await this.page.selectOption('#input-payment-country', userDetails.country)
        await this.page.selectOption('#input-payment-zone', userDetails.zone)
    }

    async addBillingAddress(userDetails: UserDetails) {
        await (this.userTestField('input-payment-firstname')).fill(userDetails.firstName)
        await (this.userTestField('input-payment-lastname')).fill(userDetails.lastName)
        await (await this.userInputField('input-payment-company')).fill(userDetails.company)
        await (await this.userInputField('input-payment-address-1')).fill(userDetails.address01)
        await (await this.userInputField('input-payment-address-2')).fill(userDetails.address02)
        await (await this.userInputField('input-payment-city')).fill(userDetails.city)
        await (await this.userInputField('input-payment-postcode')).fill(userDetails.postcode)
    }

    async agreeAndContinueCheckout(userDetails: UserDetails) {
        //input-payment-address-existing
        // const existingBillingAdd = this.page.locator('input#input-payment-address-existing')
        // const isChecked = await existingBillingAdd.isChecked()
        if (await this.billingAddress_form.isVisible()) {
            await this.addBillingAddress(userDetails)
        }
        await this.page.locator(CHECKOUT.AGREE_CHBOX).click()
        await this.page.locator(CHECKOUT.CONTINUE_BTN).click()
        await this.page.waitForURL('**/checkout/confirm');
    }
}