import React from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import clinicImage from "./img/background.jpg";
import d1 from "./img/d1.jpg";
import d2 from "./img/d2.jpg";
import d3 from "./img/d3.jpg";
import Navbar from "./Navbar";
import ContactSection from "./ContactSection";

const Image = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    }
});

const Home = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ paddingTop: 8 }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Image src={clinicImage} alt="Clinic" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ paddingLeft: { md: 4 }, paddingTop: { xs: 2, md: 0 } }}>
                                <Typography
                                    variant="h3"
                                    component="h1"
                                    sx={{ marginBottom: 2, fontWeight: "bold" }}
                                >
                                    Welcome to Jawa Clinic
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: "text.secondary", marginBottom: 2 }}
                                >
                                    We provide the best medical services with top-notch healthcare
                                    professionals. Our clinic is equipped with the latest medical
                                    technology to ensure you receive the highest quality care.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Services Section */}
                    <Box sx={{ marginTop: 8 }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ marginBottom: 4, fontWeight: "bold", textAlign: "center" }}
                        >
                            Our Services
                        </Typography>
                        <Grid container spacing={4}>
                            {[d1, d2, d3].map((image, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <Image src={image} alt={`Service ${index + 1}`} />
                                    <Typography variant="h6" sx={{ marginTop: 2, textAlign: "center" }}>
                                        {["General Consultation", "Pediatric Care", "Dental Services"][index]}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
                                        {[
                                            "Comprehensive health check-ups and consultations to ensure your well-being.",
                                            "Specialized care for infants, children, and adolescents.",
                                            "Comprehensive dental care for the entire family."
                                        ][index]}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <ContactSection />
                </Container>
            </Box>
        </>
    );
};

export default Home;
