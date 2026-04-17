import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
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

  const handleDelete = async (id) => {
    try {
      await fetch(`/product/deleteProductById/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* 🔥 HEADER */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Products
        </Typography>
        <Typography color="text.secondary">
          Manage your store products
        </Typography>
      </Box>

      {/* 📊 TABLE CARD */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <TableContainer>
          <Table>
            {/* 🔵 HEADER */}
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #6366f1, #a855f7)",
                }}
              >
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>#</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Product Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Price
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Quantity
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Description
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Image
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* ⚪ BODY */}
            <TableBody>
              {products.length > 0 ? (
                products.map((prod, index) => (
                  <TableRow
                    key={prod._id}
                    sx={{
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell sx={{ fontWeight: 500 }}>{prod.name}</TableCell>

                    <TableCell sx={{ color: "#6366f1", fontWeight: 600 }}>
                      ₹{prod.price}
                    </TableCell>

                    <TableCell>{prod.quantity}</TableCell>

                    <TableCell
                      sx={{
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {prod.description}
                    </TableCell>
                    <TableCell>
                      {prod.productimage ? (
                        <img
                          src={`http://localhost:3000/uploads/${prod.productimage}`}
                          alt={prod.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`/admin/product/update/${prod._id}`)
                        }
                        sx={{
                          mr: 1,
                          background:
                            "linear-gradient(90deg, #6366f1, #a855f7)",
                          borderRadius: 2,
                          textTransform: "none",
                        }}
                      >
                        Update
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDelete(prod._id)}
                        sx={{
                          background: "#ef4444",
                          borderRadius: 2,
                          textTransform: "none",
                          "&:hover": { background: "#dc2626" },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary">
                      No products found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
