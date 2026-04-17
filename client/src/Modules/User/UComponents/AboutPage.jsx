import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle at top, #f5f1e6, #e8dccb)",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* 🔥 HERO (LIBRARY ENTRY) */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: `
            linear-gradient(rgba(62,47,28,0.8), rgba(43,33,21,0.9)),
            url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d')
          `,
          backgroundSize: "cover",
          color: "#fdf6e3",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Typography variant="h2" fontWeight={700}>
            Welcome to Inkspire
          </Typography>

          <Typography mt={3} sx={{ maxWidth: 600 }}>
            Step into a world where stories are not just read,
            but experienced. Inkspire is your digital doorway
            to imagination, knowledge, and inspiration.
          </Typography>

          <Button
            onClick={() => navigate("/")}
            sx={{
              mt: 4,
              background: "#c8a97e",
              color: "#2b2115",
            }}
          >
            Explore Books
          </Button>
        </motion.div>
      </Box>

      {/* 📖 OUR STORY */}
      <Container sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h4" fontWeight={700} mb={3}>
            Our Mission
          </Typography>

          <Typography color="#5a4a3b" lineHeight={1.8}>
            Inkspire was created with a simple idea — to bring
            the warmth of a physical bookstore into the digital world.
            We believe books are more than products; they are journeys,
            emotions, and timeless companions.
          </Typography>
        </motion.div>
      </Container>

      {/* 📚 WHY INSPIRE */}
      <Container sx={{ pb: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h4" fontWeight={700} mb={4}>
            Why Inkspire?
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {[
              {
                title: "Immersive Experience",
                desc: "Feel like you are walking through a real bookstore.",
              },
              {
                title: "Curated Collections",
                desc: "Discover books that truly resonate with you.",
              },
              {
                title: "Seamless Journey",
                desc: "From discovery to checkout, everything flows smoothly.",
              },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography fontWeight={600}>
                    {item.title}
                  </Typography>

                  <Typography mt={1} color="#5a4a3b">
                    {item.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* 🎯 FINAL CTA */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Your next story is waiting
        </Typography>

        <Button
          sx={{
            mt: 3,
            background: "#3e2f1c",
            color: "#fff",
          }}
          onClick={() => navigate("/")}
        >
          Start Exploring
        </Button>
      </Box>
    </Box>
  );
}