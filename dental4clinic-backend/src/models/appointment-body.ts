import { ObjectId } from "mongodb";

class Appointment {
    id: string;
    userId: string;
    userName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    dateTime: string;
    serviceName: string;
    description: string;

    constructor(id: string, userId: string, userName: string, doctorId: string, 
        doctorName: string, date: string, dateTime: string, serviceName: string, description: string) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.date = date;
        this.dateTime = dateTime;
        this.serviceName = serviceName;
        this.description = description;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            userId: this.userId,
            userName: this.userName,
            doctorId: this.doctorId,
            doctorName: this.doctorName,
            date: this.date,
            dateTime: this.dateTime,
            serviceName: this.serviceName,
            description: this.description
        };
    }
}

export { Appointment };