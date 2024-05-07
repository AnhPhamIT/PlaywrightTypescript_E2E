import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";
import { ItemComponent } from "./components/item.components";
import { TopBar } from "./components/topbar.components";

export class Home extends BasePage {
    isMobile: boolean;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }
    productSection(sectionName: string) {
        return this.page.locator(`//h3[text()='${sectionName}']/following::div[@class='tab-content'][1]`);
    }
    getProduct(index: number, sectionName: string): Locator {
        let product = this.productSection(sectionName).locator("div.product-thumb");
        return product.nth(index);
    }
    async gotoProductDetails(index: number, sectionName: string) {
        const selectedProduct = this.getProduct(index, sectionName);
        await selectedProduct.click();
    }
    // top trending
    // top product
    // top collection
    async selectProductByIndex(index: number, sectionName: string) {
        let selector = this.getProduct(index, sectionName);
        return new ItemComponent(this.page, this.isMobile, selector);
    }

    async addProductsToCart(orders): Promise<Product[]> {
        let topBar = new TopBar(this.page, this.isMobile);
        let products: Product[] = [];
        for (let item of orders) {
            let product: Product;
            let itemObj = await this.selectProductByIndex(item.index, item.sectionName);
            product = await itemObj.getItemInfo();
            await itemObj.addToCart();
            products.push(product);
            if (this.isMobile) await topBar.goToHomePage();
        }
        return products;
    }
}
