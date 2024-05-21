import React from "react";
import { Typography, Grid, Box, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../img/logoNew1.png";
import DoctorLayout from "./DoctorLayout";

export default function DoctorHome() {
    return (
        <>
            <DoctorLayout />
            <Box sx={{ padding: 5 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Left side: Image */}
                    <Grid item xs={12} md={6}>
                        <img
                            src={image}
                            alt="Doctor"
                            style={{ width: "75%", height: "auto", borderRadius: '10px' }}
                        />
                    </Grid>

                    {/* Right side: Content */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            {[
                                { to: "/doctor-appointments", title: "See your Appointments", description: "Click here to see your appointments." },
                            ].map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Typography
                                                variant="h5"
                                                component="h2"
                                                sx={{ marginBottom: 2, color: "#0096ff", fontWeight: 'bold' }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: "#555", marginBottom: 2 }}>
                                                {item.description}
                                            </Typography>
                                            <Button
                                                component={Link}
                                                to={item.to}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#0096ff",
                                                    color: "#fff",
                                                    borderRadius: 2,
                                                    padding: "10px 20px",
                                                    textTransform: "none",
                                                    "&:hover": {
                                                        backgroundColor: "#007acc",
                                                    },
                                                }}
                                            >
                                                {item.title}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
