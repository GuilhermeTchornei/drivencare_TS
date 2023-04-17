import dayjs, { Dayjs } from "dayjs";
import { appointments } from "@prisma/client";
import {
  AppointmentToFront,
  Status,
} from "../interfaces/appointment.interfaces.js";
import { GetDoctor } from "../interfaces/doctor.interfaces.js";
import prisma from "@/config/database.js";

async function getDoctors({
  name,
  specialty,
  branch,
}: GetDoctor<number>): Promise<GetDoctor<string>[]> {
  // return await db.query(`
  //     SELECT * FROM doctors WHERE
  //         (name = $1 OR $1 IS NULL) AND
  //         (specialty_id = $2 OR $2 IS NULL) AND
  //         (branch_id = $3 OR $3 IS NULL);
  // `, [name, specialty, branch]);
  const doctors = await prisma.doctors.findMany({
    where: {
      name: {
        contains: name || undefined,
      },
      specialty_id: {
        equals: specialty || undefined,
      },
      branch_id: {
        equals: branch || undefined,
      },
    },
    select: {
      name: true,
      branchs: {
        select: {
          name: true,
        },
      },
      specialties: {
        select: {
          name: true,
        },
      },
    },
  });
  return doctors.map((d) => {
    return {
      name: d.name,
      branch: d.branchs.name,
      specialty: d.specialties.name,
    };
  });
}

async function getScheduleById(
  doctorId: number
): Promise<AppointmentToFront[]> {
  //return await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND status='ACCEPTED' ORDER BY start_date`, [doctorId]);
  const schedule = await prisma.appointments.findMany({
    where: {
      doctor_id: doctorId,
      status: Status.Accepted,
      start_date: {
        gte: new Date(),
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
    orderBy: {
      start_date: "asc",
    },
  });
  return schedule.map((a) => {
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

async function getScheduleByIdAndDate(
  doctorId: number,
  startDate: Dayjs
): Promise<appointments[]> {
  //return await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND start_date = TO_TIMESTAMP($2)`, [doctorId, startDate.unix()]);
  const schedule = await prisma.appointments.findMany({
    where: {
      doctor_id: doctorId,
      start_date: startDate.toISOString(),
    },
  });
  return schedule;
}

async function bookAppointment({ doctorId, patientId, startDate, endDate }) {
  //await db.query(`INSERT INTO appointments (doctor_id, patient_id, start_date, end_date) VALUES ($1,$2,$3,$4)`,
  //    [doctorId, patientId, startDate, endDate]);
  await prisma.appointments.create({
    data: {
      doctor_id: doctorId,
      patient_id: patientId,
      start_date: startDate,
      end_date: endDate,
    },
  });
}

async function getAppointmentByIdAndDoctor(
  appointmentId: number,
  doctorId: number
): Promise<appointments> {
  //return await db.query(`SELECT * FROM appointments WHERE id=$1 AND doctor_id = $2 AND (status = 'OPENED' OR status='ACCEPTED')`, [appointmentId, doctorId]);
  const appointment = prisma.appointments.findFirst({
    where: {
      id: appointmentId,
      doctor_id: doctorId,
      status: "OPENED" || "ACCEPTED",
    },
  });
  return appointment;
}

async function getAppointmentByIdAndPatient(
  patientId: number,
  appointmentId: number
): Promise<appointments> {
  //return await db.query(`SELECT * FROM appointments WHERE patient_id=$1 AND id=$2 AND status='OPENED'`, [patientId, appointmentId]);
  const appointment = await prisma.appointments.findFirst({
    where: {
      id: appointmentId,
      patient_id: patientId,
      status: "ACCEPTED" || "OPENED",
    },
  });
  return appointment;
}

async function updateStatus(status: Status, appointmentId: number) {
  //await db.query(`UPDATE appointments SET status=$1 WHERE id = $2`, [status, appointmentId]);
  await prisma.appointments.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: status,
    },
  });
}

async function deleteAppointment(appointmentId: number) {
  //await db.query(`DELETE FROM appointments WHERE id=$1`, [appointmentId])
  await prisma.appointments.delete({
    where: {
      id: appointmentId,
    },
  });
}

export default {
  getDoctors,
  getScheduleById,
  getScheduleByIdAndDate,
  bookAppointment,
  getAppointmentByIdAndDoctor,
  getAppointmentByIdAndPatient,
  updateStatus,
  deleteAppointment,
};
