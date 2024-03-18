import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class Account extends BasePage {
    constructor(page: Page, isMobile: boolean) {
        super(page, isMobile);
    }
}
