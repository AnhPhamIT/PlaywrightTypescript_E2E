import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";
import { ItemComponent } from "./components/item.components";

export class CategoryPage extends BasePage {
    isMobile;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }
    async gotoCategoryPage() {
        await this.closeNotification();
        await this.page.locator("li.breadcrumb-item a").nth(1).click();
        await this.waitForPageFullyLoaded("product/category**");
    }
}
