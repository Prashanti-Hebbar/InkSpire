const route = require("express").Router();

const {
  createOrder,
  getUserOrders,
    getAllOrders,
    updateOrderStatus,
} = require("../Controller/orderController");

const { authuser,adminMiddleware  } = require("../Middleware/Auth");

route.post("/create", authuser, createOrder);

route.get("/my-orders", authuser, getUserOrders);

route.get("/all-orders", authuser,adminMiddleware, getAllOrders);

route.put("/update-status/:id", authuser, adminMiddleware, updateOrderStatus);

module.exports = route;