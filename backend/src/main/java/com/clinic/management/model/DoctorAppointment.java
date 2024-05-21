package com.clinic.management.model;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class DoctorAppointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String date;
  private String time;
  private String status; // Available or Not Available

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private User doctor;
}
