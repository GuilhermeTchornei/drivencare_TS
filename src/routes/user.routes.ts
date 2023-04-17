import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";
import { authValidation } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/appointments", authValidation, userControllers.myAppointments);

export default userRouter;
