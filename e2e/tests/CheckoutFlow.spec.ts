import { App } from "../pages/app"
// import {expect, test} from '@playwright/test'
import UserDetails from "../fixtures/model/userDetails"
import ProductInfo from "../fixtures/model/productInfo"
import { test } from "../fixtures/model/credentials"
import { expect } from "@playwright/test"


test.beforeEach(async ({ page }) => {
    // let app = new App(page)
    // await app.basePage.open()
    await page.goto('/')
})

// Checkout with register customer
// checkout with guest - two or more product
// checkout with returning customer - 

var userDetails = new UserDetails();
// test.describe.configure({ mode: 'serial' });
test('Purchase a product as a guest', async ({ page }) => {
    let app = new App(page)
    let productInfo: ProductInfo

    console.log('STEP 1: Select the first product of Collection section')
    await app.homePage.selectFirstProduct()

    console.log('STEP 2: On product details, select quantity and Buy Now')
    productInfo = await app.productDetailsPage.buyWithQuantity(2)

    console.log('STEP 3.1: On checkout page, validate product information')

    // using file test data
    // const data = JSON.parse(JSON.stringify(require("../testdata/buyProduct.json"))).buyProduct;
    // await app.checkoutPage.validateTotalPrice(new ProductInfo(data.name, data.price, data.quantity))
    await app.checkoutPage.validateTotalPrice(productInfo)
    // userDetails.firstName = 'firstName'
    console.log('STEP 3.2: Fill in customer information')
    await app.checkoutPage.addUserInfo(userDetails)

    console.log('STEP 4: confirm the order and recieve Order Success')
    await app.confirmOrderPage.confirmOrder('HTC Touch HD', 2)

})

test('Search and purchase a product as logged-in user', async ({ page, userLogin }) => {
    let app = new App(page)
    let product:ProductInfo
    console.log('Login 1')
    await app.topbarPage.selectMainMenu('My account', 'Login')
    await app.loginPage.login(userLogin.USERNAME, userLogin.PASSWORD)

    //search a product - HTC Touch HD
    await app.topbarPage.searchItem('HTC Touch HD')
    let name='...'
    let price=''
    product = await app.searchPage.addProductToCart(0)
    await app.topbarPage.goToCart()
    await app.shoppingPage.validateProductShoppingCart(product)
    await app.shoppingPage.closeShoppingCart()

    await app.topbarPage.selectMainMenu('My account', 'Logout')
    await app.logoutPage.logOut()

    // await app.loginPage.loginWithAPI(userLogin.USERNAME, userLogin.PASSWORD)
    await app.topbarPage.selectMainMenu('My account', 'Login')
    await app.loginPage.login(userLogin.USERNAME, userLogin.PASSWORD)
    await app.topbarPage.goToCart()
    await app.shoppingPage.validateProductShoppingCart(product)
})

test('Should add item to cart', async ({ page }) => {
    const Url = 'https://ecommerce-playground.lambdatest.io/index.php/';
    await page.goto(Url);
    const response = await page.request.post(Url, {
        params: {
            route: "checkout/cart/add"
        },
        form: {
            product_id: 28,
            quantity: 1
        }
    })
    await page.goto(`${Url}?route=checkout/cart`)
    await expect(page.locator("td.text-left", { hasText: 'HTC Touch HD' })).toBeVisible()
    await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue("1")
})

test('Remove item in cart', async ({ page, userLogin }) => {
    let app = new App(page)
    await app.loginPage.loginWithAPI(userLogin.USERNAME, userLogin.PASSWORD)
    await page.reload()
    
    const response = await page.request.patch('/checkout/cart/remove', {
        form: {
            product_id: 28,
            quantity: 0
        }
    })
    expect(response.ok()).toBeTruthy()
    await page.goto(`?route=checkout/cart`)
    // await expect(page.locator("td.text-left", { hasText: 'HTC Touch HD' })).toBeVisible()
    // await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue("1")
})

