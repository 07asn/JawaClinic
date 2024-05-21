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
import CreateUser from "./CreateUser";
import EmployeeData from "./EmployeeData";

export default function NewUserLayout() {
  const [show, setShow] = React.useState(false);
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
    role: "",
  });
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
            Employee Record
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
            <CreateUser
              url={"http://localhost:8080/api/users/create"}
              method={"POST"}
              userData={rawData}
            />
          </Dialog>

          <br></br>
          <EmployeeData />
        </Grid>
      </Grid>
    </>
  );
}
