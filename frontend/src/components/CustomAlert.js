// CustomAlert.js
import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

const CustomAlert = ({ open, handleClose, message }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2">
                    Alert
                </Typography>
                <Typography sx={{ mt: 2 }}>{message}</Typography>
                <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default CustomAlert;
