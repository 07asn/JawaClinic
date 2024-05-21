package com.clinic.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinic.management.model.Clinic;
import com.clinic.management.model.Product;
import com.clinic.management.model.User;
import com.clinic.management.service.ClinicService;

@RestController
@RequestMapping("/api/clinics")
@CrossOrigin(origins = "http://localhost:3000")
public class ClinicController {

  @Autowired
  private ClinicService clinicService;

  @PostMapping("/create")
  public ResponseEntity<Clinic> createClinic(@RequestBody Clinic clinic) {
    return ResponseEntity.ok(clinicService.saveClinic(clinic));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Clinic> getClinicById(@PathVariable Long id) {
    return ResponseEntity.ok(clinicService.findClinicById(id));
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<Clinic> updateClinic(@PathVariable Long id, @RequestBody Clinic clinicDetails) {
    return ResponseEntity.ok(clinicService.updateClinic(id, clinicDetails));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteClinic(@PathVariable Long id) {
    clinicService.deleteClinic(id);
    return ResponseEntity.ok("Clinic deleted successfully.");
  }

  @GetMapping("/all")
  public ResponseEntity<List<Clinic>> getAllClinics() {
    return ResponseEntity.ok(clinicService.getAllClinics());
  }

  @GetMapping("/all/products")
  public ResponseEntity<List<Product>> getAllClinicsProducts() {
    return ResponseEntity.ok(clinicService.getAllClinicsProducts());
  }

  @GetMapping("/all/doctors")
  public ResponseEntity<List<User>> getAllClinicsDoctors() {
    return ResponseEntity.ok(clinicService.getAllClinicsDoctors());
  }

  @PostMapping("/all/doctor/services")
  public ResponseEntity<List<Product>> getAllDoctorProducts(@RequestBody User doctor) {
    return ResponseEntity.ok(clinicService.findClinicProductsByDoctor(doctor));
  }
}
