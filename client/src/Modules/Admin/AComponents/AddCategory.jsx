import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) return;

    axios.post("http://localhost:3000/category/createCategory", {
      name: category
    })
      .then(() => {
        setSuccess(true);
        setCategory("");

        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3
      }}
    >

      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >

        {/* 🔥 ICON */}
        <AddCircleOutlineIcon
          sx={{
            fontSize: 50,
            color: "#6366f1",
            mb: 2
          }}
        />

        {/* TITLE */}
        <Typography variant="h5" fontWeight={700} mb={1}>
          Add Category
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Create a new category for your products
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Category added successfully
          </Alert>
        )}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Category Name"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              background:
                "linear-gradient(90deg, #6366f1, #a855f7)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #4f46e5, #9333ea)"
              }
            }}
          >
            Add Category
          </Button>

        </form>

      </Paper>

    </Box>
  );
}