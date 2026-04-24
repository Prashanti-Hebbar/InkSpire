const userTable = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "product-crud"

const bcrypt = require("bcryptjs");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Step 1: find by email + role ONLY
    const admin = await userTable.findOne({
      email,
      role: "admin"
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found"
      });
    }

    // ✅ Step 2: compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    // ✅ Step 3: generate token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Admin Login Successful",
      token,
      user: {
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminLogin }