import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ------ ROTAS ------ //

// GET todos os produtos
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sales ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao buscar produtos");
  }
});

// GET produto por id
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM sales WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).send("Produto não encontrado");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao buscar produto");
  }
});

// POST criar produto
app.post("/products", async (req, res) => {
  const {
    order_date,
    product_name,
    quantity,
    unit_price,
    discount,
    total_amount,
    payment_method,
    note,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO sales (order_date, product_name, quantity, unit_price, discount, total_amount, payment_method, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        order_date,
        product_name,
        quantity,
        unit_price,
        discount,
        total_amount,
        payment_method,
        note,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao criar produto");
  }
});

// PUT atualizar produto
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    order_date,
    product_name,
    quantity,
    unit_price,
    discount,
    total_amount,
    payment_method,
    note,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE sales SET order_date=$1, product_name=$2, quantity=$3, unit_price=$4, discount=$5, total_amount=$6, payment_method=$7, note=$8 WHERE id=$9 RETURNING *",
      [
        order_date,
        product_name,
        quantity,
        unit_price,
        discount,
        total_amount,
        payment_method,
        note,
        id,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Produto não encontrado");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao atualizar produto");
  }
});

// DELETE produto
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM sales WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Produto não encontrado");
    res.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao deletar produto");
  }
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
