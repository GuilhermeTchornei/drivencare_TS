import errors from "../errors/index.js";
import { Doctor } from "../interfaces/doctor.interfaces.js";
import { Patient } from "../interfaces/patient.interfaces.js";
import signupRepositories from "../repositories/signup.repositories.js";
import bcrypt from 'bcrypt';

async function createPatient({ name, email, password, cpf }: Patient) {
    const { rowCount } = await signupRepositories.checkPatient({ email, cpf });
    if (rowCount) throw errors.duplicatedData("email or cpf");

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await signupRepositories.createPatient({name, email, password: hashPassword, cpf});
    } catch (error) {
        throw errors.internalError();
    }
}

async function createDoctor({ name, email, password, crm_state, crm, specialty, branch }: Doctor) {
    const { rowCount } = await signupRepositories.checkDoctor({ email, crm_state, crm });
    if (rowCount) throw errors.duplicatedData("email or crm");

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await signupRepositories.createDoctor({name, email, password: hashPassword, crm_state, crm, specialty, branch});
    } catch (error)
    {
        console.log(error);
        throw errors.internalError();
    }

}

export default { createPatient, createDoctor };