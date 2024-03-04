import { test, expect } from '@playwright/test'

test('compare page', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await expect(page).toHaveScreenshot();

});

test('element comparison', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  // expect product image
  const productImg = page.locator('div.product-thumb-top div.carousel-item.active img').first()
  await productImg.waitFor()
  // const hrefElement = await page.$('div.product-thumb-top div.carousel-item.active img');
  // await hrefElement?.waitForElementState('stable')
  await expect(productImg).toHaveScreenshot({ maxDiffPixelRatio: 0.2 })
});

test('@only full page comparison', async ({ page, browserName }) => {
  test.skip(browserName==='webkit', 'Flaky test on webkit')
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  //mask dynamic part of the page
  await expect(page).toHaveScreenshot({ mask: [page.locator('.carousel-inner')], maxDiffPixelRatio: 0.1 })
});