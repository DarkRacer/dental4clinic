import Router from "express";
import { AppointmentController } from "./appointment.controller";

const appointmentController = new AppointmentController();
export const appointmentRouter = Router();

appointmentRouter.get('/', appointmentController.getAllAppointments);