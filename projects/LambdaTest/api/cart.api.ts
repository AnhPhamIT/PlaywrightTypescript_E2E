import { Page } from "@playwright/test";
export class CartAPI {
    constructor(public page: Page, public apiURL: string) {}
    async addToCartAPI(productId: any, quantity: number) {
        const response = await this.page.request.post(this.apiURL, {
            params: {
                route: "checkout/cart/add"
            },
            form: {
                product_id: productId,
                quantity: quantity
            }
        });
    }

    async editCartAPI(productId: any, quantity: number) {
        const response = await this.page.request.post(this.apiURL, {
            params: {
                route: "checkout/cart/edit"
            },
            form: {
                product_id: productId,
                quantity: quantity
            }
        });
        return response;
    }
}
