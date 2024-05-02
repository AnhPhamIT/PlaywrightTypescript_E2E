import { Locator, Page, TestInfo } from "@playwright/test";
import { BasePage } from "./base.page";
import { takeSnapshot } from "@chromatic-com/playwright";
import { ItemComponent } from "./components/item.components";
import Product from "../model/product.model";

export class Search extends BasePage {
    testInfo: TestInfo;
    isMobile: boolean;
    constructor(page: Page, testInfo: TestInfo, isMobile: boolean) {
        super(page);
        this.testInfo = testInfo;
        this.isMobile = isMobile;
    }

    // search criteria
    async validateProductImageByIndex(index: number) {
        // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

        // const productImg = this.productItem.locator("div.carousel-item.active img").nth(index);
        // await productImg.scrollIntoViewIfNeeded();
        // await productImg.waitFor();

        // await expect(productImg).toHaveScreenshot({ maxDiffPixelRatio: 0.2 });
        await takeSnapshot(this.page, this.testInfo);
    }
}
