import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";
import CommonUtils from "../support/util/commonUtils";

export class ProductDetails extends BasePage {
    constructor(page: Page, isMobile: boolean) {
        super(page, isMobile);
    }
    get price() {
        return this.page.locator("div.price h3");
    }
    get name() {
        return this.page.locator("div.content-title h1");
    }

    get buyNowBtn() {
        return this.page.locator('button[title="Buy now"]');
    }
    get addToCart_btn() {
        const addToCartLocator = this.page.locator('button[title="Add to Cart"]');
        return this.isMobile ? addToCartLocator.nth(0) : addToCartLocator.nth(1);
    }
    get buywNow_btn() {
        return this.page.locator('div.entry-col button[title="Buy now"]');
    }
    get size_options() {
        return this.page.locator('(//select[@class="custom-select"])[1]/option');
    }
    get size_ddl() {
        return this.page.locator('(//select[@class="custom-select"])[1]');
    }

    get quantityInput() {
        return this.isMobile
            ? this.page.locator('div.fixed-bottom input[name="quantity"]')
            : this.page.locator('div.entry-section input[name="quantity"]');
    }

    async randomSizeIdx() {
        const sizeOptions = this.size_options.all();
        return CommonUtils.randomIndex((await sizeOptions).length);
    }

    async inputOrderDetails(quantity: number) {
        let selectedOptions: any;
        let itemName = await this.name.textContent();
        await this.quantityInput.fill(quantity.toString());
        if (await this.size_ddl.isVisible()) {
            let sizeIdx = await this.randomSizeIdx();
            console.log("Selecting Size " + sizeIdx + 1);
            if (await this.size_ddl.isEnabled()) {
                await this.size_ddl.selectOption({ index: sizeIdx });
                selectedOptions = await this.size_options.nth(sizeIdx).allInnerTexts();
            } else {
                console.log("Retry on selecting Size");
                await this.size_ddl.selectOption({ index: sizeIdx });
                selectedOptions = await this.size_options.nth(sizeIdx).allInnerTexts();
            }
        }
        await this.price.click({ delay: 1000 });
        let price = 0;
        price = await this.price.textContent().then((p) => {
            return CommonUtils.convertCurrencyToNumber(p);
        });
        return new Product(itemName, price, quantity, selectedOptions);
    }

    async selectBuyNow() {
        if (this.isMobile) {
            await this.addToCart_btn.click();
            await this.selectActionOnNotification("Checkout");
        } else {
            await this.buywNow_btn.click();
        }
    }

    async selectAddToCart() {
        await this.addToCart_btn.click();
    }
}
