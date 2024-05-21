package com.clinic.management.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinic.management.model.DoctorAppointment;
import com.clinic.management.model.PatientAppointment;
import com.clinic.management.model.User;
import com.clinic.management.repository.DoctorAppointmentRepository;
import com.clinic.management.repository.PatientAppointmentRepository;
import com.clinic.management.repository.UserRepository;

@Service
public class DoctorAppointmentService {

  @Autowired
  private DoctorAppointmentRepository doctorAppointmentRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PatientAppointmentService patientAppointmentService;

  public DoctorAppointment saveDoctorAppointment(DoctorAppointment patient) {
    User user = userRepository.findById(patient.getDoctor().getId()).get();
    patient.setDoctor(user);

    boolean flag = true;
    List<DoctorAppointment> doctorAppointments = doctorAppointmentRepository.findByDoctorAndTime(patient.getDoctor(),
        patient.getTime());

    for (DoctorAppointment doctorAppointment : doctorAppointments) {
      if (doctorAppointment != null) {
        System.out.println(patient.getDate().equals(doctorAppointment.getDate()));

        if (!patient.getDate().equals(doctorAppointment.getDate())) {

          flag = true;
        } else {
          flag = false;
          break;
        }

      }
    }

    if (flag) {

      return doctorAppointmentRepository.save(patient);
    }
    return patient;
  }

  public void deleteDoctorAppointment(Long id) {
    DoctorAppointment doctorAppointment = findDoctorAppointmentById(id);
    patientAppointmentService.deletePatientAppointmentWithDoctorId(doctorAppointment);
    doctorAppointmentRepository.deleteById(id);
  }

  LocalDateTime parseDateTime(String dateString, String timeString) {
    String datePattern = "yyyy-MM-dd";
    String timePattern = "HH:mm";

    try {
      // Define the formatters
      DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern(datePattern);
      DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern(timePattern);

      // Parse the date and time strings
      LocalDate date = LocalDate.parse(dateString, dateFormatter);
      LocalTime time = LocalTime.parse(timeString, timeFormatter);

      // Combine date and time into LocalDateTime
      return LocalDateTime.of(date, time);
    } catch (DateTimeParseException e) {
      e.printStackTrace();
      return null; // or throw an exception, or handle it as per your needs
    }
  }

  public List<DoctorAppointment> findAllDoctorAppointment() {
    List<DoctorAppointment> doctorAppointments = doctorAppointmentRepository.findAll();

    for (int i = 0; i < doctorAppointments.size(); i++) {

      for (int j = i + 1; j < doctorAppointments.size(); j++) {

        LocalDateTime dateTime1 = parseDateTime(doctorAppointments.get(i).getDate(),
            doctorAppointments.get(i).getTime());

        LocalDateTime dateTime2 = parseDateTime(doctorAppointments.get(j).getDate(),
            doctorAppointments.get(j).getTime());

        if (dateTime1.compareTo(dateTime2) < 0) {
          DoctorAppointment temp = doctorAppointments.get(i);
          doctorAppointments.set(i, doctorAppointments.get(j));
          doctorAppointments.set(j, temp);
        }
      }
    }

    return doctorAppointments;
  }

  public DoctorAppointment updateDoctorAppointment(Long id, DoctorAppointment doctorAppointment) {
    User user = userRepository.findById(doctorAppointment.getDoctor().getId()).get();
    DoctorAppointment updatedDoctorAppointment = doctorAppointmentRepository.findById(id).get();

    updatedDoctorAppointment.setDate(doctorAppointment.getDate());
    updatedDoctorAppointment.setTime(doctorAppointment.getTime());
    updatedDoctorAppointment.setStatus(doctorAppointment.getStatus());
    updatedDoctorAppointment.setDoctor(user);

    return doctorAppointmentRepository.save(updatedDoctorAppointment);

  }

  public DoctorAppointment findDoctorAppointmentById(Long id) {
    return doctorAppointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
  }
}
