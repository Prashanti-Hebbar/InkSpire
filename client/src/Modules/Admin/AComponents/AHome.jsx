import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function AHome() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("UserToken");

        const usersRes = await fetch("http://localhost:5000/user/getUser", {
          headers: { "auth-token": token },
        });
        const users = await usersRes.json();

        const productsRes = await fetch(
          "http://localhost:5000/product/getProducts",
          { headers: { "auth-token": token } },
        );
        const products = await productsRes.json();

        const categoriesRes = await fetch(
          "http://localhost:5000/category/getCategories",
          { headers: { "auth-token": token } },
        );
        const categories = await categoriesRes.json();

        setStats({
          users: users.allusers?.length || 0,
          products: products.products?.length || 0,
          categories: categories.categories?.length || 0,
        });
      } catch (err) {
        console.log("Dashboard error:", err);
      }
    };

    loadData();
  }, []);

  const cards = [
    { title: "Users", value: stats.users },
    { title: "Products", value: stats.products },
    { title: "Categories", value: stats.categories },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      {/* 🔥 HEADER */}
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 5,
          background: "linear-gradient(135deg, #3e2f1c, #2b2115)",
          color: "#fdf6e3",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Welcome Back
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Manage your bookstore efficiently
        </Typography>
      </Box>

      {/* 🔥 STATS */}
      <Grid container spacing={3}>
        {cards.map((c) => (
          <Grid item xs={12} md={4} key={c.title}>
            <motion.div whileHover={{ y: -5 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.6)",
                }}
              >
                <Typography color="text.secondary">{c.title}</Typography>
                <Typography variant="h3" fontWeight={700}>
                  {c.value}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* 🔥 OVERVIEW */}
      <Paper sx={{ mt: 5, p: 4, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight={600}>
          Overview
        </Typography>
        <Typography color="text.secondary">
          Track your bookstore performance and manage everything from one place.
        </Typography>
      </Paper>
    </Box>
  );
}
