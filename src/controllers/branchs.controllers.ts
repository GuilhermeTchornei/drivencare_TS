import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import getBranchs from "@/repositories/branchs.repositores.js";
import { branchs } from "@prisma/client";

async function branch(_: Request, res: Response, next: NextFunction) {
  try {
    const branchs: branchs[] = await getBranchs();
    res.status(httpStatus.OK).send(branchs);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default { branch };
