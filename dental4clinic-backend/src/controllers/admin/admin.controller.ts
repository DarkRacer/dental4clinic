import { Request, Response } from "express";
import * as adminService from "../../services/admin.service";

export class AdminController {

    public getAdmins = async (req: Request, res: Response) => {
        try {
            const admins = await adminService.getAdmins();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public createAdmin = async (req: Request, res: Response) => {
        try {
            const admins = await adminService.createAdminAndFetchAll(req.body);
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public editAdmin = async (req: Request, res: Response) => {
        try {
            const admins = await adminService.editAdminAndFetchAll(req.body);
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public deleteAdmin = async (req: Request, res: Response) => {
        try {
            const admins = await adminService.deleteAdminAndFetchAll(req.body);
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}
