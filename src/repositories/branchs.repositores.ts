import { branchEntity } from "../interfaces/branch.interfaces.js";
import prisma from "../config/database.js";

export default async function getBranchs(): Promise<branchEntity[]> {
  //return await db.query(`SELECT * FROM branchs`);
  return await prisma.branchs.findMany();
}
