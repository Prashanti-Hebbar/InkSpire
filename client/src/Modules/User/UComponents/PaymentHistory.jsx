import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Chip } from "@mui/material";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/payment/user", {
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      })
      .then((res) => setPayments(res.data.payments || []));
  }, []);

  const statusColor = (status) => {
    if (status === "Success") return "#16a34a";
    if (status === "Failed") return "#dc2626";
    return "#d97706";
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Payment History 💳
      </Typography>

      {payments.length === 0 ? (
        <Typography>No payments yet</Typography>
      ) : (
        [...payments]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((p) => (
            <Paper
              key={p._id}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography fontWeight={600}>Amount: ₹{p.amount}</Typography>

              <Typography>Transaction: {p.transactionId}</Typography>

              <Typography>Method: {p.paymentMethod}</Typography>

              <Chip
                label={p.paymentStatus}
                sx={{
                  mt: 1,
                  background: statusColor(p.paymentStatus),
                  color: "#fff",
                }}
              />
            </Paper>
          ))
      )}
    </Box>
  );
}
