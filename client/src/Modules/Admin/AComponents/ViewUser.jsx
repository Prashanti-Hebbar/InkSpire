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
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/user/getUser").then((res) => {
      const data = res.data.allusers || [];
      setUsers(data);
      setFiltered(data);
    });
  }, []);

  // 🔥 SORT
  useEffect(() => {
    const sorted = [...users].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
    setFiltered(sorted);
  }, [sortBy, users]);

  // 🔥 SELECT
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((u) => u._id));
    }
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    setSelected([id]);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    Promise.all(
      selected.map((id) =>
        axios.delete(`http://localhost:5000/user/deleteUserById/${id}`)
      )
    ).then(() => {
      const updated = users.filter((u) => !selected.includes(u._id));
      setUsers(updated);
      setFiltered(updated);
      setSelected([]);
      setConfirmOpen(false);
    });
  };

  // 🔥 ROLE UI
  const handleRoleChange = (id, role) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* 🔥 HEADER */}
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 4,
          background: "linear-gradient(135deg, #3e2f1c, #2b2115)",
          color: "#fdf6e3",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Manage Users
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Control your bookstore readers and accounts
        </Typography>
      </Box>

      {/* 🔥 ACTION BAR */}
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Button
          disabled={!selected.length}
          onClick={() => setConfirmOpen(true)}
          sx={{
            background: "#b91c1c",
            color: "#fff",
            borderRadius: 2,
            "&:hover": { background: "#991b1b" },
          }}
        >
          Delete Selected ({selected.length})
        </Button>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
          sx={{
            background: "rgba(255,255,255,0.6)",
            borderRadius: 2,
          }}
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="email">Sort by Email</MenuItem>
        </Select>
      </Box> */}

      {/* 🔥 TABLE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Paper
          sx={{
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(135deg, #3e2f1c, #2b2115)",
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.length === filtered.length}
                    onChange={handleSelectAll}
                    sx={{ color: "#fff" }}
                  />
                </TableCell>

                {["Name", "Email", "Role", "Actions"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{ color: "#fdf6e3", fontWeight: 700 }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      background: "rgba(200,169,126,0.15)",
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(user._id)}
                      onChange={() => handleSelect(user._id)}
                    />
                  </TableCell>

                  {/* NAME */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          background: "#c8a97e",
                          color: "#2b2115",
                        }}
                      >
                        {user.name?.charAt(0)}
                      </Avatar>
                      <Typography fontWeight={600}>
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  {/* ROLE */}
                  <TableCell>
                    <Select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      size="small"
                      sx={{
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </TableCell>

                  {/* ACTION */}
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        color: "#b91c1c",
                        "&:hover": {
                          background: "rgba(185,28,28,0.1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </motion.div>

      {/* 🔥 CONFIRM MODAL */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to remove {selected.length} user(s)?
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