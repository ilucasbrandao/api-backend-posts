import * as Model from "../models/vendasM.js";

const table = "vendas";

// ?------ LISTAR TODOS ------?
export const getVendasAll = async (req, res) => {
  try {
    const vendas = await Model.getVendasAll(table);
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ?------ LISTAR INDIVIDUAL ------?
export const getVendasById = async (req, res) => {
  try {
    const { id } = req.params;
    const venda = await Model.getVendasById(table, id);
    if (!venda) {
      return res.status(404).json({ message: "Venda não encontrada!" });
    }
    res.json(venda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ?------ CRIAR ------?
export const createVenda = async (req, res) => {
  try {
    const { dateSale, productName, amount, seller, totalValue } = req.body;
    if (!dateSale || !productName || !amount || !seller || !totalValue)
      res.status(400).json({ message: "Campos faltando!" });

    const saleCompleted = await Model.createVenda(
      table,
      ["dateSale", "productName", "amount", "seller", "totalValue"],
      [dateSale, productName, amount, seller, totalValue]
    );
    console.log(saleCompleted);
    res.status(201).json(saleCompleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ?------ ATUALIZAR ------?
export const updateVenda = async (req, res) => {
  try {
    const { newDateSale, newProductName, newAmount, newSeller, newTotalValue } =
      req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: error.message });
    }
    const updateSale = await Model.updateVenda(
      table,
      ["dateSale", "productName", "amount", "seller", "totalValue"],
      [newDateSale, newProductName, newAmount, newSeller, newTotalValue]
    );
    console.log(updateSale);
    res.status(200).json(updateSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
