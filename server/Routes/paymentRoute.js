const express = require("express");
const route = express.Router();
const { authuser } = require("../Middleware/Auth");

const {
  createPayment,
  verifyPayment,
  getUserPayments,
} = require("../Controller/paymentController");

route.post("/create", authuser, createPayment);
route.post("/verify", authuser, verifyPayment);
route.get("/user", authuser, getUserPayments);

module.exports = route;