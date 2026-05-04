const Payment = require("../Models/paymentModel");
const Booking = require("../Models/bookingModel");
const User = require("../Models/userModel");

// 🔥 CREATE PAYMENT ENTRY
const createPayment = async (req, res) => {
  try {
    const userId = req.userid;
    const { amount, productId, quantity, cartItems, paymentMethod } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let bookings = [];

    // 🔥 CASE 1: CART CHECKOUT
    if (cartItems && cartItems.length > 0) {
      for (let item of cartItems) {
        if (!item.productId?._id) continue;

        const booking = await Booking.create({
          fullname: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          userId,
          productId: item.productId._id,
          quantity: item.quantity,
          totalamount: item.productId.price * item.quantity,
          bookingstatus: "Pending",
        });

        bookings.push(booking);
      }
    }

    // 🔥 CASE 2: SINGLE PRODUCT
    else if (productId && quantity) {
      const booking = await Booking.create({
        fullname: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        userId,
        productId,
        quantity,
        totalamount: amount,
        bookingstatus: "Pending",
      });

      bookings.push(booking);
    }

    // ❌ INVALID REQUEST
    else {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    // 🔥 CREATE PAYMENT
    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod,
      paymentStatus: "Pending",
    });

    res.status(201).json({ bookings, payment });

  } catch (err) {
    console.log("🔥 PAYMENT ERROR:", err); // MUST SEE THIS IN TERMINAL
    res.status(500).json({ error: err.message });
  }
};

// 🔥 VERIFY PAYMENT (SIMULATED)
const verifyPayment = async (req, res) => {
  try {
    const { paymentId, success } = req.body;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (success) {
      payment.paymentStatus = "Success";
      payment.transactionId = "TXN_" + Date.now();

      await Booking.findByIdAndUpdate(payment.bookingId, {
        bookingstatus: "Approved",
      });
    } else {
      payment.paymentStatus = "Failed";

      await Booking.findByIdAndUpdate(payment.bookingId, {
        bookingstatus: "Rejected",
      });
    }

    await payment.save();

    res.json({ message: "Payment updated", payment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET USER PAYMENTS
const getUserPayments = async (req, res) => {
  const payments = await Payment.find({ userId: req.userid })
    .populate("bookingId");

  res.json({ payments });
};

module.exports = { createPayment, verifyPayment, getUserPayments };