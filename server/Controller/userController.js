const SECRET_KEY = process.env.SECRET_KEY;
const userTable = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// console.log("SECRET (LOGIN):", SECRET_KEY);

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const useremail = await userTable.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (useremail) {
      return res.status(400).json({ message: "email already exists" });
    }
    const userDetails = new userTable({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    await userDetails.save();
    res
      .status(201)
      .json({ message: "user added successfully", udata: userDetails });
  } catch (error) {
    console.log(error.response);
    alert(err.response?.data?.message || "Registration failed");
    res.status(500).json({ message: "server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await userTable.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      message: "Login Successful!",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const getUser = async (req, res) => {
  try {
    const getAllUser = await userTable.find();
    console.log(getAllUser);
    res.status(200).json({ message: "all user data", allusers: getAllUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const getUserId = req.params.id; //params is used when we want to get a specific user by id
    const userById = await userTable.findById(getUserId);
    console.log(userById);
    res.status(200).json({ message: "user data by id", user: userById });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deleteUserId = req.params.id;
    const deleteUser = await userTable.findByIdAndDelete(deleteUserId);
    console.log(deleteUser);
    res
      .status(200)
      .json({ message: "user deleted successfully", user: deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await userTable.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getprofile = async (req, res) => {
  try {
    const user = await userTable.findById(req.userid);
    res.json({ success: true, udata: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const updatedUser = await userTable.findByIdAndUpdate(
      req.userid, // ✅ from token middleware
      { name, email, phone, address },
      { new: true },
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await userTable.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    res.json({
      success: true,
      message: "Role updated",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating role" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserById,
  deleteUserById,
  updateUser,
  getprofile,
  updateProfile,
  updateUserRole
};
