import { LOGIN } from "../fixtures/objectRepo/login.locators";
import { BasePage } from "./base.page";
import { Page } from "@playwright/test";

export class Login extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    async login(username: string, password: string) {
        await this.page.locator(LOGIN.EMAIL_INPUT).fill(username)
        await this.page.locator(LOGIN.PASSWORD_INPUT).fill(password)
        await this.page.locator(LOGIN.LOGIN_BTN).click()
    }

    async loginWithAPI(username:string, password:string) {
        // const Url = 'https://ecommerce-playground.lambdatest.io/index.php/';
        // await this.page.goto(Url);
        return await this.page.request.post('/', {
            params: {
                route: "account/login"
            },
            form: {
                email: username,
                password: password,
                // redirect:"https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
            }
        })
    }
}