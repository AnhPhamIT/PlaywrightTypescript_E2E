import { test as base } from "@playwright/test";
import { App } from "../pages/app";
import BaseAPI from "../api/base";
import { PageFixture } from "../../type";
// export type PageFixture = {
//     userLogin: any;
//     app: any;
//     api: any;
// };

// export const user = base.extend<PageFixture>({
//     userLogin: [{ username: "", password: "" }, { option: true }]
// });

export const test = base.extend<PageFixture>({
    userLogin: [{ username: "", password: "" }, { option: true }],
    app: async ({ page }, use) => {
        let app = new App(page);
        await use(app);
    },
    api: async ({ page }, use) => {
        let api = new BaseAPI(page);
        await use(api);
    }
});
//https://stackoverflow.com/questions/77476850/how-do-you-add-a-custom-property-to-the-playwright-config-file
