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

export default function DoctorAppointmentForm({ url, method, userData }) {
  const theme = useTheme();

  const [doctorList, setDoctorList] = React.useState([]);

  const [doctorName, setDoctorName] = React.useState("");

  const [date, setdate] = React.useState(userData.date);
  const [time, settime] = React.useState(userData.time);
  const [status, setstatus] = React.useState(userData.status);
  const [doctor, setdoctor] = React.useState(userData.doctor);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userObject = {
      date: date,
      time: time,
      status: status,
      doctor: doctor,
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
        if (result.id) {
          alert("Successfully saved data!");
          window.location.reload();
        } else {
          alert("Appointment Already exists!");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Some error occur. Try again! ");
    }
  };

  React.useEffect(() => {
    console.log(userData);
    fetch("http://localhost:8080/api/users/all", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDoctorList(data);
      });
  }, []);

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
                onChange={(e) => {
                  setDoctorName(e.target.value);
                }}
              >
                {doctorList.map((doctor) => {
                  if (doctor.role === "DOCTOR") {
                    return (
                      <MenuItem
                        key={doctor.id}
                        value={doctor.firstName + " " + doctor.lastName}
                        onClick={() => {
                          setdoctor(doctor);
                          setDoctorName(
                            doctor.firstName + " " + doctor.lastName
                          );
                        }}
                      >
                        {doctor.id +
                          " " +
                          doctor.firstName +
                          " " +
                          doctor.lastName}
                      </MenuItem>
                    );
                  }
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
              onChange={(e) => {
                setdate(e.target.value);
              }}
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
              onChange={(e) => {
                settime(e.target.value);
              }}
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
                  onChange={(e) => {
                    setstatus(e.target.value);
                  }}
                >
                  <MenuItem value={"AVAILABLE"}>AVAILABLE</MenuItem>

                  <MenuItem value={"NOT AVAILABLE"}>NOT AVAILABLE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <></>
          )}

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
