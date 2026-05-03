const Bookingtable = require("../Models/bookingModel");
const User = require("../Models/userModel");

const Createbooking = async (req, res) => {
  try {
    const { fname, email, phone, address, quantity, productId, totalamount } =
      req.body;
    const uid = req.userid;
    const newbooking = new Bookingtable({
      fullname: fname,
      email,
      phone,
      address,
      quantity,
      productId,
      totalamount,
      userId: uid,
    });
    const savebooking = await newbooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: savebooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};

const GetAllBookings = async (req, res) => {
  try {
    const bookings = await Bookingtable.find()
      .populate("userId", "name email")
      .populate("productId", "name price");
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

const UpdateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Bookingtable.findByIdAndUpdate(
      id,
      { bookingstatus: status },
      { new: true },
    );
    res.status(200).json({ message: "Status updated", booking });
  } catch (error) {
    console.log(erro);
    res.status(500).json({ message: "Error updating status" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userid).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const uid = req.userid;
    const bookings = await Bookingtable.find({ userId: uid })
      .populate("userId", "name email")
      .populate("productId", "productimage name author price");
    res.status(200).json({message: "User bookings fetched successfully", bdata: bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user bookings", error});
  }
};

module.exports = {
  Createbooking,
  GetAllBookings,
  UpdateBookingStatus,
  getUserBookings,
  getCurrentUser,
};
