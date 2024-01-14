import { Request, Response } from "express";
import * as doctorService from "../../services/doctor.service";

export class DoctorController {
    
    /**
     * Method for getting a doctor by doctorId
     * @param req Unique doctor id (req.params.doctorId)
     * @param res Doctor object
     */
    public getDoctor = async (req: Request, res: Response) => {
        try {
          const doctorId: string = req.params.doctorId;
          const doctor = await doctorService.getDoctor(doctorId);

          if (doctor == null) {
            res.status(404).json({ status: 404, success: false, error: `User with id = ${doctorId} not found` });
          }

          res.status(200).json(doctor);
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).json({ status: 400, success: false, error: e.message });
            } else {
                res.status(500).json({ status: 500, success: false, error: 'Произошла внутренняя ошибка' });
            }
        }
    };
}