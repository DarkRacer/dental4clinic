import Router from "express";
import { DoctorController } from "./doctor.controller";

const doctorController = new DoctorController();
export const doctorRouter = Router();

doctorRouter.get('/all', doctorController.getAllDoctors);
doctorRouter.get('/services', doctorController.getAllDoctorsServices);
doctorRouter.post('/create', doctorController.createDoctor);
doctorRouter.post('/edit', doctorController.editDoctor);
doctorRouter.post('/delete', doctorController.deleteDoctor);
doctorRouter.get('/:doctorId', doctorController.getDoctor);
