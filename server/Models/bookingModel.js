const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  address: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  bookingDate: {
    type: Date,
    default: Date.now,
  },

  quantity: { type: Number, default: 1, required: true },

  totalamount: { type: Number, required: false },

  bookingstatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
