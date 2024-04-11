import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class FilterComponent extends BasePage {
    isMobile: boolean;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }
    userInputFields(name: string) {
        return this.page.locator(`(//label[text()='${name}'])[2]`);
    }
    subCategory(name: string) {
        return this.page.locator(`//label[text()[normalize-space()='${name}']]`);
    }
    color(color: string) {
        return this.page.locator(`(//img[@alt='${color}'])[2]`);
    }

    // Filter by Price, Search, Availability,...
    async filterByPrice() {}

    async filterBySubCategory(name: string) {
        await this.subCategory(name).click();
    }

    async filterByColor(color: string) {
        await this.color(color).click();
    }

    async filterBy(condition: string) {
        await this.userInputFields(condition).click();
    }
}
