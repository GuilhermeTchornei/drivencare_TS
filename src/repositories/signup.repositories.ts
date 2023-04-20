import prisma from "@/config/database.js";
import { InputDoctor, CheckDoctor } from "@/interfaces/doctor.interfaces.js";
import { CheckPatient, InputPatient } from "@/interfaces/patient.interfaces.js";

async function checkPatient({ email, cpf }: CheckPatient): Promise<boolean> {
  const patient = await prisma.patients.findFirst({
    where: {
      email: email,
      cpf: cpf,
    },
  });
  return patient ? true : false;
}

async function createPatient(patient: InputPatient) {
  await prisma.patients.create({
    data: {
      ...patient,
    },
  });
}

async function checkDoctor({ email, crm_state, crm }: CheckDoctor): Promise<boolean> {
  const doctor = await prisma.doctors.findFirst({
    where: {
      email: email,
      crm_state_id: crm_state,
      crm: crm,
    },
  });
  return doctor ? true : false;
}

async function createDoctor(doctor: InputDoctor) {
  await prisma.doctors.create({
    data: {
      name: doctor.name,
      email: doctor.email,
      password: doctor.password,
      branch_id: doctor.branch,
      crm_state_id: doctor.crm_state,
      crm: doctor.crm,
      specialty_id: doctor.specialty,
    },
  });
}

export default { checkPatient, createPatient, checkDoctor, createDoctor };
