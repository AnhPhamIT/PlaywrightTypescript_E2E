import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { ACCOUNT_LOGOUT } from "../constants/messages";

export class LogOut extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async logOut() {
        await this.page.waitForURL("**/index.php?route=account/logout");
        await this.continueOnResultPage(ACCOUNT_LOGOUT);
    }
}
