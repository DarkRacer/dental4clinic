import { Request, Response } from "express";
import * as authService from "../../services/auth.service";
import { Login } from "../../models/login";

export class LoginController {

    public signIn = async (req: Request, res: Response) => {
        const authData = new Login(req.body.login, req.body.password);
        authService.signIn(authData);
        try {
            const token = await authService.signIn(authData);
            if (!token) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            return res.status(200).json(token);
        } catch (error) {
            res.status(401).json({ message: 'Authentication failed' });
        }
    };
}
