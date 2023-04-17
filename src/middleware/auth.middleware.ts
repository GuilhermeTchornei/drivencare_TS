import jwt from "jsonwebtoken";
import env from "dotenv";
import { NextFunction, Request, Response } from "express";
import userRepositories from "../repositories/user.repositories.js";
import errors from "../errors/index.js";
import { AuthUser, Type } from "../interfaces/login.interfaces.js";

env.config();

export async function authValidation(
  req: Request,
  res: Response<{}, { user: AuthUser }>,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) throw errors.unauthorized();

    const { id, type } = jwt.verify(token, process.env.SECRET_KEY) as AuthUser;

    if (!id || !type) throw errors.unauthorized();
    const { rowCount } =
      type === Type.Patient
        ? await userRepositories.getPatientById(id)
        : await userRepositories.getDoctorById(id);

    if (rowCount === 0) throw errors.unauthorized();
    res.locals.user = { id, type };
    next();
  } catch (error) {
    next(error);
  }
}
