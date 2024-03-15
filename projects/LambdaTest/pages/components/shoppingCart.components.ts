import { Page, expect } from "@playwright/test";
import { BasePage } from "../base.page";
import ProductInfo from "../../model/productInfo";

export class ShoppingCart extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getProductLs(name: string) {
        return this.page.locator('table tr:has-text("' + name + '")');
    }

    async validateProductShoppingCart(product: ProductInfo) {
        const productRow = this.getProductLs(product.name);
        let actualPrice = await productRow.locator("td").nth(3).textContent();
        expect(actualPrice).toContain(product.price.toString());
        let actualQuantity = await productRow.locator("td").nth(2).textContent();
        expect(actualQuantity).toContain(product.quantity.toString());
    }

    async closeShoppingCart() {
        await this.page.keyboard.press("Escape");
    }
}
