import React, { useEffect, useState } from "react";
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

export default function MyProfile() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("UserToken");
  console.log("usertoken details", token);
  const viewprofile = async (req, res) => {
    try {
      const response = await fetch("http://localhost:3000/user/getprofile", {
        method: "GET",
        headers: { "auth-token": token },
      });
      // axios.get("http://localhost:3000/user/getprofile", {headers:{"auth-token":token}})
      const details = await response.json();
      console.log(details.udata);
      setFormdata(details.udata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewprofile();
  }, []);

  const handleUpdate = async() => {
    try {
      const response = await axios.put(
        "http://localhost:3000/user/updateprofile",
        formdata,
        {
          headers: {
            "auth-token": token
          },
        },
      );
      
      alert("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
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
          Update Profile
        </Typography>

        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formdata.name}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formdata.email}
        />

        <TextField
          label="Phone Number"
          name="phone"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formdata.phone}
        />

        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formdata.address}
        />


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
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Paper>
    </Box>
  );
}
