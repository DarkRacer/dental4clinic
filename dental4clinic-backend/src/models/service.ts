class Service {
    doctorId: string;
    doctor: string;
    services: string;

    constructor(doctorId: string, doctor: string, services: string) {
        this.doctorId = doctorId;
        this.doctor = doctor;
        this.services = services;
    }

    toMongoObject(): any {
        return {
            "doctor-id": this.doctorId,
            doctor: this.doctor,
            services: this.services
        };
    }
}

export { Service };