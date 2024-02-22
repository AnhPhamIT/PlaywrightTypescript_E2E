import { Page } from "@playwright/test"
import { BasePage } from "./base.page"
import ProductInfo from "../fixtures/model/productInfo"
import { PRODUCT_DETAILS } from "../fixtures/objectRepo/productDetails.locators"

export class ProductDetails extends BasePage{
    constructor(page: Page){
        super(page)
    }

    //build Product details and assign value here
    async buyWithQuantity(quantity: number){
        // name, price, quantity
        
        let price = 0
        price = await this.page.locator(PRODUCT_DETAILS.PRICE).textContent().then(p =>{
        return Number(p?.slice(1))
        })
        let itemName = await this.page.locator(PRODUCT_DETAILS.NAME).textContent()
        await this.page.locator(PRODUCT_DETAILS.QUANITY_INPUT).fill(quantity.toString())
        await this.page.locator(PRODUCT_DETAILS.BUYNOW_BTN).click()
        return new ProductInfo(itemName, price, quantity)
    }




}