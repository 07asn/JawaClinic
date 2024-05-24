import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, FormControl, InputLabel, Select, MenuItem, Grid, Dialog, DialogTitle } from "@mui/material";
import DoctorAppointmentForm from "./DoctorAppointmentForm";

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

export default function DoctorAppointmentData() {
  const [rows, setRows] = React.useState([]);
  const [url, setUrl] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [selectedDoctor, setSelectedDoctor] = React.useState("All");

  const handleDelete = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8080/api/doctor-appointments/" + parseInt(id), options).then((response) => {
      if (!response.ok) {
        alert("Some error occur. Try again! ");
      }
      window.location.reload();
    });
  };

  const [rowData, setRowData] = React.useState();

  React.useEffect(() => {
    fetch("http://localhost:8080/api/doctor-appointments/all", {
      method: "GET",
    })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setRows(data);
        });
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeDoctor = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const renderRowsByFilters = (status, doctor) => {
    return rows.map((row) => {
      const doctorName = row.doctor.firstName + " " + row.doctor.lastName;
      if ((status === "All" || row.status === status) && (doctor === "All" || doctorName === doctor)) {
        return (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {doctorName}
              </StyledTableCell>

              <StyledTableCell align="right">{row.date}</StyledTableCell>

              <StyledTableCell align="right">{row.time}</StyledTableCell>

              <StyledTableCell align="right">{row.status}</StyledTableCell>

              <StyledTableCell align="right">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setShow(true);
                      setUrl("http://localhost:8080/api/doctor-appointments/" + parseInt(row.id));
                      setMethod("PUT");
                      setRowData(row);
                    }}
                >
                  Edit
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
        );
      }
      return null;
    });
  };

  const uniqueDoctors = ["All", ...new Set(rows.map((row) => row.doctor.firstName + " " + row.doctor.lastName))];

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
          <DoctorAppointmentForm url={url} method={method} userData={rowData} />
        </Dialog>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Select Status</InputLabel>
              <Select
                  labelId="status-label"
                  id="status-select"
                  value={selectedStatus}
                  onChange={handleChangeStatus}
                  label="Select Status"
                  variant="outlined"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="NOT AVAILABLE">Not Available</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="doctor-label">Select Doctor</InputLabel>
              <Select
                  labelId="doctor-label"
                  id="doctor-select"
                  value={selectedDoctor}
                  onChange={handleChangeDoctor}
                  label="Select Doctor"
                  variant="outlined"
              >
                {uniqueDoctors.map((doctor, index) => (
                    <MenuItem key={index} value={doctor}>
                      {doctor}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Doctor</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRowsByFilters(selectedStatus, selectedDoctor)}</TableBody>
          </Table>
        </TableContainer>
      </>
  );
}