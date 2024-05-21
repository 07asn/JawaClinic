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
import Add from "@mui/icons-material/Add";
import PatientAppointmentForm from "./PatientAppointmentForm";
import PatientAppointmentData from "./PatientAppointmentData";

export default function PatientAppointment() {
  const [show, setShow] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [rawData, setRawData] = React.useState({
    diagnosis: "",
    status: "",
    services: [],
    patient: {},
    doctorAppointment: {},
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
            Patient Appointments
          </Typography>

          <Grid justifyContent="flex-end">
            <Button
              color="info"
              onClick={() => {
                setUrl("http://localhost:8080/api/patient-appointments/create");
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
            <PatientAppointmentForm
              url={url}
              method={method}
              userData={rawData}
            />
          </Dialog>

          <br></br>
          <PatientAppointmentData />
        </Grid>
      </Grid>
    </>
  );
}
