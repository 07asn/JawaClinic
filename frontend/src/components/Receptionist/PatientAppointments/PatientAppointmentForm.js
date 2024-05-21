import React from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

export default function PatientAppointmentForm({ url, method, userData }) {
  const theme = useTheme();

  const [patientList, setPatientList] = React.useState([]);
  const [patientData, setPatientData] = React.useState("");

  const [appointmentList, setappointmentList] = React.useState([]);
  const [appointmentData, setappointmentData] = React.useState("");

  //editable by receptionist
  const [status, setstatus] = React.useState(userData.status);
  const [patient, setpatient] = React.useState(userData.patient);
  const [doctorAppointment, setdoctorAppointment] = React.useState(
    userData.doctorAppointment
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userObject = {
      diagnosis: userData.diagnosis,
      status: status,
      services: userData.services,
      patient: patient,
      doctorAppointment: doctorAppointment,
    };

    console.log(userObject);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        alert("Successfully saved data!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Some error occur. Try again! " + error.message);
    }
  };

  const fetchPatientsList = () => {
    fetch("http://localhost:8080/api/users/all", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPatientList(data);
      });
  };

  const fetchAppointmentsList = () => {
    fetch("http://localhost:8080/api/doctor-appointments/all", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setappointmentList(data);
      });
  };

  React.useEffect(() => {
    fetchAppointmentsList();
    fetchPatientsList();
  }, []);

  return (
    <Grid>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="doctor-label">Patient</InputLabel>
              <Select
                labelId="doctor-label"
                name="patient"
                label="Patient"
                value={patientData}
                onChange={(e) => {
                  setPatientData(e.target.value);
                }}
              >
                {patientList.map((patientrow) => {
                  if (patientrow.role === "PATIENT") {
                    return (
                      <MenuItem
                        key={patientrow.id}
                        value={
                          patientrow.firstName +
                          " " +
                          patientrow.lastName +
                          " " +
                          patientrow.nationalNumber
                        }
                        onClick={() => {
                          setpatient(patientrow);

                          setPatientData(
                            patientrow.firstName +
                              " " +
                              patientrow.lastName +
                              " " +
                              patientrow.nationalNumber
                          );
                        }}
                      >
                        {patientrow.firstName +
                          " " +
                          patientrow.lastName +
                          " " +
                          patientrow.nationalNumber}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="doctor-label">Appointments</InputLabel>
              <Select
                labelId="doctor-label"
                name="appointments"
                label="Doctor Appointments"
                value={appointmentData}
                onChange={(e) => {
                  setappointmentData(e.target.value);
                }}
              >
                {appointmentList.map((appointment) => {
                  if (appointment.status === "AVAILABLE") {
                    return (
                      <MenuItem
                        key={appointment.id}
                        value={
                          appointment.doctor.firstName +
                          " " +
                          appointment.doctor.lastName +
                          " " +
                          appointment.date +
                          " " +
                          appointment.time
                        }
                        onClick={() => {
                          setdoctorAppointment(appointment);

                          setappointmentData(
                            appointment.doctor.firstName +
                              " " +
                              appointment.doctor.lastName +
                              " " +
                              appointment.date +
                              " " +
                              appointment.time
                          );
                        }}
                      >
                        {appointment.doctor.firstName +
                          " " +
                          appointment.doctor.lastName +
                          " " +
                          appointment.date +
                          " " +
                          appointment.time}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                label="status"
                value={status}
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
              >
                <MenuItem value={"SCHEDULED"}>SCHEDULED</MenuItem>

                <MenuItem value={"CANCEL"}>CANCEL</MenuItem>

                <MenuItem value={"WAITLIST"}>WAITLIST</MenuItem>
                <MenuItem value={"DONE"}>DONE</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
