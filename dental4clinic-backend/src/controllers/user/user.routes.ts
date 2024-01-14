import Router from "express";
import { UserController } from "./user.controller";

const userController = new UserController();
export const userRouter = Router();

userRouter.get('/:userId', userController.getUser);
userRouter.post('/edit/:userId', userController.editUser);
userRouter.get('/diagnosis/:userId', userController.getUserDiagnosis);
userRouter.post('/diagnosis/create', userController.createUserDiagnosis);
userRouter.post('/diagnosis/update', userController.updateUserDiagnosis);
userRouter.get('/tooth-card/:userId', userController.getUserToothCard);
userRouter.post('/tooth-card/:userId/update', userController.updateUserToothCard);
userRouter.get('/tooth/:userId', userController.getUserTooth);
userRouter.get('/requests/:userId', userController.getUserRequests);

// userRouter.get('/admin/:userId', userController.getAdmin);
// userRouter.post('/admin/:userId', userController.updateAdmin);
// userRouter.get('/director/:userId', userController.getDirector);