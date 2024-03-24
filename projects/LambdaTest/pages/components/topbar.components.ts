import { Page, expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class TopBar extends BasePage {
    isMobile: boolean;
    constructor(page: Page, isMobile: boolean) {
        super(page);
        this.isMobile = isMobile;
    }
    get main_menu() {
        return this.page.locator("div#main-navigation ul.navbar-nav li");
    }
    get search_input() {
        const searchLocator = this.page.locator('input[name="search"]');
        return this.isMobile ? searchLocator.nth(1) : searchLocator.nth(0);
    }
    get search_btn() {
        const searchBtn = this.page.locator('button[type="submit"]');
        return this.isMobile ? searchBtn.nth(1) : searchBtn.nth(0);
    }
    get cart_btn() {
        return this.page.locator(".cart-icon").first();
    }
    get searchResults() {
        return this.page.locator("li.product-thumb");
    }

    get accountMenu() {
        return this.isMobile
            ? this.page.locator("i.icon.fas.fa-user-cog")
            : this.page.locator("i.icon.fas.fa-user");
    }
    subMenu(name: string) {
        return this.isMobile
            ? this.page.locator('span:has-text("' + name + '")').nth(0)
            : this.page.locator('span:has-text("' + name + '")').nth(1);
    }
    homeIcon(title: string) {
        return this.page.locator(`figure a[title='${title}']`);
    }

    async goToHomePage() {
        if (this.isMobile) {
            await this.homeIcon("Poco Theme").click();
        } else {
            await this.homeIcon("Poco Electro").click();
        }
        await this.page.waitForURL("**/index.php?route=common/home");
    }

    async selectMenu(menu: string, submenu: string) {
        if (this.isMobile) {
            await this.accountMenu.click();
            await this.page.locator(`span:has-text("${menu}")`).nth(0).click();
            await this.page.locator(`//a[contains(text(),'${submenu}')]`).click();
        } else {
            await this.accountMenu.hover();
            await this.page.locator(`span:has-text("${submenu}")`).click();
        }

        // await this.page.waitForURL("**/index.php?route=account/login");
    }
    async searchProductByName(name: string) {
        await this.search_input.fill(name);
        await this.search_btn.click();
    }

    async goToCart() {
        await this.cart_btn.click();
    }
}
