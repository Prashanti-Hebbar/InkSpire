const express = require("express");
const route = express.Router();
const {
  Createbooking,
  GetAllBookings,
  UpdateBookingStatus,
  getUserBookings,
  getCurrentUser,
} = require("../Controller/bookingController");
const {authuser,adminMiddleware} = require("../Middleware/Auth");

route.post("/createbooking", authuser, Createbooking);
route.get("/allbookings", authuser, adminMiddleware, GetAllBookings);
route.put("/updatebooking/:id", authuser,adminMiddleware, UpdateBookingStatus);
route.get("/getcurrentuser", authuser, getCurrentUser);
route.get("/userbookings", authuser, getUserBookings);

module.exports = route;
