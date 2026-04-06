const userTable = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "product-crud"

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await userTable.findOne({
      email,
      password,
      role: "admin"
    })

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      })
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    )

    res.json({
      success: true,
      message: "Admin Login Successful",
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { adminLogin }