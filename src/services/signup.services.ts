import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import { Doctor } from "../interfaces/doctor.interfaces.js";
import { Patient } from "../interfaces/patient.interfaces.js";
import signupRepositories from "../repositories/signup.repositories.js";

async function createPatient({ name, email, password, cpf }: Patient) {
  const patient = await signupRepositories.checkPatient({ email, cpf });
  if (patient) throw errors.duplicatedData("email or cpf");

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await signupRepositories.createPatient({
      name,
      email,
      password: hashPassword,
      cpf,
    });
  } catch (error) {
    throw errors.internalError();
  }
}

async function createDoctor({
  name,
  email,
  password,
  crm_state,
  crm,
  specialty,
  branch,
}: Doctor) {
  const doctor = await signupRepositories.checkDoctor({
    email,
    crm_state,
    crm,
  });
  if (doctor) throw errors.duplicatedData("email or crm");

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await signupRepositories.createDoctor({
      name,
      email,
      password: hashPassword,
      crm_state,
      crm,
      specialty,
      branch,
    });
  } catch (error) {
    throw errors.internalError();
  }
}

export default { createPatient, createDoctor };
