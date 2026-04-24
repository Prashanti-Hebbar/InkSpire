import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/getProductById/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        p: { xs: 2, md: 6 },
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* 🔙 BACK */}
      <Button
        onClick={() => window.history.back()}
        sx={{
          mb: 3,
          textTransform: "none",
          color: "#3e2f1c",
        }}
      >
        ← Back
      </Button>

      {/* MAIN */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            borderRadius: 5,
            p: { xs: 3, md: 5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* 📚 IMAGE (BOOK FOCUS) */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotateY: 8,
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Box
              sx={{
                borderRadius: 4,
                p: 2,
                background:
                  "linear-gradient(135deg, #3e2f1c, #2b2115)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              <Box
                component="img"
                src={`http://localhost:5000/uploads/${product.productimage}`}
                alt={product.name}
                sx={{
                  width: "100%",
                  maxHeight: 420,
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
            </Box>
          </motion.div>

          {/* 📄 DETAILS */}
          <Box display="flex" flexDirection="column">
            {/* TITLE */}
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ color: "#3e2f1c" }}
            >
              {product.name}
            </Typography>

            {/* CATEGORY */}
            <Typography sx={{ color: "#7c6a58", mt: 1 }}>
              Category: {product.categoryId?.name}
            </Typography>

            {/* PRICE */}
            <Typography
              sx={{
                mt: 3,
                fontSize: 28,
                fontWeight: 700,
                color: "#2b2115",
              }}
            >
              ₹{product.price}
            </Typography>

            {/* DESCRIPTION */}
            <Box mt={3}>
              <Typography fontWeight={600} mb={1}>
                About this Book
              </Typography>
              <Typography color="#5a4a3b" lineHeight={1.7}>
                {product.description}
              </Typography>
            </Box>

            {/* ❤️ WISHLIST */}
            <Box mt={3}>
              <motion.div
                whileTap={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconButton
                  onClick={() => setLiked(!liked)}
                  sx={{
                    color: liked ? "#e63946" : "#3e2f1c",
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </motion.div>
            </Box>

            {/* ACTIONS */}
            <Box
              sx={{
                mt: "auto",
                display: "flex",
                gap: 2,
                pt: 4,
              }}
            >
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#c8a97e",
                    color: "#2b2115",
                    borderRadius: 3,
                    fontWeight: 600,
                    "&:hover": {
                      background: "#b89668",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    borderColor: "#3e2f1c",
                    color: "#3e2f1c",
                    "&:hover": {
                      background: "#3e2f1c",
                      color: "#fff",
                    },
                  }}
                >
                  Buy Now
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}