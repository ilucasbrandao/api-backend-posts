// src/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "lucas123",
  database: process.env.DB_NAME || "crediarioBrandao",
  port: process.env.DB_PORT || 5432,
});

// Para testar a conexão
pool
  .connect()
  .then((client) => {
    console.log("✅ Conectado ao PostgreSQL com sucesso!");
    client.release(); // libera a conexão
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err.message);
  });
