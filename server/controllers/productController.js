import * as service from "../services/productService.js";

export const create = async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  const data = await service.getProducts();
  res.json(data);
};

export const update = async (req, res) => {
  const data = await service.updateProduct(req.params.id, req.body);
  res.json(data);
};

export const remove = async (req, res) => {
  const data = await service.deleteProduct(req.params.id);
  res.json(data);
};