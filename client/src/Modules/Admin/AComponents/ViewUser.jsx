import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  TablePagination,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleUpdate = (uid) => {
    navigate(`/admin/user/update/${uid}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/getUser")
      .then((res) => {
        const all = res.data.allusers || [];
        setUsers(all);
        setFiltered(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(users);
    } else {
      const t = search.toLowerCase();
      setFiltered(
        users.filter(
          (u) =>
            u.name.toLowerCase().includes(t) ||
            u.email.toLowerCase().includes(t)
        )
      );
    }
    setPage(0);
  }, [search, users]);

  const handleDelete = (uid) => {
    axios
      .delete(`http://localhost:3000/user/deleteUserById/${uid}`)
      .then(() => {
        const updated = users.filter((u) => u._id !== uid);
        setUsers(updated);
        setFiltered(updated);
      })
      .catch(console.error);
  };

  return (
    <Box sx={{ p: 4 }}>

      {/* 🔥 HEADER */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Users
        </Typography>
        <Typography color="text.secondary">
          Manage registered users
        </Typography>
      </Box>

      {/* 🔍 SEARCH */}
      {/* <TextField
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        size="small"
        sx={{
          mb: 3,
          maxWidth: 400,
          background: "#fff",
          borderRadius: 2,
        }}
      /> */}

      {/* 📊 TABLE */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>

                {/* 🔵 HEADER */}
                <TableHead>
                  <TableRow
                    sx={{
                      background:
                        "linear-gradient(90deg, #6366f1, #a855f7)",
                    }}
                  >
                    {["#", "Name", "Email", "Phone", "Address", "Actions"].map((h) => (
                      <TableCell
                        key={h}
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {/* ⚪ BODY */}
                <TableBody>
                  {filtered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow
                        key={user._id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f9fafb",
                          },
                          transition: "0.2s",
                        }}
                      >
                        <TableCell>
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        <TableCell sx={{ fontWeight: 500 }}>
                          {user.name}
                        </TableCell>

                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>

                        <TableCell
                          sx={{
                            maxWidth: 180,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.address}
                        </TableCell>

                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleUpdate(user._id)}
                            sx={{
                              mr: 1,
                              background:
                                "linear-gradient(90deg, #6366f1, #a855f7)",
                              textTransform: "none",
                              borderRadius: 2,
                            }}
                          >
                            Update
                          </Button>

                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleDelete(user._id)}
                            sx={{
                              background: "#ef4444",
                              textTransform: "none",
                              borderRadius: 2,
                              "&:hover": { background: "#dc2626" },
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
            </TableContainer>

            {/* 📄 PAGINATION */}
            <TablePagination
              component="div"
              count={filtered.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}