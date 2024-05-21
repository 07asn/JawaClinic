import React from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import CustomAlert from "../../CustomAlert";
export default function PatientForm({ url, method, userData }) {
  const theme = useTheme();

  const [firstName, setfirstName] = React.useState(userData.firstName);
  const [lastName, setlastName] = React.useState(userData.lastName);
  const [email, setEmail] = React.useState(userData.email);
  const [password, setpassword] = React.useState(userData.password);
  const [phoneNumber, setphoneNumber] = React.useState(userData.phoneNumber);
  const [dateOfBirth, setdateOfBirth] = React.useState(userData.dateOfBirth);
  const [nationalNumber, setnationalNumber] = React.useState(
    userData.nationalNumber
  );

  const [gender, setgender] = React.useState(userData.gender);
  const [city, setcity] = React.useState(userData.city);
  const [error, setError] = React.useState(false);
  const [passerror, setPassError] = React.useState(false);
  const [nError, setNError] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

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

    for (const key in userObject) {
      if (!userObject[key]) {
        setAlertMessage("Please fill in all fields.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        setAlertMessage("Successfully saved data!");
        setAlertSeverity("success");
        setAlertOpen(true);
        window.location.reload();
      }else {
        setAlertMessage("Error: " + result.message);
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setAlertMessage("Some error occurred. Wrong Entry!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Grid>
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
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
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
              onChange={(e) => {
                setlastName(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              value={email}
              type="email"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
                const emailRegex = /^\w+@\w+\.com$/;
                const isValid = emailRegex.test(e.target.value);
                setError(!isValid);
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
              onChange={(e) => {
                setphoneNumber(e.target.value);
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
              value={password}
              error={passerror}
              onChange={(e) => {
                const pass = e.target.value;
                if (pass.length < 8) {
                  setPassError(true);
                } else {
                  setPassError(false);
                }

                setpassword(e.target.value);
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
              InputLabelProps={{ shrink: true }}
              autoComplete="bday"
              value={dateOfBirth}
              onChange={(e) => {
                setdateOfBirth(e.target.value);
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

                setnationalNumber(e.target.value);
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
                value={gender}
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CustomAlert
          open={alertOpen}
          handleClose={handleCloseAlert}
          message={alertMessage}
          severity={alertSeverity}
      />
    </Grid>
  );
}
