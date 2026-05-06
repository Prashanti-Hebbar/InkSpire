const Payment = require("../Models/paymentModel");
const User = require("../Models/userModel");

const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.userid,
    })
      .populate("orderId")
      .sort({ createdAt: -1 });

    res.json({ payments });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};


module.exports = { getUserPayments };