export default class CommonUtils {
    static splitValue(value: any, index: any): any {
        let newValue = value.split(' ')[index];
        return newValue;
    }

    static convertCurrencyToNumber(value:any){
        return Number(value.replace(/[^0-9.-]+/g,""));
    }
    static randomIndex(n){
        return Math.floor(Math.random() * n);
    }

}