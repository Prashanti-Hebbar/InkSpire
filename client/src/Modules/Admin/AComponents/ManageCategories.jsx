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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 GET all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/category/getCategories");
      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Open dialog
  const handleOpen = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
    } else {
      setEditingCategory(null);
      setName("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setName("");
  };

  // 🔹 Add / Update
  const handleSubmit = async () => {
    try {
      const url = editingCategory
        ? `/category/UpdateCategory/${editingCategory._id}`
        : "/category/createCategory";

      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("UserToken"),
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        fetchCategories();
        handleClose();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/category/deleteCategory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("UserToken"),
        },
      });

      const data = await res.json();

      if (res.ok) {
        fetchCategories();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Manage Categories
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Add, edit, and delete categories
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>

      <Paper sx={{ borderRadius: 3 }}>
        <TableContainer>
          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#667eea" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <TableRow key={cat._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{cat.name}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(cat)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(cat._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* 🔹 Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {editingCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
