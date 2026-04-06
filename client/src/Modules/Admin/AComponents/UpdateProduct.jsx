import React, { useState, useEffect } from "react";
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

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // 🔹 GET product by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/getProductById/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", product.name);
    form.append("price", product.price);
    form.append("quantity", product.quantity);
    form.append("description", product.description);

    // only append if new image selected
    if (product.productimage instanceof File) {
      form.append("productimage", product.productimage);
    }

    try {
      await axios.put(
        `http://localhost:3000/product/updateProduct/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(true);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 5 }} />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Update Product
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Product updated successfully
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            fullWidth
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Price"
            fullWidth
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Quantity"
            fullWidth
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Product Image"
            name="productimage"
            type="file"
            onChange={(e) =>
              setProduct({ ...product, productimage: e.target.files[0] })
            }
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained">
            Update Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
