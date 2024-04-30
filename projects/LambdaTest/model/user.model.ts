import { faker } from "@faker-js/faker";
export type IUser = {
    //--- Personal Details
    firstName: string;
    lastName: any;
    email: any;
    phoneNumber: any;
    password: any;
    //--- Billing Address
    company: any;
    address01: any;
    address02: any;
    city: any;
    postcode: any;
    country: any;
    zone: any;
};

//Anh Pham
class _User implements IUser {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    email = faker.internet.email();
    phoneNumber = faker.phone.number();
    company = faker.company.name();
    address01 = faker.location.streetAddress();
    address02 = faker.location.secondaryAddress();
    city = faker.location.city();
    postcode = faker.location.zipCode();
    country = "Australia";
    zone = "Tasmania";
    password = "password";
}
export const User = new _User();
