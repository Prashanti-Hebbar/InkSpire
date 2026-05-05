import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Products({
  products: externalProducts = null,
  hideFilters = false,
}) {
  const [products, setProducts] = useState(externalProducts || []);
  const [categories, setCategories] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState("All");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const selectedCategory = query.get("category");

  let filtered = selectedCategory
    ? products.filter((p) => p.categoryId?._id === selectedCategory)
    : products;

  // 🔥 Cursor light
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (externalProducts) {
      setProducts(externalProducts); // 👈 USE HOMEPAGE DATA
    } else {
      fetchProducts(); // 👈 ONLY for products page
    }
  }, [externalProducts]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/product/getProducts");
    setProducts(res.data.products);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/category/getCategories");
    setCategories(res.data.categories);
  };

  let filteredproducts =
    selectedcategory === "All"
      ? [...products]
      : products.filter((p) => {
          const catId = p.categoryId?._id || p.categoryId;
          return catId?.toString() === selectedcategory;
        });

  if (sort === "low") {
    filteredproducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredproducts.sort((a, b) => b.price - a.price);
  }

  // 🔥 shelves
  const chunkSize = 4;
  const shelves = [];
  for (let i = 0; i < filteredproducts.length; i += chunkSize) {
    shelves.push(filteredproducts.slice(i, i + chunkSize));
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        position: "relative",
        background: "#f5f1e6",
        overflow: "hidden",
      }}
    >
      {/* 🔥 CURSOR LIGHT */}
      <Box
        sx={{
          position: "fixed",
          top: mouse.y - 150,
          left: mouse.x - 150,
          width: 300,
          height: 300,
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(255,220,150,0.25), transparent)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* FILTERS */}
      {!hideFilters && (
        <Box display="flex" gap={3} mb={4} flexWrap="wrap" zIndex={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedcategory}
              label="Category"
              onChange={(e) => setSelectedcategory(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sort</InputLabel>
            <Select
              value={sort}
              label="Sort"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="low">Price: Low → High</MenuItem>
              <MenuItem value="high">Price: High → Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {/* 📚 SHELVES */}
      <Box
        display="flex"
        flexDirection="column"
        gap={10}
        position="relative"
        zIndex={2}
      >
        {shelves.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ position: "relative" }}>
            {/* LIGHT ABOVE SHELF */}
            <Box
              sx={{
                position: "absolute",
                top: "-25px",
                left: 0,
                right: 0,
                height: "50px",
                background:
                  "radial-gradient(circle, rgba(255,230,180,0.2), transparent)",
                filter: "blur(25px)",
                zIndex: 1,
              }}
            />

            {/* BOOK ROW */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1,1fr)",
                  sm: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                  lg: "repeat(4,1fr)",
                },
                gap: 4,
                position: "relative",
                zIndex: 2,
              }}
            >
              {row.map((pdata) => (
                <BookCard key={pdata._id} pdata={pdata} navigate={navigate} />
              ))}
            </Box>

            {/* SHELF */}
            <Box
              sx={{
                position: "absolute",
                bottom: -14,
                left: 0,
                right: 0,
                height: "20px",
                borderRadius: "12px",
                background: "linear-gradient(to bottom, #3e2f1c, #2b2115)",
                boxShadow:
                  "0 15px 30px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.2)",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// 🔥 FINAL BOSS CARD
function BookCard({ pdata, navigate }) {
  const ref = useRef(null);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = (y / rect.height - 0.5) * -20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const reset = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      style={{
        height: "100%",
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ y: -15, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* SHADOW */}
      <Box
        sx={{
          position: "absolute",
          bottom: -10,
          left: "10%",
          width: "80%",
          height: "12px",
          background: "rgba(0,0,0,0.3)",
          filter: "blur(10px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 4,
          background: "rgba(255,248,235,0.65)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(200,169,126,0.2)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <CardHeader
          title={
            <Typography
              sx={{
                fontWeight: 600,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "48px",
              }}
            >
              {pdata.name}
            </Typography>
          }
          subheader={`by ${pdata.author} • ₹${pdata.price}`}
        />

        <Box sx={{ overflow: "hidden" }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <CardMedia
              component="img"
              image={`http://localhost:5000/uploads/${pdata.productimage}`}
              sx={{ height: 180, objectFit: "contain" }}
            />
          </motion.div>
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "44px",
            }}
          >
            {pdata.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pb: 2,
          }}
        >
          {/* 🔥 PRIMARY CTA */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate(`/user/bookingform/${pdata._id}`)}
              variant="contained"
              size="small"
              sx={{
                px: 2.5,
                borderRadius: "999px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #c8a97e, #a6824f)",
                color: "#2b2115",
                boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #d4b489, #b89668)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                },
              }}
            >
              Book Now
            </Button>
          </motion.div>

          {/* 👁 SECONDARY ACTION */}
          <motion.div whileHover={{ scale: 1.15 }}>
            <Button
              onClick={() => navigate(`/user/product/${pdata._id}`)}
              sx={{
                minWidth: "auto",
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.05)",
                color: "#3e2f1c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  background: "rgba(200,169,126,0.2)",
                },
              }}
            >
              <VisibilityIcon sx={{ fontSize: 22 }} />
            </Button>
          </motion.div>
        </CardActions>
      </Card>
    </motion.div>
  );
}
