import Router from "express";
import { AuthController } from "./auth.controller";

const authController = new AuthController();
export const authRouter = Router();

authRouter.post('/', authController.signIn);