import { ObjectId } from "mongodb";

class DoctorService {
    id: string;
    doctorId: string;
    doctor: string;
    services: string;
    serviceId: string;

    constructor(id: string, doctorId: string, doctor: string, services: string, serviceId: string) {
        this.id = id;
        this.doctorId = doctorId;
        this.doctor = doctor;
        this.services = services;
        this.serviceId = serviceId;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            doctorId: this.doctorId,
            doctor: this.doctor,
            services: this.services,
            serviceId: this.serviceId
        };
    }
}

export { DoctorService };