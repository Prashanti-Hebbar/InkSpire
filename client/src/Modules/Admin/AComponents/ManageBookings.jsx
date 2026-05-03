import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchBookings = async () => {
    const token = localStorage.getItem("UserToken");

    const res = await axios.get(
      "http://localhost:5000/booking/allbookings",
      {
        headers: { "auth-token": token },
      }
    );

    setBookings(res.data.bookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const confirmUpdate = async () => {
    const token = localStorage.getItem("UserToken");

    await axios.put(
      `http://localhost:5000/booking/updatebooking/${selectedBooking}`,
      { status: newStatus },
      { headers: { "auth-token": token } }
    );

    setOpenDialog(false);
    fetchBookings();
  };

  const cancelUpdate = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
    setNewStatus("");
  };

  // 🔥 STATUS COLORS
  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#d97706";
      case "Approved":
        return "#2563eb";
      case "Completed":
        return "#16a34a";
      case "Rejected":
        return "#dc2626";
      default:
        return "#6b7280";
    }
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
          Manage Orders
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Track and control book deliveries
        </Typography>
      </Box>

      {/* 🔥 TABLE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                <TableCell sx={{ color: "#fff" }}>User</TableCell>
                <TableCell sx={{ color: "#fff" }}>Book</TableCell>
                <TableCell sx={{ color: "#fff" }}>Qty</TableCell>
                <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Update</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map((b) => (
                <TableRow
                  key={b._id}
                  sx={{
                    "&:hover": {
                      background: "rgba(200,169,126,0.15)",
                    },
                  }}
                >
                  <TableCell>{b.fullname}</TableCell>
                  <TableCell>{b.productId?.name}</TableCell>
                  <TableCell>{b.quantity}</TableCell>
                  <TableCell>₹{b.totalamount}</TableCell>

                  {/* 🔥 STATUS CHIP */}
                  <TableCell>
                    <Chip
                      label={b.bookingstatus}
                      sx={{
                        background: statusColor(b.bookingstatus),
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* 🔥 SELECT */}
                  <TableCell>
                    <Select
                      size="small"
                      value={b.bookingstatus}
                      disabled={b.bookingstatus === "Completed"}
                      onChange={(e) => {
                        setSelectedBooking(b._id);
                        setNewStatus(e.target.value);
                        setOpenDialog(true);
                      }}
                      sx={{
                        background: "rgba(255,255,255,0.8)",
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </motion.div>

      {/* 🔥 DIALOG */}
      <Dialog open={openDialog} onClose={cancelUpdate}>
        <DialogTitle>Confirm Status Change</DialogTitle>

        <DialogContent>
          Change order status to <b>{newStatus}</b>?
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelUpdate}>Cancel</Button>

          <Button
            onClick={confirmUpdate}
            sx={{
              background: "#c8a97e",
              color: "#2b2115",
              "&:hover": { background: "#b89668" },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}