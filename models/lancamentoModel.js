import pool from "../db.js";

export const getLancamentos = async (table) => {
  const result = await pool.query(`SELECT * FROM ${table}`);
  return result.rows;
};
