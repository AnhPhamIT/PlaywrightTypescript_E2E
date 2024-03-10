//Idea: place to store any global actions which are not isolated to a single component or page
import { Page, expect } from '@playwright/test'
import UserDetails from '../fixtures/model/userDetails'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    get resultContinue_btn() { return this.page.locator('#common-success a.btn') }
    get resultTitle() { return this.page.locator('h1.page-title') }
    get notificationBox() { return this.page.locator('#notification-box-top') }

    actionOnNotification(action: string) {
        return this.page.locator('//a[contains(.,"' + action + '")]')
    }
    get toastMsg() { return this.page.locator("div.toast-body") }

    async open() {
        console.log('Navigate to our home page')
        await this.page.goto('/')
    }
    async continueOnResultPage(msg: string) {
        await expect(this.resultTitle).toHaveText(msg)
        await this.resultContinue_btn.click()
    }

    async waitForPageFullyLoaded(url: string) {
        await this.page.waitForURL(url)
    }

    async selectActionOnNotification(name:string) {
        await this.toastMsg.waitFor()
        await this.actionOnNotification(name).nth(1).click()
    }

    

    

}
