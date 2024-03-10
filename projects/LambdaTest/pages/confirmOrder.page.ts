import {Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import ProductInfo from '../fixtures/model/productInfo'
import { ORDER_SUCCESS_MSG } from '../constants/messages'

export class ConfirmOrder extends BasePage{
    constructor(page: Page){
        super(page)
    }
    get confirmBtn(){return this.page.locator('button#button-confirm')}
    get orderSuccess(){return this.page.locator('div#common-success h1')}
    get continueBtn(){return this.page.locator('div#common-success a.btn')}

    orderItem(productName:any){
        let normalizeName = productName.replace('"', '')
        return this.page.locator('#content tr:has-text("'+normalizeName+'")')
    }

    async confirmOrder(productInfo:ProductInfo){
        const orderItem = this.orderItem(productInfo.name)
        // await expect(orderItem.locator('td').nth(1)).toContainText('Product 1')  
        await expect(orderItem.locator('td').nth(2)).toContainText(productInfo.quantity.toString())  
        await expect(orderItem.locator('td').nth(3)).toContainText(productInfo.price.toString())  
        let calPrice = productInfo.price * productInfo.quantity
        await expect(orderItem.locator('td').nth(4)).toContainText(calPrice.toString())  

        await this.confirmBtn.click()
        await this.page.waitForURL('**/index.php?route=checkout/success')
        
        await expect(this.orderSuccess).toContainText(ORDER_SUCCESS_MSG)
        await this.continueBtn.click()
    }
}