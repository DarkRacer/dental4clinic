import { Request, Response } from "express";
import * as requestService from "../../services/request.service";

export class RequestController {

    public getAllRequests = async (req: Request, res: Response) => {
        try {
            const requests = await requestService.getAllRequests();
            res.status(200).json(requests);
        } catch (error) {
            console.error('Error in getAllRequests controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public createRequest = async (req: Request, res: Response) => {
        try {
            await requestService.createRequestAndFetchAll(req.body);
            res.status(204).send();
        } catch (error) {
            console.error('Error in createRequest controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public editRequest = async (req: Request, res: Response) => {
        try {
            const requests = await requestService.editRequestAndFetchAll(req.body);
            res.status(200).json(requests);
        } catch (error) {
            console.error('Error in editRequest controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public deleteRequest = async (req: Request, res: Response) => {
        try {
            const requests = await requestService.deleteRequestAndFetchAll(req.body);
            res.status(200).json(requests);
        } catch (error) {
            console.error('Error in deleteRequest controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}