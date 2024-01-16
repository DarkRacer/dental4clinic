import { Request, Response } from "express";
import * as diagnoseService from "../../services/diagnose.service";

export class DiagnoseController {

    public getAllDiagnosis = async (req: Request, res: Response) => {
        try {
            const diagnosis = await diagnoseService.getAllDiagnosis();
            res.status(200).json(diagnosis);
        } catch (error) {
            console.error("Error creating price:", error);
            res.status(500).send("Internal Server Error");
        }
    };
}