import httpStatus from "http-status";
import getBranchs from "../repositories/branchs.repositores.js";
import { NextFunction, Request, Response } from "express";

async function branch(_: Request, res: Response, next: NextFunction) {
    try {
        const { rows: branchs } = await getBranchs();
        res.status(httpStatus.OK).send(branchs);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default { branch }