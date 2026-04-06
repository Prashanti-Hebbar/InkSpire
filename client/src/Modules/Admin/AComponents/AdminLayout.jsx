import React from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from './Sidebar'

const drawerWidth = 260

const adminTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6366f1' },
    secondary: { main: '#a855f7' },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
})

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const toggleDrawer = () => setMobileOpen((prev) => !prev)

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        {/* 🔥 TOPBAR */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: '#ffffff',
            color: '#111',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <Toolbar sx={{ px: 3 }}>
            <IconButton edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight={700} sx={{ ml: 2 }}>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 📌 SIDEBAR */}
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={toggleDrawer}
          drawerWidth={drawerWidth}
        />

        {/* 📊 MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { md: `${drawerWidth}px` }, // ✅ pushes content beside sidebar
            mt: 8, // ✅ offset for AppBar
            p: 3
          }}
        >
          {/* Centered content container */}
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  )
}