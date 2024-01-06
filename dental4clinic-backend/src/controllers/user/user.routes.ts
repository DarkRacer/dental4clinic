import Router from "express";
import { UserController } from "./user.controller";

const userController = new UserController();
export const userRouter = Router();

userRouter.get('/:userId', userController.getUser);