require("dotenv").config();
const { expect } = require("@playwright/test");
import { WEB_CONFIG } from "../constants/webConfig";

class BaseAPI {
    private apiURL = process.env.API_URL || WEB_CONFIG[process.env.TEST_ENVIRONMENT!].API_URL;
    customVariables = {};
    page;

    constructor(page) {
        this.page = page;
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
