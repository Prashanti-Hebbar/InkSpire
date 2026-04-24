import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";

const drawerWidth = 260;

const adminTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3e2f1c" },
    secondary: { main: "#c8a97e" },
    background: {
      default: "#f5f1e6",
      paper: "rgba(255,255,255,0.6)",
    },
    text: {
      primary: "#2b2115",
      secondary: "#7c6a58",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* 🔥 TOPBAR */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backdropFilter: "blur(12px)",
            background: "rgba(245,241,230,0.8)",
            color: "#2b2115",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton onClick={() => setCollapsed((prev) => !prev)} edge="start" color="inherit">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight={700}>
              Inkspire Admin
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 🔥 SIDEBAR */}
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={toggleDrawer}
          drawerWidth={drawerWidth}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* 🔥 MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            mt: 8,
            p: { xs: 2, md: 4 },
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
