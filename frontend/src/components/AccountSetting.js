import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import CustomAlert from "./CustomAlert";

export default function AccountSetting() {
  const theme = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationalNumber, setNationalNumber] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);

  const [passError, setPassError] = useState(false);
  const [nError, setNError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

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
      role: role,
    };

    // Validation
    if (
        !userObject.firstName ||
        !userObject.lastName ||
        !userObject.email ||
        !userObject.phoneNumber ||
        !userObject.password ||
        !userObject.dateOfBirth ||
        !userObject.nationalNumber ||
        !userObject.gender ||
        !userObject.city
    ) {
      setAlertMessage("Please fill in all fields.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    try {
      const response = await fetch(
          "http://localhost:8080/api/users/update/" +
          parseInt(sessionStorage.getItem("id")),
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObject),
          }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        setAlertMessage("Successfully saved data!");
        setAlertSeverity("success");
        setAlertOpen(true);
      } else {
        throw new Error(result.message || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setAlertMessage("Some error occurred. Try again! " + error.message);
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    fetch(
        "http://localhost:8080/api/users/user/" +
        parseInt(sessionStorage.getItem("id")),
        {
          method: "GET",
        }
    )
        .then((res) => {
          if (!res.ok) {
            setAlertMessage("Some error occurred. Try again!");
            setAlertSeverity("error");
            setAlertOpen(true);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPassword(data.password);
          setDateOfBirth(data.dateOfBirth);
          setCity(data.city);
          setGender(data.gender);
          setPhoneNumber(data.phoneNumber);
          setNationalNumber(data.nationalNumber);
          setRole(data.role);
        });
  }, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
      <>
        <Grid item xs={12} sm={8} md={5}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                    value={email}
                    onChange={(e) => {
                      const emailRegex = /^\w+@\w+\.\w+$/;
                      const isValid = emailRegex.test(e.target.value);
                      setError(!isValid);
                      setEmail(e.target.value);
                    }}
                    error={error}
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    value={password}
                    error={passError}
                    onChange={(e) => {
                      const pass = e.target.value;
                      if (pass.length < 8) {
                        setPassError(true);
                      } else {
                        setPassError(false);
                      }
                      setPassword(e.target.value);
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    placeholder="YYYY-MM-DD"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    autoComplete="bday"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0], // Set max date to today
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
                    value={nationalNumber}
                    error={nError}
                    onChange={(e) => {
                      const nno = e.target.value;
                      if (nno.length < 7) {
                        setNError(true);
                      } else {
                        setNError(false);
                      }
                      setNationalNumber(e.target.value);
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                  >
                    <MenuItem value="Ajlun">Ajlun</MenuItem>
                    <MenuItem value="Amman">Amman</MenuItem>
                    <MenuItem value="Aqaba">Aqaba</MenuItem>
                    <MenuItem value="Balqa">Balqa</MenuItem>
                    <MenuItem value="Irbid">Irbid</MenuItem>
                    <MenuItem value="Jarash">Jarash</MenuItem>
                    <MenuItem value="Karak">Karak</MenuItem>
                    <MenuItem value="Ma'an">Ma'an</MenuItem>
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
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained"primary>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <CustomAlert
            open={alertOpen}
            handleClose={handleCloseAlert}
            message={alertMessage}
            severity={alertSeverity}
        />
      </>
  );
}