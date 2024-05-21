import { Grid, Typography } from "@mui/material";
import React from "react";
import PatientLayout from "../PatientLayout";
import BookAppointmentData from "./BookAppointmentData";

export default function BookAppointment() {
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
            Book an Appointment Now
          </Typography>

          <br></br>
          <BookAppointmentData />
        </Grid>
      </Grid>
    </>
  );
}
