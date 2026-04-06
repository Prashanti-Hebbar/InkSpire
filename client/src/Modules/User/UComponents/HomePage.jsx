import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  FormControl,
} from "@mui/material";
import axios from "axios";
import Products from "./Products";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/product/getProducts")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
  <Box sx={{ p: 4, background: "#eef2f7", minHeight: "100vh" }}>
    {/* 🔥 HEADER */}
    <Box mb={4}>
      <Typography variant="h5" fontWeight={700} color="#1e293b">
        Shop Products
      </Typography>
      <Typography color="#64748b">
        Browse and add products to your cart
      </Typography>
    </Box>

    {/* 🔍 SEARCH */}
    <Box mb={4}>
      <TextField
        fullWidth
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          background: "#fff",
          borderRadius: 2,
        }}
      />
    </Box>

    {/* 🧾 CART */}
    <Box mb={4}>
      <Chip
        label={`Cart: ${cart.length} items`}
        sx={{
          background: "#334155",
          color: "#fff",
          fontWeight: 500,
        }}
      />
    </Box>
    <Products />
  </Box>
  </div>
);
}
