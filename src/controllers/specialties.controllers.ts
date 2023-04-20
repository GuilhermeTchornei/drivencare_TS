import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import getSpecialties from "@/repositories/specialties.repositories.js";
import { specialties } from "@prisma/client";

async function specialties(_: Request, res: Response, next: NextFunction) {
  try {
    const specialties: specialties[] = await getSpecialties();
    res.status(httpStatus.OK).send(specialties);
  } catch (error) {
    next(error);
  }
}
export default { specialties };
