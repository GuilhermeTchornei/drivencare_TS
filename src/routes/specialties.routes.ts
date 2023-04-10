import { Router } from "express";
import specialtiesControllers from "../controllers/specialties.controllers.js";

const specialtyRouter = Router();

specialtyRouter.get('/specialties', specialtiesControllers.specialties);

export default specialtyRouter;