const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "bookUser" },

  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },

  amount: Number,

  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "ONLINE",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
  },

  transactionId: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);