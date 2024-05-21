package com.clinic.management.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PatientAppointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private User patient;

  private String status; // e.g.,"WaitList" "Scheduled", "Cancelled"
  private String diagnosis; // edit by doctor

  @OneToMany(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "service_id")
  private List<Product> services;

  @OneToOne
  @JoinColumn(name = "doctor_appointment_id")
  private DoctorAppointment doctorAppointment;

}
