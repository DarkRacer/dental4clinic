import { Request, Response } from "express";
import * as priceService from "../../services/price.service";
import { Price } from "../../models/price";

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

    public getPriceById = async (req: Request, res: Response) => {
        try {
            const serviceId = req.params.priceId;
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
            const data = req.body;
            const updatedPrices = await priceService.createPriceAndGetUpdatedPrices(data);
            const groupedPrices = priceService.groupPricesByService(updatedPrices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error("Error creating price:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    public editPrice = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const updatedPrices = await priceService.editPriceAndGetUpdatedPrices(data);
            const groupedPrices = priceService.groupPricesByService(updatedPrices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error("Error creating price:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    public deletePrice = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const updatedPrices = await priceService.deletePriceAndGetUpdatedPrices(data);
            const groupedPrices = priceService.groupPricesByService(updatedPrices);
            res.status(200).json(groupedPrices);
        } catch (error) {
            console.error("Error creating price:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}