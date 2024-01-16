import Router from "express";
import { DiagnoseController } from "./diagnose.controller";

const diagnoseController = new DiagnoseController();
export const diagnoseRouter = Router();

diagnoseRouter.get('/', diagnoseController.getAllDiagnosis);