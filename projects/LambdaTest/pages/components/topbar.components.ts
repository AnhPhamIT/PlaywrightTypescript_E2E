import { Page, expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class TopBar extends BasePage{
    constructor(page:Page){
        super(page)
    }
    get main_menu(){return this.page.locator('div#main-navigation ul.navbar-nav li')}
    get search_input(){return this.page.locator('div#main-header input[name="search"]')}
    get search_btn(){return this.page.locator('div#main-header button[type="submit"]')}
    get cart_btn(){return this.page.locator('.cart-icon').first()}
    get searchResults(){return this.page.locator('li.product-thumb')}

    async goToHomePage(){
        await this.page.locator('figure a[title="Poco Electro"]').click()
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')
    }

    async selectMainMenu(menu:any, subMenu:string){
        const menuItem = this.main_menu.locator('span:has-text("'+menu+'")')
        await menuItem.hover()
        await this.main_menu.locator('span:has-text("'+subMenu+'")').click({delay:500,force:true})
        // await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
        await this.page.waitForLoadState('domcontentloaded')
    }
    async searchProductByName(name:string){
        await this.search_input.fill(name)
        // await this.searchResults.nth(1).click()
        await this.search_btn.click()
    }

    async goToCart(){
        await this.cart_btn.click()
    }

}