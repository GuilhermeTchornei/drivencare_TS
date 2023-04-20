import prisma from "@/config/database.js";
import { specialties } from "@prisma/client";

export default async function getSpecialties(): Promise<specialties[]> {
  return await prisma.specialties.findMany();
}
