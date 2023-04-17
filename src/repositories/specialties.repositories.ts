import { specialtyEntity } from "../interfaces/specialty.interfaces.js";
import prisma from "../config/database.js";

export default async function getSpecialties(): Promise<specialtyEntity[]> {
  return await prisma.specialties.findMany();
}
