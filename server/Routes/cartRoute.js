const route = require("express").Router();
const {
  addToCart,
  getCart,
  updateCart,
  removeItem,
  clearCart
} = require("../Controller/cartController");

const { authuser } = require("../Middleware/Auth");

route.post("/add", authuser, addToCart);
route.get("/", authuser, getCart);
route.put("/update", authuser, updateCart);
route.delete("/remove", authuser, removeItem);
route.delete("/clear", authuser, clearCart);

module.exports = route;