import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
} from "@mui/material";
import ReceptionistLayout from "../ReceptionistLayout";
import React from "react";
import PatientData from "./PatientData";
import PatientForm from "./PatientForm";
import Add from "@mui/icons-material/Add";

export default function Patient() {
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
  const handleClose = () => {
    setShow(false);
  };
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
            Patients Data
          </Typography>

          <Grid justifyContent="flex-end">
            <Button
              color="info"
              onClick={() => {
                setUrl("http://localhost:8080/api/users/create");
                setMethod("POST");
                setShow(true);
              }}
            >
              <Add />
              Create
            </Button>
          </Grid>

          <Dialog onClose={handleClose} align="center" open={show}>
            <Button
              sx={{
                color: "white",
                align: "right",
                backgroundColor: "red",
                width: "2px",
              }}
              onClick={() => {
                setShow(false);
              }}
            >
              X
            </Button>
            <DialogTitle>Create</DialogTitle>
            <PatientForm url={url} method={method} userData={rawData} />
          </Dialog>

          <br></br>
          <PatientData />
        </Grid>
      </Grid>
    </>
  );
}
