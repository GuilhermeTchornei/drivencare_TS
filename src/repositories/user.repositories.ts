import { QueryResult } from "pg";
import { application } from "express";
import dayjs from "dayjs";
import db from "../config/database.js";
import { DoctorEntity } from "../interfaces/doctor.interfaces.js";
import { PatientEntity } from "../interfaces/patient.interfaces.js";
import {
  AppointmentToFront,
  Status,
} from "../interfaces/appointment.interfaces.js";
import prisma from "../config/database.js";

async function getPatientById(id: number): Promise<PatientEntity> {
  //return await db.query(`SELECT * FROM patients WHERE id=$1`, [id]);
  return await prisma.patients.findUnique({
    where: {
      id,
    },
  });
}

async function getDoctorById(id: number): Promise<DoctorEntity<number>> {
  //return await db.query(`SELECT * FROM doctors WHERE id=$1`, [id]);
  const doctor = await prisma.doctors.findUnique({
    where: {
      id,
    },
  });
  return {
    ...doctor,
    branch: doctor.branch_id,
    crm_state: doctor.crm_state_id,
    specialty: doctor.specialty_id,
  };
}

async function getAppointmentsByPatientId(
  id: number
): Promise<AppointmentToFront[]> {
  // return await db.query(`
  //     SELECT d.name AS doctor_name, s.name AS specialty, b.name AS branch, p.name AS patient_name, a.start_date, a.end_date, a.status
  //     FROM appointments a
  //     JOIN patients p ON a.patient_id = p.id
  //     JOIN doctors d ON a.doctor_id = d.id
  //     JOIN specialties s ON d.specialty_id = s.id
  //     JOIN branchs b ON d.branch_id = b.id
  //     WHERE a.patient_id = $1 AND a.status <> 'FINISHED'
  //     `, [id]);
  const appointment = await prisma.appointments.findMany({
    where: {
      patient_id: id,
      NOT: {
        status: "FINISHED",
      },
    },
    select: {
      doctors: {
        select: {
          name: true,
          specialties: {
            select: {
              name: true,
            },
          },
          branchs: {
            select: {
              name: true,
            },
          },
        },
      },
      patients: {
        select: {
          name: true,
        },
      },
      start_date: true,
      end_date: true,
      status: true,
    },
  });

  return appointment.map((a) => {
    return {
      doctor_name: a.doctors.name,
      specialty: a.doctors.specialties.name,
      branch: a.doctors.branchs.name,
      patient_name: a.patients.name,
      start_date: dayjs(a.start_date),
      end_date: dayjs(a.end_date),
      status: a.status as Status,
    };
  });
}

async function getAppointmentsByDoctorId(
  id: number
): Promise<AppointmentToFront[]> {
  // return await db.query(`
  //     SELECT d.name AS doctor_name, s.name AS specialty, b.name AS branch, p.name AS patient_name, a.start_date, a.end_date, a.status
  //     FROM appointments a
  //     JOIN patients p ON a.patient_id = p.id
  //     JOIN doctors d ON a.doctor_id = d.id
  //     JOIN specialties s ON d.specialty_id = s.id
  //     JOIN branchs b ON d.branch_id = b.id
  //     WHERE a.doctor_id = $1 AND a.status <> 'FINISHED'
  //     `, [id]);
  const appointment = await prisma.appointments.findMany({
    where: {
      doctor_id: id,
      NOT: {
        status: "FINISHED",
      },
    },
    select: {
      doctors: {
        select: {
          name: true,
          specialties: {
            select: {
              name: true,
            },
          },
          branchs: {
            select: {
              name: true,
            },
          },
        },
      },
      patients: {
        select: {
          name: true,
        },
      },
      start_date: true,
      end_date: true,
      status: true,
    },
  });

  return appointment.map((a) => {
    return {
      doctor_name: a.doctors.name,
      specialty: a.doctors.specialties.name,
      branch: a.doctors.branchs.name,
      patient_name: a.patients.name,
      start_date: dayjs(a.start_date),
      end_date: dayjs(a.end_date),
      status: a.status as Status,
    };
  });
}

export default {
  getPatientById,
  getDoctorById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
};
