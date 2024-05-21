import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Patient from "./components/Receptionist/PatientRecord/Patient";
import DoctorAppointment from "./components/Receptionist/DoctorAppointments/DoctorAppointment";
import PatientAppointment from "./components/Receptionist/PatientAppointments/PatientAppointment";
import ReceptionistAccount from "./components/Receptionist/ReceptionistAccount";
import PatientAccount from "./components/Patient/PatientAccount";
import BookAppointment from "./components/Patient/BookAppointment/BookAppointment";
import Appointments from "./components/Patient/Appointments/Appointments";
import DoctorAccount from "./components/Doctor/DoctorAccount";
import DoctorAllAppointments from "./components/Doctor/DoctorAllAppointments/DoctorAllAppointments";

import NewUserLayout from "./components/manager/NewEmployee/layout";
import ManagerAccount from "./components/manager/ManagerAccount";
import Clinic from "./components/manager/Clinic/Clinic";
import DoctorHome from "./components/Doctor/DoctorHome";
import PatientHome from "./components/Patient/PatientHome";
import ReceptionistHome from "./components/Receptionist/ReceptionistHome";
import ManagerHome from "./components/manager/ManagerHome";
import Product from "./components/manager/AddProduct/Product";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/manager" element={<ManagerHome />} />
        <Route path="/create-new-user" element={<NewUserLayout />} />
        <Route path="/manager-account" element={<ManagerAccount />} />
        <Route path="/create-new-clinic" element={<Clinic />} />
        <Route path="/create-new-product" element={<Product />} />

        <Route path="/receptionist" element={<ReceptionistHome />} />
        <Route path="/receptionist-account" element={<ReceptionistAccount />} />
        <Route path="/patient-record" element={<Patient />} />
        <Route path="/doctor-appointment" element={<DoctorAppointment />} />
        <Route path="/patient-appointment" element={<PatientAppointment />} />

        <Route path="/patient" element={<PatientHome />} />
        <Route path="/patient-account" element={<PatientAccount />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointments" element={<Appointments />} />

        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor-account" element={<DoctorAccount />} />
        <Route
          path="/doctor-appointments"
          element={<DoctorAllAppointments />}
        />
      </Routes>
    </Router>
  );
}

export default App;
