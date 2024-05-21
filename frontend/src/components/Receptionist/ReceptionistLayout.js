import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ReceptionistLayout() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1967b5" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Jawa Clinic
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/receptionist"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Receptionist Home
          </Button>
          <Button
            component={Link}
            to="/patient-record"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Patients
          </Button>
          <Button
            component={Link}
            to="/doctor-appointment"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Doctor Appointments
          </Button>
          <Button
            component={Link}
            to="/patient-appointment"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Patient Appointments
          </Button>
          <Button
            component={Link}
            to="/receptionist-account"
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
