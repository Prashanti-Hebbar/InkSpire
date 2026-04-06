import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/getProductById/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{ background: "#f8fafc", minHeight: "100vh", p: { xs: 2, md: 6 } }}
    >
      {/* 🔙 BACK BUTTON */}
      <Button
        onClick={() => window.history.back()}
        sx={{ mb: 3, textTransform: "none" }}
      >
        ← Back{" "}
      </Button>
      {/* MAIN CONTAINER */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 5,
          border: "1px solid #e5e7eb",
        }}
      >
        {/* 🖼 IMAGE SECTION */}

        <Box
          sx={{
            background: "#f1f5f9",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            component="img"
            src={`http://localhost:3000/uploads/${product.productimage}`}
            alt={product.name}
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        </Box>
        {/* 📄 DETAILS SECTION */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* TITLE */}
          <Typography variant="h4" fontWeight={700} color="#0f172a">
            {product.name}{" "}
          </Typography>
          {/* CATEGORY / META */}
          <Typography sx={{ color: "#64748b", fontSize: 14, mt: 1 }}>
            Product Category: {product.categoryId?.name}
          </Typography>
          {/* PRICE */}
          <Typography
            sx={{ mt: 3, fontSize: 26, fontWeight: 700, color: "#334155" }}
          >
            ₹{product.price}
          </Typography>
          {/* DESCRIPTION */}
          <Box mt={3}>
            {" "}
            <Typography fontWeight={600} mb={1}>
              Description
            </Typography>
            <Typography color="#475569" lineHeight={1.6}>
              {product.description}
            </Typography>
          </Box>
          {/* ACTIONS */}
          <Box sx={{ mt: "auto", display: "flex", gap: 2, pt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "#4f46e5",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { background: "#4338ca" },
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
