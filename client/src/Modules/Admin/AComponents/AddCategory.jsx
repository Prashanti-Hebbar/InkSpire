import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) return;

    axios
      .post(
        "http://localhost:5000/category/createCategory",
        { name: category }, // ✅ body
        {
          headers: {
            "auth-token": localStorage.getItem("UserToken"),
          },
        },
      )
      .then(() => {
        setSuccess(true);
        setCategory("");

        setTimeout(() => setSuccess(false), 5000);
        // alert("Category added successfully!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1} color="#3e2f1c">
          Add Category
        </Typography>

        <Typography mb={3} color="#6b5e4b">
          Create a new genre for your bookstore
        </Typography>

        {success && <Alert severity="success">Category added</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              background: "#c8a97e",
              color: "#2b2115",
              borderRadius: 3,
              "&:hover": {
                background: "#b89668",
                transform: "scale(1.02)",
              },
            }}
          >
            Add Category
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
