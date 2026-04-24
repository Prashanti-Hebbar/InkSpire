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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/product/getProducts");
    const data = await res.json();
    setProducts(data.products || []);
  };

  const sorted = [...products].sort((a, b) =>
    a[sortBy].toString().localeCompare(b[sortBy].toString())
  );

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p._id));
    }
  };

  const handleDelete = (id) => {
    setSelected([id]);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await Promise.all(
      selected.map((id) =>
        fetch(`/product/deleteProductById/${id}`, { method: "DELETE" })
      )
    );
    setConfirmOpen(false);
    setSelected([]);
    fetchProducts();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight={700} mb={3}>
        Books Collection
      </Typography>

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
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="price">Sort by Price</MenuItem>
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
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Price</TableCell>
              <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.map((p) => (
              <TableRow key={p._id}>
              

                <TableCell>{p.name}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/admin/product/update/${p._id}`)
                    }
                    sx={{ mr: 1, background: "#c8a97e", color: "#2b2115" }}
                  >
                    Update
                  </Button>

                  <IconButton
                    onClick={() => handleDelete(p._id)}
                    sx={{ color: "#b91c1c" }}
                  >
                    <DeleteIcon />
                  </IconButton>
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
          Delete {selected.length} book(s)?
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