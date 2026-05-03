const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel")

// ADD TO CART
const addToCart = async (req, res) => {
  const userId = req.userid;
  const { productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    if (product.quantity < 1) {
      return res.status(400).json({ message: "Out of stock" });
    }

    cart = await Cart.create({
      userId,
      items: [{ productId, quantity: 1 }],
    });
  } else {
    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      if (item.quantity >= product.quantity) {
        return res.status(400).json({
          message: "Book not in stock",
        });
      }

      item.quantity += 1;
    } else {
      if (product.quantity < 1) {
        return res.status(400).json({ message: "Out of stock" });
      }

      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
  }

  res.json({ message: "Added to cart", cart });
};

// GET CART
const getCart = async (req, res) => {
  const userId = req.userid;

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  res.json({ cart });
};

// UPDATE QUANTITY
const updateCart = async (req, res) => {
  const userId = req.userid;
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (quantity > product.quantity) {
    return res.status(400).json({
      message: "Quantity exceeds available stock",
    });
  }

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find(
    (i) => i.productId.toString() === productId
  );

  if (item) {
    item.quantity = quantity;
  }

  await cart.save();

  res.json({ cart });
};

// REMOVE ITEM
const removeItem = async (req, res) => {
  const userId = req.userid;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter(
    (i) => i.productId.toString() !== productId
  );

  await cart.save();

  res.json({ cart });
};

const clearCart = async (req, res) => {
  const userId = req.userid;

  await Cart.findOneAndUpdate(
    { userId },
    { items: [] }
  );

  res.json({ message: "Cart cleared" });
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeItem,
  clearCart,
};