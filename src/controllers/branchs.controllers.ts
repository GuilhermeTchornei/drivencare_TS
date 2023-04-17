import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import getBranchs from "../repositories/branchs.repositores.js";

async function branch(_: Request, res: Response, next: NextFunction) {
  try {
    const branchs = await getBranchs();
    res.status(httpStatus.OK).send(branchs);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default { branch };
