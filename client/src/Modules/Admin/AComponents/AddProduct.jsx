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
    author: "",
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
      .get("http://localhost:5000/category/getCategories")
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
    form.append("author", formData.author);
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("description", formData.description);
    form.append("categoryId", formData.categoryId);
    form.append("productimage", formData.productimage);

    try {
      const response = await fetch(
        "http://localhost:5000/product/createProduct",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("UserToken"),
          },
          body: form,
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          author: "",
          price: "",
          quantity: "",
          description: "",
          categoryId: "",
          productimage: "",
        });

        setTimeout(() => setSuccess(false), 5000);
        alert("Product added successfully!")
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
          maxWidth: 520,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={1}
          sx={{ color: "#3e2f1c" }}
        >
          Add Book
        </Typography>

        <Typography sx={{ mb: 3, color: "#6b5e4b" }}>
          Add a new story to your collection
        </Typography>

        {success && <Alert severity="success">Product added</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Book Title"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
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
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            type="file"
            name="productimage"
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              {category.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 3,
              background: "#c8a97e",
              color: "#2b2115",
              fontWeight: 600,
              "&:hover": {
                background: "#b89668",
                transform: "scale(1.02)",
              },
            }}
          >
            Add Book
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
