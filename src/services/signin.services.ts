import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import signinRepositories from "@/repositories/signin.repositories.js";
import errors from "@/errors/index.js";
import { Login, Type } from "@/interfaces/login.interfaces.js";

dotenv.config();

async function user({ email, password, type }: Login) {
  const user =
    type === Type.Patient
      ? await signinRepositories.getPatientByEmail(email)
      : await signinRepositories.getDoctorByEmail(email);

  if (!user) throw errors.invalidCredentials();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentials();

  const token = jwt.sign({ id: user.id, type }, process.env.SECRET_KEY);
  return token;
}

export default { user };
