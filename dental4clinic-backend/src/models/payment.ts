import { ObjectId } from "mongodb";

class Payment {
    id: string;
    date: string;
    userId: string;
    userName: string;
    doctorId: string;
    doctorName: string;
    service: string;
    price: number;
    isActive: boolean;

    constructor(id: string, date: string, userId: string, userName: string, doctorId: string, doctorName: string, service: string, price: number, isActive: boolean) {
        this.id = id;
        this.date = date;
        this.userId = userId;
        this.userName = userName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.service = service;
        this.price = price;
        this.isActive = isActive;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            date: this.date,
            userId: this.userId,
            userName: this.userName,
            doctorId: this.doctorId,
            doctorName: this.doctorName,
            service: this.service,
            price: this.price,
            isActive: this.isActive
        };
    }
}

export { Payment };