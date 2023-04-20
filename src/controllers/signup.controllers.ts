import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import signupServices from "@/services/signup.services.js";
import { InputPatient } from "@/interfaces/patient.interfaces.js";
import { InputDoctor } from "@/interfaces/doctor.interfaces.js";

async function patient(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, cpf } = req.body as InputPatient;

  try {
    await signupServices.createPatient({ name, email, password, cpf });
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

async function doctor(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, crm_state, crm, specialty, branch } = req.body as InputDoctor;
  try {
    await signupServices.createDoctor({ name, email, password, crm_state, crm, specialty, branch, });
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

export default { patient, doctor };
