import { pool } from "../db.js";

// --------- ROTA LISTAR ---------//
export const getVendasAll = async (table) => {
  const result = await pool.query(`SELECT * FROM ${table}`);
  return result.rows;
};

// --------- ROTA LISTAR POR ID ---------//
export const getVendasById = async (table, id) => {
  const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return result.rows[0];
};

// --------- ROTA POST ---------//
export const createVenda = async (table, columns, values) => {
  const cols = columns.join(", "); // nome das colunas separadas por ", "
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", "); // enumera cada array da lista passada em $1, $2, $3 ...
  const result = await pool.query(
    `INSERT INTO ${table} (${cols}) VALUES (${placeholders}) RETURNING * `,
    values
  );
  return result.rows[0];
};
