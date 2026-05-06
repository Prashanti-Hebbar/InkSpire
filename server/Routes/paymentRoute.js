const express = require("express");
const route = express.Router();
const { authuser } = require("../Middleware/Auth");

const {
  getUserPayments,
} = require("../Controller/paymentController");


route.get("/user", authuser, getUserPayments);

module.exports = route;