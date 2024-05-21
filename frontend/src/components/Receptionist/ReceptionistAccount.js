import { Grid, Typography, Button, Box, TextField } from "@mui/material";
import ReceptionistLayout from "./ReceptionistLayout";
import React from "react";
import AccountSetting from "../AccountSetting";

export default function ReceptionistAccount() {
  const [show, setShow] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [rawData, setRawData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
    nationalNumber: "",
    gender: "",
    city: "",
  });

  return (
    <>
      <ReceptionistLayout></ReceptionistLayout>
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
