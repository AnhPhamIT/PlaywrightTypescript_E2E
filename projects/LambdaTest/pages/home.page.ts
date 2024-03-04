import {Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class Home extends BasePage{
    constructor(page: Page){
        super(page)
    }

    // define elements
    get collectionProducts() {return this.page.locator('div.mz-tab-listing:has-text("Top Collection")')}

    // async selectFirstProduct(){
    //     await this.collectionProducts.locator('div.product-thumb').first().click()
    // }
    async viewCollectionProductByIndex(index: number){
        const productItem = this.collectionProducts.locator('div.product-thumb')
        await productItem.nth(index).waitFor({state:'visible'})
        await productItem.nth(index).click()
    }


}