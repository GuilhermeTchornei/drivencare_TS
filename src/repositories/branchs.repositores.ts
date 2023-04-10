import { QueryResult } from "pg";
import db from "../config/database.js";
import { branchEntity } from "../interfaces/branch.interfaces.js";

export default async function getBranchs(): Promise<QueryResult<branchEntity>> {
    return await db.query(`SELECT * FROM branchs`);
}
