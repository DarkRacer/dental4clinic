import { Router } from "express";
import { userRouter } from "../controllers/user/user.routes";
import { doctorRouter } from "../controllers/doctor/doctor.routes";

const api = Router()
  .use('/user', userRouter)
  .use('/doctor', doctorRouter);

  export default Router().use('/api', api);