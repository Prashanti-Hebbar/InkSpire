import React from "react";

import { Box, Typography, Button, Chip } from "@mui/material";

import { motion } from "framer-motion";

import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const location = useLocation();

  const order = location.state?.order;

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",

        p: 3,

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* AMBIENT LIGHT */}
      <Box
        sx={{
          position: "absolute",

          top: -100,
          right: -100,

          width: 350,
          height: 350,

          background:
            "radial-gradient(circle, rgba(200,169,126,0.25), transparent)",

          filter: "blur(100px)",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        <Box
          sx={{
            p: 6,

            width: 500,

            borderRadius: 5,

            textAlign: "center",

            background: "rgba(255,248,235,0.7)",

            backdropFilter: "blur(20px)",

            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* ICON */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 60,
              }}
            >
              🎉
            </Typography>
          </motion.div>

          {/* TITLE */}
          <Typography
            variant="h3"
            fontWeight={700}
            color="#3e2f1c"
            sx={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Payment Successful
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#7c6a58",
            }}
          >
            Your books are now being prepared for shipment.
          </Typography>

          {/* ORDER INFO */}
          {order && (
            <Box
              sx={{
                mt: 4,

                p: 3,

                borderRadius: 4,

                background: "rgba(255,255,255,0.5)",
              }}
            >
              <Typography fontWeight={700} color="#3e2f1c">
                Order ID
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#7c6a58",
                }}
              >
                {order._id}
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  color: "#7c6a58",
                }}
              >
                Total Amount
              </Typography>

              <Typography variant="h4" fontWeight={700} color="#3e2f1c">
                ₹{order.totalAmount}
              </Typography>

              <Chip
                label={order.orderStatus}
                sx={{
                  mt: 3,

                  background: "#16a34a",

                  color: "#fff",

                  fontWeight: 700,
                }}
              />
            </Box>
          )}

          {/* BUTTONS */}
          <Button
            fullWidth
            sx={{
              mt: 4,

              py: 1.5,

              borderRadius: 3,

              background: "#c8a97e",

              color: "#2b2115",

              fontWeight: 700,

              "&:hover": {
                background: "#b89668",
              },
            }}
            onClick={() =>
              navigate("/user/getprofile", {
                state: {
                  activeTab: 1,
                },
              })
            }
          >
            View My Orders
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,

              py: 1.5,

              borderRadius: 3,

              borderColor: "#c8a97e",

              color: "#3e2f1c",

              "&:hover": {
                borderColor: "#b89668",
              },
            }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
