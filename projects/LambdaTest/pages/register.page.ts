import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import User from "../model/user.model";
import { TopBar } from "./components/topbar.components";
import { ACCOUNT_CREATED_MSG } from "../constants/messages";

export class Register extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    get agree_radio() {
        return this.page.locator("label[for='input-agree']");
    }
    get continue_btn() {
        return this.page.locator("input[type='submit']");
    }
    userInputField(field: any) {
        return this.page.locator(`input#${field}`);
    }

    async waitForRegisterPage() {
        await this.waitForPageFullyLoaded("**/index.php?route=account/register");
    }

    async registerAccount(userDetails: User) {
        let topBar = new TopBar(this.page);
        await topBar.selectMainMenu("My account", "Register");
        await this.userInputField("input-firstname").fill(userDetails.firstName);
        await this.userInputField("input-lastname").fill(userDetails.lastName);
        await this.userInputField("input-email").fill(userDetails.email);
        await this.userInputField("input-telephone").fill(userDetails.phoneNumber);
        await this.userInputField("input-password").fill(userDetails.password);
        await this.userInputField("input-confirm").fill(userDetails.password);
        await this.agree_radio.click();
        await this.continue_btn.click();
        await this.page.waitForURL("**/index.php?route=account/success");
        await this.continueOnResultPage(ACCOUNT_CREATED_MSG);
    }
}
