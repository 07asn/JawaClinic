package com.clinic.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinic.management.model.Clinic;
import com.clinic.management.model.Product;
import com.clinic.management.model.User;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
    public Clinic findByDoctor(User doctor);
}
