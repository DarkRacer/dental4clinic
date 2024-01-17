import { ObjectId } from "mongodb";

class MyRequest {
    id: string;
    userId: string;
    name: string;
    phone: string;
    description: string;
    isActual: boolean;

    constructor(id: string, userId: string, name: string, phone: string, description: string, isActual: boolean) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.description = description;
        this.isActual = isActual;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            userId: this.userId,
            name: this.name,
            phone: this.phone,
            description: this.description,
            isActual: this.isActual
        };
    }
}

export { MyRequest };
