import {Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { CONFIRM_ORDER } from '../fixtures/objectRepo/confirmOrder.locators'
import ProductInfo from '../fixtures/model/productInfo'
import { ORDER_SUCCESS_MSG } from '../constants/messages'

export class ConfirmOrder extends BasePage{
    constructor(page: Page){
        super(page)
    }

    orderItem(productName:any){
        let normalizeName = productName.replace('"', '')
        // return this.page.locator("div#checkout-cart tr:has-text('" + normalizeName + "')")
        return this.page.locator('#content tr:has-text("'+normalizeName+'")')
    }

    // async confirmOrder(itemName:any, inputQuantity:number){
    //     //confirm order
    //     await this.page.waitForLoadState('domcontentloaded')
    //     const orderItem = this.orderItem(itemName)
    //     await expect(orderItem.locator('td').nth(1)).toContainText('Product 1')  
    //     await expect(orderItem.locator('td').nth(2)).toContainText(inputQuantity.toString())  
    //     // ---------------- bug
    //     // await expect(orderItem.locator('td').nth(3)).toContainText(price.toString())  
    //     // await expect(orderItem.locator('td').nth(4)).toContainText(calPrice.toString())  
    //     await expect(orderItem.locator('td').nth(3)).toContainText('120')  
    //     await expect(orderItem.locator('td').nth(4)).toContainText('240')  
    //     //------ verify Confirm order page
    //     // -------------verify Payment Address, Shipping Address
    //     await this.page.locator(CONFIRM_ORDER.CONFIRM_BTN).click()
    //     await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/success')
    //     await this.page.waitForLoadState('domcontentloaded')
    //     const succeedOrder = this.page.locator(CONFIRM_ORDER.ORDER_SUCCESS)
        
    //     await expect(succeedOrder).toContainText('Your order has been placed!')
    //     await this.page.locator(CONFIRM_ORDER.CONTINUE_BTN).click()
    // }
    async confirmOrder(productInfo:ProductInfo){
        //confirm order
        const orderItem = this.orderItem(productInfo.name)
        await expect(orderItem.locator('td').nth(1)).toContainText('Product 1')  
        await expect(orderItem.locator('td').nth(2)).toContainText(productInfo.quantity.toString())  
        // ---------------- bug
        await expect(orderItem.locator('td').nth(3)).toContainText(productInfo.price.toString())  
        let calPrice = productInfo.price * productInfo.quantity
        await expect(orderItem.locator('td').nth(4)).toContainText(calPrice.toString())  
        // -------------verify Payment Address, Shipping Address
        await this.page.locator(CONFIRM_ORDER.CONFIRM_BTN).click()
        await this.page.waitForURL('**/index.php?route=checkout/success')
        const succeedOrder = this.page.locator(CONFIRM_ORDER.ORDER_SUCCESS)
        
        await expect(succeedOrder).toContainText(ORDER_SUCCESS_MSG)
        await this.page.locator(CONFIRM_ORDER.CONTINUE_BTN).click()
    }
}