import { Request, Response } from "express";
import * as priceService from "../../services/price.service";

export class PriceController {
    public getAllPrices = async (req: Request, res: Response) => {
        try {
            const prices = await priceService.getAllPrices();
            const groupedPrices = priceService.groupPricesByService(prices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error('Error in getAllPrices controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public getPriceByServiceId = async (req: Request, res: Response) => {
        try {
            const serviceId = req.params.priceId; // На фронт передаётся serviceId и используется как priceId
            const price = await priceService.getPriceByServiceId(serviceId);

            if (!price) {
                return res.status(404).json({ message: 'Service not found' });
            }

            res.status(200).json(price);
        } catch (error) {
            console.error('Error in getServiceById controller:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public createPrice = async (req: Request, res: Response) => {
        try {
            const updatedPrices = await priceService.createPriceAndGetUpdatedPrices(req.body);
            const groupedPrices = priceService.groupPricesByService(updatedPrices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error("Error creating price:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    public editPrice = async (req: Request, res: Response) => {
        try {
            const updatedPrices = await priceService.editPriceAndGetUpdatedPrices(req.body);
            const groupedPrices = priceService.groupPricesByService(updatedPrices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error("Error editing price:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    public deletePrice = async (req: Request, res: Response) => {
        try {
            const deletedPrices = await priceService.deletePriceAndGetUpdatedPrices(req.body);
            const groupedPrices = priceService.groupPricesByService(deletedPrices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error("Error deleting price:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}