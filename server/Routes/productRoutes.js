const express = require('express');
const { createProduct, getProducts, getProductById, deleteProductById, updateProduct } = require('../Controller/productController');

const route = express.Router();
const upload = require('../Middleware/imageUpload');

route.post('/createProduct', upload.single('productimage'), createProduct);
route.get('/getProducts', getProducts);
route.get('/getProductById/:id', getProductById);
route.delete('/deleteProductById/:id', deleteProductById);
route.put('/updateProduct/:id',upload.single('productimage'), updateProduct);

module.exports = route;