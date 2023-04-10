export interface DoctorEntity {
    id: number,
    name: string,
    email: string,
    password: string,
    crm_state: string | number,
    crm: string,
    specialty: string | number,
    branch: string | number
};

export type Doctor = Omit<DoctorEntity, "id">;

export type CheckDoctor = Omit<Doctor, "name" | "password" | "specialty" | "branch">;

export type GetDoctor = Omit<Doctor, "email" | "password" | "crm_state" | "crm">;