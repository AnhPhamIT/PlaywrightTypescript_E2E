import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LogOut extends BasePage{
    constructor(page: Page){
        super(page)
    }

    async logOut(){
        // this.page.waitForSelector('h1.page-title')
        expect(await this.page.locator('h1.page-title').textContent()).toContain('Account Logout')
        await this.page.locator('//a[contains(text(),"Continue")]').click()
    }
}