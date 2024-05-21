package com.clinic.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinic.management.model.DoctorAppointment;
import com.clinic.management.model.User;

public interface DoctorAppointmentRepository extends JpaRepository<DoctorAppointment, Long> {
    public List<DoctorAppointment> findByDoctorAndTime(User docUser, String time);
}
