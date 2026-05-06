const Order = require("../Models/orderModel");
const Payment = require("../Models/paymentModel");
const Cart = require("../Models/cartModel");
const Book = require("../Models/productModel");

const createOrder = async (req, res) => {
  try {
    const userId = req.userid;

    const {
      items,
      shippingAddress,
      paymentMethod,
      paymentSuccess,
    } = req.body;

    // VALIDATE PAYMENT METHOD
    const validMethods = ["UPI", "CARD", "COD"];

    if (!validMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // REST OF YOUR CODE...

    // CHECK STOCK
    for (let item of items) {
      const book = await Book.findById(item.productId);

      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }

      if (book.quantity < item.quantity) {
        return res.status(400).json({
          message: `${book.name} out of stock`,
        });
      }
    }

    // CALCULATE TOTAL
    let totalAmount = 0;

    for (let item of items) {
      const book = await Book.findById(item.productId);

      totalAmount += book.price * item.quantity;
    }

    // CREATE ORDER
    const order = await Order.create({
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),

      shippingAddress,

      totalAmount,

      paymentMethod,

      paymentStatus: paymentSuccess ? "Paid" : "Failed",

      orderStatus: paymentSuccess ? "Processing" : "Cancelled",

      transactionId: paymentSuccess ? "TXN_" + Date.now() : null,
    });

    // CREATE PAYMENT
    await Payment.create({
      userId,
      orderId: order._id,
      amount: totalAmount,
      paymentMethod,
      paymentStatus: paymentSuccess ? "Success" : "Failed",

      transactionId: order.transactionId,
    });

    // REDUCE STOCK
    if (paymentSuccess) {
      for (let item of items) {
        await Book.findByIdAndUpdate(item.productId, {
          $inc: {
            quantity: -item.quantity,
          },
        });
      }

      // CLEAR CART
      await Cart.findOneAndUpdate({ userId }, { items: [] });
    }

    res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.userid,
    })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Order updated",
      order,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
