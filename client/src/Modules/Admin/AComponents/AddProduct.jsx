import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    categoryId: "",
    productimage: "",
  });

  const [category, setCategory] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/category/getCategories")
      .then((res) => {
        console.log("API:", res.data);

        setCategory(res.data.categories); 
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategory([]);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "productimage") {
      setFormData({
        ...formData,
        productimage: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("description", formData.description);
    form.append("categoryId", formData.categoryId);
    form.append("productimage", formData.productimage);

    try {
      const response = await fetch(
        "http://localhost:3000/product/createProduct",
        {
          method: "POST",
          body: form
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          price: "",
          quantity: "",
          description: "",
          categoryId: "",
        });

        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || "Failed to add product");
      }
    } catch (err) {
      setError("Error adding product");
      console.error(err);
    }
  };
  console.log("CATEGORY STATE:", category);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f9fafb",
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
          maxWidth: 520,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        {/* ICON */}
        <AddCircleOutlineIcon
          sx={{
            fontSize: 50,
            color: "#6366f1",
            mb: 2,
          }}
        />

        {/* TITLE */}
        <Typography variant="h5" fontWeight={700} mb={1}>
          Add Product
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Create a new product for your store
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Product added successfully
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Product Image"
            name="productimage"
            type="file"
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{shrink:true}}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Category</InputLabel>

            <Select
              name="categoryId"
              value={formData.categoryId}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">Select Category</MenuItem>

              {Array.isArray(category) &&
                category.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
              "&:hover": {
                background: "linear-gradient(90deg, #4f46e5, #9333ea)",
              },
            }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
