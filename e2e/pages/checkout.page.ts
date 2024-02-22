import { Page, expect } from '@playwright/test'
import { BasePage } from './base.page'
import UserDetails from '../fixtures/model/userDetails'
import ProductInfo from '../fixtures/model/productInfo'
import { CHECKOUT } from '../fixtures/objectRepo/checkout.locators'

export class Checkout extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    async userInputField(field: any) { return this.page.locator(`#${field}`) } // why need to return Promise<locator> ????
    userTestField(field: any) { return this.page.locator(`#${field}`) }

    getSelectedProduct(name:any){
        return this.page.locator('div#checkout-cart tr:has-text("' + name + '")')
    }

    async validateTotalPrice(productInfo: ProductInfo) {
        const productRow =this.getSelectedProduct(productInfo.name)
        const unitPrice = await productRow.locator('td').nth(3).textContent()
        expect(unitPrice).toContain(productInfo.price.toString())
        let quantityPrice = await productRow.locator('td').nth(4).textContent()
        let calPrice = Number(productInfo.price * productInfo.quantity)
        expect(quantityPrice).toContain(calPrice.toString())
    }

    //----------- add userDetails in fixtures or model
    async addUserInfo(userDetails: UserDetails) {
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

        await this.page.locator(CHECKOUT.AGREE_CHBOX).click()
        await this.page.locator(CHECKOUT.SAVE_BTN).click()
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/checkout/confirm')

    }
}