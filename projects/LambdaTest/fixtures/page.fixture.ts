import { test as base } from "@playwright/test";
import { App } from "../pages/app";
import { PageFixture } from "../../type";
import { AccountAPI } from "../api/account";
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
        await use(new App(page));
    },
    api: async ({ page }, use) => {
        await use(new AccountAPI(page));
    }
});
//https://stackoverflow.com/questions/77476850/how-do-you-add-a-custom-property-to-the-playwright-config-file
