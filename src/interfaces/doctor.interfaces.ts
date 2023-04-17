import { string } from "joi";

export interface DoctorEntity<T extends string | number> {
  id: number;
  name: string;
  email: string;
  password: string;
  crm_state: T;
  crm: string;
  specialty: T;
  branch: T;
}

export type Doctor = Omit<DoctorEntity<number>, "id">;

export type CheckDoctor = Omit<
  Doctor,
  "name" | "password" | "specialty" | "branch"
>;

export type GetDoctor<T extends string | number> = Omit<
  DoctorEntity<T>,
  "id" | "email" | "password" | "crm_state" | "crm"
>;
