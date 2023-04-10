import httpStatus from "http-status";
import appointmentsRepositories from "../repositories/appointments.repositories.js";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import "dayjs/locale/pt-br";
import customParse from 'dayjs/plugin/customParseFormat.js'
import errors from "../errors/index.js";
import appointmentsServices from "../services/appointments.services.js";
import { NextFunction, Request, Response } from "express";
import { AuthUser, Type } from "../interfaces/login.interfaces.js";
import { Status } from "../interfaces/appointment.interfaces.js";
import { GetDoctor } from "../interfaces/doctor.interfaces.js";

async function doctorsList(req: Request, res: Response, next: NextFunction) {
    const { name, specialty: specialtyId, branch: branchId } = req.body as GetDoctor;

    try {
        const { rows: doctors } = await appointmentsRepositories.getDoctors({name, specialty:specialtyId, branch: branchId});
        res.status(httpStatus.OK).send(doctors);
    } catch (error) {
        next(error);
    }
}

async function doctorsSchedule(req: Request, res: Response, next: NextFunction) {
    const doctorId = +req.params.doctorId;

    if (isNaN(doctorId)) throw errors.badRequest("The request contains invalid parameters");

    try {
        const schedule = await appointmentsServices.doctorsSchedule(doctorId);
        res.status(httpStatus.OK).send(schedule);
    } catch (error) {
        next(error);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    const doctorId = +req.params.doctorId;
    const date = req.body.date;
    const { id } = res.locals.user;
    dayjs.extend(customParse);
    dayjs.extend(utc);
    dayjs.locale('pt-br');

    try
    {
        const formattedDate: Dayjs = dayjs.utc(date, 'DD-MM-YY-HH');
        if (isNaN(doctorId)) throw errors.badRequest("The request contains invalid parameters");
        await appointmentsServices.bookAppointment({ doctorId, patientId: id, startDate: formattedDate });

        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    const { status } = req.body as {status: Status};
    const appointmentId = +req.params.appointmentId;
    const { id, type } = res.locals.user as AuthUser;

    try {
        if (type !== Type.Doctor) throw errors.unauthorized();
        if (isNaN(appointmentId)) throw errors.badRequest("The request contains invalid parameters");
        if (!(status === Status.Cancelled || status === Status.Finished || status === Status.Accepted)) throw errors.badRequest("The request contains invalid parameters");

        await appointmentsServices.update(id, status, appointmentId);
        res.sendStatus(httpStatus.NO_CONTENT)
    } catch (error) {
        next(error);
    }


}

async function deleteAppointment(req: Request, res: Response, next: NextFunction) {
    const { id, type } = res.locals.user as AuthUser;
    const appointmentId = +req.params.appointmentId;

    try {
        if (isNaN(appointmentId)) throw errors.badRequest("The request contains invalid parameters");
        if (type !== Type.Patient) throw errors.unauthorized();
        await appointmentsServices.deleteAppointment(id, appointmentId);
        res.sendStatus(httpStatus.NO_CONTENT);
    }
    catch (errors) {
        next(errors);
    }
}

export default { doctorsList, doctorsSchedule, create, update, deleteAppointment }