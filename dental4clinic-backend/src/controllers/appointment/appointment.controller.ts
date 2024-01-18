import { Request, Response } from "express";
import * as appointmentService from "../../services/appointment.service";
import * as authService from "../../services/auth.service";
import * as userService from "../../services/user.service";
import {ObjectId} from "mongodb";

export class AppointmentController {

    public getAllAppointments = async (req: Request, res: Response) => {
        try {
            const appointments = await appointmentService.getAllAppointments();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public getAllAppointmentsByUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const appointments = await appointmentService.getAllAppointmentsByUser(userId);
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public getAllAppointmentsByDoctor = async (req: Request, res: Response) => {
        try {
            const doctorId = req.params.doctorId;
            const appointments = await appointmentService.getAllAppointmentsByDoctor(doctorId);
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public getAllAppointmentsById = async (req: Request, res: Response) => {
        try {
            console.log("999999999999999999999999999999")
            const appointmentId = req.params.appointmentId;
            const appointments = await appointmentService.getAllAppointmentsById(appointmentId);
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public getAppointmentFinish = async (req: Request, res: Response) => {
        try {
            const appointmentId = req.params.appointmentId;
            const body = req.body;
            appointmentService.getAppointmentToFinish(appointmentId, body);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public createAppointment = async (req: Request, res: Response) => {
        try {
            const currentUser = authService.getCurrentUserFromRequest(req);
            let role = "";
            if (currentUser) {
                role = currentUser['role']
                await appointmentService.createAppointment(req.body, role);
                res.status(204).send();
            } else {
                let userData = {
                    name: req.body.name,
                    surname: req.body.surname,
                    phone: req.body.phone,
                    login: req.body.phone,
                    password: new ObjectId().toHexString(),
                }
                const saveUser = await userService.saveUserToMongo(userData)
                role = "USER"
                req.body.userId = saveUser._id.toString();
                await appointmentService.createAppointment(req.body, role);
                res.status(200).json({login: saveUser.login, password: saveUser.password});
            }   
          } catch (error) {
            res.status(500).send(error.message);
          }
    };

}
