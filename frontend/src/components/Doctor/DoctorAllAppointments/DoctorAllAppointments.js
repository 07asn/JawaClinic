import { Grid, Typography, Button, Box, TextField } from "@mui/material";
import React from "react";
import DoctorLayout from "../DoctorLayout";
import DoctorAllAppointmentsData from "./DoctorAllAppointmentsData";

export default function DoctorAllAppointments() {
  return (
    <>
      <DoctorLayout></DoctorLayout>
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
            Your Appointments
          </Typography>

          <br></br>
          <DoctorAllAppointmentsData />
        </Grid>
      </Grid>
    </>
  );
}
