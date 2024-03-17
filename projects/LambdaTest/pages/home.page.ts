import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class Home extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get collectionProducts() {
        return this.page.locator('div.mz-tab-listing:has-text("Top Collection")');
    }

    async selectAProductByIndex(index: number) {
        const productItem = this.collectionProducts.locator("div.product-thumb");
        await productItem.nth(index).waitFor({ state: "visible" });
        await productItem.nth(index).click();
    }
}
