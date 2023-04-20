import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import userServices from "@/services/user.services.js";
import { AuthUser } from "@/interfaces/login.interfaces.js";
import { AppointmentsToFront } from "@/interfaces/appointment.interfaces";

async function myAppointments(_: Request, res: Response, next: NextFunction) {
  const { id, type } = res.locals.user as AuthUser;

  try {
    const appointments: AppointmentsToFront[] = await userServices.myAppointments(id, type);
    res.status(httpStatus.OK).send(appointments);
  } catch (error) {
    next(error);
  }
}

export default { myAppointments };
