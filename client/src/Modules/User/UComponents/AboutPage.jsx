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
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Playfair Display', serif",

        // 🔥 LIGHTING SYSTEM (NOT BASIC GRADIENT)
        background: `
          radial-gradient(circle at 20% 10%, rgba(200,169,126,0.15), transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 40%),
          linear-gradient(to bottom, #f5f1e6, #e8dccb)
        `,
      }}
    >
      {/* 🔥 FLOATING BOOKS (DEPTH EFFECT) */}
      {[...Array(6)].map((_, i) => (
        <motion.img
          key={i}
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          style={{
            position: "absolute",
            width: 40,
            opacity: 0.07,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: "none",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 6, -6, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
          }}
        />
      ))}

      {/* 🔥 HERO (PREMIUM ENTRY EXPERIENCE) */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",

          background: `
            linear-gradient(rgba(62,47,28,0.85), rgba(43,33,21,0.92)),
            url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fdf6e3",
        }}
      >
        {/* 🔥 SOFT GLOW OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            width: "60%",
            height: "60%",
            background: "radial-gradient(circle, rgba(200,169,126,0.25), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" fontWeight={700}>
            Welcome to Inkspire
          </Typography>

          <Typography mt={3} sx={{ maxWidth: 600, mx: "auto" }}>
            Step into a world where stories are not just read,
            but experienced. A digital sanctuary crafted for
            readers who seek more than just books.
          </Typography>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={() => navigate("/")}
              sx={{
                mt: 4,
                background: "#c8a97e",
                color: "#2b2115",
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                "&:hover": {
                  background: "#b89668",
                },
              }}
            >
              Explore Books
            </Button>
          </motion.div>
        </motion.div>
      </Box>

      {/* 📖 OUR MISSION */}
      <Container sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" fontWeight={700} mb={3}>
            Our Mission
          </Typography>

          <Typography color="#5a4a3b" lineHeight={1.8}>
            Inkspire exists to recreate the warmth of a real bookstore
            in a digital space. Every interaction, every page, and every
            transition is designed to make you feel like you're walking
            through a timeless library.
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
              gap: 4,
            }}
          >
            {[
              {
                title: "Immersive Experience",
                desc: "A digital bookstore that feels alive.",
              },
              {
                title: "Curated Collections",
                desc: "Only meaningful and impactful reads.",
              },
              {
                title: "Seamless Journey",
                desc: "Fluid interactions from discovery to checkout.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 5,

                    // 🔥 PREMIUM GLASS + DEPTH
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(14px)",

                    boxShadow: `
                      0 10px 30px rgba(0,0,0,0.15),
                      inset 0 1px 1px rgba(255,255,255,0.4)
                    `,

                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography fontWeight={700}>
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
      <Box sx={{ py: 10, textAlign: "center" }}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Typography variant="h5" fontWeight={600}>
            Your next story is waiting
          </Typography>

          <Button
            onClick={() => navigate("/")}
            sx={{
              mt: 3,
              background: "#3e2f1c",
              color: "#fff",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              "&:hover": {
                background: "#2b2115",
              },
            }}
          >
            Start Exploring
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}