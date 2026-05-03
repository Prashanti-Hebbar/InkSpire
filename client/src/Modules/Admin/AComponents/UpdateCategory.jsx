import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/category/getCategoryById/${id}`)
      .then((res) => setCategory(res.data.category.name))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/category/UpdateCategory/${id}`,
      { name: category },
      {
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      }
    );

    setSuccess(true);
    setTimeout(() => navigate("/admin/category/view"), 1500);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontFamily: "Playfair Display", color: "#3e2f1c", mb: 4 }}
      >
        Edit Category 📂
      </Typography>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Box
          sx={{
            p: 4,
            maxWidth: 500,
            borderRadius: 4,
            background: "rgba(255,248,235,0.7)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
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

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                fullWidth
                sx={{
                  background: "#c8a97e",
                  color: "#2b2115",
                  fontWeight: 600,
                  py: 1.5,
                  "&:hover": {
                    background: "#b89668",
                    boxShadow: "0 0 15px rgba(200,169,126,0.6)",
                  },
                }}
              >
                Update Category
              </Button>
            </motion.div>
          </form>
        </Box>
      </motion.div>
    </Box>
  );
}