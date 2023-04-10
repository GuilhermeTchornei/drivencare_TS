import { QueryResult } from "pg";
import db from "../config/database.js";
import { DoctorEntity } from "../interfaces/doctor.interfaces.js";
import { PatientEntity } from "../interfaces/patient.interfaces.js";
import { AppointmentEntity } from "../interfaces/appointment.interfaces.js";

async function getPatientById(id: number): Promise<QueryResult<PatientEntity>> {
    return await db.query(`SELECT * FROM patients WHERE id=$1`, [id]);
}

async function getDoctorById(id: number): Promise<QueryResult<DoctorEntity>> {
    return await db.query(`SELECT * FROM doctors WHERE id=$1`, [id]);
}

async function getAppointmentsByPatientId(id: number): Promise<QueryResult<AppointmentEntity>> {
    return await db.query(`
        SELECT d.name AS doctor_name, s.name AS specialty, b.name AS branch, p.name AS patient_name, a.start_date, a.end_date, a.status
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN specialties s ON d.specialty_id = s.id
        JOIN branchs b ON d.branch_id = b.id
        WHERE a.patient_id = $1 AND a.status <> 'FINISHED'
        `, [id]);
}

async function getAppointmentsByDoctorId(id: number): Promise<QueryResult<AppointmentEntity>> {
    return await db.query(`
        SELECT d.name AS doctor_name, s.name AS specialty, b.name AS branch, p.name AS patient_name, a.start_date, a.end_date, a.status
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN specialties s ON d.specialty_id = s.id
        JOIN branchs b ON d.branch_id = b.id
        WHERE a.doctor_id = $1 AND a.status <> 'FINISHED'
        `, [id]);
}


export default { getPatientById, getDoctorById, getAppointmentsByPatientId, getAppointmentsByDoctorId }