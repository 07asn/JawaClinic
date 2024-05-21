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

export default function ProductForm({ url, method, productData }) {
  const [name, setname] = React.useState(productData.name);

  const [price, setprice] = React.useState(productData.price);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productObject = {
      name: name,
      price: price,
    };

    console.log(productObject);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productObject),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);

        window.location.reload();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Some error occur. Try again! " + error.message);
    }
  };

  return (
    <Grid>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="name"
              label="Name"
              autoComplete="given-name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="price"
              label="Price"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
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
