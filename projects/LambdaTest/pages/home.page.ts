import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class Home extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    productSection(sectionName: string) {
        return this.page.locator(`//h3[text()='${sectionName}']/following::div[@class='tab-content'][1]`);
    }
    // get collectionProducts() {
    //     return this.page.locator('div.mz-tab-listing:has-text("Top Collection")');
    // }

    async selectAProductByIndex(sectionName: string, index: number) {
        const productItem = this.productSection(sectionName).locator("div.product-thumb");
        await productItem.nth(index).waitFor({ state: "visible" });
        await productItem.nth(index).click();
    }
}
