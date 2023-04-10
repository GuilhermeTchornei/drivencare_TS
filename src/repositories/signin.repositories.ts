import { QueryResult } from "pg";
import db from "../config/database.js";
import { PatientEntity } from "../interfaces/patient.interfaces.js";
import { DoctorEntity } from "../interfaces/doctor.interfaces.js";

async function getPatientByEmail(email: string): Promise<QueryResult<PatientEntity>> {
    return await db.query(`SELECT * FROM patients WHERE email=$1`, [email]);
}

async function getDoctorByEmail(email: string): Promise<QueryResult<DoctorEntity>> {
    return await db.query(`SELECT * FROM doctors WHERE email=$1`, [email]);
}

export default { getPatientByEmail, getDoctorByEmail };