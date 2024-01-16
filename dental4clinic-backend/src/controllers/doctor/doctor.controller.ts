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
            res.status(404).json({ status: 404, success: false, error: `Doctor with id = ${doctorId} not found` });
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

    public getAllDoctors = async (req: Request, res: Response) => {
      try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
      } catch (error) {
        console.error('Error in getAllDoctorsServices:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    public getAllDoctorsServices = async (req: Request, res: Response) => {
        try {
            const services = await doctorService.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            console.error('Error in getAllDoctorsServices:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public createDoctor = async (req: Request, res: Response) => {
        try {
            const doctors = await doctorService.createDoctor(req.body);
            res.status(200).json(doctors);
        } catch (error) {
            console.error('Error in getServices:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public editDoctor = async (req: Request, res: Response) => {
        try {
            const doctors = await doctorService.editDoctor(req.body);
            res.status(200).json(doctors);
        } catch (error) {
            console.error('Error in editDoctor:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public deleteDoctor = async (req: Request, res: Response) => {
        try {
            const doctors = await doctorService.deleteDoctor(req.body);
            res.status(200).json(doctors);
        } catch (error) {
            console.error('Error in deleteDoctor:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}
