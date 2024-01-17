import { ObjectId } from "mongodb";
import { Appointment } from "../models/appointment-body";
import { connect } from "../mongo";
import { AppointmentBodyAdmin, AppointmentBodyUser } from "../models/appointment";
import {disableRequest, getRequestsById} from "./request.service";
import {getUser} from "./user.service";
import { Payment } from "../models/payment";

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

export async function createAppointment(appointmentData: any, userRole: string): Promise<void> {
    console.log("1", appointmentData)
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
          userName,
          request.userId
        );
        break;
      case "USER":
        user = await getUser(appointmentData.userId)
        userName = user.surname + ' ' + user.name + ' ' + user.patronymic
        appointment = new AppointmentBodyUser(
          appointmentData.userId,
          appointmentData.date,
          appointmentData.datetime,
          appointmentData.description,
          appointmentData.doctorId,
          appointmentData.doctorName,
          userName,
        );
        break;
    }
    console.log(appointment)
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


export async function getAppointmentToFinish(appointmentId: string, body: any): Promise<void> {
    const userId = body.userId;
    const services = body.services;
    try {
        const db = await connect();
        const collectionAppointments = db.collection("appointments");

        const query = { _id: new ObjectId(appointmentId) }
        const appointmentData = await collectionAppointments.findOne(query);

        let allServices = '';
        let allPrice = 0;
        services.array.forEach(element => {
            allServices += element.name + ', ';
            allPrice += element.price;
        });

        const payment = new Payment(
            null,
            appointmentData.date,
            appointmentData.userId,
            appointmentData.userName,
            appointmentData.doctorId,
            appointmentData.doctorName,
            allServices,
            allPrice,
            false
        );

        const collectionPayments = db.collection("payments");
        await collectionPayments.insertOne(payment.toMongoObject());
    } catch (error) {
        console.error('Error in getAllAppointmentsById:', error);
        throw error;
    }
}
