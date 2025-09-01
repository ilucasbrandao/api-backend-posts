import express from "express";

import { getLancamentos } from "../controllers/lancamentosController.js";

const router = express.Router();

router.get("/", getLancamentos);

export default router;
