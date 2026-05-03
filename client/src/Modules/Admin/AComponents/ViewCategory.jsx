import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/category/getCategories")
      .then((res) => setCategories(res.data.categories))
      .catch(console.error);
  };

  // 🔥 SORT
  const sorted = [...categories].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  // 🔥 SELECT
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === categories.length) {
      setSelected([]);
    } else {
      setSelected(categories.map((c) => c._id));
    }
  };

  const handleDelete = (id) => {
    setSelected([id]);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    Promise.all(
      selected.map((id) =>
        axios.delete(`http://localhost:5000/category/deleteCategory/${id}`,{
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      })
      )
    ).then(() => {
      fetchCategories();
      setSelected([]);
      setConfirmOpen(false);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
      }}
    >
      {/* 🔥 HEADER */}
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #3e2f1c, #2b2115)",
          color: "#fdf6e3",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Categories
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Organize your bookstore genres
        </Typography>
      </Box>

      {/* ACTION BAR */}
      {/* <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          disabled={!selected.length}
          onClick={() => setConfirmOpen(true)}
          sx={{ background: "#b91c1c", color: "#fff" }}
        >
          Delete ({selected.length})
        </Button>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
          sx={{ background: "rgba(255,255,255,0.6)", borderRadius: 2 }}
        >
          <MenuItem value="name">Sort by Name</MenuItem>
        </Select>
      </Box> */}

      {/* TABLE */}
      <Paper
        sx={{
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#3e2f1c" }}>
              
              <TableCell sx={{ color: "#fff" }}>Category</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.map((cat) => (
              <TableRow
                key={cat._id}
                sx={{
                  "&:hover": {
                    background: "rgba(200,169,126,0.15)",
                  },
                }}
              >
                

                <TableCell>{cat.name}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/admin/category/update/${cat._id}`)
                    }
                    sx={{
                      mr: 1,
                      background: "#c8a97e",
                      color: "#2b2115",
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    size="small"
                    onClick={() => handleDelete(cat._id)}
                    sx={{ background: "#b91c1c", color: "#fff" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* CONFIRM MODAL */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Delete {selected.length} category(s)?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}