// Imports...
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
  Typography,
} from "@mui/material";

export default function ClinicForm({ url, method, clinicData }) {
  const [productList, setProductList] = React.useState(clinicData.products);
  const [doctorsList, setDoctorsList] = React.useState(clinicData.doctor);
  const [name, setName] = React.useState(clinicData.name);
  const [location, setLocation] = React.useState(clinicData.location);
  const [products, setProducts] = React.useState(clinicData.products);
  const [doctors, setDoctors] = React.useState(clinicData.doctor);
  const [selectedProduct, setSelectedProduct] = React.useState(clinicData.products);
  const [selectedDoctor, setSelectedDoctor] = React.useState(clinicData.doctor);

  React.useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/products/all").then((res) => res.json()),
      fetch("http://localhost:8080/api/users/all").then((res) => res.json()),
      fetch("http://localhost:8080/api/clinics/all/products").then((res) => res.json()),
      fetch("http://localhost:8080/api/clinics/all/doctors").then((res) => res.json())
    ]).then(([productData, userData, clinicProductData, clinicDoctorData]) => {
      setProductList(productData);
      // Filter users with DOCTOR role
      const doctorUsers = userData.filter(user => user.role === "DOCTOR");
      setDoctorsList(doctorUsers);
      // Assuming clinicData contains selected products and doctors for the clinic
      setSelectedProduct(clinicData.products);
      setSelectedDoctor(clinicData.doctor);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);





  const handleProductAdd = () => {
    if (selectedProduct) {
      setProducts([...products, selectedProduct]);
      setSelectedProduct("");
    }
  };

  const handleProductRemove = (product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleDoctorAdd = () => {
    if (selectedDoctor) {
      setDoctors([...doctors, selectedDoctor]);
      setSelectedDoctor("");
    }
  };

  const handleDoctorRemove = (doctor) => {
    setDoctors(doctors.filter((d) => d.id !== doctor.id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clinicObject = {
      name: name,
      location: location,
      products: products,
      doctor: doctors,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clinicObject),
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
                    setName(e.target.value);
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Products</InputLabel>
                <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  {productList.map((product) => (
                      <MenuItem key={product.id} value={product}>
                        {product.name} - {product.price}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handleProductAdd}>Add Product</Button>
              <ul>
                {products.map((product) => (
                    <li key={product.id}>
                      {product.name} - {product.price}
                      <Button onClick={() => handleProductRemove(product)}>
                        Remove
                      </Button>
                    </li>
                ))}
              </ul>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Doctors</InputLabel>
                <Select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  {doctorsList.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor}>
                        {doctor.firstName} {doctor.lastName}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handleDoctorAdd}>Add Doctor</Button>
              <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                      <Button onClick={() => handleDoctorRemove(doctor)}>
                        Remove
                      </Button>
                    </li>
                ))}
              </ul>
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
