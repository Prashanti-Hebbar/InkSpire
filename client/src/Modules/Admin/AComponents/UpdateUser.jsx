import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // 🔹 Fetch user data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/getUserById/${id}`)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Update user
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/user/updateuser/${id}`, user)
      .then((res) => {
        setSuccess(true);

        setTimeout(() => {
          navigate("/admin/users");
        }, 1500);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Update User
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            User updated successfully
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained">
            Update User
          </Button>
        </form>
      </Paper>
    </Box>
  );
}