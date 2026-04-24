import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/user/login", login);

      if (res.data.success) {
        localStorage.setItem("UserToken", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* LEFT - ATMOSPHERE */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: `
            linear-gradient(rgba(40,30,20,0.85), rgba(30,20,10,0.9)),
            url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d')
          `,
          backgroundSize: "cover",
          color: "#fdf6e3",
          p: 6,
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Typography variant="h3" fontWeight={700}>
            Inkspire
          </Typography>
          <Typography mt={2}>
            A place where stories live and breathe.
          </Typography>
        </motion.div>
      </Box>

      {/* RIGHT - FORM */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f1e6",
        }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Box sx={{ width: 360 }}>
            <Typography variant="h4" fontWeight={700} mb={3} color="#3e2f1c">
              Welcome Back
            </Typography>

            <Input label="Email" name="email" onChange={handleChange} />
            <Input
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />

            <Button
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                background: "#3e2f1c",
                color: "#fff",
                borderRadius: 3,
                "&:hover": { background: "#2b2115" },
              }}
            >
              {loading ? "Logging in..." : "Enter Store →"}
            </Button>

            <Typography mt={3}>
              New here?{" "}
              <span
                style={{ color: "#c8a97e", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Create account
              </span>
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

const Input = (props) => (
  <TextField
    fullWidth
    margin="normal"
    variant="standard"
    {...props}
    sx={{
      "& .MuiInput-underline:after": {
        borderBottomColor: "#c8a97e",
      },
    }}
  />
);
