import { Page, expect } from "@playwright/test";
import { BasePage } from "../base.page";
import Product from "../../model/product.model";

export class ShoppingCart extends BasePage {
    isMobile;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }

    get cart_btn() {
        return this.isMobile ? this.page.locator(".cart-icon").nth(1) : this.page.locator(".cart-icon").nth(0);
    }
    actionOnCart(action: string) {
        return this.page.getByRole("button", { name: action });
    }
    getProductLs(name: string) {
        return this.page.locator('table tr:has-text("' + name + '")');
    }

    async selectActionOnNotification(name: string) {
        await this.toastMsg.first().waitFor();
        await this.actionOnNotification(name).first().click();
    }

    async closeNotification() {
        await this.notificationExit.click();
    }

    async validateProductShoppingCart(product: Product) {
        const productRow = this.getProductLs(product.name!);
        let actualPrice = await productRow.locator("td").nth(3).textContent();
        expect(actualPrice).toContain(product.price.toString());
        let actualQuantity = await productRow.locator("td").nth(2).textContent();
        expect(actualQuantity).toContain(product.quantity.toString());
    }
    async gotoCart() {
        const isNoti = await this.notificationBox.isVisible();
        if (isNoti) {
            await this.selectActionOnNotification("View Cart");
        } else {
            await this.cart_btn.click();
            await this.actionOnCart("Edit cart").click();
        }
    }

    async gotoCheckout() {
        const isNoti = await this.notificationBox.isVisible();
        if (isNoti) {
            await this.selectActionOnNotification("Checkout");
        } else {
            await this.cart_btn.click();
            await this.actionOnCart("Checkout").click();
        }
    }

    async closeShoppingCart() {
        await this.page.keyboard.press("Escape");
    }
}
