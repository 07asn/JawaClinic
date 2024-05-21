import { Grid, Typography, Button, Box, TextField } from "@mui/material";
import React from "react";
import PatientLayout from "../PatientLayout";
import AppointmentsData from "./AppointmentsData";

export default function Appointments() {
  return (
    <>
      <PatientLayout></PatientLayout>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          flexDirection: "row",
          marginTop: 3,
          alignContent: "center",
        }}
      >
        <Grid item>
          <Typography align="center" variant="h5">
            Appointments
          </Typography>

          <br></br>
          <AppointmentsData />
        </Grid>
      </Grid>
    </>
  );
}
