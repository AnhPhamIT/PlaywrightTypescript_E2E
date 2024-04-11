import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";

export class Cart extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    get checkoutBtn() {
        return this.page.getByRole("link", { name: "Checkout" });
    }
    getSelectedProduct(name: any) {
        return this.page.getByRole("row").filter({ hasText: name }).nth(1);
    }

    async validateAProduct(productInfo: Product) {
        console.log(`Product Info ${JSON.stringify(productInfo)}`);
        const productRow = this.getSelectedProduct(productInfo.name);
        const unitPrice = await productRow.locator("td").nth(4).textContent();
        expect(unitPrice).toContain(productInfo.price.toString());
        let quantityPrice = await productRow.locator("td").nth(5).textContent();
        let calPrice = Number(productInfo.price * productInfo.quantity);
        expect(quantityPrice).toContain(calPrice.toString());
    }

    async validateListProduct(products: Product[]) {
        for (const product of products) {
            await this.validateAProduct(product);
        }
    }
    async gotoCheckout() {
        await this.checkoutBtn.click();
    }
}
