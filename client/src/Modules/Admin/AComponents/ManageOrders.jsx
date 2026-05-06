import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";

import axios from "axios";
import { motion } from "framer-motion";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("UserToken");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/order/all-orders", {
        headers: {
          "auth-token": token,
        },
      });

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/order/update-status/${id}`,
        { status },
        {
          headers: {
            "auth-token": token,
          },
        },
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 5 },
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top, #f5f1e6 0%, #e8dccb 40%, #d6c3a3 100%)",
      }}
    >
      {/* 🌟 AMBIENT LIGHTING */}
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

      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 350,
          height: 350,
          background:
            "radial-gradient(circle, rgba(62,47,28,0.15), transparent)",
          filter: "blur(100px)",
        }}
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box
          sx={{
            mb: 5,
            p: 4,
            borderRadius: 5,
            background: "rgba(255,248,235,0.55)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: 34, md: 48 },
              color: "#3e2f1c",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Order Archive
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6d5c48",
              fontSize: 16,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Manage premium bookstore deliveries and customer journeys
          </Typography>
        </Box>
      </motion.div>

      {/* TABLE CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Paper
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            background: "rgba(255,255,255,0.42)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.18)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg, #3e2f1c, #2b2115)",
                }}
              >
                {[
                  "Reader",
                  "Books",
                  "Amount",
                  "Payment",
                  "Status",
                  "Update",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      color: "#fdf6e3",
                      fontWeight: 700,
                      fontSize: 15,
                      borderBottom: "none",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  style={{
                    transition: "0.3s",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#3e2f1c",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(200,169,126,0.15)",
                    }}
                  >
                    {order.userId?.name}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid rgba(200,169,126,0.15)",
                    }}
                  >
                    {order.items.map((item) => (
                      <Box
                        key={item._id}
                        sx={{
                          mb: 1,
                          p: 1,
                          borderRadius: 2,
                          background: "rgba(255,248,235,0.45)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#3e2f1c",
                            fontWeight: 600,
                          }}
                        >
                          {item.productId?.name}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#7c6a58",
                            fontSize: 13,
                          }}
                        >
                          Quantity × {item.quantity}
                        </Typography>
                      </Box>
                    ))}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "#2b2115",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(200,169,126,0.15)",
                    }}
                  >
                    ₹{order.totalAmount}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid rgba(200,169,126,0.15)",
                    }}
                  >
                    <Chip
                      label={order.paymentStatus}
                      sx={{
                        background:
                          order.paymentStatus === "Paid"
                            ? "rgba(22,163,74,0.15)"
                            : "rgba(220,38,38,0.15)",

                        color:
                          order.paymentStatus === "Paid"
                            ? "#166534"
                            : "#991b1b",

                        fontWeight: 700,
                        borderRadius: "999px",
                        backdropFilter: "blur(8px)",
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid rgba(200,169,126,0.15)",
                    }}
                  >
                    <Chip
                      label={order.orderStatus}
                      sx={{
                        background: statusColor(order.orderStatus),
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: "999px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid rgba(200,169,126,0.15)",
                    }}
                  >
                    <Select
                      size="small"
                      value={order.orderStatus}
                      disabled={
                        order.orderStatus === "Delivered" ||
                        order.orderStatus === "Cancelled"
                      }
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      sx={{
                        minWidth: 150,
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.55)",
                        backdropFilter: "blur(10px)",

                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid rgba(200,169,126,0.25)",
                        },

                        "&:hover": {
                          boxShadow: "0 0 20px rgba(200,169,126,0.25)",
                        },
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>

                      <MenuItem value="Processing">Processing</MenuItem>

                      <MenuItem value="Shipped">Shipped</MenuItem>

                      <MenuItem value="Delivered">Delivered</MenuItem>

                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </motion.div>
    </Box>
  );
}
