import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const stats = [
  {
    title: "Users",
    icon: <PeopleIcon />,
    color: "#3b82f6",
    fetchCount: async () => {
      const res = await fetch("/user/getUser");
      const data = await res.json();
      return data.allusers?.length || 0;
    },
  },
  {
    title: "Categories",
    icon: <CategoryIcon />,
    color: "#10b981",
    fetchCount: () => {
      const stored = JSON.parse(localStorage.getItem("categories")) || [];
      return stored.length;
    },
  },
  {
    title: "Products",
    icon: <BookOnlineIcon />,
    color: "#f59e0b",
    fetchCount: async () => {
      const res = await fetch("/product/getProducts");
      const data = await res.json();
      return data.products?.length || 0;
    },
  },
];

export default function AHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    stats.forEach(async (s) => {
      const value = await s.fetchCount();
      setCounts((prev) => ({ ...prev, [s.title]: value }));
    });
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 4,
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={5}>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.title}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 3,
                border: "1px solid #eee",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: stat.color,
                  color: "#fff",
                  fontSize: 30,
                }}
              >
                {stat.icon}
              </Box>

              <Box>
                <Typography color="text.secondary" fontSize={14}>
                  {stat.title}
                </Typography>

                <Typography variant="h4" fontWeight={700}>
                  {counts[stat.title] ?? "..."}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 4,
          border: "1px solid #eee",
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1}>
          Overview
        </Typography>

        <Typography color="text.secondary">
          Monitor platform statistics from this dashboard. Use the sidebar to
          manage users, categories, and products.
        </Typography>
      </Paper>
    </Box>
  );
}