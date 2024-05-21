package com.clinic.management.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinic.management.model.DoctorAppointment;
import com.clinic.management.service.DoctorAppointmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/doctor-appointments")
public class DoctorAppointmentController {
  @Autowired
  private DoctorAppointmentService doctorAppointmentService;

  @GetMapping("/all")
  public ResponseEntity<List<DoctorAppointment>> getAllDoctorAppointment() {
    return ResponseEntity.ok(doctorAppointmentService.findAllDoctorAppointment());
  }

  @PostMapping("/create")
  public ResponseEntity<DoctorAppointment> createDoctorAppointment(@RequestBody DoctorAppointment doctorAppointment) {
    return ResponseEntity.ok(doctorAppointmentService.saveDoctorAppointment(doctorAppointment));
  }

  @PutMapping("/{id}")
  public ResponseEntity<DoctorAppointment> updateDoctorAppointment(@PathVariable Long id,
      @RequestBody DoctorAppointment doctorAppointmentDetails) {
    DoctorAppointment updatedPatient = doctorAppointmentService.updateDoctorAppointment(id, doctorAppointmentDetails);
    return ResponseEntity.ok(updatedPatient);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteDoctorAppointment(@PathVariable Long id) {
    doctorAppointmentService.deleteDoctorAppointment(id);
    return ResponseEntity.ok().build();
  }
}
