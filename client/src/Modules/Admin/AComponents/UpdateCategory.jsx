import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // 🔹 GET category by ID
  useEffect(() => {
    axios.get(`http://localhost:5000/category/getCategoryById/${id}`)
      .then(res => {
        setCategory(res.data.category.name);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/category/UpdateCategory/${id}`, {
      name: category
    },
  {
    headers: {
      "auth-token": localStorage.getItem("UserToken"),
    },
  })
      .then(() => {
        setSuccess(true);

        setTimeout(() => {
          navigate("/admin/category/view");
        }, 1500);
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 5 }} />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Update Category
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Category updated successfully
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Category Name"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained">
            Update Category
          </Button>
        </form>
      </Paper>
    </Box>
  );
}