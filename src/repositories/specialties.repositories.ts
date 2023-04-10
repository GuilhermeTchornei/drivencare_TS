import { QueryResult } from "pg";
import db from "../config/database.js";
import { specialtyEntity } from "../interfaces/specialty.interfaces.js";

export default async function getSpecialties(): Promise<QueryResult<specialtyEntity>> {
    return await db.query(`SELECT * FROM specialties`);
}