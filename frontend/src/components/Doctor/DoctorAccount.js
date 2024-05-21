import { Grid, Typography, Button, Box, TextField } from "@mui/material";

import React from "react";
import AccountSetting from "../AccountSetting";
import DoctorLayout from "./DoctorLayout";

export default function DoctorAccount() {
  return (
    <>
      <DoctorLayout></DoctorLayout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          flexDirection: "row",
          marginTop: 3,
          alignContent: "center",
        }}
      >
        <Grid item xs={9}>
          <Typography align="center" variant="h5">
            Account Settings
          </Typography>

          <AccountSetting />
        </Grid>
      </Grid>
    </>
  );
}
