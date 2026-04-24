import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Avatar,
  Divider,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  setCollapsed,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const drawerWidth = collapsed ? 80 : 260;

  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("role")

    alert("Logged out successfully!");
    navigate("/login", {replace: true});
  };

  const isActive = (path) => location.pathname === path;

  const isProductActive = location.pathname.includes("/admin/products");
  const isCategoryActive = location.pathname.includes("/admin/category");

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #3e2f1c, #2b2115)",
        color: "#fdf6e3",
        p: 2,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          background: "rgba(255,255,255,0.05)",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#c8a97e",
            width: 50,
            height: 50,
            mx: "auto",
            mb: 1,
            color: "#2b2115",
          }}
        >
          <AdminPanelSettingsIcon />
        </Avatar>

        <Typography fontWeight={700}>Admin</Typography>
      </Box>

      <List>
        {/* Main Menu */}
        {[
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/admin/dashboard",
          },
          { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1 : 2,
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: collapsed ? 0 : 1,
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Products */}
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => setProductOpen(!productOpen)}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1 : 2,
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {productOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={productOpen}>
          <List>
            {[
              {
                text: "Add Product",
                path: "/admin/products/add",
                icon: <AddCircleIcon />,
              },
              {
                text: "View Products",
                path: "/admin/products",
                icon: <ViewListIcon />,
              },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    px: collapsed ? 1 : 2,
                  }}
                >
                  <ListItemIcon sx={{ color: "#ccc" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Category */}
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => setCategoryOpen(!categoryOpen)}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1 : 2,
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Genres" />
            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={categoryOpen}>
          <List>
            {[
              {
                text: "Add Category",
                path: "/admin/category/add",
                icon: <AddCircleIcon />,
              },
              {
                text: "View Category",
                path: "/admin/category/view",
                icon: <ViewListIcon />,
              },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    px: collapsed ? 1 : 2,
                  }}
                >
                  <ListItemIcon sx={{ color: "#ccc" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />

      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <>
      {/* 🔥 MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "0.3s",
            overflowX: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 🔥 DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "0.3s",
            overflowX: "hidden",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
