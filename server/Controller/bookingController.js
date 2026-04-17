const Bookingtable = require("../Models/bookingModel");

const Createbooking = async (req,res) => {
  try {
    const { fname, email, phone, address, quantity, productId, totalamount} = req.body;
    const uid = req.userid;
    const newbooking = new Bookingtable({
      fullname: fname,
      email,
      phone,
      address,
      quantity,
      productId,
      totalamount,
      userId: uid
    });
    const savebooking = await newbooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: savebooking });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating booking", error });
  }
};

module.exports = {Createbooking};
