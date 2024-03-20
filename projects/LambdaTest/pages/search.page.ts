import { Page, TestInfo } from "@playwright/test";
import { BasePage } from "./base.page";
import Product from "../model/product.model";
import CommonUtils from "../support/util/commonUtils";
import { takeSnapshot } from "@chromatic-com/playwright";

export class Search extends BasePage {
    testInfo: TestInfo;
    constructor(page: Page, testInfo: TestInfo) {
        super(page);
        this.testInfo = testInfo;
    }
    get productItem() {
        return this.page.locator("div.product-thumb");
    }

    async addProductToCartByIndex(index: number) {
        const selectedProduct = this.productItem.nth(index);
        //get product info
        let name = await selectedProduct.locator("h4").textContent();
        let price = await selectedProduct
            .locator("span.price-new")
            .textContent()
            .then((p) => {
                return CommonUtils.convertCurrencyToNumber(p);
            });
        await selectedProduct.hover({ trial: true });
        await selectedProduct.hover();
        await Promise.all([
            await selectedProduct.locator('button[title="Add to Cart"]').click()
            // await this.page.locator("div.toast-body").waitFor(),
            // await this.page.locator('//a[contains(.,"View Cart")]').click()
        ]);

        return new Product(name, price, 1);
    }

    async validateProductImageByIndex(index: number) {
        // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

        const productImg = this.productItem.locator("div.carousel-item.active img").nth(index);
        await productImg.scrollIntoViewIfNeeded();
        await productImg.waitFor();

        // await expect(productImg).toHaveScreenshot({ maxDiffPixelRatio: 0.2 });
        await takeSnapshot(this.page, this.testInfo);
    }
}
