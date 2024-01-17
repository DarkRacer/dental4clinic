import Router from "express";
import { RequestController } from "./request.controller";

const requestController = new RequestController();
export const requestRouter = Router();

requestRouter.get('/all', requestController.getAllRequests);
requestRouter.get('/active', requestController.getActiveRequests);
requestRouter.post('/create', requestController.createRequest);
requestRouter.post('/update', requestController.editRequest);
requestRouter.post('/delete', requestController.deleteRequest);
