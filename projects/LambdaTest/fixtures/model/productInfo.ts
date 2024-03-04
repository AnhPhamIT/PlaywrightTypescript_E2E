export default class ProductInfo{
    public name:any
    public price:any
    public quantity:number

    constructor(name:any, price:any, quantity:number, size?:any ){
        this.name = name
        this.price = price
        this.quantity = quantity
    }

    // constructor(){
    //     // this.name = name
    //     // this.price = price
    //     // this.quantity = quantity
    // }

}