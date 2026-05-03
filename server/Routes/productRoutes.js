const express = require('express');
const { createProduct, getProducts, getProductById, deleteProductById, updateProduct,getRelatedProducts } = require('../Controller/productController');
const { authuser, adminMiddleware } = require("../Middleware/Auth");
const route = express.Router();
const upload = require('../Middleware/imageUpload');

route.post('/createProduct', authuser,adminMiddleware, upload.single('productimage'), createProduct);
route.get('/getProducts', getProducts);
route.get('/getProductById/:id', getProductById);
route.delete('/deleteProductById/:id',authuser,adminMiddleware, deleteProductById);
route.put('/updateProduct/:id',authuser,adminMiddleware,upload.single('productimage'), updateProduct);
route.get('/related/:categoryId/:productId', getRelatedProducts);

module.exports = route;