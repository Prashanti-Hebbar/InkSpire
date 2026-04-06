import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import img1 from "./img1.jpg";
// import img2 from "./img2.jpg";
// import img3 from "./img3.jpg";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // // Image slider (3 seconds)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % images.length);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [images.length]);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log("logindetails", login);
    axios
      .post("http://localhost:3000/user/login", login)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          localStorage.setItem("UserToken", res.data.token);
          alert("Login Successfull!");
          navigate("/");
        } else{
          alert("unsuccessfull")
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email or password");
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "500px",
          height: "400px",
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* LEFT LOGIN FORM */}
        <Box
          sx={{
            flex: 1,
            padding: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" mb={3} fontWeight={600} textAlign="center">
            Login
          </Typography>

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          {/* <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          /> */}

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              backgroundColor: "#1c1c1c",
              "&:hover": { backgroundColor: "#000" },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            Don’t have an account?{" "}
            <span
              style={{
                color: "#1976d2",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </span>
          </Typography>
        </Box>

        {/* RIGHT IMAGE SLIDER */}
        {/* <Box sx={{ flex: 1 }}>
          <img
            src={images[currentIndex]}
            alt="slide"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box> */}
      </Paper>
    </Box>
  );
}
