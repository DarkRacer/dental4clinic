import Router from "express";
import { AdminController } from "./admin.controller";

const adminController = new AdminController();
export const adminRouter = Router();

adminRouter.get('/all', adminController.getAdmins);
adminRouter.post('/create', adminController.createAdmin);
adminRouter.post('/edit', adminController.editAdmin);
adminRouter.post('/delete', adminController.deleteAdmin);
