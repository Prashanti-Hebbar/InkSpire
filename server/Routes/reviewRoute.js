const express = require("express");
const route = express.Router();
const { addReview, getReviews } = require("../Controller/reviewController");

const { authuser } = require("../Middleware/Auth");

// POST → add review
route.post("/add", authuser, addReview);

// GET → fetch reviews
route.get("/:productId", getReviews);

module.exports = route;
