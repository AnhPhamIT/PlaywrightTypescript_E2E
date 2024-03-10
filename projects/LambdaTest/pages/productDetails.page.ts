import { Page,expect } from "@playwright/test"
import { BasePage } from "./base.page"
import ProductInfo from "../fixtures/model/productInfo"
import CommonUtils from "../support/util/commonUtils"

export class ProductDetails extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    get price(){return this.page.locator('div.price h3')}
    get name(){return this.page.locator('div.content-title h1')}
    get quantityInput(){return this.page.locator('div.entry-section input[name="quantity"]')}
    get buyNowBtn(){return this.page.locator('button[title="Buy now"]')}
    get addToCart_btn() { return this.page.locator('div.entry-col button[title="Add to Cart"]') }
    get buywNow_btn() { return this.page.locator('div.entry-col button[title="Buy now"]') }
    get size_options(){return this.page.locator('(//select[@class="custom-select"])[1]/option')}
    get size_ddl(){return this.page.locator('(//select[@class="custom-select"])[1]')}

    async randomSizeIdx(){
        const sizeOptions = this.size_options.all()
        return CommonUtils.randomIndex((await sizeOptions).length)
    }

    async inputOrderDetails(quantity: number) {
        let selectedOptions:any
        let itemName = await this.name.textContent()
        await this.quantityInput.fill(quantity.toString())
        if (await this.size_ddl.isVisible()) {
            let sizeIdx = await this.randomSizeIdx()
            console.log('Selecting Size ' + sizeIdx+1)
            if(await this.size_ddl.isEnabled()){
                await this.size_ddl.selectOption({ index: sizeIdx })
                selectedOptions = await this.size_options.nth(sizeIdx).allInnerTexts()
            }else{
                console.log('Retry on selecting Size')
                await this.size_ddl.selectOption({ index: sizeIdx })
                selectedOptions = await this.size_options.nth(sizeIdx).allInnerTexts()
            }
            
        }
        await this.price.click({delay:1000})
        let price = 0
        price = await this.price.textContent().then(p => {
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