import { ObjectId } from "mongodb";

class Price {
    serviceId: string;
    name: string;
    description: string;
    pluses: string;
    price: string;
    group: string;

    constructor(serviceId, name: string, description: string, pluses: string, price: string, group: string) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.pluses = pluses;
        this.price = price;
        this.group = group;
    }

    toMongoObject(): any {
        return {
            _id: this.serviceId == null ? null : new ObjectId(this.serviceId),
            name: this.name,
            description: this.description,
            pluses: this.pluses,
            price: this.price,
            group: this.group
        };
    }
}

export { Price };