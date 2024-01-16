import Router from "express";
import { RequestController } from "./request.controller";

const requestController = new RequestController();
export const requestRouter = Router();

requestRouter.get('/all', requestController.getAllRequests); // TODO: Change api: /requests -> /request/all
requestRouter.post('/create', requestController.createRequest);
requestRouter.post('/update', requestController.editRequest); // TODO: Change api: /requests/update -> /request/update
requestRouter.post('/delete', requestController.deleteRequest); // TODO: Change api: /requests/delete -> /request/delete