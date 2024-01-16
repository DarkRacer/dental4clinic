import { ObjectId } from "mongodb";

class Service {
    id: string;
    doctorId: string;
    doctor: string;
    service: string;
    description: string;
    price: number;

    constructor(id: string, doctorId: string, doctor: string, service: string, description: string, price: number) {
        this.id = id;
        this.doctorId = doctorId;
        this.doctor = doctor;
        this.service = service;
        this.description = description;
        this.price = price;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            doctorId: this.doctorId,
            doctor: this.doctor,
            service: this.service,
            description: this.description,
            price: this.price
        };
    }
}

export { Service };