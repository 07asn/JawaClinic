import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";
export default function Navbar({ children }) {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            Jawa Clinic
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/about"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              About Us
            </Button>
            <NavButton></NavButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
