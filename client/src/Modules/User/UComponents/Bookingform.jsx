import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Bookingform() {
  const { productId } = useParams();
  const location = useLocation();
  // const cart = location.state?.cart || [];
  const [booking, setBooking] = useState({
    fname: "",
    email: "",
    phone: "",
    address: "",
    quantity: "",
    totalamount: "",
  });

  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // const [cart, setCart] = useState([]);
  

// useEffect(() => {
//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/cart", {
//         headers: {
//           "auth-token": localStorage.getItem("UserToken"),
//         },
//       });

//       setCart(res.data.cart?.items || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchCart();
// }, []);

  const handleChange = (e) => {
  if (e.target.name === "quantity") {
    const quantity = Number(e.target.value);

    setBooking({
      ...booking,
      quantity,
      totalamount: quantity * price, 
    });
  } else {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  }
};

  useEffect(() => {
    if(!productId) return;

    axios
      .get(`http://localhost:5000/product/getProductById/${productId}`)
      .then((res) => setPrice(res.data.product.price))
      .catch((error) => console.log(error));

    fetchUserDetails();
  }, [productId]);

  const utoken = localStorage.getItem("UserToken");

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/getprofile", {
        headers: {
          "auth-token": utoken,
        },
      });

      const user = res.data.udata;

      setBooking((prev) => ({
        ...prev,
        fname: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    } catch (err) {
      console.log("User fetch error:", err.response?.data || err.message);
    }
  };

  const handleProceedToPayment = () => {
  if (!booking.quantity || !booking.totalamount) {
    alert("Enter quantity first");
    return;
  }

  navigate("/user/payments", {
    state: {
      amount: booking.totalamount,
      productId,
      quantity: booking.quantity,
    },
  });
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box
          sx={{
            maxWidth: 520,
            width: "100%",
            p: 4,
            borderRadius: 5,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* SUCCESS STATE */}
          {success ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight={700}
                color="#3e2f1c"
              >
                🎉 Booking Confirmed!
              </Typography>

              <Typography textAlign="center" mt={2} color="#5a4a3b">
                Your book is on its way. Happy reading 📚
              </Typography>
            </motion.div>
          ) : (
            <>
              {/* HEADER */}
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight={700}
                color="#3e2f1c"
                mb={1}
              >
                Complete Your Order
              </Typography>

              <Typography textAlign="center" color="#7c6a58" mb={3}>
                Finish your purchase in a few steps
              </Typography>

              {/* USER DETAILS */}
              <Typography fontWeight={600} mb={1}>
                User Details
              </Typography>

              <Box display="flex" flexDirection="column" gap={2}>
                <StyledInput
                  label="Full Name"
                  name="fname"
                  value={booking.fname}
                  onChange={handleChange}
                />
                <StyledInput
                  InputProps={{ readOnly: true }}
                  label="Email"
                  name="email"
                  value={booking.email}
                  onChange={handleChange}
                />
                <StyledInput
                  label="Phone"
                  name="phone"
                  value={booking.phone}
                  onChange={handleChange}
                  type="number"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* DELIVERY */}
              <Typography fontWeight={600} mb={1}>
                Delivery Info
              </Typography>

              <StyledInput
                label="Address"
                name="address"
                value={booking.address}
                onChange={handleChange}
                multiline
                rows={3}
              />

              <Divider sx={{ my: 3 }} />

              {/* PAYMENT */}
              <Typography fontWeight={600} mb={1}>
                Payment Summary
              </Typography>

              <Box display="flex" flexDirection="column" gap={2}>
                <StyledInput
                  label="Quantity"
                  name="quantity"
                  onChange={handleChange}
                  type="number"
                />
                <StyledInput
                  label="Price"
                  value={price}
                  InputProps={{ readOnly: true }}
                />
                <StyledInput
                  label="Total Amount"
                  value={booking.totalamount}
                  InputProps={{ readOnly: true }}
                />
              </Box>

              {/* BUTTON */}
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleProceedToPayment}
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    background: "#c8a97e",
                    color: "#2b2115",
                    "&:hover": {
                      background: "#b89668",
                    },
                  }}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
              </motion.div>
            </>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}

/* 🔥 REUSABLE INPUT */
const StyledInput = (props) => (
  <TextField
    fullWidth
    variant="outlined"
    {...props}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        background: "rgba(255,255,255,0.7)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 0 10px rgba(200,169,126,0.4)",
        },
        "&.Mui-focused": {
          boxShadow: "0 0 12px rgba(200,169,126,0.6)",
        },
      },
    }}
  />
);
