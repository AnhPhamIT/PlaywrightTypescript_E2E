import CommonUtils from "../../support/util/commonUtils";
import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "../productDetails.page";
import Product from "../../model/product.model";

export class ItemComponent {
    isMobile: boolean;
    selector: Locator;
    page: Page;
    constructor(page: Page, isMobile: boolean, selector: Locator) {
        this.page = page;
        this.isMobile = isMobile;
        this.selector = selector;
    }

    async addToCart() {
        if (this.isMobile) {
            let productPage = new ProductDetails(this.page, this.isMobile);
            await this.selector.waitFor();
            await this.selector.click();
            await productPage.selectAddToCart();
        } else {
            await this.selector.hover({ trial: true });
            await this.selector.hover();
            await Promise.all([await this.selector.locator('button[title="Add to Cart"]').click()]);
        }
    }

    // getProductInfo() ------------------------------------------------------------------------
    async getItemInfo(): Promise<Product> {
        await this.selector.waitFor();
        let name = await this.selector.locator("h4").textContent();
        let price = await this.selector
            .locator("span.price-new")
            .textContent()
            .then((p) => {
                return CommonUtils.convertCurrencyToNumber(p);
            });
        let quantity = 1;
        return { name, price, quantity };
    }

    // add to cart
    // add to wish list
    // quick View
    // get itemInfo
}
