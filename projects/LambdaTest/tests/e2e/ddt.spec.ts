import { test } from "../../fixtures/page.fixture";
import Product from "../../model/product.model";
import { takeSnapshot } from "@chromatic-com/playwright";
import CommonUtils from "../../support/util/commonUtils";
import path from "path";

test.beforeEach(async ({ app }) => {
    await app.basePage.open();
});
var filename = path.basename(__filename);
//https://stackoverflow.com/questions/76985740/looping-through-csv-records-in-playwright-typescript-test-using-fixtures
const records = CommonUtils.getTestData(filename);
test.describe.configure({ mode: "serial" });
for (const record of records) {
    test(`@ddt Should able to search then checkout product ${record.name}`, async ({ app }, testInfo) => {
        // let productInfo: Product;
        // await app.topbarPage.searchProductByName(record.name);
        // await takeSnapshot(app.page, testInfo);
        // productInfo = await app.itemComponent.addProductToCart(1);
        // await app.basePage.selectActionOnNotification("Checkout");
        // await app.checkoutPage.validateCheckoutItem(productInfo);
    });
}
