import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    console.log("Form data:", formdata);

    axios
      .post("http://localhost:3000/user/registerUser", formdata)
      .then((res) => {
        if (res.data.message === "email already exists") {
          alert("Email already exists");
          return;
        }

        alert("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg,#1e3c72,#2a5298)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "420px",
          padding: 5,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={3}>
          Registration
        </Typography>

        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

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

        <TextField
          label="Phone Number"
          name="phone"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        {/* <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography variant="body2">
              I agree to the{" "}
              <span style={{ color: "#1976d2", fontWeight: 500 }}>
                terms and conditions
              </span>
            </Typography>
          }
        /> */}

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.3,
            borderRadius: 2,
            fontSize: "16px",
            background: "#1c1c1c",
            "&:hover": { background: "#000" },
          }}
          onClick={handleregister}
        >
          Register
        </Button>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <span
            style={{
              color: "#1976d2",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}
