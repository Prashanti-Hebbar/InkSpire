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
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";

export default function Manageuser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userdetails")) || [];
    setUsers(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    localStorage.setItem("userdetails", JSON.stringify(updated));
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
          View and manage all registered readers
        </Typography>
      </Box>

      {/* 🔥 TABLE CONTAINER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Paper
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          <TableContainer>
            <Table>
              {/* 🔥 HEADER */}
              <TableHead>
                <TableRow
                  sx={{
                    background:
                      "linear-gradient(135deg, #3e2f1c, #2b2115)",
                  }}
                >
                  {["#", "Name", "Email", "Phone", "Address", "Action"].map(
                    (head) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: "#fdf6e3",
                          fontWeight: 700,
                        }}
                        align={head === "Action" ? "center" : "left"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              {/* 🔥 BODY */}
              <TableBody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        transition: "0.3s",
                        "&:hover": {
                          background: "rgba(200,169,126,0.15)",
                          transform: "scale(1.01)",
                        },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>

                      {/* NAME */}
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              background: "#c8a97e",
                              color: "#2b2115",
                              fontWeight: 700,
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
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address}</TableCell>

                      {/* ACTION */}
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleDelete(index)}
                          sx={{
                            color: "#b91c1c",
                            transition: "0.3s",
                            "&:hover": {
                              background: "rgba(185,28,28,0.1)",
                              transform: "scale(1.2)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">
                        No readers found 📚
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>
    </Box>
  );
}