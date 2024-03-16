export default class Product {
    public name: any;
    public price: any;
    public quantity: number;

    constructor(name: any, price: number, quantity: number, size?: any) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
