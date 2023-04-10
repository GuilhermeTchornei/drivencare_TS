import { Router } from "express";
import branchsControllers from "../controllers/branchs.controllers.js";

const branchRouter = Router();

branchRouter.get('/branchs', branchsControllers.branch);

export default branchRouter;