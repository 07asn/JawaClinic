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
  Typography,
  TextareaAutosize,
  useTheme,
} from "@mui/material";
import CustomAlert from "../../CustomAlert";

export default function DoctorAllAppointmentsForm({
                                                    url,
                                                    method,
                                                    userData,
                                                    doctor,
                                                  }) {
  const theme = useTheme();

  const [serviceslist, setserviceslist] = React.useState([]);
  const [diagnosis, setdiagnosis] = React.useState(userData.diagnosis);
  const [services, setservices] = React.useState(userData.services);
  const [status, setstatus] = React.useState(userData.status);
  const [patient, setpatient] = React.useState(userData.patient);
  const [doctorAppointment, setdoctorAppointment] = React.useState(userData.doctorAppointment);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userObject = {
      diagnosis: diagnosis,
      status: status,
      services: services,
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
        setAlertMessage("Successfully saved data!");
        setAlertSeverity("success");
        setAlertOpen(true);
        window.location.reload();
      } else {
        setAlertMessage("Error: " + result.message);
        setAlertSeverity("error");
        setAlertOpen(true);
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
  const fetchServicesList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/clinics/all/doctor/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Services:", result);
        setserviceslist(result);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  React.useEffect(() => {
    fetchServicesList();
  }, []);

  return (
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor Appointment Form
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2">
                Selected Services
              </Typography>
              <ul>
                {services.map((row) => (
                    <li key={row.id}>
                      {row.name} - ${row.price}
                    </li>
                ))}
              </ul>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Services</InputLabel>
                <Select
                    name="services"
                    label="Services"
                    value=""
                    onChange={(e) => {
                      const selectedService = serviceslist.find(
                          (service) => service.name + " " + service.price === e.target.value
                      );
                      if (selectedService) {
                        setservices((prevServices) => [...prevServices, selectedService]);
                      }
                    }}
                >
                  {serviceslist.map((service) => (
                      <MenuItem
                          key={service.id}
                          value={service.name + " " + service.price}
                      >
                        {service.name} - ${service.price}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextareaAutosize
                    minRows={6}
                    placeholder="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setdiagnosis(e.target.value)}
                    style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CustomAlert
            open={alertOpen}
            handleClose={handleCloseAlert}
            message={alertMessage}
            severity={alertSeverity}
        />
      </Paper>

  );
}
