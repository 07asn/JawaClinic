import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#1967b5" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Jawa Clinic
        </Typography>
        <Box>
          <Button
            variant="h5"
            component={Link}
            to="/doctor"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Doctor Home
          </Button>
          <Button
            variant="h5"
            component={Link}
            to="/doctor-appointments"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Appointment
          </Button>
          <Button
            variant="h5"
            component={Link}
            to="/doctor-account"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Account Setting
          </Button>
          <Button
            variant="h5"
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
