import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ManagerLayout() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1967b5" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Jawa Clinic
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/manager"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Manager Home
          </Button>
          <Button
            component={Link}
            to="/create-new-user"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            New Employee
          </Button>
          <Button
            component={Link}
            to="/create-new-clinic"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Clinic
          </Button>
          <Button
            component={Link}
            to="/create-new-product"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
          >
            Product
          </Button>
          <Button
            component={Link}
            to="/manager-account"
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
