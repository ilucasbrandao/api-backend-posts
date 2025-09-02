import express from "express";

import {
  getVendasAll,
  getVendasById,
  createVenda,
} from "../controllers/vendasC.js";

const router = express.Router();

router.get("/", getVendasAll);
router.get("/:id", getVendasById);
router.post("/", createVenda);

export default router;
