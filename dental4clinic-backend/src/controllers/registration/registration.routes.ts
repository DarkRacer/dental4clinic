import Router from "express";
import { RegistrationController } from "./registration.controller";

const registrationController = new RegistrationController();
export const registrationRouter = Router();

registrationRouter.post('/registration', registrationController.registration);