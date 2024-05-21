import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogTitle } from "@mui/material";
import DoctorAllAppointmentsForm from "./DoctorAllAppointmentsForm";
import TotalPrice from "../../Price/TotalPrice";

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

export default function DoctorAllAppointmentsData() {
  const [totalPrice, settotalprice] = React.useState(0);
  const [appointment, setAppointment] = React.useState();
  const [rowData, setRowData] = React.useState([]);
  const [url, setUrl] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [currentdoctor, setcurrentdoctor] = React.useState({});

  const fetchData = () => {
    fetch("http://localhost:8080/api/patient-appointments/all", {
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

  const fetchCurrentDoctor = () => {
    fetch(
      "http://localhost:8080/api/users/user/" +
        parseInt(sessionStorage.getItem("id")),
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setcurrentdoctor(data);
      });
  };

  React.useEffect(() => {
    fetchCurrentDoctor();
    fetchData();
  }, []);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
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
        <DialogTitle>Edit</DialogTitle>
        <DoctorAllAppointmentsForm
          url={url}
          method={method}
          userData={appointment}
          doctor={currentdoctor}
        />
      </Dialog>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Patient Name</StyledTableCell>
              <StyledTableCell align="center">Date & Time </StyledTableCell>

              <StyledTableCell align="center">
                Appointment Status
              </StyledTableCell>

              <StyledTableCell align="center">Diagnosis</StyledTableCell>
              <StyledTableCell align="center">Prices</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => {
              if (
                parseInt(row.doctorAppointment.doctor.id) ===
                  parseInt(sessionStorage.getItem("id")) &&
                row.status !== "DONE"
              ) {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.patient.firstName + " " + row.patient.lastName}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.doctorAppointment.date +
                        " " +
                        row.doctorAppointment.time}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.diagnosis}
                    </StyledTableCell>



                    <StyledTableCell align="center">
                      <TotalPrice row={row} />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Button
                          color="secondary"
                          variant="contained"
                        onClick={() => {
                          setShow(true);
                          setUrl(
                            "http://localhost:8080/api/patient-appointments/" +
                              parseInt(row.id)
                          );
                          setAppointment(row);
                          setMethod("PUT");
                        }}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
