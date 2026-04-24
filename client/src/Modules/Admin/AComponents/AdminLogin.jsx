import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/user/login",
      login
    );

    if (res.data.success) {
      if (res.data.user.role !== "admin") {
        setError("Access denied: Not an admin");
        return;
      }

      localStorage.setItem("UserToken", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/admin/dashboard");
    }
  } catch (err) {
    setError("Invalid credentials");
  }
};

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "400px",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3}>
          Admin Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
