import React from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function PatientAppointmentForm({ url, method, userData }) {
  const [patientList, setPatientList] = React.useState([]);
  const [patientData, setPatientData] = React.useState("");

  const [appointmentList, setAppointmentList] = React.useState([]);
  const [appointmentData, setAppointmentData] = React.useState("");

  const [status, setStatus] = React.useState(userData.status);
  const [patient, setPatient] = React.useState(userData.patient);
  const [doctorAppointment, setDoctorAppointment] = React.useState(userData.doctorAppointment);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userObject = {
      diagnosis: userData.diagnosis,
      status: status,
      services: userData.services,
      patient: patient,
      doctorAppointment: doctorAppointment,
    };

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
        alert("Successfully saved data!");
        window.location.reload();
      }
    } catch (error) {
      alert("Some error occurred. Try again! " + error.message);
    }
  };

  const fetchPatientsList = () => {
    fetch("http://localhost:8080/api/users/all", {
      method: "GET",
    })
        .then((res) => res.json())
        .then((data) => setPatientList(data));
  };

  const fetchAppointmentsList = () => {
    fetch("http://localhost:8080/api/doctor-appointments/all", {
      method: "GET",
    })
        .then((res) => res.json())
        .then((data) => setAppointmentList(data));
  };

  React.useEffect(() => {
    fetchAppointmentsList();
    fetchPatientsList();
  }, []);

  // Determine the last available date and time
  const lastAppointment = appointmentList.reduce((last, current) => {
    const lastDateTime = new Date(`${last.date}T${last.time}`);
    const currentDateTime = new Date(`${current.date}T${current.time}`);
    return currentDateTime > lastDateTime ? current : last;
  }, appointmentList[0]);

  const filteredAppointments = appointmentList.filter(appointment => {
    const isLastAppointment = appointment.date === lastAppointment.date && appointment.time === lastAppointment.time;
    return appointment.status === "AVAILABLE" && !isLastAppointment;
  });

  return (
      <Grid>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="patient-label">Patient</InputLabel>
                <Select
                    labelId="patient-label"
                    name="patient"
                    label="Patient"
                    value={patientData}
                    onChange={(e) => setPatientData(e.target.value)}
                >
                  {patientList.map((patientrow) => (
                      patientrow.role === "PATIENT" && (
                          <MenuItem
                              key={patientrow.id}
                              value={`${patientrow.firstName} ${patientrow.lastName} ${patientrow.nationalNumber}`}
                              onClick={() => {
                                setPatient(patientrow);
                                setPatientData(`${patientrow.firstName} ${patientrow.lastName} ${patientrow.nationalNumber}`);
                              }}
                          >
                            {`${patientrow.firstName} ${patientrow.lastName} ${patientrow.nationalNumber}`}
                          </MenuItem>
                      )
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="appointment-label">Appointments</InputLabel>
                <Select
                    labelId="appointment-label"
                    name="appointments"
                    label="Doctor Appointments"
                    value={appointmentData}
                    onChange={(e) => setAppointmentData(e.target.value)}
                >
                  {filteredAppointments.map((appointment) => (
                      <MenuItem
                          key={appointment.id}
                          value={`${appointment.doctor.firstName} ${appointment.doctor.lastName} ${appointment.date} ${appointment.time}`}
                          onClick={() => {
                            setDoctorAppointment(appointment);
                            setAppointmentData(`${appointment.doctor.firstName} ${appointment.doctor.lastName} ${appointment.date} ${appointment.time}`);
                          }}
                      >
                        {`${appointment.doctor.firstName} ${appointment.doctor.lastName} ${appointment.date} ${appointment.time}`}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                    name="status"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"SCHEDULED"}>SCHEDULED</MenuItem>
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
