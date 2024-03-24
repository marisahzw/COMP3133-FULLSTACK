export class Customer {
    firstName: string;
    lastName: string;
    private _age: number; 
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age; 
    }

    greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}!`);
    }

    getAge() {
        console.log(`Age ${this._age}`);
    }
}