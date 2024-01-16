import Router from "express";
import { LoginController } from "./loginController";

const loginController = new LoginController();
export const loginRouter = Router();

loginRouter.post('/', loginController.signIn);
