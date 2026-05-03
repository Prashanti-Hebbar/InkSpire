const Wishlist = require("../Models/wishlistModel");


// 🔥 ADD / REMOVE (TOGGLE)
const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userid;
    const { productId } = req.body;

    const existing = await Wishlist.findOne({ userId, productId });

    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      return res.json({ message: "Removed from wishlist" });
    }

    const newItem = new Wishlist({ userId, productId });
    await newItem.save();

    res.json({ message: "Added to wishlist" });
    

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔥 GET USER WISHLIST
const getWishlist = async (req, res) => {
  try {
    const userId = req.userid;

    const wishlist = await Wishlist.find({ userId })
      .populate("productId");

    res.json({ wishlist });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { toggleWishlist, getWishlist };