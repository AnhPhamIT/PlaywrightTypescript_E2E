import { LOGIN } from "../fixtures/objectRepo/login.locators";
import { BasePage } from "./base.page";
import { Page } from "@playwright/test";
import { TopBar } from "./components/topbar.components";

export class Login extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    async login(username: string, password: string) {
        let topBar = new TopBar(this.page)
        await topBar.selectMainMenu('My account', 'Login')
        await this.page.locator(LOGIN.EMAIL_INPUT).fill(username)
        await this.page.locator(LOGIN.PASSWORD_INPUT).fill(password)
        await this.page.locator(LOGIN.LOGIN_BTN).click()
    }

    
}