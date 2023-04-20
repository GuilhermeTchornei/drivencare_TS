import { patients } from "@prisma/client";

export type InputPatient = Omit<patients, "id">;

export type CheckPatient = Omit<InputPatient, "name" | "password">;
