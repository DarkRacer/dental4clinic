import { ObjectId } from "mongodb";

class MyRequest {
    id: string;
    date: string;
    userId: string;
    name: string;
    phone: string;
    description: string;
    isActual: boolean;

    constructor(id: string, date: string, userId: string, name: string, phone: string, description: string, isActual: boolean) {
        this.id = id;
        this.date = date;
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.description = description;
        this.isActual = isActual;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            date: this.date,
            userId: this.userId,
            name: this.name,
            phone: this.phone,
            description: this.description,
            isActual: this.isActual
        };
    }
}

export { MyRequest };