package com.clinic.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinic.management.model.PatientAppointment;
import com.clinic.management.service.PatientAppointmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/patient-appointments")
public class PatientAppointmentController {
  @Autowired
  private PatientAppointmentService appointmentService;

  @PostMapping("/create")
  public ResponseEntity<PatientAppointment> createAppointment(@RequestBody PatientAppointment appointment) {
    return ResponseEntity.ok(appointmentService.savePatientAppointment(appointment));
  }

  @PutMapping("/{id}")
  public ResponseEntity<PatientAppointment> updateAppointment(@PathVariable Long id,
      @RequestBody PatientAppointment appointmentDetails) {
    PatientAppointment updatedAppointment = appointmentService.updatePatientAppointment(id, appointmentDetails);
    return ResponseEntity.ok(updatedAppointment);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
    appointmentService.deletePatientAppointment(id);
    return ResponseEntity.ok()
        .build();
  }

  @GetMapping("/all")
  public ResponseEntity<List<PatientAppointment>> getAvailableAppointments() {
    List<PatientAppointment> appointments = appointmentService.getAllPatientAppointments();
    return ResponseEntity.ok(appointments);
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<List<PatientAppointment>> getPatientAppointments(@PathVariable Long id) {
    List<PatientAppointment> appointments = appointmentService.getPatientAppointments(id);
    return ResponseEntity.ok(appointments);
  }

  @GetMapping("/price/{id}")
  public ResponseEntity<String> getPrice(@PathVariable Long id) {
    String price = appointmentService.getPrice(id);
    return ResponseEntity.ok(price);
  }
}
