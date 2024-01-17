import { ObjectId } from "mongodb";
import { Appointment } from "../models/appointment-body";
import { connect } from "../mongo";
import { AppointmentBodyAdmin, AppointmentBodyUnauthorized, AppointmentBodyUser } from "../models/appointment";
import {disableRequest, getRequestsById} from "./request.service";
import {getUser} from "./user.service";

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
            item.datetime,
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
        const appointmentsData = await collection.find({ "userId": userId }).toArray();

        return appointmentsData.map(item => new Appointment(
            item._id.toString(),
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.date,
            item.datetime,
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
            item.datetime,
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
            item.datetime,
            item.serviceName,
            item.description
        ));
    } catch (error) {
        console.error('Error in getAllAppointmentsById:', error);
        throw error;
    }
}

export async function appointmentsToFinish(appointmentId: string): Promise<void> {
}

export async function createAppointment(appointmentData: any, userRole: string): Promise<void> {
    let appointment;
    let user;
    let userName;
    console.log(userRole)
    switch (userRole) {
      case "ADMIN":
        const request = await getRequestsById(appointmentData.requestId)
        if (request.userId) {
          user = await getUser(request.userId)
          userName = user.surname + ' ' + user.name + ' ' + user.patronymic
        } else {
          userName = request.name
        }

        appointment = new AppointmentBodyAdmin(
          appointmentData.requestId,
          appointmentData.date,
          appointmentData.datetime,
          appointmentData.description,
          appointmentData.doctorId,
          appointmentData.doctorName,
          userName
        );
        break;
      case "USER":
        user = await getUser(appointmentData.userId)
        console.log(user)
        userName = user.surname + ' ' + user.name + ' ' + user.patronymic
        appointment = new AppointmentBodyUser(
          appointmentData.userId,
          appointmentData.date,
          appointmentData.datetime,
          appointmentData.description,
          appointmentData.doctorId,
          appointmentData.doctorName,
          userName
        );
        break;
      default:
        userName = appointmentData.surname + ' ' + appointmentData.name
        appointment = new AppointmentBodyUnauthorized(
          appointmentData.name,
          appointmentData.date,
          appointmentData.datetime,
          appointmentData.description,
          appointmentData.doctorId,
          appointmentData.phone,
          appointmentData.surname,
          appointmentData.doctorName,
          userName
        );
        break;
    }

    try {
        const db = await connect();
        const collection = db.collection("appointments");
        await collection.insertOne(appointment.toMongoObject());
        if (appointmentData.requestId) {
          await disableRequest(appointmentData.requestId)
        }
    } catch (error) {
        console.error('Error in createAppointment:', error);
        throw error;
    }
}
