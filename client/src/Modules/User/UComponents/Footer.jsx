import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          mt: 10,
          px: 4,
          py: 6,
          position: "relative",
          overflow: "hidden",
          background: `
            linear-gradient(to bottom, rgba(214,195,163,0.2), #2b2115 60%),
            radial-gradient(circle at top, rgba(255,215,150,0.15), transparent)
          `,
          color: "#fdf6e3",
        }}
      >
        {/* 📖 FLOATING BOOKS (subtle) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
              fontSize: "30px",
              opacity: 0.15,
            }}
          >
            📚
          </motion.div>
        ))}

        {/* 🔥 CONTENT */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          gap={6}
          position="relative"
          zIndex={2}
        >
          {/* BRAND */}
          <Box maxWidth={300}>
            <Typography variant="h4" fontWeight={700}>
              Inkspire Library
            </Typography>
            <Typography sx={{ opacity: 0.8, mt: 2 }}>
              Where stories live, breathe, and stay with you long after the last page.
            </Typography>
          </Box>

          {/* NEWSLETTER */}
          <Box>
            <Typography fontWeight={600} mb={2}>
              Stay in the loop
            </Typography>

            <Box display="flex" gap={1}>
              <TextField
                size="small"
                placeholder="Enter your email"
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  input: { color: "#fff" },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  background: "#c8a97e",
                  color: "#2b2115",
                  fontWeight: 600,
                  "&:hover": { background: "#b89668" },
                }}
              >
                Join
              </Button>
            </Box>
          </Box>

          {/* SOCIAL */}
          <Box>
            <Typography fontWeight={600} mb={2}>
              Connect
            </Typography>

            <Box>
              <IconButton sx={{ color: "#fdf6e3" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "#fdf6e3" }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "#fdf6e3" }}>
                <Twitter />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* 🌙 FINAL LINE */}
        <Typography
          textAlign="center"
          mt={6}
          sx={{ opacity: 0.5, fontSize: 14 }}
        >
          © {new Date().getFullYear()} Inkspire Library — Every story finds its reader.
        </Typography>
      </Box>
    </motion.div>
  );
}