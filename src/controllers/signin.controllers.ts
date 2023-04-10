import httpStatus from "http-status";
import signinServices from "../services/signin.services.js";
import { NextFunction, Request, Response } from "express";
import { Login, Type } from "../interfaces/login.interfaces.js";
import errors from "../errors/index.js";

async function user(req: Request, res: Response, next: NextFunction) {
    const { email, password, type } = req.body as Login;

    try {
        if (!(type === Type.Patient || type === Type.Doctor)) throw errors.invalidCredentials();

        const token = await signinServices.user({ email, password, type });
        res.status(httpStatus.OK).send({ token });
    } catch (error) {
        next(error);
    }
}

export default { user };