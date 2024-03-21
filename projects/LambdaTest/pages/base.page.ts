//Idea: place to store any global actions which are not isolated to a single component or page
import { Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    isMobile: boolean;

    constructor(page: Page, isMobile: boolean) {
        this.page = page;
        this.isMobile = isMobile;
    }
    get resultContinue_btn() {
        return this.page.locator("#common-success a.btn");
    }
    get resultTitle() {
        return this.page.locator("h1.page-title");
    }
    get notificationBox() {
        return this.page.locator("#notification-box-top");
    }

    actionOnNotification(action: string) {
        return this.page.locator('//a[contains(.,"' + action + '")]');
    }
    get toastMsg() {
        return this.page.locator("div.toast-body");
    }

    async open(url?: string) {
        console.log("Navigate to our home page");
        if (url) {
            await this.page.goto(url);
        } else {
            await this.page.goto("/");
        }
    }
    async continueOnResultPage(msg: string) {
        await expect(this.resultTitle).toHaveText(msg);
        await this.resultContinue_btn.click();
    }

    async waitForPageFullyLoaded(url: string) {
        await this.page.waitForURL(url);
    }

    async selectActionOnNotification(name: string) {
        await this.toastMsg.waitFor();
        await this.actionOnNotification(name).nth(1).click();
    }
}
