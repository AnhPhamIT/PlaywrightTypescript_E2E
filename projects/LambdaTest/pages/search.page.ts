import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import ProductInfo from "../fixtures/model/productInfo";
import CommonUtils from "../support/util/commonUtils";

export class Search extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    get productItem() { return this.page.locator('div.product-thumb') }

    async addProductToCartByIndex(index: number) {
        const selectedProduct = this.productItem.nth(index)
        //get product info
        let name = await selectedProduct.locator('h4').textContent()
        let price = await selectedProduct.locator('span.price-new').textContent().then(p=>{
            return CommonUtils.convertCurrencyToNumber(p)
        })
        await selectedProduct.hover({trial:true})
        await selectedProduct.hover()
        await Promise.all([
            await selectedProduct.locator('button[title="Add to Cart"]').click(),
            // await this.page.locator("div.toast-body").waitFor(),
            // await this.page.locator('//a[contains(.,"View Cart")]').click()
        ])
        
        return new ProductInfo(name, price, 1)
    }

    async validateProductImageByIndex(index: number) {
        // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        
        const productImg = this.productItem.locator('div.carousel-item.active img').nth(index)
        await productImg.scrollIntoViewIfNeeded();
        await productImg.waitFor()
        await expect(productImg).toHaveScreenshot({ maxDiffPixelRatio: 0.2 })
    }

}