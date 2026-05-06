import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import UserOrders from "./UserOrders";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const InfoCard = ({ label, value }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        background: "#f8f5ef",
        border: "1px solid #e5dccf",
      }}
    >
      <Typography variant="body2" color="gray">
        {label}
      </Typography>
      <Typography fontWeight={600}>{value || "Not provided"}</Typography>
    </Box>
  );
  const location = useLocation();

  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState(location.state?.activeTab || 0);
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("UserToken");

  

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const viewprofile = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/getprofile", {
        headers: { "auth-token": token },
      });

      const data = await res.json();

      if (data && data.udata) {
        setFormdata(data.udata);
      } else {
        console.error("Invalid profile data:", data);
        // fallback instead of crashing
        setFormdata({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleUpdate = async () => {
    const response = await axios.put(
      "http://localhost:5000/user/updateprofile",
      formdata,
      { headers: { "auth-token": token } },
    );

    // 🔥 UPDATE LOCAL STORAGE
    localStorage.setItem("username", response.data.user.name);

    // 🔥 TRIGGER NAVBAR UPDATE
    window.dispatchEvent(new Event("userUpdated"));

    setEdit(false);
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/order/my-orders", {
        headers: {
          "auth-token": token,
        },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/wishlist/get", {
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      });

      setWishlist(res.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewprofile();
    fetchOrders();
    fetchWishlist();
  }, []);

  const handleRemoveWishlist = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/wishlist/toggle",
        { productId },
        {
          headers: {
            "auth-token": localStorage.getItem("UserToken"),
          },
        },
      );

      fetchWishlist();

      alert("Removed from wishlist ❌");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
        p: 4,
      }}
    >
      {/* HEADER */}
      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <Avatar sx={{ width: 80, height: 80, background: "#3e2f1c" }}>
          {formdata.name?.charAt(0)}
        </Avatar>

        <Box>
          <Typography variant="h5" fontWeight={700}>
            {formdata.name}
          </Typography>
          <Typography color="gray">{formdata.email}</Typography>
        </Box>
      </Box>

      {/* TABS */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Profile" />
        <Tab label="Orders" />
        <Tab label="Wishlist" />
        <Tab label="Settings" />
      </Tabs>

      {/* PROFILE */}
      {tab === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              maxWidth: 500,
            }}
          >
            {!edit ? (
              /* 🔥 VIEW MODE */
              <>
                {/* 🔥 PROFILE CARD */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #3e2f1c, #2b2115)",
                    color: "#fdf6e3",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    mb: 3,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      background: "#c8a97e",
                      color: "#2b2115",
                      fontSize: 28,
                    }}
                  >
                    {formdata.name?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {formdata.name}
                    </Typography>
                    <Typography sx={{ opacity: 0.8 }}>
                      {formdata.email}
                    </Typography>
                  </Box>
                </Box>

                {/* 🔥 INFO GRID */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {/* PHONE */}
                  <InfoCard label="Phone" value={formdata.phone} />

                  {/* ADDRESS */}
                  <InfoCard label="Address" value={formdata.address} />
                </Box>

                {/* 🔥 ACTION */}
                <Box mt={3} textAlign="right">
                  <Button
                    variant="contained"
                    onClick={() => setEdit(true)}
                    sx={{
                      background: "#c8a97e",
                      color: "#2b2115",
                      borderRadius: 3,
                      "&:hover": { background: "#b89668" },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </>
            ) : (
              /* 🔥 FULL EDIT FORM (ALL FIELDS) */
              <>
                <TextField
                  label="Full Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  value={formdata.name}
                  onChange={handleChange}
                />

                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={formdata.email}
                  onChange={handleChange}
                />

                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  margin="normal"
                  value={formdata.phone}
                  onChange={handleChange}
                />

                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  margin="normal"
                  value={formdata.address}
                  onChange={handleChange}
                />

                <Box mt={2} display="flex" gap={2}>
                  <Button variant="contained" onClick={handleUpdate}>
                    Save
                  </Button>

                  <Button variant="outlined" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </motion.div>
      )}

      {/* ORDERS */}
      {tab === 1 && <UserOrders externalOrders={orders} />}

      {/* WISHLIST */}
      {tab === 2 && (
  <Box>
    {wishlist.length === 0 ? (
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Box
          sx={{
            mt: 6,

            p: 6,

            borderRadius: 5,

            textAlign: "center",

            background:
              "rgba(255,248,235,0.55)",

            backdropFilter:
              "blur(18px)",

            border:
              "1px solid rgba(255,255,255,0.25)",

            boxShadow:
              "0 25px 60px rgba(0,0,0,0.12)",
          }}
        >
          <Typography
            sx={{
              fontSize: 70,
            }}
          >
            📚
          </Typography>

          <Typography
            sx={{
              mt: 2,

              fontSize: 32,

              fontWeight: 700,

              color: "#3e2f1c",

              fontFamily:
                "'Playfair Display', serif",
            }}
          >
            Your Reading Wishlist
            is Empty
          </Typography>

          <Typography
            sx={{
              mt: 2,

              color: "#7c6a58",

              maxWidth: 500,

              mx: "auto",

              lineHeight: 1.8,
            }}
          >
            Save books you love and
            build your personal
            reading sanctuary.
          </Typography>

          <Button
            onClick={() =>
              navigate("/products")
            }
            sx={{
              mt: 4,

              px: 4,
              py: 1.5,

              borderRadius: 999,

              background:
                "#c8a97e",

              color: "#2b2115",

              fontWeight: 700,

              "&:hover": {
                background:
                  "#b89668",

                transform:
                  "translateY(-2px)",
              },
            }}
          >
            Explore Books
          </Button>
        </Box>
      </motion.div>
    ) : (
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          },

          gap: 4,
        }}
      >
        {wishlist.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
            }}
          >
            <Box
              sx={{
                position: "relative",

                overflow: "hidden",

                borderRadius: 5,

                background:
                  "rgba(255,248,235,0.58)",

                backdropFilter:
                  "blur(18px)",

                border:
                  "1px solid rgba(255,255,255,0.22)",

                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.16)",

                transition: "0.4s",

                "&:hover": {
                  boxShadow:
                    "0 35px 80px rgba(0,0,0,0.22)",
                },
              }}
            >
              {/* LIGHT EFFECT */}
              <Box
                sx={{
                  position: "absolute",

                  top: -80,
                  right: -80,

                  width: 180,
                  height: 180,

                  background:
                    "radial-gradient(circle, rgba(200,169,126,0.25), transparent)",

                  filter: "blur(60px)",
                }}
              />

              {/* REMOVE */}
              <IconButton
                onClick={() =>
                  handleRemoveWishlist(
                    item.productId._id
                  )
                }
                sx={{
                  position: "absolute",

                  top: 12,
                  right: 12,

                  zIndex: 2,

                  background:
                    "rgba(255,255,255,0.7)",

                  backdropFilter:
                    "blur(10px)",

                  "&:hover": {
                    background:
                      "rgba(255,255,255,0.9)",

                    transform:
                      "scale(1.08)",
                  },
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: "#dc2626",
                  }}
                />
              </IconButton>

              {/* IMAGE */}
              <Box
                sx={{
                  p: 4,

                  display: "flex",

                  justifyContent:
                    "center",

                  alignItems: "center",
                }}
              >
                <motion.img
                  src={`http://localhost:5000/uploads/${item.productId.productimage}`}
                  alt={
                    item.productId.name
                  }
                  style={{
                    width: 180,
                    height: 250,
                    objectFit:
                      "contain",

                    filter:
                      "drop-shadow(0 20px 30px rgba(0,0,0,0.18))",
                  }}
                  whileHover={{
                    rotateY: 12,
                    scale: 1.05,
                  }}
                />
              </Box>

              {/* INFO */}
              <Box
                sx={{
                  p: 3,

                  pt: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 22,

                    fontWeight: 700,

                    color: "#2b2115",

                    fontFamily:
                      "'Playfair Display', serif",

                    lineHeight: 1.3,
                  }}
                >
                  {
                    item.productId.name
                  }
                </Typography>

                <Typography
                  sx={{
                    mt: 1,

                    color: "#7c6a58",

                    fontSize: 14,
                  }}
                >
                  by{" "}
                  {
                    item.productId
                      ?.author
                  }
                </Typography>

                <Typography
                  sx={{
                    mt: 2,

                    fontSize: 28,

                    fontWeight: 700,

                    color: "#c8a97e",
                  }}
                >
                  ₹
                  {
                    item.productId
                      .price
                  }
                </Typography>

                {/* ACTIONS */}
                <Box
                  sx={{
                    display: "flex",

                    gap: 2,

                    mt: 3,
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() =>
                      navigate(
                        `/user/product/${item.productId._id}`
                      )
                    }
                    sx={{
                      py: 1.2,

                      borderRadius: 999,

                      background:
                        "#c8a97e",

                      color: "#2b2115",

                      fontWeight: 700,

                      "&:hover": {
                        background:
                          "#b89668",
                      },
                    }}
                  >
                    View Book
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      navigate(
                        `/user/bookingform/${item.productId._id}`
                      )
                    }
                    sx={{
                      py: 1.2,

                      borderRadius: 999,

                      borderColor:
                        "#c8a97e",

                      color: "#3e2f1c",

                      "&:hover": {
                        borderColor:
                          "#b89668",

                        background:
                          "rgba(200,169,126,0.08)",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    )}
  </Box>
)}

      {tab === 3 && (
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            background: "#fff",
            maxWidth: 500,
          }}
        >
          <Typography fontWeight={600} mb={2}>
            Account Settings
          </Typography>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
}
