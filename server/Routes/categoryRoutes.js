const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  UpdateCategory,
  deleteCategory
} = require('../Controller/categoryController');

const route = express.Router();

route.post('/createCategory', createCategory);

route.get('/getCategories', getCategories);

route.get('/getCategoryById/:id', getCategoryById);

route.delete('/deleteCategory/:id', deleteCategory);

route.put('/UpdateCategory/:id', UpdateCategory);

module.exports = route;