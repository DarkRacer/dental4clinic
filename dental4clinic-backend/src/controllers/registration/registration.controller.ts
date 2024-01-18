import { Request, Response } from "express";
import * as registrationService from "../../services/registration.service";

export class RegistrationController {
    public registration = async (req: Request, res: Response) => {
        const result = await registrationService.registration(req.body);
        if (result.error) {
            res.status(409).json({ message: result.error, req: req.body });
        } else {
            res.status(200).json(result.token);
        }
    };
}
