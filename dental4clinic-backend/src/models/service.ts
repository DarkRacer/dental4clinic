import { ObjectId } from "mongodb";

class Service {
    id: string;
    service: string;
    description: string;
    price: number;

    constructor(id: string, service: string, description: string, price: number) {
        this.id = id;
        this.service = service;
        this.description = description;
        this.price = price;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            service: this.service,
            description: this.description,
            price: this.price
        };
    }
}

export { Service };