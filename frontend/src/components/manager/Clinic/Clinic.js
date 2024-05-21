import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Add from "@mui/icons-material/Add";
import ManagerLayout from "../ManagerLayout";
import ClinicForm from "./ClinicForm";
import ClinicData from "./ClinicData";

export default function Clinic() {
  const [show, setShow] = React.useState(false);
  const clinicData = {
    name: "",
    location: "",
    products: [],
    doctor: [],
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <ManagerLayout></ManagerLayout>
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
            Clinics Record
          </Typography>

          <Grid justifyContent="flex-end">
            <Button
              color="info"
              onClick={() => {
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
            <ClinicForm
              url={"http://localhost:8080/api/clinics/create"}
              method={"POST"}
              clinicData={clinicData}
            />
          </Dialog>

          <ClinicData />
        </Grid>
      </Grid>
    </>
  );
}
