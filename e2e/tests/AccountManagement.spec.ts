import { App } from "../pages/app"
import {expect} from '@playwright/test'
import UserDetails from "../fixtures/model/userDetails"
import ProductInfo from "../fixtures/model/productInfo"
import { test } from "../fixtures/model/credentials"


test.beforeEach(async({page})=>{
    let app = new App(page)
    await app.basePage.open()
    // await page.goto('/')
})

test('Manage account', async({page, userLogin})=>{
    let app = new App(page)
    const response = await app.loginPage.loginWithAPI(userLogin.USERNAME, userLogin.PASSWORD)
    expect(response.status()).toBe(200)
    await page.goto(`?route=account/account`)

})

test.only('Login with API', async({page, userLogin})=>{
    let app = new App(page)
    const response = await app.loginPage.loginWithAPI(userLogin.USERNAME, userLogin.PASSWORD)
    expect(response.status()).toBe(200)
    await page.goto(`?route=checkout/cart`)
    
})