import dayjs from "dayjs";
import errors from "../errors/index.js";
import userRepositories from "../repositories/user.repositories.js";
import appointmentsRepositories from "../repositories/appointments.repositories.js";
import { Appointment, AppointmentEntity, Status } from "../interfaces/appointment.interfaces.js";

async function doctorsSchedule(doctorId: number): Promise<AppointmentEntity[]> {
    const { rowCount } = await userRepositories.getDoctorById(doctorId);
    if (rowCount === 0) throw errors.notFound();

    try
    {
        const { rows: schedule } = await appointmentsRepositories.getScheduleById(doctorId);
        return schedule;
    } catch (error)
    {
        throw errors.internalError();
    }
}


async function bookAppointment({ doctorId, patientId, startDate }: Appointment) {
    if (startDate.diff(dayjs()) < 0) throw errors.badRequest("date is invalid");
    if (startDate.day() === 0 || startDate.day()  === 6) throw errors.badRequest("day is invalid");
    if (startDate.hour() < 9 || startDate.hour() === 12 || startDate.hour() > 18) throw errors.badRequest("hour is invalid");

    const { rowCount, rows } = await appointmentsRepositories.getScheduleByIdAndDate(doctorId, startDate);
    console.log(rows);
    if (rowCount) throw errors.duplicatedData("time slot already booked");

    const endDate = startDate.add(1, 'hour');
    await appointmentsRepositories.bookAppointment({ doctorId, patientId, startDate, endDate });
}

async function update(doctorId: number, status: Status, appointmentId: number) {
    const { rowCount } = await appointmentsRepositories.getAppointmentByIdAndDoctor(appointmentId, doctorId);
    if (!rowCount) throw errors.notFound();

    try {
        await appointmentsRepositories.updateStatus(status, appointmentId);
    } catch (error) {
        throw errors.internalError();
    }
}

async function deleteAppointment(patientId: number, appointmentId: number) {
    const { rowCount } = await appointmentsRepositories.getAppointmentByIdAndPatient(patientId, appointmentId);

    if (!rowCount) throw errors.notFound();

    await appointmentsRepositories.deleteAppointment(appointmentId);
}

export default { doctorsSchedule, bookAppointment, update, deleteAppointment }