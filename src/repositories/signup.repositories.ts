import db from '../config/database.js';
import { Doctor, CheckDoctor } from '../interfaces/doctor.interfaces.js';
import { CheckPatient, Patient } from '../interfaces/patient.interfaces.js';

async function checkPatient({ email, cpf }: CheckPatient) {
    return await db.query(`SELECT * FROM patients WHERE email = $1 OR cpf=$2`, [email, cpf]);
}

async function createPatient({name, email, password, cpf}: Patient) {
    await db.query(`INSERT INTO patients (name, email, password, cpf) VALUES ($1,$2,$3,$4)`, [name, email, password, cpf]);
}

async function checkDoctor({ email, crm_state, crm }: CheckDoctor) {
    return await db.query(`SELECT * FROM doctors WHERE email = $1 OR crm_state_id=$2 AND crm=$3`, [email, crm_state, crm]);
}

async function createDoctor({name, email, password, crm_state, crm, specialty, branch}: Doctor) {
    await db.query(`INSERT INTO doctors (name, email, password, crm_state_id, crm, specialty_id, branch_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [name, email, password, crm_state, crm, specialty, branch]);
}

export default { checkPatient, createPatient, checkDoctor, createDoctor };