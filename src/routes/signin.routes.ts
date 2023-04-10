import { Router } from "express";
import { schemaValidation } from "../middleware/schemaValidation.middleware.js";
import user from "../schemas/signin.schemas.js";
import signinControllers from "../controllers/signin.controllers.js";

const signinRouter = Router();

signinRouter.post('/', schemaValidation(user), signinControllers.user);

export default signinRouter;