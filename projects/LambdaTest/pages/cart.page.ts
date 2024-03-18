import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";

export class Cart extends BasePage {
    constructor(page: Page, isMobile: boolean) {
        super(page, isMobile);
    }
    getSelectedProduct(name: any) {
        let normalizeName = name.replace('"', "");
        return this.page.locator("div#checkout-cart tr:has-text('" + normalizeName + "')");
    }

    async validateShoppingCart(productInfo: Product) {
        console.log(`Product Info ${JSON.stringify(productInfo)}`);
        const productRow = this.getSelectedProduct(productInfo.name);
        const unitPrice = await productRow.locator("td").nth(4).textContent();
        expect(unitPrice).toContain(productInfo.price.toString());
        let quantityPrice = await productRow.locator("td").nth(5).textContent();
        let calPrice = Number(productInfo.price * productInfo.quantity);
        expect(quantityPrice).toContain(calPrice.toString());
    }
}
