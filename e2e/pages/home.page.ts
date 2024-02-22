import {Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { HOME } from '../fixtures/objectRepo/home.locators'

export class Home extends BasePage{
    constructor(page: Page){
        super(page)
    }

    get collectionProducts() {return this.page.locator(HOME.COLLECTION_LIST)}

    async selectFirstProduct(){
        await this.collectionProducts.locator('div.product-thumb').first().click()
    }


}