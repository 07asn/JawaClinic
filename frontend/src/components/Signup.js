import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CustomAlert from "./CustomAlert";

function Signup() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [nError, setNError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userObject = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
      password: data.get("password"),
      dateOfBirth: data.get("dateOfBirth"),
      nationalNumber: data.get("nationalNumber"),
      gender: data.get("gender"),
      city: data.get("city"),
      role: "PATIENT",
    };

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        setAlertMessage("Registration successful!");
        setAlertOpen(true);
      } else {
        throw new Error(result.message || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error during registration. Try Again!");
      setAlertMessage("Error during registration. Some fields were entered incorrectly!");
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
                backgroundImage: "url(https://source.unsplash.com/featured/?healthcare)",
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
                Join Jawa Clinic
              </Typography>
              <Typography>
                Sign up today to start managing your healthcare online.
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
                Create Your Account
              </Typography>
              <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        error={error}
                        helperText={error ? "Please enter a valid email address" : ""}
                        onChange={(e) => {
                          const emailRegex = /^\w+@\w+\.\w+$/; // Adjust the regex pattern as needed
                          const isValid = emailRegex.test(e.target.value);
                          setError(!isValid);
                        }}
                        InputProps={{
                          style: {
                            color: error ? 'red' : undefined,
                          },
                        }}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        autoComplete="tel"
                        error={nError}
                        helperText={nError ? "Phone number should be at least 10 digits" : ""}
                        onChange={(e) => {
                          const nno = e.target.value;
                          if (nno.length < 10) {
                            setNError(true);
                          } else {
                            setNError(false);
                          }
                        }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        error={passError}
                        helperText={passError ? "Password should be 8 characters or more" : ""}
                        onChange={(e) => {
                          const pass = e.target.value;
                          if (pass.length < 8) {
                            setPassError(true);
                          } else {
                            setPassError(false);
                          }
                        }}
                        InputProps={{
                          style: {
                            color: passError ? 'red' : undefined,
                          },
                        }}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        autoComplete="bday"
                        inputProps={{
                          max: new Date().toISOString().split("T")[0] // Set max date to today
                        }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="nationalNumber"
                        label="National Number"
                        autoComplete="off"
                        error={nError}
                        helperText={nError ? "National number should be at least 7 digits" : ""}
                        onChange={(e) => {
                          const nno = e.target.value;
                          if (nno.length < 7) {
                            setNError(true);
                          } else {
                            setNError(false);
                          }
                        }}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="city-label">City</InputLabel>
                      <Select
                          labelId="city-label"
                          name="city"
                          label="City"
                          defaultValue="Amman"
                      >
                        <MenuItem value="Ajlun">Ajlun</MenuItem>
                        <MenuItem value="Amman">Amman</MenuItem>
                        <MenuItem value="Aqaba">Aqaba</MenuItem>
                        <MenuItem value="Balqa">Balqa</MenuItem>
                        <MenuItem value="Irbid">Irbid</MenuItem>
                        <MenuItem value="Jarash">Jarash</MenuItem>
                        <MenuItem value="Karak">Karak</MenuItem>
                        <MenuItem value="Ma`an">Ma`an</MenuItem>
                        <MenuItem value="Madaba">Madaba</MenuItem>
                        <MenuItem value="Mafraq">Mafraq</MenuItem>
                        <MenuItem value="Tafilah">Tafilah</MenuItem>
                        <MenuItem value="Zarqa">Zarqa</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                          labelId="gender-label"
                          name="gender"
                          label="Gender"
                          defaultValue=""
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                      Sign Up
                    </Button>

                    <br /><br />

                    <Button
                        fullWidth
                        sx={{
                          alignContent: "center",
                        }}
                        component={Link}
                        to="/login"
                        variant="h3"
                    >
                      <u>Already have an account?</u>
                    </Button>
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

export default Signup;
