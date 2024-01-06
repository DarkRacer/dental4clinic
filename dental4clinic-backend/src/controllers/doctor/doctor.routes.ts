import Router from "express";
import { DoctorController } from "./doctor.controller";

const doctorController = new DoctorController();
export const doctorRouter = Router();

doctorRouter.get('/:doctorId', doctorController.getDoctor);