import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";
import { ItemComponent } from "./components/item.components";
import { TopBar } from "./components/topbar.components";

interface IOrder {
    sectionName: string;
    index: number;
}

export class Home extends BasePage {
    isMobile: boolean;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }
    // top trending
    // top product
    // top collection
    async addProductsToCart(orders): Promise<Product[]> {
        let itemComponent = new ItemComponent(this.page, this.isMobile);
        let topBar = new TopBar(this.page, this.isMobile);
        let products: Product[] = [];
        for (let item of orders) {
            let product: Product;
            product = await itemComponent.addProductToCart(item.index, item.sectionName);
            products.push(product);
            if (this.isMobile) await topBar.goToHomePage();
        }
        return products;
    }
}
