package com.clinic.management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.clinic.management.model.DoctorAppointment;
import com.clinic.management.model.PatientAppointment;
//import com.clinic.management.model.Patient;
import com.clinic.management.model.User;

public interface PatientAppointmentRepository extends JpaRepository<PatientAppointment, Long> {

    public List<PatientAppointment> findAllByPatient(User user);

    public PatientAppointment findByDoctorAppointment(DoctorAppointment doctorAppointment);

}
