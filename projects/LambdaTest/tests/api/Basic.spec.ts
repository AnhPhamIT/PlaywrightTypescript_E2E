import { expect, test } from "../../fixtures/api.fixture";

test("Get user information", async ({ api }) => {
    let params = { route: "account/edit" };
    let response = await api.GET("/", { requestParams: params });
    let body = await response.text();
    await expect(body).toContain("My Account Information");
    await expect(body).toContain(api.customVariables.email);
});

test("Update address details for required fields", async ({ api }) => {
    let body = {
        form: {
            firstname: "Test",
            lastname: "User",
            address_1: "21 Test Address",
            city: "Test City",
            postcode: 1000,
            country_id: 150,
            zone_id: 2336,
            default: 1
        }
    };
    let params = { route: "account/address/edit", address_id: 5141 };

    let response = await api.POST("/", body, { requestParams: params });
    let respBody = await response.text();
    await expect(respBody).toContain("Your address has been successfully updated");
});
