import { Request, Response } from "express";
import * as userService from "../../services/user.service";
import * as diagnosisService from "../../services/diagnose.service";
import * as toothCardService from "../../services/tooth-card.service";
import * as toothService from "../../services/tooth.service";
import * as requestService from "../../services/request.service";
import { User } from "../../models/user";
import { MyRequest } from "../../models/my-request";

export class UserController {
    
    /**
     * Method for getting a user by userId
     * @param req Unique user id (req.params.userId)
     * @param res User object
     */
    public getUser = async (req: Request, res: Response) => {
        try {
          const userId: string = req.params.userId;
          const user = await userService.getUser(userId);

          if (user == null) {
            res.status(404).json({ status: 404, success: false, error: `User with id = ${userId} not found` });
          }

          res.status(200).json(user);
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).json({ status: 400, success: false, error: e.message });
            } else {
                res.status(500).json({ status: 500, success: false, error: 'Произошла внутренняя ошибка' });
            }
        }
    };

    public editUser = async (req: Request, res: Response) => {
        try {
          const userId: string = req.params.userId;
          const userData: User = req.body;
          userService.editUser(userId, userData.toMongoObject());
          res.status(204).send();
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).json({ status: 400, success: false, error: e.message });
            } else {
                res.status(500).json({ status: 500, success: false, error: 'Произошла внутренняя ошибка' });
            }
        }
    };

    public getUserDiagnosis = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const diagnoses = await diagnosisService.getDiagnosesByUserId(userId);

            res.status(200).json(diagnoses);
        } catch (error) {
            console.error('Error in getUserDiagnosis:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public createUserDiagnosis = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const diagnose = req.body.diagnose;

            const diagnoses = await diagnosisService.addDiagnoseAndGetAll(userId, diagnose);
            res.status(200).json(diagnoses);
        } catch (error) {
            console.error('Error in addDiagnosis:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public updateUserDiagnosis = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const diagnose = req.body.diagnose;

            const updatedDiagnoses = await diagnosisService.updateDiagnosisAndGetAll(userId, diagnose);
            res.status(200).json(updatedDiagnoses);
        } catch (error) {
            console.error('Error in updateDiagnosis:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public getUserToothCard = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const toothCard = await toothCardService.getToothCardByUserId(userId);

            if (!toothCard) {
                res.status(404).json({ message: 'Tooth card not found' });
                return;
            }

            res.status(200).json(toothCard);
        } catch (error) {
            console.error('Error in getUserToothCard:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public updateUserToothCard = async (req: Request, res: Response) => {
        
    };

    public getUserTooth = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const toothArray = await toothService.getUserTooth(userId);

            return res.status(200).json(toothArray);
        } catch (error) {
            console.error('Error in getUserTooth controller:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getUserRequests = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const requests = await requestService.getRequestsByUserId(userId);
            return res.status(200).json(requests);
        } catch (error) {
            console.error('Error in getRequestsByUserId controller:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}