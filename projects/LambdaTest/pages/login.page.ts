import { BasePage } from "./base.page";
import { Page } from "@playwright/test";
import { TopBar } from "./components/topbar.components";

export class Login extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    get emailInput(){return this.page.locator('#input-email')}
    get passwordInput(){return this.page.locator('#input-password')}
    get loginBtn(){return this.page.locator('input[type="submit"]')}

    async login(username: string, password: string) {
        let topBar = new TopBar(this.page)
        await topBar.selectMainMenu('My account', 'Login')
        await this.emailInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginBtn.click()
    }

    
}