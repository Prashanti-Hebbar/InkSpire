const mongoose  = require('mongoose');
const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  address: { type: String },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, { timestamps: true });

module.exports = mongoose.model('bookUser',userschema)

// bookUser -> Table name or collection name