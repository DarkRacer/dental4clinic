import Router from "express";
import { PaymentController } from "./payment.controller";

const paymentController = new PaymentController();
export const paymentRouter = Router();

paymentRouter.get('/user/:userId', paymentController.getUserPayments);
paymentRouter.get('/all', paymentController.getAllPayments);
paymentRouter.post('/update', paymentController.updatePayment);
paymentRouter.post('/delete', paymentController.deletePayment);