import { Router } from "express";
import { userRouter } from "../controllers/user/user.routes";
import { doctorRouter } from "../controllers/doctor/doctor.routes";
import { authRouter } from "../controllers/auth/auth.routers";
import { appointmentRouter } from "../controllers/appointment/appointment.routers";
import { priceRouter } from "../controllers/price/price.routers";
import { diagnoseRouter } from "../controllers/diagnose/diagnose.routers";
import { registrationRouter } from "../controllers/registration/registration.routes";

const api = Router()
  .use('/user', userRouter)
  .use('/doctor', doctorRouter)
  .use('/auth', authRouter)
  .use('/appointments', appointmentRouter)
  .use('/price', priceRouter)
  .use('/diagnosis', diagnoseRouter)
  .use('/registration', registrationRouter);

  export default Router().use('/api', api);