const express = require("express");
const route = express.Router()
const { Createbooking } = require("../Controller/bookingController")
const auth = require("../Middleware/Auth")

route.post("/createbooking", auth, Createbooking)

module.exports = route
