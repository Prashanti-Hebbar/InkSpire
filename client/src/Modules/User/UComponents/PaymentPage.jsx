import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, productId, quantity, cartItems } = location.state || {};

  const [method, setMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("UserToken");

  // 🔥 REDIRECT AFTER SUCCESS
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/user/payment-history"); // ✅ correct route
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const data = {
        amount,
        productId: productId || null,
        quantity: quantity || null,
        cartItems: cartItems || [],
        paymentMethod: method,
      };

      console.log("PAYLOAD:", data);

      const res = await axios.post(
        "http://localhost:5000/payment/create",
        data,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      const isSuccess = Math.random() > 0.3;

      await axios.post(
        "http://localhost:5000/payment/verify",
        {
          paymentId: res.data.payment._id,
          success: isSuccess,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (isSuccess) {
        setSuccess(true);
      } else {
        alert("❌ Payment Failed");
      }

    } catch (err) {
      console.error("PAYMENT ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
        <Paper
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 500,
            borderRadius: 5,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          {success ? (
            <>
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight={700}
                color="#3e2f1c"
              >
                🎉 Payment Successful
              </Typography>

              <Typography textAlign="center" mt={2} color="#5a4a3b">
                Redirecting to payment history...
              </Typography>

              {/* OPTIONAL BUTTON */}
              <Button
                fullWidth
                onClick={() => navigate("/payment-history")}
                sx={{
                  mt: 3,
                  background: "#3e2f1c",
                  color: "#fff",
                  "&:hover": { background: "#2b2115" },
                }}
              >
                Go Now
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                fontWeight={700}
                color="#3e2f1c"
                mb={2}
                textAlign="center"
              >
                Payment
              </Typography>

              <Typography textAlign="center" color="#7c6a58" mb={3}>
                Complete your purchase securely
              </Typography>

              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#fff8eb",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                <Typography color="#7c6a58">Total Amount</Typography>
                <Typography variant="h4" fontWeight={700} color="#3e2f1c">
                  ₹{amount}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography fontWeight={600} mb={1}>
                Select Payment Method
              </Typography>

              <RadioGroup
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <FormControlLabel
                  value="ONLINE"
                  control={<Radio />}
                  label="Online Payment (UPI / Card)"
                />

                <FormControlLabel
                  value="COD"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
              </RadioGroup>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  fullWidth
                  onClick={handlePayment}
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
                  {loading ? "Processing..." : "Confirm Payment"}
                </Button>
              </motion.div>
            </>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}