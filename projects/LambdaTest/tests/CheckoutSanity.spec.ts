import { App } from "../pages/app"
import { test } from '../fixtures/testOptions'
import ProductInfo from "../fixtures/model/productInfo"
import UserDetails from "../fixtures/model/userDetails"

test.beforeEach(async ({ page }) => {
    let app = new App(page)
    await app.basePage.open()
})

test('Should able to checkout a product with new registered user', async ({ page }) => {
    let app = new App(page)
    let productInfo: ProductInfo
    var userDetails = new UserDetails()

    console.log('Register new account')
    await app.registerPage.registerAccount(userDetails)
    await app.topbarPage.goToHomePage()

    console.log('STEP 1: Select the a product of Collection section')
    await app.homePage.viewCollectionProductByIndex(0)

    console.log('STEP 2: On product details, select quantity and Buy Now')
    productInfo = await app.productDetailsPage.inputOrderDetails(2)
    await app.productDetailsPage.selectBuyNow()

    console.log('STEP 3.1: On checkout page, validate product information')
    await app.checkoutPage.validateCheckoutItem(productInfo)

    console.log('STEP 3.2: Fill in customer information')
    await app.checkoutPage.agreeAndContinueCheckout(userDetails)

    console.log('STEP 4: confirm the order and recieve Order Success')
    await app.confirmOrderPage.confirmOrder(productInfo)
})

test('Should able to checkout product as returning user', async ({ page, apiURL }) => {
    let app = new App(page, apiURL)
    let productInfo: ProductInfo
    var userDetails = new UserDetails()
    await test.step('Create account', async () => {
        await app.accountAPI.registerAccount(userDetails)
        await app.accountAPI.logOut()
    })

    await test.step('Login with existing account', async () => {
        await app.loginPage.login(userDetails.email, userDetails.password)
        await app.topbarPage.goToHomePage()
    })

    await test.step('Select the a product of Collection section', async () => {
        await app.homePage.viewCollectionProductByIndex(1)
    })
    await test.step('On product details, input order details and Buy Now', async () => {
        productInfo = await app.productDetailsPage.inputOrderDetails(2)
        await app.productDetailsPage.selectBuyNow()
    })
    await test.step('On cart, validate product information', async () => {
        await app.checkoutPage.validateCheckoutItem(productInfo)
        // await app.cart.validateShoppingCart(productInfo)
    })
    await test.step('Fill in customer information', async () => {
        await app.checkoutPage.agreeAndContinueCheckout(userDetails)
    })
    await test.step('Confirm the order and recieve Order Success', async () => {
        await app.confirmOrderPage.confirmOrder(productInfo)
    })

})

test('@only Should able to search then checkout a product', async({page, userLogin, apiURL})=>{
    let app = new App(page, apiURL)
    let productInfo: ProductInfo
    
    await page.setViewportSize({ width: 1600, height: 850 });
    // await app.accountAPI.login(userLogin.USERNAME, userLogin.PASSWORD)
    await app.topbarPage.searchProductByName('Nikon D300')
    await app.searchPage.validateProductImageByIndex(1)
    productInfo =await app.searchPage.addProductToCartByIndex(1)
    await app.basePage.selectActionOnNotification('Checkout')
    // await app.checkoutPage.validateCheckoutItem(new ProductInfo("Nikon D300",98,1))
    await app.checkoutPage.validateCheckoutItem(productInfo)
    
})