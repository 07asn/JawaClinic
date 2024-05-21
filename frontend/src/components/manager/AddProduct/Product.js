import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Add from "@mui/icons-material/Add";
import ManagerLayout from "../ManagerLayout";
import ProductData from "./ProductData";
import ProductForm from "./ProductForm";

export default function Product() {
  const [show, setShow] = React.useState(false);
  const productData = {
    name: "",
    price: "",
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <ManagerLayout></ManagerLayout>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          flexDirection: "row",
          marginTop: 3,
          alignContent: "center",
        }}
      >
        <Grid item>
          <Typography align="center" variant="h5">
            Products Record
          </Typography>

          <Grid justifyContent="flex-end">
            <Button
              color="info"
              onClick={() => {
                setShow(true);
              }}
            >
              <Add />
              Add Product
            </Button>
          </Grid>

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
            <DialogTitle>Add</DialogTitle>
            <ProductForm
              url={"http://localhost:8080/api/products/create"}
              method={"POST"}
              productData={productData}
            />
          </Dialog>

          <ProductData />
        </Grid>
      </Grid>
    </>
  );
}
