require("dotenv").config();
const { expect } = require("@playwright/test");

class BaseAPI {
    private apiURL;
    customVariables = {};
    page;

    constructor(page, apiUrl) {
        this.page = page;
        this.apiURL = apiUrl;
        page.context({
            baseURL: this.apiURL
        });
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
