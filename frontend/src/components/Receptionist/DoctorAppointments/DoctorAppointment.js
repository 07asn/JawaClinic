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
import DoctorAppointmentForm from "./DoctorAppointmentForm";
import DoctorAppointmentData from "./DoctorAppointmentData";
import Add from "@mui/icons-material/Add";

export default function DoctorAppointment() {
  const [show, setShow] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [rawData, setRawData] = React.useState({
    date: "",
    time: "",
    status: "AVAILABLE",
    doctor: {},
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
            Doctor Appointments
          </Typography>

          <Grid justifyContent="flex-end">
            <Button
              color="info"
              onClick={() => {
                setUrl("http://localhost:8080/api/doctor-appointments/create");
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
            <DoctorAppointmentForm
              url={url}
              method={method}
              userData={rawData}
            />
          </Dialog>

          <br></br>
          <DoctorAppointmentData />
        </Grid>
      </Grid>
    </>
  );
}
