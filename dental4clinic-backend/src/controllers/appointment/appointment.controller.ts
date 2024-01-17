import { Request, Response } from "express";
import * as appointmentService from "../../services/appointment.service";
import * as authService from "../../services/auth.service";
import {registration} from "../../services/registration.service";
import {ObjectId} from "mongodb";
import {RegistrationUserBody} from "../../models/registration-user";

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
            const appointmentId = req.params.appointmentId;
            const appointments = await appointmentService.getAllAppointmentsById(appointmentId);
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    // Что за API?
    public getAppointmentFinish = async (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    };

    public createAppointment = async (req: Request, res: Response) => {
        try {
            const currentUser = authService.getCurrentUserFromRequest(req)
            let role = ""
            if (currentUser) {
              role = currentUser['role']
            }

            await appointmentService.createAppointment(req.body, role);
            res.status(204).send();

          //               let currentUser = authService.getCurrentUserFromRequest(req)
          //             let role = ""
          //             let login = ""
          //             let password = ""
          //             if (currentUser) {
          //               role = currentUser['role']
          //             } else {
          //               let userData = {
          //                 name: req.body.name,
          //                 surname: req.body.surname,
          //                 phone: req.body.phone,
          //                 login: req.body.phone,
          //                 password: new ObjectId(),
          //               }
          //               const registerInfo = await registration(userData)
          //               role = "USER"
          //               req.body.userId = registerInfo.user.id
          //               login = registerInfo.user.login
          //               password = registerInfo.user.password
          //             }
          //
          //             await appointmentService.createAppointment(req.body, role, currentUser);
          //             return {login: login, password: password}
          } catch (error) {
            res.status(500).send(error.message);
          }
    };

}
