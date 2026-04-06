const userTable = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "product-crud";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const useremail = await userTable.findOne({ email });
    if (useremail) {
      return res.status(400).json({ message: "email already exists" });
    }
    const userDetails = new userTable({
      name,
      email,
      password,
      phone,
      address,
    });
    await userDetails.save();
    res
      .status(201)
      .json({ message: "user added successfully", udata: userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userTable.findOne({ email, password });
    if (!user) {
      res.status(404).json({ success: false, message: "login failed", user });
    } else {
      const token = await jwt.sign(user.id, SECRET_KEY);
      res.json({ success: true, message: "Login Successfull!", token });
    }
  } catch (error) {
    console.log(error);
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
    const user = await userTable.findById(req.userid)
    res.json({success:true, udata:user})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const updatedUser = await userTable.findByIdAndUpdate(
      req.userid, // ✅ from token middleware
      { name, email, phone, address },
      { new: true }
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

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserById,
  deleteUserById,
  updateUser,
  getprofile,
  updateProfile
};
