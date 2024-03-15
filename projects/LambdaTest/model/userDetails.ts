import { faker } from "@faker-js/faker";
export default class UserDetails {
    //--- Personal Details
    public firstName: any;
    public lastName: any;
    public email: any;
    public phoneNumber: any;
    public password: any;
    //--- Billing Address
    public company: any;
    public address01: any;
    public address02: any;
    public city: any;
    public postcode: any;
    public country: any;
    public zone: any;

    constructor() {
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email();
        this.phoneNumber = faker.phone.number();
        this.company = faker.company.name();
        this.address01 = faker.location.streetAddress();
        this.address02 = faker.location.secondaryAddress();
        this.city = faker.location.city();
        this.postcode = faker.location.zipCode();
        this.country = "Australia";
        this.zone = "Tasmania";
        this.password = "password";
    }
}
