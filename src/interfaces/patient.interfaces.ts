export interface PatientEntity {
    id: number,
    name: string,
    email: string,
    password: string,
    cpf: string
};

export type Patient = Omit<PatientEntity, "id">;

export type CheckPatient = Omit<Patient, "name" | "password">;