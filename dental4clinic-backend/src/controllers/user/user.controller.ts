import { Request, Response } from "express";
import * as userService from "../../services/user.service";

export class UserController {
    
    /**
     * Method for getting a user by userId
     * @param req Unique user id (req.params.userId)
     * @param res User object
     */
    public getUser = async (req: Request, res: Response) => {
        try {
          const userId: number = parseInt(req.params.userId);
          const user = await userService.getUser(userId);
          res.status(200).json({ status: 200, success: true, data: user });
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).json({ status: 400, success: false, error: e.message });
            } else {
                res.status(500).json({ status: 500, success: false, error: 'Произошла внутренняя ошибка' });
            }
        }
    };
}