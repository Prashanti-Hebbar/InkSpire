import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleregister = () => {
    axios.post("http://localhost:5000/user/registerUser", formdata)
      .then(() => navigate("/login"))
      .catch(() => alert("Registration failed"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
      }}
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <Box
          sx={{
            width: 420,
            p: 4,
            borderRadius: 5,
            background: "#fffaf0",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={3} color="#3e2f1c">
            Join Inkspire
          </Typography>

          <Input label="Full Name" name="name" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Password" name="password" type="password" onChange={handleChange} />
          <Input label="Phone" name="phone" onChange={handleChange} />
          <Input label="Address" name="address" onChange={handleChange} />

          <Button
            fullWidth
            onClick={handleregister}
            sx={{
              mt: 2,
              py: 1.5,
              background: "#c8a97e",
              color: "#2b2115",
              borderRadius: 3,
              "&:hover": { background: "#b89668" },
            }}
          >
            Create Account
          </Button>

          <Typography mt={3}>
            Already a member?{" "}
            <span
              style={{ color: "#3e2f1c", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Box>
      </motion.div>
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