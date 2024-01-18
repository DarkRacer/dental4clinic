import Router from "express";
import { UserController } from "./user.controller";

const userController = new UserController();
export const userRouter = Router();

userRouter.post('/create', userController.createNewUser);
userRouter.post('/diagnosis/create', userController.createUserDiagnosis);
userRouter.post('/diagnosis/update', userController.updateUserDiagnosis);
userRouter.post('/edit/:userId', userController.editUser);
userRouter.get('/tooth/:userId', userController.getUserTooth);
userRouter.get('/requests/:userId', userController.getUserRequests);
userRouter.get('/diagnosis/:userId', userController.getUserDiagnosis);
userRouter.get('/tooth-card/:userId', userController.getUserToothCard);
userRouter.post('/tooth-card/:userId/update', userController.updateUserToothCard);
userRouter.get('/:userId', userController.getUser);
