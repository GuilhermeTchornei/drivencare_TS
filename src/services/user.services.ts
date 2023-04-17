import { Type } from "../interfaces/login.interfaces.js";
import userRepositories from "../repositories/user.repositories.js";
import errors from "@/errors";

async function myAppointments({ id, type }: { id: number; type: Type }) {
  try {
    const myAppointments =
      type === Type.Patient
        ? await userRepositories.getAppointmentsByPatientId(id)
        : await userRepositories.getAppointmentsByDoctorId(id);
    return myAppointments;
  } catch (error) {
    console.log(error);
    throw errors.internalError();
  }
}

export default { myAppointments };
