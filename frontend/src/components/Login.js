import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import CustomAlert from "./CustomAlert";

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store user info in local storage or context
        sessionStorage.setItem("id", data.id);
        console.log(data);

        // Redirect based on role
        if (data.role === "MANAGER") {
          sessionStorage.setItem("role", data.role);
          navigate("/manager");
        } else if (data.role === "RECEPTIONIST") {
          sessionStorage.setItem("role", data.role);
          navigate("/receptionist");
        } else if (data.role === "PATIENT") {
          sessionStorage.setItem("role", data.role);
          navigate("/patient");
        } else if (data.role === "DOCTOR") {
          sessionStorage.setItem("role", data.role);
          navigate("/doctor");
        } else {
          console.error("Unknown role");
        }
      } else {
        throw new Error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlertMessage("The email address and password combination entered do not match any account. Please try again.");
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
      <>
        <Navbar />
        <Grid container component="main" sx={{ height: "100vh", flexGrow: 1 }}>
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                    "url(https://source.unsplash.com/featured/?medical)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.common.white,
              }}
          >
            <Box
                p={3}
                sx={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "16px" }}
            >
              <Typography variant="h3" gutterBottom>
                Welcome to Jawa Clinic
              </Typography>
              <Typography>
                Your health is our top priority. Join us to access top healthcare
                services easily.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Sign In
              </Typography>
              <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit}
              >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid
                      sx={{
                        marginLeft: "20px",
                      }}
                      item
                  >
                    <MuiLink component={Link} to="/signup" variant="body2">
                      Don't have an account? Sign Up
                    </MuiLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <CustomAlert
            open={alertOpen}
            handleClose={handleCloseAlert}
            message={alertMessage}
        />
      </>
  );
}

export default Login;
