import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Bookingform() {
  const { productId } = useParams();

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

  const handleChange = (e) => {
    if (e.target.name === "quantity") {
      const quantity = e.target.value;
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
    axios
      .get(`http://localhost:5000/product/getProductById/${productId}`)
      .then((res) => setPrice(res.data.product.price))
      .catch((error) => console.log(error));
  }, []);

  const utoken = localStorage.getItem("UserToken");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/booking/createbooking",
        { ...booking, productId },
        { headers: { "auth-token": utoken } }
      );
      setSuccess(true);
    } catch (error) {
      console.log(error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
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

              <Typography
                textAlign="center"
                color="#7c6a58"
                mb={3}
              >
                Finish your purchase in a few steps
              </Typography>

              {/* USER DETAILS */}
              <Typography fontWeight={600} mb={1}>
                User Details
              </Typography>

              <Box display="flex" flexDirection="column" gap={2}>
                <StyledInput label="Full Name" name="fname" onChange={handleChange} />
                <StyledInput label="Email" name="email" onChange={handleChange} />
                <StyledInput label="Phone" name="phone" onChange={handleChange} type="number" />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* DELIVERY */}
              <Typography fontWeight={600} mb={1}>
                Delivery Info
              </Typography>

              <StyledInput
                label="Address"
                name="address"
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
                <StyledInput label="Quantity" name="quantity" onChange={handleChange} type="number" />
                <StyledInput label="Price" value={price} InputProps={{ readOnly: true }} />
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
                  onClick={handleSubmit}
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
                  {loading ? "Processing..." : "Confirm Booking"}
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