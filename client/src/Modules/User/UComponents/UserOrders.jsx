import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function UserOrders({ externalOrders }) {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("UserToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/order/my-orders",
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setOrders(res.data.orders || []);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!externalOrders) {
      fetchOrders();
    }
  }, []);

  const finalOrders = (
    externalOrders || orders
  ).sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#d97706";

      case "Processing":
        return "#2563eb";

      case "Shipped":
        return "#7c3aed";

      case "Delivered":
        return "#16a34a";

      case "Cancelled":
        return "#dc2626";

      default:
        return "#6b7280";
    }
  };

  const steps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const getStepIndex = (status) =>
    steps.indexOf(status);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 5 },

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
          top: -120,
          left: -120,
          width: 400,
          height: 400,

          background:
            "radial-gradient(circle, rgba(200,169,126,0.25), transparent)",

          filter: "blur(100px)",
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontFamily: "'Playfair Display', serif",
          color: "#3e2f1c",
          mb: 5,
          fontWeight: 700,
        }}
      >
        Your Library Orders 📚
      </Typography>

      {finalOrders.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <Typography
            sx={{
              fontSize: 28,
              color: "#3e2f1c",
              fontFamily:
                "'Playfair Display', serif",
            }}
          >
            Your reading shelf is empty
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#7c6a58",
            }}
          >
            Explore books and begin your
            reading journey
          </Typography>
        </Box>
      ) : (
        finalOrders.map((order, index) => {
          const products = order.items || [];

          return (
            <motion.div
              key={order._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.01,
              }}
            >
              <Box
                sx={{
                  mb: 4,
                  p: 4,
                  borderRadius: 5,

                  background:
                    "rgba(255,248,235,0.65)",

                  backdropFilter:
                    "blur(18px)",

                  border:
                    "1px solid rgba(200,169,126,0.2)",

                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.18)",
                }}
              >
                {/* TOP */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#3e2f1c",
                      fontWeight: 700,
                      fontSize: 22,
                    }}
                  >
                    Order #{order._id.slice(-6)}
                  </Typography>

                  <Chip
                    label={order.orderStatus}
                    sx={{
                      background:
                        statusColor(
                          order.orderStatus
                        ),

                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: "999px",
                    }}
                  />
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* PRODUCTS */}
                {products.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      gap: 3,
                      mb: 3,
                      alignItems: "center",
                    }}
                  >
                    {/* IMAGE */}
                    <motion.img
                      src={`http://localhost:5000/uploads/${item.productId?.productimage}`}
                      alt={
                        item.productId?.name
                      }
                      style={{
                        width: 85,
                        height: 120,
                        objectFit: "contain",
                        borderRadius: 10,
                        background:
                          "rgba(255,255,255,0.8)",
                        padding: 6,
                      }}
                      whileHover={{
                        rotateY: 12,
                        scale: 1.05,
                      }}
                    />

                    {/* INFO */}
                    <Box flex={1}>
                      <Typography
                        sx={{
                          color: "#2b2115",
                          fontWeight: 700,
                          fontSize: 18,
                        }}
                      >
                        {
                          item.productId
                            ?.name
                        }
                      </Typography>

                      <Typography
                        sx={{
                          color: "#7c6a58",
                          mt: 0.5,
                        }}
                      >
                        Quantity ×{" "}
                        {item.quantity}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#7c6a58",
                          mt: 0.5,
                        }}
                      >
                        ₹{item.price}
                      </Typography>
                    </Box>

                    {/* SUBTOTAL */}
                    <Typography
                      sx={{
                        color: "#3e2f1c",
                        fontWeight: 700,
                      }}
                    >
                      ₹
                      {item.price *
                        item.quantity}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                {/* TOTAL */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#7c6a58",
                      }}
                    >
                      Payment Method
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#2b2115",
                      }}
                    >
                      {
                        order.paymentMethod
                      }
                    </Typography>
                  </Box>

                  <Box textAlign="right">
                    <Typography
                      sx={{
                        color: "#7c6a58",
                      }}
                    >
                      Total Amount
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 24,
                        color: "#3e2f1c",
                      }}
                    >
                      ₹
                      {
                        order.totalAmount
                      }
                    </Typography>
                  </Box>
                </Box>

                {/* DELIVERY TRACKING */}
                {order.orderStatus !==
                  "Cancelled" && (
                  <Box mt={5}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",

                        justifyContent:
                          "space-between",

                        position:
                          "relative",
                      }}
                    >
                      {/* LINE */}
                      <Box
                        sx={{
                          position:
                            "absolute",

                          top: 10,
                          left: 0,
                          right: 0,

                          height: 3,

                          background:
                            "rgba(200,169,126,0.25)",

                          zIndex: 0,
                        }}
                      />

                      {steps.map(
                        (step, i) => {
                          const active =
                            i <=
                            getStepIndex(
                              order.orderStatus
                            );

                          return (
                            <Box
                              key={step}
                              sx={{
                                zIndex: 1,
                                textAlign:
                                  "center",

                                flex: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,

                                  borderRadius:
                                    "50%",

                                  margin:
                                    "0 auto",

                                  background:
                                    active
                                      ? "#16a34a"
                                      : "#d1d5db",

                                  boxShadow:
                                    active
                                      ? "0 0 20px rgba(22,163,74,0.5)"
                                      : "none",
                                }}
                              />

                              <Typography
                                sx={{
                                  mt: 1,
                                  fontSize: 12,

                                  color:
                                    active
                                      ? "#166534"
                                      : "#9ca3af",
                                }}
                              >
                                {step}
                              </Typography>
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </motion.div>
          );
        })
      )}
    </Box>
  );
}