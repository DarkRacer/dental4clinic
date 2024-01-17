import { ObjectId } from "mongodb";

class Price {
    id: string;
    serviceId: string;
    name: string;
    description: string;
    pluses: string;
    price: string;
    group: string;

    constructor(id: string, serviceId: string, name: string, description: string, pluses: string, price: string, group: string) {
        this.id = id;
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.pluses = pluses;
        this.price = price;
        this.group = group;
    }

    toMongoObject(): any {
        return {
            _id: this.serviceId == null ? null : new ObjectId(this.id),
            serviceId: this.serviceId,
            name: this.name,
            description: this.description,
            pluses: this.pluses,
            price: this.price,
            group: this.group
        };
    }
}

export { Price };