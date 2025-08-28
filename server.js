import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// ------ ROTA GET ------ //
app.get("/posts", async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts");
    res.status(200).json(posts.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------ ROTA POST ------ //
app.post("/posts", async (req, res) => {
  try {
    let { title, author, dataPostagem } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Campos obrigatórios faltando!" });
    }

    const newPost = await pool.query(
      "INSERT INTO posts (title, author, dataPostagem) VALUES ($1, $2, $3) RETURNING id",
      [title, author, dataPostagem]
    );
    res
      .status(201)
      .json({ message: "Post criado com sucesso!", id: newPost.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------ ROTA PUT ------ //
app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, dataPostagem } = req.body;

    //--- Atualizar banco de dados ---//
    const updateQuery = await pool.query(
      "UPDATE posts SET title = COALESCE($1, title), author = COALESCE($2, author), dataPostagem = COALESCE($3, dataPostagem) WHERE id = $4 RETURNING *",
      [title, author, dataPostagem, id]
    );

    console.log(updateQuery.rows);
    if (updateQuery.rowCount === 0) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }
    res.status(200).json({ message: "Post atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//------ ROTA DELETE ------ //
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //--- Deletar do banco de dados ---//
    const deleteQuery = await pool.query("DELETE FROM posts WHERE id = $1 ", [
      id,
    ]);

    if (deleteQuery.rowCount === 0) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }
    res.status(200).json({ message: "Post deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Rota: HTTP://localhost:${port}`);
});
