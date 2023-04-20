import dayjs from "dayjs";
import { AppointmentsToFront, Status } from "@/interfaces/appointment.interfaces.js";
import prisma from "@/config/database.js";
import { doctors, patients } from "@prisma/client";

async function getPatientById(id: number): Promise<patients> {
  return await prisma.patients.findUnique({
    where: {
      id,
    },
  });
}

async function getDoctorById(id: number): Promise<doctors> {
  const doctor = await prisma.doctors.findUnique({
    where: {
      id,
    },
  });
  return doctor;
}

async function getAppointmentsByPatientId(id: number): Promise<AppointmentsToFront[]> {
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

async function getAppointmentsByDoctorId(id: number): Promise<AppointmentsToFront[]> {
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
