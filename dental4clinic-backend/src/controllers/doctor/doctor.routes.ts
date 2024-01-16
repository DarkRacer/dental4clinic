import Router from "express";
import { DoctorController } from "./doctor.controller";

const doctorController = new DoctorController();
export const doctorRouter = Router();

doctorRouter.get('/:doctorId', doctorController.getDoctor);
doctorRouter.get('/services', doctorController.getAllDoctorsServices); // Change API /doctors/services -> /doctor/services
//doctorRouter.get('/create', doctorController.createDoctor);
//doctorRouter.get('/edit', doctorController.editDoctor);
//doctorRouter.get('/delete', doctorController.deleteDoctor);