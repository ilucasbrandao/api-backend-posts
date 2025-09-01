import pool from "../db.js";

export const getLancamentos = async (table) => {
  const result = await pool.query(`SELECT * FROM ${table}`);
  return result.rows;
};

export const getById = async (table, id) => {
  const result = await pool.query(`SELECT * FROM ${table} WHERE ${id} = $1`, [
    id,
  ]);
  return result.rows[0];
};
