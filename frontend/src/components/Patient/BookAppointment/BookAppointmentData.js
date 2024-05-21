import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, TextField, Grid } from "@mui/material";
import CustomAlert from "../../CustomAlert";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookAppointmentData() {
  const [patient, setPatient] = React.useState();
  const [rowData, setRowData] = React.useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const bookAppointment = async (appointment) => {
    const patientAppointment = {
      diagnosis: "",
      services: [],
      status: "WAITLIST",
      patient: patient,
      doctorAppointment: appointment,
    };
    console.log(patientAppointment);
    try {
      const response = await fetch(
        "http://localhost:8080/api/patient-appointments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientAppointment),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        setAlertMessage("Successfully saved Appointment!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error during Interring Data:", error);
      setAlertMessage("Some error occurred. Wrong Entry!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const fetchCurrentPatient = () => {
    fetch(
      "http://localhost:8080/api/users/user/" +
        parseInt(sessionStorage.getItem("id")),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          alert("Login first! ");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPatient(data);
      });
  };

  const fetchDoctorAppointments = () => {
    fetch("http://localhost:8080/api/doctor-appointments/all", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRowData(data);
      });
  };

  React.useEffect(() => {
    fetchCurrentPatient();
    fetchDoctorAppointments();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Doctor</StyledTableCell>
              <StyledTableCell align="center">Date </StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => {
              if (row.status === "AVAILABLE") {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.doctor.firstName + " " + row.doctor.lastName}
                    </StyledTableCell>

                    <StyledTableCell align="right">{row.date}</StyledTableCell>

                    <StyledTableCell align="right">{row.time}</StyledTableCell>

                    <StyledTableCell align="right">
                      {row.status}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Button
                          color="primary"
                          variant="contained"
                        onClick={() => {
                          bookAppointment(row);
                        }}
                      >
                        Book
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomAlert
          open={alertOpen}
          handleClose={handleCloseAlert}
          message={alertMessage}
          severity={alertSeverity}
      />
    </>
  );
}
