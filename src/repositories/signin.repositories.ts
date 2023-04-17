import { QueryResult } from "pg";
import { doctors } from "@prisma/client";
import db from "../config/database.js";
import { PatientEntity } from "../interfaces/patient.interfaces.js";
import { DoctorEntity } from "../interfaces/doctor.interfaces.js";
import prisma from "../config/database.js";

async function getPatientByEmail(email: string): Promise<PatientEntity> {
  return await prisma.patients.findUnique({
    where: {
      email: email,
    },
  });
}

async function getDoctorByEmail(email: string): Promise<DoctorEntity<number>> {
  //return await db.query(`SELECT * FROM doctors WHERE email=$1`, [email]);
  const doctor = await prisma.doctors.findUnique({
    where: {
      email: email,
    },
  });
  return {
    id: doctor.id,
    name: doctor.name,
    email: doctor.email,
    password: doctor.password,
    specialty: doctor.specialty_id,
    branch: doctor.branch_id,
    crm_state: doctor.crm_state_id,
    crm: doctor.crm,
  };
}

export default { getPatientByEmail, getDoctorByEmail };
