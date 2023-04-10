import { QueryResult } from "pg";
import db from "../config/database.js";
import { AppointmentEntity, Status } from "../interfaces/appointment.interfaces.js";
import { Dayjs } from "dayjs";
import { DoctorEntity, GetDoctor } from "../interfaces/doctor.interfaces.js";

async function getDoctors({name, specialty, branch}: GetDoctor): Promise<QueryResult<DoctorEntity>> {
    return await db.query(`
        SELECT * FROM doctors WHERE
            (name = $1 OR $1 IS NULL) AND
            (specialty_id = $2 OR $2 IS NULL) AND
            (branch_id = $3 OR $3 IS NULL);
    `, [name, specialty, branch]);
}

async function getScheduleById(doctorId: number): Promise<QueryResult<AppointmentEntity>>{
    return await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND status='ACCEPTED' ORDER BY start_date`, [doctorId]);
}

async function getScheduleByIdAndDate(doctorId: number, startDate: Dayjs): Promise<QueryResult<AppointmentEntity>>{
    return await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND start_date = TO_TIMESTAMP($2)`, [doctorId, startDate.unix()]);
}

async function bookAppointment({ doctorId, patientId, startDate, endDate }) {
    await db.query(`INSERT INTO appointments (doctor_id, patient_id, start_date, end_date) VALUES ($1,$2,$3,$4)`,
        [doctorId, patientId, startDate, endDate]);
}

async function getAppointmentByIdAndDoctor(appointmentId: number, doctorId: number): Promise<QueryResult<AppointmentEntity>>{
    return await db.query(`SELECT * FROM appointments WHERE id=$1 AND doctor_id = $2 AND (status = 'OPENED' OR status='ACCEPTED')`, [appointmentId, doctorId]);
}

async function getAppointmentByIdAndPatient(patientId: number, appointmentId: number): Promise<QueryResult<AppointmentEntity>> {
    return await db.query(`SELECT * FROM appointments WHERE patient_id=$1 AND id=$2 AND status='OPENED'`, [patientId, appointmentId]);
}

async function updateStatus(status: Status, appointmentId: number) {
    await db.query(`UPDATE appointments SET status=$1 WHERE id = $2`, [status, appointmentId]);
}

async function deleteAppointment(appointmentId:number) {
    await db.query(`DELETE FROM appointments WHERE id=$1`, [appointmentId])
}

export default {
    getDoctors, getScheduleById, getScheduleByIdAndDate, bookAppointment,
    getAppointmentByIdAndDoctor, getAppointmentByIdAndPatient, updateStatus, deleteAppointment
}