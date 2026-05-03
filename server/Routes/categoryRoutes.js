const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  UpdateCategory,
  deleteCategory
} = require('../Controller/categoryController');
const { authuser, adminMiddleware } = require("../Middleware/Auth")

const route = express.Router();

route.post('/createCategory', authuser, adminMiddleware, createCategory);

route.get('/getCategories', getCategories);

route.get('/getCategoryById/:id', getCategoryById);

route.delete('/deleteCategory/:id', authuser,adminMiddleware,deleteCategory);

route.put('/UpdateCategory/:id',authuser,adminMiddleware, UpdateCategory);

module.exports = route;