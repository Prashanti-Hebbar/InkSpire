import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#f9fafb" }}>

      {/* 🔥 HERO */}
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box sx={{ maxWidth: 700, textAlign: "center", px: 2 }}>
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              background: "linear-gradient(90deg, #6366f1, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            CartZen Store
          </Typography>

          <Typography variant="h6" mt={3} color="text.secondary">
            A modern platform to manage products, users, and categories with ease.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 4,
              px: 5,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1, #ec4899)"
            }}
            onClick={() => navigate("/user/homepage")}
          >
            Explore Store
          </Button>
        </Box>
      </Box>

      {/* 📊 STATS */}
      <Container sx={{ pb: 8 }}>
        <Grid container spacing={3} justifyContent="center">
          {[
            { label: "Products", value: "100+" },
            { label: "Categories", value: "20+" },
            { label: "Users", value: "500+" },
            { label: "Orders", value: "1K+" }
          ].map((item, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  maxWidth: 180,
                  mx: "auto",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
                }}
              >
                <Typography variant="h5" fontWeight={700}>
                  {item.value}
                </Typography>
                <Typography color="text.secondary">
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 🚀 FEATURES */}
      <Container sx={{ pb: 10 }}>
        <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mb: 6 }}>
          <Typography variant="h4" fontWeight={700}>
            Why Choose Us?
          </Typography>
          <Typography color="text.secondary" mt={2}>
            Everything you need to manage and shop efficiently.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <ShoppingBagIcon fontSize="large" />,
              title: "Easy Shopping",
              desc: "Smooth and simple product browsing experience."
            },
            {
              icon: <CategoryIcon fontSize="large" />,
              title: "Smart Categories",
              desc: "Organized products for quick discovery."
            },
            {
              icon: <GroupsIcon fontSize="large" />,
              title: "User Friendly",
              desc: "Designed for both admins and users."
            },
            {
              icon: <VerifiedIcon fontSize="large" />,
              title: "Reliable System",
              desc: "Secure backend and efficient data flow."
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  maxWidth: 250,
                  mx: "auto",
                  transition: "0.3s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <Box sx={{ mb: 2, color: "#6366f1" }}>
                  {item.icon}
                </Box>

                <Typography fontWeight={600}>
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 🎯 CTA */}
      <Box
        sx={{
          py: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "#111827",
          color: "white"
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h5" fontWeight={600}>
            Ready to start shopping?
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              px: 6,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1, #ec4899)"
            }}
            onClick={() => navigate("/user/homepage")}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

    </Box>
  );
}