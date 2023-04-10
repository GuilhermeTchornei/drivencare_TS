import { Router } from "express";
import signupSchema from "../schemas/signup.schemas.js";
import { schemaValidation } from "../middleware/schemaValidation.middleware.js";
import signupControllers from "../controllers/signup.controllers.js";

const signupRouter = Router();

signupRouter.post('/patients', schemaValidation(signupSchema.patient), signupControllers.patient);
signupRouter.post('/doctors', schemaValidation(signupSchema.doctor), signupControllers.doctor);

export default signupRouter;