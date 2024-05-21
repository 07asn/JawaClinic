import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

export default function ContactSection() {
  return (
    <Box sx={{ marginTop: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginBottom: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Contact Us
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ color: "#555" }}>
          Phone: +962 789582727
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          Email: JawaClinic911@gmail.com
        </Typography>
      </Box>
      <br></br>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ color: "#555" }}>
          © All Rights Reserved By Jawa Clinc.
        </Typography>
      </Box>
    </Box>
  );
}
