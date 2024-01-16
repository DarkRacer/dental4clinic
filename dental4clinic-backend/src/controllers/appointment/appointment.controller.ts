import { Request, Response } from "express";
import * as appointmentService from "../../services/appointment.service";

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
            await appointmentService.createAppointment(req.body);
            res.status(204).send();
          } catch (error) {
            res.status(500).send(error.message);
          }
    };

}