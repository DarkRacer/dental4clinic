import Router from "express";
import { ServiceController } from "./service.controller";

const serviceController = new ServiceController();
export const serviceRouter = Router();

serviceRouter.get('/all', serviceController.getAllService);
serviceRouter.post('/doctor/delete/:serviceId', serviceController.deleteDoctorService);
serviceRouter.get('/doctor/add/:serviceId', serviceController.addDoctorService);
serviceRouter.get('/doctor/:doctorId', serviceController.getDoctorService);
