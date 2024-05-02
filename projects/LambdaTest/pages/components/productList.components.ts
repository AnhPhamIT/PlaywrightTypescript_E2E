import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { ItemComponent } from "./item.components";
import Product from "../../model/product.model";

export class ProductList extends BasePage {
    isMobile: boolean;
    constructor(page: Page, isMobile) {
        super(page);
        this.isMobile = isMobile;
    }

    getProduct(index: number): Locator {
        return this.page.locator("div.product-thumb").nth(index);
    }

    async gotoProductDetails(index: number) {
        const selectedProduct = this.getProduct(index);
        await selectedProduct.click();
    }

    async addAProductToCart(index: number): Promise<Product> {
        let item = new ItemComponent(this.page, this.isMobile);
        const productLocator = this.getProduct(index);
        return item.addToCart(productLocator);
    }

    async addProductsToCart(orders): Promise<Product[]> {
        let products: Product[] = [];
        for (let item of orders) {
            let product: Product;
            product = await this.addAProductToCart(item);
            products.push(product);
        }
        return products;
    }
}
