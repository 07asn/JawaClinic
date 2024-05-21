import { Grid, Typography, Button, Box, TextField } from "@mui/material";

import React from "react";
import AccountSetting from "../AccountSetting";
import PatientLayout from "./PatientLayout";

export default function PatientAccount() {
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
        <Grid item xs={9}>
          <Typography align="center" variant="h5">
            Account Setting
          </Typography>

          <br></br>
          <AccountSetting />
        </Grid>
      </Grid>
    </>
  );
}
