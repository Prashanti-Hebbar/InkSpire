import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import { CartContext } from "../UComponents/CartContext";

export default function ProductDetails() {
  const { fetchCartCount } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const navigate = useNavigate();

  const handleWishlist = async () => {
    try {
      console.log("CLICKED");

      const token = localStorage.getItem("UserToken");
      const pid = product?._id || product?.id;

      console.log("TOKEN:", token);
      console.log("PRODUCT ID:", pid);

      if (!pid) {
        console.log("NO PRODUCT ID");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/wishlist/toggle",
        { productId: pid },
        {
          headers: {
            "auth-token": token,
          },
        },
      );

      console.log("✅ RESPONSE:", res.data);

      if (res.data.message === "Added to wishlist") {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchWishlist();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/product/getProductById/${id}`,
      );
      setProduct(res.data.product);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/wishlist/get", {
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      });

      const exists = res.data.wishlist.find(
        (item) => item.productId?._id === id,
      );

      setLiked(!!exists);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/review/${id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!product) return;

    setLoadingRelated(true);
    axios
      .get(
        `http://localhost:5000/product/related/${product.categoryId?._id}/${product._id}`,
      )
      .then((res) => setRelated(res.data.products))
      .catch((err) => console.log(err))
      .finally(() => setLoadingRelated(false));
  }, [product]);

  const submitReview = async () => {
    const token = localStorage.getItem("UserToken");

    if (!token) {
      alert("Please login to add review");
      return;
    }
    if (!rating || !newReview.trim()) {
      alert("Rating and review required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/review/add",
        {
          productId: id,
          rating,
          comment: newReview,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("UserToken"),
          },
        },
      );

      setNewReview("");
      setRating(0);
      fetchReviews(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ opacity: 0.6 }}>
          Loading book experience...
        </Typography>
      </Box>
    );
  }

  const addToCart = async () => {
  const token = localStorage.getItem("UserToken");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/cart/add",
      { productId: product._id },
      {
        headers: {
          "auth-token": token,
        },
      }
    );

    fetchCartCount(); // 🔥 THIS LINE UPDATES BADGE

    alert("Added to cart");
    navigate("/user/cart")
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb, #d6c3a3)",
        p: { xs: 2, md: 6 },
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* 🔙 BACK */}
      <Button
        onClick={() => window.history.back()}
        sx={{
          mb: 3,
          textTransform: "none",
          color: "#3e2f1c",
        }}
      >
        ← Back
      </Button>

      {/* MAIN */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            borderRadius: 5,
            p: { xs: 3, md: 5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* 📚 IMAGE (BOOK FOCUS) */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotateY: 8,
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Box
              sx={{
                borderRadius: 4,
                p: 2,
                background: "linear-gradient(135deg, #3e2f1c, #2b2115)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              <Box
                component="img"
                src={`http://localhost:5000/uploads/${product.productimage}`}
                alt={product.name}
                sx={{
                  width: "100%",
                  maxHeight: 420,
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
            </Box>
          </motion.div>

          {/* 📄 DETAILS */}
          <Box display="flex" flexDirection="column">
            {/* TITLE */}
            <Typography variant="h3" fontWeight={700} sx={{ color: "#3e2f1c" }}>
              {product.name}
            </Typography>

            {/* CATEGORY */}
            <Typography sx={{ color: "#7c6a58", mt: 1 }}>
              Category: {product.categoryId?.name}
            </Typography>

            {/* PRICE */}
            <Typography
              sx={{
                mt: 3,
                fontSize: 28,
                fontWeight: 700,
                color: "#2b2115",
              }}
            >
              ₹{product.price}
            </Typography>

            {/* RATING  */}
            <Box mt={2} display="flex" alignItems="center" gap={1}>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  whileTap={{ scale: 1.3 }}
                  onClick={() => setRating(star)}
                  style={{ cursor: "pointer" }}
                >
                  <StarIcon
                    sx={{
                      color: star <= rating ? "#c8a97e" : "#ccc",
                      transition: "0.3s",
                    }}
                  />
                </motion.div>
              ))}
              <Typography sx={{ mt: 2, color: "#7c6a58" }}>
                ⭐ {product.averageRating?.toFixed(1) || 0} (
                {product.totalReviews || 0} reviews)
              </Typography>
            </Box>

            {/* DESCRIPTION */}
            <Box mt={3}>
              <Typography fontWeight={600} mb={1}>
                About this Book
              </Typography>
              <Typography color="#5a4a3b" lineHeight={1.7}>
                {product.description}
              </Typography>
            </Box>

            {/* REVIEWS */}
            <Box mt={5}>
              <Typography fontWeight={700}>Write a Review</Typography>

              {/* ⭐ Rating */}
              <Box display="flex" gap={1} mt={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: "pointer",
                      color: star <= rating ? "#c8a97e" : "#ccc",
                      fontSize: "22px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </Box>

              {/* TEXT */}
              <TextField
                fullWidth
                multiline
                rows={3}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                sx={{ mt: 2 }}
              />

              <Button onClick={submitReview} sx={{ mt: 2 }}>
                Submit Review
              </Button>
            </Box>

            <Box mt={4}>
              <Typography fontWeight={700}>Reader Reviews</Typography>

              {reviews.map((r) => (
                <Box
                  key={r._id}
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Typography fontWeight={600}>{r.userId?.name}</Typography>

                  <Typography>⭐ {r.rating}</Typography>

                  <Typography>{r.comment}</Typography>
                </Box>
              ))}
            </Box>

            {/* ❤️ WISHLIST */}
            <Box mt={3}>
              <motion.div
                animate={{ scale: liked ? 1.2 : 1 }}
                whileTap={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconButton
                  onClick={handleWishlist}
                  sx={{
                    color: liked ? "#e63946" : "#3e2f1c",
                    transition: "all 0.3s ease",
                    transform: liked ? "scale(1.2)" : "scale(1)",
                    boxShadow: liked ? "0 0 15px rgba(230,57,70,0.5)" : "none",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </motion.div>
            </Box>

            {/* ACTIONS */}
            <Box
              sx={{
                mt: "auto",
                display: "flex",
                gap: 2,
                pt: 4,
              }}
            >
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={addToCart}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#c8a97e",
                    color: "#2b2115",
                    borderRadius: 3,
                    fontWeight: 600,
                    "&:hover": {
                      background: "#b89668",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate(`/user/bookingform/${product._id}`)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    borderColor: "#3e2f1c",
                    color: "#3e2f1c",
                    "&:hover": {
                      background: "#3e2f1c",
                      color: "#fff",
                    },
                  }}
                >
                  Buy Now
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* RELATED PRODUCTS */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight={700}>
          You may also like
        </Typography>

        {loadingRelated ? (
          <Typography mt={2} sx={{ opacity: 0.6 }}>
            Finding similar books...
          </Typography>
        ) : related.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(150px,1fr))"
            gap={3}
            mt={2}
          >
            {related.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/user/product/${item._id}`)}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(10px)",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.productimage}`}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "contain",
                    }}
                  />

                  <Typography mt={1}>{item.name}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        ) : (
          // 🔥 EMPTY STATE UI
          <Box
            mt={3}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontSize: 20,
                color: "#3e2f1c",
              }}
            >
              No related books found
            </Typography>

            <Typography sx={{ mt: 1, color: "#7c6a58" }}>
              Explore more from our collection
            </Typography>

            <Button
              onClick={() => navigate("/user/products")}
              sx={{
                mt: 2,
                borderRadius: "30px",
                border: "1px solid #c8a97e",
                color: "#c8a97e",
                px: 3,
                "&:hover": {
                  background: "#c8a97e",
                  color: "#fff",
                },
              }}
            >
              Browse Books
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
