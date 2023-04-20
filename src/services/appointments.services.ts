import dayjs from "dayjs";
import errors from "@/errors/index.js";
import userRepositories from "@/repositories/user.repositories.js";
import appointmentsRepositories from "@/repositories/appointments.repositories.js";
import { GetAppointment, AppointmentsToFront, Status, } from "@/interfaces/appointment.interfaces.js";
import { appointments, doctors } from "@prisma/client";

async function doctorsSchedule(doctorId: number): Promise<AppointmentsToFront[]> {
  const doctor: doctors = await userRepositories.getDoctorById(doctorId);
  if (!doctor) throw errors.notFound();

  try {
    const schedule: AppointmentsToFront[] = await appointmentsRepositories.getScheduleById(doctorId);
    return schedule;
  } catch (error) {
    throw errors.internalError();
  }
}

async function bookAppointment({ doctorId, patientId, startDate, }: GetAppointment) {
  if (startDate.diff(dayjs()) < 0)
    throw errors.badRequest("date is invalid");
  if (startDate.day() === 0 || startDate.day() === 6)
    throw errors.badRequest("day is invalid");
  if (startDate.hour() < 9 || startDate.hour() === 12 || startDate.hour() > 18)
    throw errors.badRequest("hour is invalid");

  const appointment: appointments = await appointmentsRepositories.getScheduleByIdAndDate(doctorId, startDate);
  if (appointment) throw errors.duplicatedData("time slot already booked");

  const endDate = startDate.add(1, "hour");
  await appointmentsRepositories.bookAppointment({
    doctorId,
    patientId,
    startDate,
    endDate,
  });
}

async function update(doctorId: number, status: Status, appointmentId: number) {
  const appointment: appointments = await appointmentsRepositories.getAppointmentByIdAndDoctor(appointmentId, doctorId);
  if (!appointment) throw errors.notFound();

  try {
    await appointmentsRepositories.updateStatus(status, appointmentId);
  } catch (error) {
    throw errors.internalError();
  }
}

async function deleteAppointment(patientId: number, appointmentId: number) {
  const appointment: appointments =
    await appointmentsRepositories.getAppointmentByIdAndPatient(
      patientId,
      appointmentId
    );

  if (!appointment) throw errors.notFound();

  await appointmentsRepositories.deleteAppointment(appointmentId);
}

export default { doctorsSchedule, bookAppointment, update, deleteAppointment };
