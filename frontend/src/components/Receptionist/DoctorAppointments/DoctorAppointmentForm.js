import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import CustomAlert from "../../CustomAlert"; // Import CustomAlert component

export default function DoctorAppointmentForm({ url, method, userData }) {
  const theme = useTheme();

  const [doctorList, setDoctorList] = React.useState([]);
  const [doctorName, setDoctorName] = React.useState("");
  const [date, setDate] = React.useState(userData.date || "");
  const [time, setTime] = React.useState(userData.time || "");
  const [status, setStatus] = React.useState(userData.status || "AVAILABLE");
  const [doctor, setDoctor] = React.useState(userData.doctor || null);

  // State variables for managing alerts
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  React.useEffect(() => {
    console.log(userData);
    fetch("http://localhost:8080/api/users/all", {
      method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDoctorList(data);
        });
  }, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      setAlertMessage("You cannot schedule an appointment in the past.");
      setAlertSeverity("error");
      setAlertOpen(true);
      setStatus("NOT AVAILABLE");
      return;
    }

    const userObject = {
      date: date,
      time: time,
      status: status,
      doctor: doctor,
    };

    for (const key in userObject) {
      if (!userObject[key]) {
        setAlertMessage("Please fill in all fields.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }
    }

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
        if (result.id) {
          setAlertMessage("Successfully saved data!");
          setAlertSeverity("success");
          setAlertOpen(true);
          window.location.reload();
        } else {
          setAlertMessage("Appointment already exists!");
          setAlertSeverity("warning");
          setAlertOpen(true);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setAlertMessage("Some error occurred. Try again!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
      <Grid>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="doctor-label">Doctor</InputLabel>
                <Select
                    labelId="doctor-label"
                    name="doctor"
                    label="Doctor"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                >
                  {doctorList.map((doctor) => {
                    if (doctor.role === "DOCTOR") {
                      return (
                          <MenuItem
                              key={doctor.id}
                              value={`${doctor.firstName} ${doctor.lastName}`}
                              onClick={() => {
                                setDoctor(doctor);
                                setDoctorName(`${doctor.firstName} ${doctor.lastName}`);
                              }}
                          >
                            {`${doctor.id} ${doctor.firstName} ${doctor.lastName}`}
                          </MenuItem>
                      );
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  placeholder="YYYY-MM-DD"
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="time"
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
              />
            </Grid>

            {method === "PUT" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value={"AVAILABLE"}>AVAILABLE</MenuItem>
                      <MenuItem value={"NOT AVAILABLE"}>NOT AVAILABLE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            ) : null}

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* CustomAlert component mapped with alerts */}
        <CustomAlert
            open={alertOpen}
            handleClose={handleCloseAlert}
            message={alertMessage}
            severity={alertSeverity}
        />
      </Grid>
  );
}