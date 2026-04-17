import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/product/getProducts");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:3000/category/getCategories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error(err));
  };

  const filteredproducts =
    selectedcategory === "All"
      ? products
      : products.filter((p) => p.categoryId === selectedcategory);

  return (
    <Box>
      {/* 🔽 CATEGORY FILTER */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedcategory}
          label="Category"
          onChange={(e) => setSelectedcategory(e.target.value)}
          sx={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
          }}
        >
          <MenuItem value="All">All</MenuItem>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* 📚 BOOK GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 4,
        }}
      >
        {filteredproducts.map((pdata) => (
          <motion.div
            key={pdata._id}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
                },
              }}
            >
              {/* HEADER */}
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    {pdata.name?.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={pdata.name}
                subheader="Popular Book"
              />

              {/* IMAGE */}
              <Box sx={{ overflow: "hidden" }}>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:3000/uploads/${pdata.productimage}`}
                    alt={pdata.name}
                  />
                </motion.div>
              </Box>

              {/* CONTENT */}
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#444",
                    height: "40px",
                    overflow: "hidden",
                  }}
                >
                  {pdata.description}
                </Typography>
              </CardContent>

              {/* ACTIONS */}
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 2,
                  pb: 2,
                }}
              >
                <Button
                  onClick={() =>
                    navigate(`/user/bookingform/${pdata._id}`)
                  }
                  size="small"
                  variant="contained"
                  sx={{
                    background: "#c8a97e",
                    color: "#2b2115",
                    "&:hover": {
                      background: "#b89668",
                    },
                  }}
                >
                  Book
                </Button>

                <Button
                  onClick={() =>
                    navigate(`/user/product/${pdata._id}`)
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#3e2f1c",
                    color: "#3e2f1c",
                    "&:hover": {
                      background: "#3e2f1c",
                      color: "#fff",
                    },
                  }}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}