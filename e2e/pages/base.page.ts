//Idea: place to store any global actions which are not isolated to a single component or page
import { Page} from '@playwright/test'
import { webConfig } from "../constants/webConfig"

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    get userLogin() {
        const environmentVar = (process.env.TEST_ENVIRONMENT === undefined) ? 'qa' : process.env.TEST_ENVIRONMENT
        return webConfig[environmentVar]
    }

    async open() {
        console.log('Navigate to our home page')
        await this.page.goto('/')
    }
    async waitForPageFullyLoaded() {
        await this.page.waitForLoadState('domcontentloaded')
    }

    // api support

}
