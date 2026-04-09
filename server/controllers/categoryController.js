import * as service from "../services/categoryService.js";

export const create = async (req, res) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  const data = await service.getCategories();
  res.json(data);
};

export const update = async (req, res) => {
  const data = await service.updateCategory(req.params.id, req.body);
  res.json(data);
};

export const remove = async (req, res) => {
  const data = await service.deleteCategory(req.params.id);
  res.json(data);
};