import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const pages = [
  { name: "Home", path: "/user" },
  { name: "Books", path: "/user/products" },
  { name: "About", path: "/user/about" },
];

export default function Topbar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User",
  );

  const [scrolled, setScrolled] = useState(false);

  const firstLetter = username?.[0]?.toUpperCase() || "U";
  const token = localStorage.getItem("UserToken");

  const settings = token
    ? [
        { name: "Profile", path: "/user/myprofile" },
        { name: "Logout", path: "/login" },
      ]
    : [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  const handleSettings = (item) => {
    if (item.name === "Logout") {
      localStorage.clear();
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };

  useEffect(() => {
    const updateUser = () => {
      setUsername(localStorage.getItem("username") || "User");
    };

    window.addEventListener("userUpdated", updateUser);

    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(14px)",
        background: scrolled
          ? "rgba(245, 241, 230, 0.95)" // warm cream (solid on scroll)
          : "rgba(245, 241, 230, 0.65)", // light glass (top)
        borderBottom: scrolled ? "1px solid rgba(62, 47, 28, 0.1)" : "none",
        boxShadow: scrolled ? "0 6px 20px rgba(62, 47, 28, 0.08)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 5 },
          py: scrolled ? 1 : 2,
          transition: "0.3s",
        }}
      >
        {/* 🔥 LOGO */}
        <Typography
          variant="h5"
          onClick={() => navigate("/user")}
          sx={{
            cursor: "pointer",
            fontWeight: 700,
            color: "#3e2f1c",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          📖 Inkspire
        </Typography>

        {/* DESKTOP NAV */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => navigate(page.path)}
              sx={{
                color: "#5a4a3b",
                fontWeight: 600,
                position: "relative",
                "&:hover": {
                  color: "#3e2f1c",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: "2px",
                  background: "#c8a97e",
                  transition: "0.3s",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* RIGHT SIDE */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* 🛒 CART */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton>
              <Badge badgeContent={2} color="warning">
                <ShoppingCartIcon sx={{ color: "#3e2f1c" }} />
              </Badge>
            </IconButton>
          </motion.div>

          {/* 👤 USER */}
          <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
            <Avatar
              sx={{
                bgcolor: "#c8a97e",
                color: "#2b2115",
                fontWeight: 700,
              }}
            >
              {firstLetter}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            {settings.map((item) => (
              <MenuItem key={item.name} onClick={() => handleSettings(item)}>
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* MOBILE MENU */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={(e) => setAnchorElNav(e.currentTarget)}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={() => setAnchorElNav(null)}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => {
                  navigate(page.path);
                  setAnchorElNav(null);
                }}
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
