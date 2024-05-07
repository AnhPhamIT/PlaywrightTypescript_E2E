require("dotenv").config();
const { expect } = require("@playwright/test");
import playwrightConfig from "../../../playwright.config";

class BaseAPI {
    //https://playwrightsolutions.com/how-do-you-define-an-apiurl-along-with-the-baseurl-in-playwright/
    //private apiURL = process.env.API_URL; // get baseURL, apiURL config
    customVariables = {};
    page;

    constructor(page) {
        this.page = page;
        page.context({
            baseURL: playwrightConfig.use?.apiURL
        });
        // console.log("--------- " + playwrightConfig.use?.apiURL);
    }

    GET = async (endpoint, { requestParams = {} } = {}) => {
        const response = await this.page.request.get(`${endpoint}`, { params: requestParams });
        await expect(response.ok()).toBeTruthy();
        return response;
    };

    POST = async (endpoint, body, { requestParams = {}, requestHeaders = {} } = {}) => {
        const response = await this.page.request.post(`${endpoint}`, {
            ...body,
            params: requestParams,
            headers: requestHeaders
        });
        await expect(response.ok()).toBeTruthy();
        return response;
    };
}

export default BaseAPI;
