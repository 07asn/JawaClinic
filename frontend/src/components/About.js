import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import img from "./img/about-img.jpg";
import ContactSection from "./ContactSection";

export default function About() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    padding: 9,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={img}
                            alt="About Us"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: 5,
                                transition: "box-shadow 0.3s ease",
                                boxShadow: isHovered ? "0px 0px 20px rgba(0, 0, 0, 0.5)" : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                paddingLeft: { md: 4 },
                                paddingTop: { xs: 2, md: 0 },
                            }}
                        >
                            <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
                                About Us
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#555" }}>
                                Our clinic is a beacon of modern healthcare, dedicated to providing comprehensive and compassionate medical services to our community. Nestled in the heart of our city, we pride ourselves on delivering top-notch care tailored to the diverse needs of our patients. With a team of highly skilled healthcare professionals and state-of-the-art facilities, we strive to ensure every individual receives personalized attention and the highest quality treatment. From routine check-ups to specialized care, our clinic offers a wide range of medical services designed to promote wellness and improve the overall health and wellbeing of our patients. At our clinic, we prioritize patient comfort, safety, and satisfaction, making every visit a positive and empowering experience.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <br />
                <ContactSection />
            </Box>
        </>
    );
}
