import Router from "express";
import { ServiceController } from "./service.controller";

const serviceController = new ServiceController();
export const serviceRouter = Router();

serviceRouter.get('/all', serviceController.getAllService);
serviceRouter.get('/doctor/:doctorId', serviceController.getDoctorServices);
serviceRouter.post('/doctor/delete/:doctorId', serviceController.deleteDoctorService);
serviceRouter.post('/doctor/add/:doctorId', serviceController.addDoctorService);