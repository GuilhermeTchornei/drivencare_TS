import dayjs, { Dayjs } from "dayjs";
import { appointments } from "@prisma/client";
import { AppointmentsToFront, GetAppointment, Status } from "@/interfaces/appointment.interfaces.js";
import { GetDoctorParams, GetDoctorReturn } from "@/interfaces/doctor.interfaces.js";
import prisma from "@/config/database.js";

async function getDoctors({ name, specialty, branch }: GetDoctorParams): Promise<GetDoctorReturn[]> {
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

async function getScheduleById(doctorId: number): Promise<AppointmentsToFront[]> {
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

async function getScheduleByIdAndDate(doctorId: number, startDate: Dayjs): Promise<appointments> {
  const schedule = await prisma.appointments.findFirst({
    where: {
      doctor_id: doctorId,
      start_date: startDate.toISOString(),
    },
  });
  return schedule;
}

async function bookAppointment({ doctorId, patientId, startDate, endDate }: GetAppointment) {
  await prisma.appointments.create({
    data: {
      doctor_id: doctorId,
      patient_id: patientId,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    },
  });
}

async function getAppointmentByIdAndDoctor(appointmentId: number, doctorId: number): Promise<appointments> {
  const appointment = prisma.appointments.findFirst({
    where: {
      id: appointmentId,
      doctor_id: doctorId,
      status: "OPENED" || "ACCEPTED",
    },
  });
  return appointment;
}

async function getAppointmentByIdAndPatient(patientId: number, appointmentId: number): Promise<appointments> {
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
