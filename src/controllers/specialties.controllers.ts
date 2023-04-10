import httpStatus from "http-status";
import getSpecialties from "../repositories/specialties.repositories.js";
import { NextFunction, Request, Response } from "express";

async function specialties(_: Request, res: Response, next: NextFunction) {
    try {
        const { rows: specialties } = await getSpecialties();
        res.status(httpStatus.OK).send(specialties);
    } catch (error) {
        next(error);
    }
}
export default { specialties }