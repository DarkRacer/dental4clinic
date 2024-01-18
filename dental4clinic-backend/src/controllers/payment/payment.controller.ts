import { Request, Response } from "express";
import * as paymentService from "../../services/payment.service";

export class PaymentController {

    public getUserPayments = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const paymentsByUser = await paymentService.getAllPaymentsByUser(userId);
            res.status(200).json(paymentsByUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public getAllPayments = async (req: Request, res: Response) => {
        try {
            const payments = await paymentService.getAllPayments();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public updatePayment = async (req: Request, res: Response) => {
        try {
            const payments = await paymentService.updatePaymentAndFetchAll(req.body);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public deletePayment = async (req: Request, res: Response) => {
        try {
            const payments = await paymentService.deletePaymentAndFetchAll(req.body);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}