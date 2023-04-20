import prisma from "@/config/database.js";
import { doctors, patients } from "@prisma/client";

async function getPatientByEmail(email: string): Promise<patients> {
  return await prisma.patients.findUnique({
    where: {
      email: email,
    },
  });
}

async function getDoctorByEmail(email: string): Promise<doctors> {
  const doctor = await prisma.doctors.findUnique({
    where: {
      email: email,
    },
  });

  return doctor;
}

export default { getPatientByEmail, getDoctorByEmail };
