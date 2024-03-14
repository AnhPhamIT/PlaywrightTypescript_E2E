import { Page } from "@playwright/test";
import UserDetails from "../fixtures/model/userDetails";
import BaseAPI from "./base";

export class AccountAPI extends BaseAPI {
    constructor(public page: Page) {
        super(page);
        this.page = page;
    }

    async registerAccount(userDetails: UserDetails) {
        let body = {
            form: {
                firstname: userDetails.firstName,
                lastname: userDetails.lastName,
                email: userDetails.email,
                telephone: userDetails.phoneNumber,
                password: userDetails.password,
                confirm: userDetails.password,
                newsletter: 0,
                agree: 1
            }
        };

        let params = {
            route: "account/register"
        };

        return await this.POST("/", body, { requestParams: params });
    }

    async login(username: string, password: string) {
        let params = { route: "account/login" };
        let body = {
            form: {
                email: username,
                password: password
                // redirect:"https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
            }
        };
        return await this.POST("/", body, { requestParams: params });
    }

    async logOut() {
        let params = {
            route: "account/logout"
        };
        return await this.GET("/", { requestParams: params });
    }
}
