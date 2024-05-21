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

export default function AppointmentsData() {
  const [rowData, setRowData] = React.useState([]);
  const fetchData = () => {
    fetch(
      "http://localhost:8080/api/patient-appointments/user/" +
        parseInt(sessionStorage.getItem("id")),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          alert("Login First ");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRowData(data);
      });
  };

  React.useEffect(() => {
    fetchData();
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
              <StyledTableCell align="center">
                Appointment Status
              </StyledTableCell>

              <StyledTableCell align="center">Diagnosis</StyledTableCell>
              <StyledTableCell align="center">Services</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.doctorAppointment.doctor.firstName +
                    " " +
                    row.doctorAppointment.doctor.lastName}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row.doctorAppointment.date}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row.doctorAppointment.time}
                </StyledTableCell>

                <StyledTableCell align="center">{row.status}</StyledTableCell>

                <StyledTableCell align="center">{row.diagnosis}</StyledTableCell>

                <StyledTableCell align="center">
                  <ul>
                    {row.services.map((doctor) => {
                      return (
                        <div key={doctor.id}>
                          <li>{doctor.name}</li>
                        </div>
                      );
                    })}
                  </ul>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <TotalPrice row={row} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
