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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { name: "Shop", path: "/user" },
  { name: "About", path: "/user/about" },
  { name: "Products", path: "/user/products" },
];

const isLoggedIn = !!localStorage.getItem("UserToken");
const settings = isLoggedIn
  ? [
      { name: "Profile", path: "/user/myprofile" },
      { name: "Account", path: "/user/account" },
      { name: "Logout", path: "/login" },
    ]
  : [
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
    ];

export default function Topbar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleSettings = (settings) => {
    if (settings.name === "Logout") {
      const confirmLogout = window.confirm("are you sure want to logout?");
      if (confirmLogout) {
        localStorage.removeItem("UserToken");
        alert("Logged out successfully!");
        navigate("/login");
      }
    } else {
      navigate(settings.path);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.7)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
        {/* 🔥 LOGO */}
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{
            cursor: "pointer",
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          onClick={() => navigate("/user/homepage")}
        >
          CartZen
        </Typography>

        {/* 📌 DESKTOP MENU */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => navigate(page.path)}
              sx={{
                color: "#111",
                fontWeight: 600,
                position: "relative",
                "&:hover": {
                  color: "#6366f1",
                },
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* 📱 MOBILE MENU */}
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

        {/* 👤 USER MENU */}
        <Box>
          <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
            <Avatar sx={{ bgcolor: "#6366f1" }} />
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
      </Toolbar>
    </AppBar>
  );
}
