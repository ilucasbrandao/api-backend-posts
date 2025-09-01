import * as Model from "../models/lancamentoModel.js";

const table = "posts";

export const getLancamentos = async (req, res) => {
  try {
    const posts = await Model.getLancamentos(table);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
