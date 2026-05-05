import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/getProducts")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/category/getCategories")
      .then((res) => setCategories(res.data.categories))
      .catch(console.error);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name && p.name.toLowerCase().includes(search.toLowerCase());

    const productCatId = p.categoryId?._id || p.categoryId;

    const matchCategory =
      !selectedCategory ||
      productCatId?.toString() === selectedCategory?.toString();

    return matchSearch && matchCategory;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        p: { xs: 2, md: 5 },
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* 📚 FLOATING BOOK ATMOSPHERE */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {[...Array(12)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const size = 60 + Math.random() * 60;
          const duration = 6 + Math.random() * 6;

          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: `${top}%`,
                left: `${left}%`,
                fontSize: `${size}px`,
                opacity: 0.3,
                filter: "blur(0.3px)",
              }}
            >
              📖
            </motion.div>
          );
        })}
      </Box>

      {/* 🔥 HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 1.05 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Box
          sx={{
            mb: 5,
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            background: `
              linear-gradient(135deg, rgba(62,47,28,0.9), rgba(43,33,21,0.9)),
              url('https://images.unsplash.com/photo-1512820790803-83ca734da794')
            `,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fdf6e3",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* glow effect */}
          <Box
            sx={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background:
                "radial-gradient(circle, rgba(255,215,150,0.3), transparent)",
            }}
          />

          <Typography variant="h3" fontWeight={700} gutterBottom>
            Step Into the World of Stories
          </Typography>

          <Typography sx={{ opacity: 0.9, mb: 3 }}>
            Discover timeless classics, modern bestsellers, and hidden gems
            curated just for you.
          </Typography>

          <Box display="flex" gap={2}>
            <Button
              onClick={() => navigate("/user/products")}
              variant="contained"
              sx={{
                background: "#c8a97e",
                color: "#2b2115",
                fontWeight: 600,
                "&:hover": { background: "#b89668" },
              }}
            >
              Browse Books
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* 🔍 SEARCH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Box mb={4}>
          <TextField
            fullWidth
            placeholder="Search books, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
              borderRadius: 4,
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </motion.div>

      {/* 📚 GENRES */}
      <Box mb={5} position="relative" zIndex={2}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
          sx={{ color: "#3e2f1c" }}
        >
          Explore Genres
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          {categories.map((cat) => (
            <motion.div key={cat._id} whileHover={{ y: -6 }}>
              <Box
                onClick={() => setSelectedCategory(cat._id)}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: 500,

                  background:
                    selectedCategory === cat._id
                      ? "#c8a97e"
                      : "rgba(255,255,255,0.6)",

                  color: selectedCategory === cat._id ? "#2b2115" : "#3e2f1c",
                }}
              >
                {cat.name}
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
      {selectedCategory && (
        <Button
          onClick={() => setSelectedCategory(null)}
          sx={{
            mb: 4,
            background: "rgba(255,255,255,0.6)",
            borderRadius: 2,
            color: "#3e2f1c",
            "&:hover": { background: "rgba(255,255,255,0.8)" },
            
          }}
        >
          Clear Filter
        </Button>
      )}

      {/* 🧾 HEADER */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        zIndex={2}
      >
        <Typography variant="h5" fontWeight={700} sx={{ color: "#3e2f1c" }}>
          Available Books
        </Typography>
      </Box>

      {/* 📦 PRODUCTS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 5,
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          }}
        >
          <Products
            products={filteredProducts}
            hideFilters={true}
            addToCart={addToCart}
          />
        </Box>
      </motion.div>
      <Footer />
    </Box>
  );
}
