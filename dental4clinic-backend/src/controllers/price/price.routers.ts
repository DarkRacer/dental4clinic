import Router from "express";
import { PriceController } from "./price.controller";

const priceController = new PriceController();
export const priceRouter = Router();

priceRouter.get('/all', priceController.getAllPrices); // Change API /prices -> /price/all
priceRouter.post('/create', priceController.createPrice);
priceRouter.post('/edit', priceController.editPrice);
priceRouter.post('/delete', priceController.deletePrice);
priceRouter.get('/:priceId', priceController.getPriceByServiceId);
