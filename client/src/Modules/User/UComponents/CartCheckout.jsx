import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CartCheckout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    fname: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const utoken = localStorage.getItem("UserToken");

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        headers: { "auth-token": utoken },
      });
      setCartItems(res.data.cart?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FETCH USER
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/getprofile", {
        headers: { "auth-token": utoken },
      });

      const u = res.data.udata;

      setBooking({
        fname: u.name || "",
        email: u.email || "",
        phone: u.phone || "",
        address: u.address || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUser();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  // 🔥 SUBMIT ORDER
  const handleSubmit = () => {
  if (!cartItems.length) {
    alert("Cart is empty");
    return;
  }

  navigate("/user/payments", {
    state: {
      amount: total,
      cartItems: cartItems, // 🔥 send full cart
    },
  });
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 6 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🌟 AMBIENT LIGHT */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(200,169,126,0.3), transparent)",
          filter: "blur(100px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {success ? (
          <Box
            sx={{
              p: 6,
              borderRadius: 5,
              textAlign: "center",
              background: "rgba(255,248,235,0.7)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              🎉 Order Placed Successfully
            </Typography>
            <Typography mt={2} color="#5a4a3b">
              Your books are on their way 📚
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              width: "100%",
              maxWidth: 1100,
            }}
          >
            {/* 📚 LEFT: ORDER SUMMARY */}
            <Box
              sx={{
                p: 4,
                borderRadius: 4,
                background: "rgba(255,248,235,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(200,169,126,0.2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={2}>
                Your Selection
              </Typography>

              {cartItems.map((item) => (
                <Box
                  key={item.productId._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <motion.img
                    src={`http://localhost:5000/uploads/${item.productId.productimage}`}
                    style={{
                      width: 60,
                      height: 80,
                      objectFit: "contain",
                      borderRadius: 6,
                    }}
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                  />

                  <Box flex={1}>
                    <Typography fontWeight={600}>
                      {item.productId.name}
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: "#7c6a58" }}>
                      ₹{item.productId.price} × {item.quantity}
                    </Typography>
                  </Box>

                  <Typography fontWeight={600}>
                    ₹{item.productId.price * item.quantity}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" fontWeight={700}>
                Total: ₹{total}
              </Typography>
            </Box>

            {/* 🧾 RIGHT: FORM */}
            <Box
              sx={{
                p: 4,
                borderRadius: 4,
                background: "rgba(255,248,235,0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(200,169,126,0.2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={2}>
                Delivery Details
              </Typography>

              <StyledInput
                label="Name"
                value={booking.fname}
                onChange={(e) =>
                  setBooking({ ...booking, fname: e.target.value })
                }
              />

              <StyledInput
                label="Email"
                value={booking.email}
                InputProps={{ readOnly: true }}
              />

              <StyledInput
                label="Phone"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
              />

              <StyledInput
                label="Address"
                value={booking.address}
                onChange={(e) =>
                  setBooking({ ...booking, address: e.target.value })
                }
              />

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 3,
                    background: "#c8a97e",
                    color: "#2b2115",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    "&:hover": {
                      background: "#b89668",
                      boxShadow: "0 0 20px rgba(200,169,126,0.6)",
                    },
                  }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
              </motion.div>
            </Box>
          </Box>
        )}
      </motion.div>
    </Box>
  );
}

const StyledInput = (props) => (
  <TextField
    fullWidth
    sx={{
      mt: 2,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
      },
    }}
    {...props}
  />
);