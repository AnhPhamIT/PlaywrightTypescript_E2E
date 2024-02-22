import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductDetails } from "./productDetails.page";
import ProductInfo from "../fixtures/model/productInfo";

export class Search extends BasePage{
    constructor(page:Page){
        super(page)
    }
    get productItem(){return this.page.locator('div.product-thumb')}

    async addProductToCart(index:number){
        const selectedProduct =this.productItem.nth(index)
        //get product info
        let name = await selectedProduct.locator('h4').textContent()
        let price = await selectedProduct.locator('span.price-new').textContent()
        await selectedProduct.hover()
        await selectedProduct.locator('button[title="Add to Cart"]').click()
        return new ProductInfo(name, price,1)
    }
}