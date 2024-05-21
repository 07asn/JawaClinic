import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavButton() {
  if (sessionStorage.getItem("id")) {
    if (sessionStorage.getItem("role") === "MANAGER") {
      return (
        <Button
          color="inherit"
          component={Link}
          to="/manager"
          sx={{ fontWeight: "bold" }}
        >
          My Dashboard
        </Button>
      );
    } else if (sessionStorage.getItem("role") === "RECEPTIONIST") {
      return (
        <Button
          color="inherit"
          component={Link}
          to="/receptionist"
          sx={{ fontWeight: "bold" }}
        >
          My Dashboard
        </Button>
      );
    } else if (sessionStorage.getItem("role") === "PATIENT") {
      return (
        <Button
          color="inherit"
          component={Link}
          to="/patient"
          sx={{ fontWeight: "bold" }}
        >
          My Dashboard
        </Button>
      );
    } else if (sessionStorage.getItem("role") === "DOCTOR") {
      return (
        <Button
          color="inherit"
          component={Link}
          to="/doctor"
          sx={{ fontWeight: "bold" }}
        >
          My Dashboard
        </Button>
      );
    }
  } else {
    return (
      <Button
        color="inherit"
        component={Link}
        to="/login"
        sx={{ fontWeight: "bold" }}
      >
        Login
      </Button>
    );
  }
}
