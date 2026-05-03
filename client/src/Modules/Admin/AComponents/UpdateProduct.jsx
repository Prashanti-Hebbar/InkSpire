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

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
    productimage: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/getProductById/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setPreview(
          `http://localhost:5000/uploads/${res.data.product.productimage}`
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageChange = (file) => {
    setProduct({ ...product, productimage: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.keys(product).forEach((key) => {
      if (key !== "productimage") {
        form.append(key, product[key]);
      }
    });

    if (product.productimage instanceof File) {
      form.append("productimage", product.productimage);
    }

    await axios.put(
      `http://localhost:5000/product/updateProduct/${id}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("UserToken"),
        },
      }
    );

    setSuccess(true);
    setTimeout(() => navigate("/admin/products"), 1500);
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
        sx={{ fontFamily: "Playfair Display", mb: 4, color: "#3e2f1c" }}
      >
        Edit Book 📖
      </Typography>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Box
          sx={{
            p: 4,
            maxWidth: 600,
            borderRadius: 4,
            background: "rgba(255,248,235,0.7)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Product updated successfully
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Book Name"
              fullWidth
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <TextField
              label="Author"
              fullWidth
              value={product.author}
              onChange={(e) =>
                setProduct({ ...product, author: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            {/* IMAGE */}
            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
              Upload New Image
              <input
                type="file"
                hidden
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </Button>

            {preview && (
              <motion.img
                src={preview}
                alt="preview"
                style={{
                  width: 150,
                  height: 200,
                  objectFit: "contain",
                  borderRadius: 8,
                  display: "block",
                  marginBottom: "16px",
                }}
                whileHover={{ scale: 1.05 }}
              />
            )}

            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
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
                Update Product
              </Button>
            </motion.div>
          </form>
        </Box>
      </motion.div>
    </Box>
  );
}