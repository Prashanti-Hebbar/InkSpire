const Review = require("../Models/reviewModel")
const Product = require("../Models/productModel")

// ✅ ADD REVIEW
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userid;

    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    // update product rating
    const reviews = await Review.find({ productId });

    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      averageRating: avg,
      totalReviews: reviews.length,
    });

    res.json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET REVIEWS
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).populate("userId", "name");

    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addReview, getReviews };