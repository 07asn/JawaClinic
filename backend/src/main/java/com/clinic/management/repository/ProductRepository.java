package com.clinic.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinic.management.model.Clinic;
import com.clinic.management.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}