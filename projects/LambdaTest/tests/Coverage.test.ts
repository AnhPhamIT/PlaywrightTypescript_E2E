import { test } from "../fixtures/CoverageTestFixture";

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test('load with background: Turquoise', async ({ page }) => {
  await page.waitForSelector("text=#1abc9c")
});

test('click Red Button', async ({ page }) => {
  await page.click("text=Red")
  await page.waitForSelector("text=#e74c3c")
});

test('click Yellow button', async ({ page }) => {
  await page.click("text=Yellow")
  await page.waitForSelector("text=#f1c40f")
});


test('click Turquoise button', async ({ page }) => {
  await page.click("text=Turquoise")
  await page.waitForSelector("text=#1abc9c")
});


