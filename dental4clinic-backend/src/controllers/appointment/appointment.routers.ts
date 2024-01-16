import Router from "express";
import { AppointmentController } from "./appointment.controller";

const appointmentController = new AppointmentController();
export const appointmentRouter = Router();

appointmentRouter.get('/', appointmentController.getAllAppointments);
appointmentRouter.get('/user/:userId', appointmentController.getAllAppointmentsByUser);
appointmentRouter.get('/doctor/:doctorId', appointmentController.getAllAppointmentsByDoctor);
appointmentRouter.get('/:appointmentId', appointmentController.getAllAppointmentsById);
appointmentRouter.post('/:appointmentId/finish', appointmentController.getAppointmentFinish);
appointmentRouter.post('/create', appointmentController.createAppointment);