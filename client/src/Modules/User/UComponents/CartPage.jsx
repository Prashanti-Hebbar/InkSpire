import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      });

      setCart(res.data.cart?.items || []); // ✅ correct
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put(
        "http://localhost:5000/cart/update",
        { productId, quantity },
        {
          headers: {
            "auth-token": localStorage.getItem("UserToken"),
          },
        },
      );

      fetchCart(); // refresh UI
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/cart/remove", {
        data: { productId },
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 6 },
        position: "relative",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        overflow: "hidden",
      }}
    >
      {/* 🔆 AMBIENT LIGHT */}
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

      {/* 📖 TITLE */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Playfair Display",
          color: "#3e2f1c",
          mb: 4,
        }}
      >
        Your Reading Table
      </Typography>

      {/* 🪵 CART ITEMS */}
      <Box display="flex" flexDirection="column" gap={3}>
        {cart.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontSize: 24,
                color: "#3e2f1c",
              }}
            >
              Your shelf is empty
            </Typography>

            <Typography sx={{ mt: 1, color: "#7c6a58" }}>
              Add books to start your reading journey
            </Typography>
          </Box>
        ) : (
          cart.map((item) => (
            <motion.div key={item.productId._id} whileHover={{ scale: 1.02 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  p: 3,
                  borderRadius: 4,
                  background: "rgba(255,248,235,0.6)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(200,169,126,0.2)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                }}
              >
                {/* 📚 IMAGE */}
                <motion.img
                  src={`http://localhost:5000/uploads/${item.productId.productimage}`}
                  style={{
                    width: 90,
                    height: 120,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                />

                {/* DETAILS */}
                <Box flex={1}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#2b2115",
                    }}
                  >
                    {item.productId.name}
                  </Typography>

                  <Typography sx={{ color: "#7c6a58", mt: 1 }}>
                    ₹{item.productId.price}
                  </Typography>
                  <Typography sx={{ color: "#a67c52", fontSize: 13 }}>
                    {item.productId.quantity > 0
                      ? `${item.productId.quantity} available`
                      : "Out of stock"}
                  </Typography>

                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: "999px",
                      background: "rgba(255,248,235,0.7)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(200,169,126,0.3)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* MINUS */}
                    <motion.div whileTap={{ scale: 0.85 }}>
                      <Button
                        onClick={() =>
                          updateQuantity(item.productId._id, item.quantity - 1)
                        }
                        sx={{
                          minWidth: 32,
                          height: 32,
                          borderRadius: "50%",
                          color: "#3e2f1c",
                          fontWeight: 700,
                          "&:hover": {
                            background: "#c8a97e",
                            color: "#2b2115",
                            boxShadow: "0 0 10px rgba(200,169,126,0.6)",
                          },
                        }}
                      >
                        −
                      </Button>
                    </motion.div>

                    {/* COUNT */}
                    <Typography
                      sx={{
                        minWidth: 28,
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#2b2115",
                      }}
                    >
                      {item.quantity}
                    </Typography>

                    {/* PLUS */}
                    <motion.div whileTap={{ scale: 0.85 }}>
                      <Button
                        // disabled={item.quantity >= item.productId.quantity}
                        onClick={() => {
                          if (item.quantity >= item.productId.quantity) {
                            alert("Out of stock");
                            return;
                          }

                          updateQuantity(item.productId._id, item.quantity + 1);
                        }}
                        sx={{
                          minWidth: 32,
                          height: 32,
                          borderRadius: "50%",
                          color: "#3e2f1c",
                          fontWeight: 700,
                          "&:hover": {
                            background: "#c8a97e",
                            color: "#2b2115",
                            boxShadow: "0 0 10px rgba(200,169,126,0.6)",
                          },
                        }}
                      >
                        +
                      </Button>
                    </motion.div>
                  </Box>
                </Box>

                {/* DELETE */}
                <IconButton onClick={() => removeItem(item.productId._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </motion.div>
          ))
        )}
      </Box>

      {/* 💰 TOTAL + CHECKOUT */}
      {cart.length > 0 ? (
        <Box
          mt={6}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255,248,235,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(200,169,126,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ color: "#3e2f1c" }}>
            Total: ₹{total.toLocaleString()}
          </Typography>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
            onClick={() => navigate("/user/cart-checkout")}
            
              variant="contained"
              sx={{
                mt: 3,
                background: "#c8a97e",
                color: "#2b2115",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
              }}
            >
              Proceed to Checkout
            </Button>
          </motion.div>
        </Box>
      ) : (
        <Box
          mt={6}
          sx={{
            textAlign: "center",
            p: 4,
            borderRadius: 4,
            background: "rgba(255,248,235,0.5)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Playfair Display",
              fontSize: 22,
              color: "#3e2f1c",
            }}
          >
            Your cart is waiting to be filled 📚
          </Typography>

          <Typography sx={{ mt: 1, color: "#7c6a58" }}>
            Add books to unlock checkout
          </Typography>

          <Button
            onClick={() => navigate("/user/products")}
            sx={{
              mt: 2,
              border: "1px solid #c8a97e",
              color: "#c8a97e",
            }}
          >
            Browse Books
          </Button>
        </Box>
      )}
    </Box>
  );
}
