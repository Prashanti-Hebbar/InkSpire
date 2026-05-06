import React, { useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";

import { motion } from "framer-motion";

import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentGateway() {
  const navigate = useNavigate();

  const location = useLocation();

  const payload = location.state?.payload;
  const [upiId, setUpiId] = useState("");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  if (!payload) {
    navigate("/");
    return null;
  }

  const method = payload.paymentMethod;

  const handleContinue = () => {
    if (method === "UPI" && !upiId.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }

    if (
      method === "CARD" &&
      (!cardData.cardNumber || !cardData.expiry || !cardData.cvv)
    ) {
      alert("Fill card details");
      return;
    }

    navigate("/user/otp-verify", {
      state: {
        payload,
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box
          sx={{
            width: 420,
            p: 4,
            borderRadius: 5,
            background: "rgba(255,248,235,0.65)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(200,169,126,0.2)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              color: "#3e2f1c",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Secure Checkout
          </Typography>
          <Typography
            sx={{
              color: "#7c6a58",
              mt: 1,
            }}
          >
            Protected payment gateway
          </Typography>

          {method === "UPI" && (
            <Box mt={4}>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Enter UPI ID
              </Typography>
              <TextField
                fullWidth
                placeholder="name@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </Box>
          )}

          {method === "CARD" && (
            <Box mt={4}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="4111 1111 1111 1111"
                sx={{ mb: 2 }}
                value={cardData.cardNumber}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardNumber: e.target.value,
                  })
                }
              />

              <Box display="flex" gap={2}>
                <TextField
                  fullWidth
                  label="Expiry"
                  placeholder="12/28"
                  value={cardData.expiry}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      expiry: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="CVV"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      cvv: e.target.value,
                    })
                  }
                />
              </Box>
            </Box>
          )}

          {method === "COD" && (
            <Box mt={4}>
              <Typography>Cash will be collected upon delivery.</Typography>
            </Box>
          )}

          <Button
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 3,
              background: "#c8a97e",
              color: "#2b2115",
              fontWeight: 700,
            }}
            onClick={handleContinue}
          >
            Continue Secure Payment
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
