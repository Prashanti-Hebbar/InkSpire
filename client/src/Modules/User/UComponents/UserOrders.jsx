import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Chip, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = localStorage.getItem("UserToken");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(
        "http://localhost:5000/booking/userbookings",
        {
          headers: {
            "auth-token": token,
          },
        },
      );

      setOrders(res.data.bdata || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🎨 STATUS COLORS
  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#d97706";
      case "Approved":
        return "#2563eb";
      case "Completed":
        return "#16a34a";
      case "Rejected":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontFamily: "Playfair Display", mb: 4, color: "#3e2f1c" }}
      >
        Your Orders 📚
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders yet</Typography>
      ) : (
        orders.map((order) => {
          const product = order.productId;

          return (
            <motion.div key={order._id} whileHover={{ scale: 1.02 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  p: 3,
                  mb: 4,
                  borderRadius: 4,
                  background: "rgba(255,248,235,0.65)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(200,169,126,0.2)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                  alignItems: "center",
                }}
              >
                {/* 📚 BOOK IMAGE */}
                <motion.img
                  src={`http://localhost:5000/uploads/${product.productimage}`}
                  alt={product.name}
                  style={{
                    width: 90,
                    height: 120,
                    objectFit: "contain",
                    borderRadius: 10,
                    background: "#fff",
                    padding: "4px",
                  }}
                  whileHover={{
                    rotateY: 12,
                    scale: 1.05,
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                />

                {/* 📄 DETAILS */}
                <Box flex={1}>
                  {/* TITLE */}
                  <Typography
                    fontWeight={700}
                    sx={{
                      color: "#2b2115",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product?.name}
                  </Typography>

                  {/* AUTHOR */}
                  <Typography sx={{ color: "#7c6a58", mt: 0.5 }}>
                    by {product?.author || "Unknown Author"}
                  </Typography>

                  {/* PRICE INFO */}
                  <Typography sx={{ mt: 1 }}>
                    ₹{product?.price} × {order.quantity}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#3e2f1c",
                      mt: 0.5,
                    }}
                  >
                    Total: ₹{order.totalamount}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* STATUS + DATE */}
                  <Box display="flex" justifyContent="space-between">
                    <Chip
                      label={order.bookingstatus}
                      sx={{
                        background: statusColor(order.bookingstatus),
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />

                    <Typography sx={{ fontSize: 13, color: "#7c6a58" }}>
                      {new Date(order.bookingDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          );
        })
      )}
    </Box>
  );
}
