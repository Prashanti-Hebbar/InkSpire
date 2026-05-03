const express = require("express");
const router = express.Router();

const { toggleWishlist, getWishlist } = require("../Controller/wishlistController");
const { authuser } = require("../Middleware/Auth");

router.post("/toggle", authuser, toggleWishlist);
router.get("/get", authuser, getWishlist);

module.exports = router;