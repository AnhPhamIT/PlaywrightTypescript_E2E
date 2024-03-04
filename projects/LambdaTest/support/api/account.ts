import { Page } from "@playwright/test"
import UserDetails from "../../fixtures/model/userDetails"

export class AccountAPI{
    constructor(public page:Page, public apiURL:string){
    }

    async registerAccount(userDetails: UserDetails) {
        const response = await this.page.request.post(this.apiURL, {
            params: {
                route: "account/register"
            },
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
        })
        return response
    }

    async login( username: string, password: string) {
        return await this.page.request.post(this.apiURL, {
            params: {
                route: "account/login"
            },
            form: {
                email: username,
                password: password,
                // redirect:"https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
            }
        })
    }

    async logOut() {
        return await this.page.request.get(this.apiURL, {
            params: {
                route: "account/logout"
            }
        })
    }
}