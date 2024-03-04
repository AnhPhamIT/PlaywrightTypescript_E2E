import { Page,expect } from "@playwright/test"
import { BasePage } from "./base.page"
import ProductInfo from "../fixtures/model/productInfo"
import { PRODUCT_DETAILS } from "../fixtures/objectRepo/productDetails.locators"
import CommonUtils from "../support/util/commonUtils"

export class ProductDetails extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    get addToCart_btn() { return this.page.locator('div.entry-col button[title="Add to Cart"]') }
    get buywNow_btn() { return this.page.locator('div.entry-col button[title="Buy now"]') }
    get size_options(){return this.page.locator('(//select[@class="custom-select"])[1]/option')}
    get size_ddl(){return this.page.locator('(//select[@class="custom-select"])[1]')}

    async randomSizeIdx(){
        const sizeOptions = this.size_options.all()
        return CommonUtils.randomIndex((await sizeOptions).length)
    }
    //build Product details and assign value here
    async inputOrderDetails(quantity: number) {
        let selectedOptions:any
        let itemName = await this.page.locator(PRODUCT_DETAILS.NAME).textContent()
        // const isVisible = this.page.$('(//select[@class="custom-select"])[1]')
        await this.page.locator(PRODUCT_DETAILS.QUANITY_INPUT).fill(quantity.toString())
        if (await this.size_ddl.isVisible()) {
            let sizeIdx = await this.randomSizeIdx()
            await this.size_ddl.selectOption({ index: sizeIdx })
            selectedOptions = await this.size_options.nth(sizeIdx).allInnerTexts()
        }
        await this.page.locator(PRODUCT_DETAILS.PRICE).click({delay:1000})
        let price = 0
        price = await this.page.locator(PRODUCT_DETAILS.PRICE).textContent().then(p => {
            // return Number(p?.slice(1))
            return CommonUtils.convertCurrencyToNumber(p)
        })
        return new ProductInfo(itemName, price, quantity, selectedOptions)
    }

    async selectBuyNow() {
        await this.buywNow_btn.click()
    }

    async selectAddToCart() {
        await this.addToCart_btn.click()
    }




}