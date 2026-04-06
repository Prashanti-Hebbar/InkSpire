import React, { useEffect, useState } from "react";
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
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("http://localhost:3000/category/getCategories")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/category/deleteCategory/${id}`)
      .then(() => fetchCategories())
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ p: 4 }}>

      {/* 🔥 HEADER */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Categories
        </Typography>
        <Typography color="text.secondary">
          Manage your product categories
        </Typography>
      </Box>

      {/* 📊 TABLE CARD */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}
      >
        <TableContainer>
          <Table>

            {/* 🔵 HEADER */}
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #6366f1, #a855f7)"
                }}
              >
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                  Category Name
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* ⚪ BODY */}
            <TableBody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <TableRow
                    key={cat._id}
                    sx={{
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "#f9fafb"
                      }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {cat.name}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`/admin/category/update/${cat._id}`)
                        }
                        sx={{
                          mr: 1,
                          background:
                            "linear-gradient(90deg, #6366f1, #a855f7)",
                          borderRadius: 2,
                          textTransform: "none"
                        }}
                      >
                        Update
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDelete(cat._id)}
                        sx={{
                          background: "#ef4444",
                          borderRadius: 2,
                          textTransform: "none",
                          "&:hover": { background: "#dc2626" }
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary">
                      No categories found
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