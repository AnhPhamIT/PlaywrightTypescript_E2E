import { Page } from "@playwright/test";
import BaseAPI from "./base.api";
export class CartAPI extends BaseAPI {
    constructor(public page: Page) {
        super(page);
    }
    async addToCartAPI(productId: any, quantity: number) {
        let params = {
            params: {
                route: "checkout/cart/add"
            }
        };
        let body = {
            form: {
                product_id: productId,
                quantity: quantity
            }
        };
        return await this.POST("/", body, { requestParams: params });
    }

    async editCartAPI(productId: any, quantity: number) {
        let params = {
            params: {
                route: "checkout/cart/edit"
            }
        };
        let body = {
            form: {
                product_id: productId,
                quantity: quantity
            }
        };
        return await this.POST("/", body, { requestParams: params });
    }
}
