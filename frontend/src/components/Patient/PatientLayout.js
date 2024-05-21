import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function PatientLayout() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1967b5" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Jawa Clinic
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/patient"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Patient Home
          </Button>
          <Button
            component={Link}
            to="/book-appointment"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Booking
          </Button>
          <Button
            component={Link}
            to="/appointments"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            My Appointments
          </Button>
          <Button
            component={Link}
            to="/patient-account"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Account Setting
          </Button>
          <Button
            component={Link}
            to="/"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
            onClick={() => {
              sessionStorage.removeItem("id");
              sessionStorage.removeItem("role");
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
