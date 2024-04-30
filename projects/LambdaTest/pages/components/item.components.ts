import CommonUtils from "../../support/util/commonUtils";
import { BasePage } from "../base.page";
import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "../productDetails.page";
import Product from "../../model/product.model";
import { link } from "fs";

export class ItemComponent extends BasePage {
    isMobile: boolean;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }

    productSection(sectionName: string) {
        return this.page.locator(`//h3[text()='${sectionName}']/following::div[@class='tab-content'][1]`);
    }

    getProduct(index: number, sectionName?: string) {
        let product;
        if (sectionName) {
            product = this.productSection(sectionName).locator("div.product-thumb");
        } else {
            product = this.page.locator("div.product-thumb");
        }
        return product.nth(index);
    }

    async gotoProductDetails(index: number, sectionName?: string) {
        const selectedProduct = this.getProduct(index, sectionName);
        await selectedProduct.click();
    }

    async addProductToCart(index: number, sectionName?: string): Promise<Product> {
        const selectedProduct = this.getProduct(index, sectionName);
        await selectedProduct.waitFor();
        //get product info
        let name = await selectedProduct.locator("h4").textContent();
        let price = await selectedProduct
            .locator("span.price-new")
            .textContent()
            .then((p) => {
                return CommonUtils.convertCurrencyToNumber(p);
            });
        if (this.isMobile) {
            let productPage = new ProductDetails(this.page, this.isMobile);
            await selectedProduct.waitFor();
            await selectedProduct.click();
            await productPage.selectAddToCart();
        } else {
            await selectedProduct.hover({ trial: true });
            await selectedProduct.hover();
            await Promise.all([
                await selectedProduct.locator('button[title="Add to Cart"]').click()
                // await this.page.locator("div.toast-body").waitFor(),
                // await this.page.locator('//a[contains(.,"View Cart")]').click()
            ]);
        }
        let quantity = 1;

        return { name, price, quantity };
    }

    // async addProductsToCart(orders): Promise<Product[]> {
    //     let products: Product[] = [];
    //     for (let item of orders) {
    //         let product: Product;
    //         product = await this.addProductToCart(item.index, item.sectionName);
    //         products.push(product);
    //     }
    //     return products;
    // }
    // add to cart
    // add to wish list
    // quick View
    // get itemInfo
}
