import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import vendasRouter from "./routes/vendasR.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ------ ROTAS ------ //
app.use("/vendas", vendasRouter);

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
