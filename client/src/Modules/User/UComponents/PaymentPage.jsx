import React, { useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, productId, quantity, cartItems } = location.state || {};
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        items: cartItems?.length
          ? cartItems.map((item) => ({
              productId: item.productId._id,
              quantity: item.quantity,
              price: item.productId.price,
            }))
          : [
              {
                productId,
                quantity,
                price: Number(amount) / Number(quantity),
              },
            ],
        shippingAddress: {
          fullname: "User",
          email: "demo@gmail.com",
          phone: "9999999999",
          address: "Demo Address",
        },

        paymentMethod: method,

        paymentSuccess: true,
      };

      navigate("/user/payment-gateway", {
        state: {
          payload,
        },
      });
    } catch (err) {
      console.log(err);
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
              value="UPI"
              control={<Radio />}
              label="UPI Payment"
            />
            <FormControlLabel
              value="CARD"
              control={<Radio />}
              label="Card Payment"
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
              {loading ? "Processing..." : "Continue to Gateway"}
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}
