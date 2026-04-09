import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

export const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error("Category already exists");

  return await Category.create(data);
};

export const getCategories = async () => {
  return await Category.find();
};

export const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id) => {

  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  const exists = await Product.findOne({ category: id });

  if (exists) {
    throw new Error("Category is in use");
  }

  return await Category.findByIdAndDelete(id);
};
