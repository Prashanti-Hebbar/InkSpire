import React, { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
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
  Divider
} from "@mui/material"

import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import CategoryIcon from "@mui/icons-material/Category"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import ViewListIcon from "@mui/icons-material/ViewList"
import LogoutIcon from "@mui/icons-material/Logout"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const drawerWidth = 260

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
]

const productItems = [
  { text: "Add Product", icon: <AddCircleIcon />, path: "/admin/products/add" },
  { text: "View Products", icon: <ViewListIcon />, path: "/admin/products" },
]

const categoryItems = [
  { text: "Add Category", icon: <AddCircleIcon />, path: "/admin/category/add" },
  { text: "View Category", icon: <ViewListIcon />, path: "/admin/category/view" },
]

export default function Sidebar() {

  const navigate = useNavigate()
  const location = useLocation()

  const [productOpen, setProductOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("AdminToken")
    alert("Logged out successfully!")
    navigate("/admin/login")
  }

  const isActive = (path) => location.pathname === path

  const isProductActive = productItems.some(
    (item) => location.pathname === item.path
  )

  const isCategoryActive = categoryItems.some(
    (item) => location.pathname === item.path
  )

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#0f172a",
          color: "#fff",
          borderRight: "none",
          padding: "10px",
        },
      }}
    >

      {/* Logo */}
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          background: "rgba(255,255,255,0.05)",
          textAlign: "center"
        }}
      >

        <Avatar
          sx={{
            bgcolor: "#6366f1",
            width: 50,
            height: 50,
            mx: "auto",
            mb: 1
          }}
        >
          <AdminPanelSettingsIcon />
        </Avatar>

        <Typography fontWeight={700}>
          Admin
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "#94a3b8" }}
        >
          
        </Typography>

      </Box>

      <List>

        {/* Main Menu */}
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>

            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                bgcolor: isActive(item.path)
                  ? "#6366f1"
                  : "transparent",

                "&:hover": {
                  bgcolor: "#1e293b"
                }
              }}
            >

              <ListItemIcon sx={{ color: "#fff" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} />

            </ListItemButton>

          </ListItem>
        ))}

        {/* Products */}
        <ListItem disablePadding sx={{ mb: 1 }}>

          <ListItemButton
            onClick={() => setProductOpen(!productOpen)}
            sx={{
              borderRadius: 2,
              bgcolor: isProductActive ? "#6366f1" : "transparent",

              "&:hover": {
                bgcolor: "#1e293b"
              }
            }}
          >

            <ListItemIcon sx={{ color: "#fff" }}>
              <ShoppingCartIcon />
            </ListItemIcon>

            <ListItemText primary="Products" />

            {productOpen ? <ExpandLess /> : <ExpandMore />}

          </ListItemButton>

        </ListItem>

        <Collapse in={productOpen} timeout="auto">

          <List component="div" disablePadding>

            {productItems.map((item) => (

              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>

                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    ml: 3,
                    borderRadius: 2,

                    bgcolor: isActive(item.path)
                      ? "#334155"
                      : "transparent",

                    "&:hover": {
                      bgcolor: "#1e293b"
                    }
                  }}
                >

                  <ListItemIcon sx={{ color: "#94a3b8" }}>
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
              borderRadius: 2,

              bgcolor: isCategoryActive
                ? "#6366f1"
                : "transparent",

              "&:hover": {
                bgcolor: "#1e293b"
              }
            }}
          >

            <ListItemIcon sx={{ color: "#fff" }}>
              <CategoryIcon />
            </ListItemIcon>

            <ListItemText primary="Category" />

            {categoryOpen ? <ExpandLess /> : <ExpandMore />}

          </ListItemButton>

        </ListItem>

        <Collapse in={categoryOpen} timeout="auto">

          <List component="div" disablePadding>

            {categoryItems.map((item) => (

              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>

                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    ml: 3,
                    borderRadius: 2,

                    bgcolor: isActive(item.path)
                      ? "#334155"
                      : "transparent",

                    "&:hover": {
                      bgcolor: "#1e293b"
                    }
                  }}
                >

                  <ListItemIcon sx={{ color: "#94a3b8" }}>
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

      <Divider sx={{ bgcolor: "#1e293b", my: 1 }} />

      {/* Logout */}

      <ListItem disablePadding>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#ef4444"
            }
          }}
        >

          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />

        </ListItemButton>

      </ListItem>

    </Drawer>
  )
}