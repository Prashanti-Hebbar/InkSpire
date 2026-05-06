import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { motion } from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

export default function OTPVerify() {
  const navigate = useNavigate();

  const location = useLocation();

  const payload =
    location.state?.payload;

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const DEMO_OTP = "483921";

  if (!payload) {
    navigate("/");
    return null;
  }

  const handleVerify = async () => {
    if (otp !== DEMO_OTP) {
      alert("Invalid OTP");
      return;
    }

    try {
      setLoading(true);

      // fake processing delay
      await new Promise((resolve) =>
        setTimeout(resolve, 2500)
      );

      // CREATE ORDER
      const res = await axios.post(
        "http://localhost:5000/order/create",
        payload,
        {
          headers: {
            "auth-token":
              localStorage.getItem(
                "UserToken"
              ),
          },
        }
      );

      // navigate to success page
      navigate("/user/payment-success", {
        state: {
          order: res.data.order,
        },
      });

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Payment failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* LIGHT EFFECT */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,

          width: 350,
          height: 350,

          background:
            "radial-gradient(circle, rgba(200,169,126,0.25), transparent)",

          filter: "blur(90px)",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Box
          sx={{
            width: 420,

            p: 5,

            borderRadius: 5,

            background:
              "rgba(255,248,235,0.65)",

            backdropFilter:
              "blur(18px)",

            border:
              "1px solid rgba(200,169,126,0.2)",

            boxShadow:
              "0 25px 60px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              color: "#3e2f1c",

              fontFamily:
                "'Playfair Display', serif",
            }}
          >
            OTP Verification
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#7c6a58",
            }}
          >
            Secure your bookstore payment
          </Typography>

          {/* DEMO OTP */}
          <Box
            sx={{
              mt: 3,

              p: 2,

              borderRadius: 3,

              background:
                "rgba(22,163,74,0.08)",

              border:
                "1px solid rgba(22,163,74,0.2)",
            }}
          >
            <Typography
              sx={{
                color: "#166534",
                fontWeight: 700,
              }}
            >
              Demo OTP: 483921
            </Typography>
          </Box>

          {/* INPUT */}
          <TextField
            fullWidth
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            sx={{
              mt: 3,

              "& .MuiOutlinedInput-root":
                {
                  borderRadius: 3,

                  background:
                    "rgba(255,255,255,0.6)",
                },
            }}
          />

          {/* BUTTON */}
          <motion.div
            whileTap={{ scale: 0.95 }}
          >
            <Button
              fullWidth
              onClick={handleVerify}
              disabled={loading}
              sx={{
                mt: 4,

                py: 1.5,

                borderRadius: 3,

                background: "#c8a97e",

                color: "#2b2115",

                fontWeight: 700,

                "&:hover": {
                  background:
                    "#b89668",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#2b2115",
                  }}
                />
              ) : (
                "Verify Payment"
              )}
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}