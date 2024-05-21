package com.clinic.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinic.management.model.DoctorAppointment;
import com.clinic.management.model.PatientAppointment;
import com.clinic.management.model.Product;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

//import com.clinic.management.model.Patient;
import com.clinic.management.model.User;
import com.clinic.management.repository.DoctorAppointmentRepository;
import com.clinic.management.repository.PatientAppointmentRepository;
//import com.clinic.management.repository.PatientRepository;
import com.clinic.management.repository.UserRepository;

@Service
public class PatientAppointmentService {

  @Autowired
  private PatientAppointmentRepository appointmentRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private DoctorAppointmentRepository doctorAppointmentRepository;

  public PatientAppointment savePatientAppointment(PatientAppointment appointment) {
    DoctorAppointment doctorAppointment = doctorAppointmentRepository
        .findById(appointment.getDoctorAppointment().getId()).get();
    doctorAppointment.setStatus("NOT AVAILABLE");
    doctorAppointmentRepository.save(doctorAppointment);

    appointment.setDoctorAppointment(doctorAppointment);
    return appointmentRepository.save(appointment);
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

  public List<PatientAppointment> getAllPatientAppointments() {
    List<PatientAppointment> patientAppointments = appointmentRepository.findAll();

    for (int i = 0; i < patientAppointments.size(); i++) {

      for (int j = i + 1; j < patientAppointments.size(); j++) {

        LocalDateTime dateTime1 = parseDateTime(patientAppointments.get(i).getDoctorAppointment().getDate(),
            patientAppointments.get(i).getDoctorAppointment().getTime());

        LocalDateTime dateTime2 = parseDateTime(patientAppointments.get(j).getDoctorAppointment().getDate(),
            patientAppointments.get(j).getDoctorAppointment().getTime());

        if (dateTime1.compareTo(dateTime2) < 0) {
          PatientAppointment temp = patientAppointments.get(i);
          patientAppointments.set(i, patientAppointments.get(j));
          patientAppointments.set(j, temp);
        }
      }
    }

    return patientAppointments;
  }

  public void deletePatientAppointment(Long id) {
    appointmentRepository.deleteById(id);
  }

  public void deletePatientAppointmentWithDoctorId(DoctorAppointment doctorAppointment) {

    PatientAppointment patientAppointment = appointmentRepository.findByDoctorAppointment(doctorAppointment);
    if (patientAppointment != null) {

      deletePatientAppointment(patientAppointment.getId());
    }
  }

  public PatientAppointment updatePatientAppointment(Long appointmentId, PatientAppointment patientAppointment) {
    PatientAppointment appointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appointment.setServices(patientAppointment.getServices());
    appointment.setDiagnosis(patientAppointment.getDiagnosis());
    appointment.setDoctorAppointment(patientAppointment.getDoctorAppointment());
    appointment.setPatient(patientAppointment.getPatient());
    appointment.setStatus(patientAppointment.getStatus());

    return appointmentRepository.save(appointment);
  }

  public List<PatientAppointment> getPatientAppointments(Long id) {

    User patient = userRepository.findById(id).get();

    return appointmentRepository.findAllByPatient(patient);
  }

  public String getPrice(Long id) {

    double sum = 0;

    List<PatientAppointment> patientAppointments = getAllPatientAppointments();

    for (PatientAppointment patientAppointment : patientAppointments) {

      if (patientAppointment.getDoctorAppointment().getDoctor().getId() == id) {
        sum = calculatePrice(patientAppointment.getServices());
        break;
      }

    }

    return Double.toString(sum);
  }

  double calculatePrice(List<Product> products) {

    double sum = 0;

    for (Product product : products) {
      sum = sum + product.getPrice();
    }
    return sum;

  }

}
