import { doctors } from "@prisma/client";

export type InputDoctor = Omit<doctors, "id">;

export type CheckDoctor = Omit<InputDoctor, "name" | "password" | "specialty" | "branch">;

export type GetDoctorParams = Pick<doctors, "name" | "branch" | "specialty">;

export type GetDoctorReturn = Omit<GetDoctorParams, "branch" | "specialty"> & {
  branch: string,
  specialty: string
};