import prisma from "@/config/database.js";
import { branchs } from "@prisma/client";

export default async function getBranchs(): Promise<branchs[]> {
  return await prisma.branchs.findMany();
}
