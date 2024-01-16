import { ObjectId } from "mongodb";
import { Appointment } from "../models/appointment-body";
import { connect } from "../mongo";
import { AppointmentBodyAdmin, AppointmentBodyUnauthorized, AppointmentBodyUser } from "../models/appointment";

export async function getAllAppointments(): Promise<Appointment[]> {
    try {
        const db = await connect();
        const collection = db.collection("appointments");
        const appointmentsData = await collection.find({}).toArray();

        return appointmentsData.map(item => new Appointment(
            item._id.toString(),
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.date,
            item.dateTime,
            item.serviceName,
            item.description
        ));
    } catch (error) {
        console.error('Error in getAllAppointments:', error);
        throw error;
    }
}

export async function getAllAppointmentsByUser(userId: string): Promise<Appointment[]> {
    try {
        const db = await connect();
        const collection = db.collection("appointments");
        const appointmentsData = await collection.find({ "user-id": userId }).toArray();

        return appointmentsData.map(item => new Appointment(
            item._id.toString(),
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.date,
            item.dateTime,
            item.serviceName,
            item.description
        ));
    } catch (error) {
        console.error('Error in getAllAppointmentsByUser:', error);
        throw error;
    }
}

export async function getAllAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    try {
        const db = await connect();
        const collection = db.collection("appointments");
        const appointmentsData = await collection.find({ "doctorId": doctorId }).toArray();

        return appointmentsData.map(item => new Appointment(
            item._id.toString(),
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.date,
            item.dateTime,
            item.serviceName,
            item.description
        ));
    } catch (error) {
        console.error('Error in getAllAppointmentsByDoctor:', error);
        throw error;
    }
}

export async function getAllAppointmentsById(appointmentId: string): Promise<Appointment[]> {
    try {
        const db = await connect();
        const collection = db.collection("appointments");
        const appointmentsData = await collection.find({ _id: new ObjectId(appointmentId) }).toArray();

        return appointmentsData.map(item => new Appointment(
            item._id.toString(),
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.date,
            item.dateTime,
            item.serviceName,
            item.description
        ));
    } catch (error) {
        console.error('Error in getAllAppointmentsById:', error);
        throw error;
    }
}

export async function createAppointment(appointmentData: any): Promise<void> {
    let appointment;

    switch (appointmentData.role) {
      case "ADMIN":
        appointment = new AppointmentBodyAdmin(
          appointmentData.requestId,
          appointmentData.date,
          appointmentData.datetime,
          appointmentData.description,
          appointmentData.doctorId
        );
        break;
      case "USER":
        appointment = new AppointmentBodyUser(
          appointmentData.userId,
          appointmentData.date,
          appointmentData.datetime,
          appointmentData.description,
          appointmentData.doctorId
        );
        break;
      default:
        appointment = new AppointmentBodyUnauthorized(
        appointmentData.name,
        appointmentData.date,
        appointmentData.datetime,
        appointmentData.description,
        appointmentData.doctorId,
        appointmentData.phone,
        appointmentData.surname
        );
        break;
    }

    try {
        const db = await connect();
        const collection = db.collection("appointments");
        await collection.insertOne(appointment.toMongoObject());
    } catch (error) {
        console.error('Error in getAllAppointmentsById:', error);
        throw error;
    }
}