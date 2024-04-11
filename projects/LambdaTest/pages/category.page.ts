import { Page } from "@playwright/test";
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

    // verify title of category page
    async addProductsToCart(orders): Promise<Product[]> {
        let itemComponent = new ItemComponent(this.page, this.isMobile);
        let products: Product[] = [];
        for (let item of orders) {
            let product: Product;
            product = await itemComponent.addProductToCart(item.index, item.sectionName);
            products.push(product);
            if (this.isMobile) await this.gotoCategoryPage();
        }
        return products;
    }
}
