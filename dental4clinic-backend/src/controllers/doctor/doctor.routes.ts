import Router from "express";
import { DoctorController } from "./doctor.controller";

const doctorController = new DoctorController();
export const doctorRouter = Router();

doctorRouter.get('/all', doctorController.getAllDoctors);
doctorRouter.get('/services', doctorController.getAllDoctorsServices);
doctorRouter.get('/create', doctorController.createDoctor);
doctorRouter.get('/edit', doctorController.editDoctor);
doctorRouter.get('/delete', doctorController.deleteDoctor);
doctorRouter.get('/:doctorId', doctorController.getDoctor);
