import { Request, Response } from "express";
import * as servicesService from "../../services/services.service";

export class ServiceController {
    public getDoctorServices = async (req: Request, res: Response) => {
        try {
            const doctorId = req.params.doctorId;
            const services = await servicesService.getServicesByDoctorId(doctorId);
            res.status(200).json(services);
        } catch (error) {
            console.error('Error in getServiceById controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public getAllService = async (req: Request, res: Response) => {
        try {
            const services = await servicesService.getAllService();
            res.status(200).json(services);
        } catch (error) {
            console.error('Error in getServiceById controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public deleteDoctorService = async (req: Request, res: Response) => {
        try {
            const doctorId = req.params.doctorId;
            const service = req.body;
            const services = await servicesService.deleteDoctorFromService(doctorId, service);
            res.status(200).json(services);
        } catch (error) {
            console.error('Error in getServiceById controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public addDoctorService = async (req: Request, res: Response) => {
        try {
            const doctorId = req.params.doctorId;
            const service = req.body;
            const services = await servicesService.addDoctorFromService(doctorId, service);
            res.status(200).json(services);
        } catch (error) {
            console.error('Error in getServiceById controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}