package com.clinic.management.service;

import com.clinic.management.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.clinic.management.model.Clinic;
import com.clinic.management.model.Product;
import com.clinic.management.repository.ClinicRepository;
import com.clinic.management.repository.ProductRepository;
import com.clinic.management.repository.UserRepository;

@Service
public class ClinicService {

  @Autowired
  private ClinicRepository clinicRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  public Clinic saveClinic(Clinic clinic) {
    List<Product> products = new ArrayList<>();
    List<User> doctors = new ArrayList<>();

    if (clinic.getProducts() != null) {
      for (Product product : clinic.getProducts()) {

        products.add(productRepository.findById(product.getId()).get());

      }
    }

    if (clinic.getDoctor() != null) {
      for (User product : clinic.getDoctor()) {

        doctors.add(userRepository.findById(product.getId()).get());

      }
    }

    clinic.setDoctor(doctors);
    clinic.setProducts(products);

    return clinicRepository.save(clinic);
  }

  public Clinic updateClinic(Long id, Clinic clinicDetails) {
    Clinic clinic = clinicRepository.findById(id).orElseThrow(() -> new RuntimeException("Clinic not found"));
    clinic.setName(clinicDetails.getName());
    clinic.setDoctor(clinicDetails.getDoctor());
    clinic.setLocation(clinicDetails.getLocation());
    clinic.setProducts(clinicDetails.getProducts());
    return clinicRepository.save(clinic);
  }

  public void deleteClinic(Long id) {
    clinicRepository.deleteById(id);
  }

  public List<Clinic> getAllClinics() {
    return clinicRepository.findAll();
  }

  public List<Product> getAllClinicsProducts() {
    List<Product> products = new ArrayList<>();

    List<Clinic> clinics = getAllClinics();

    for (Clinic clinic : clinics) {
      for (Product product : clinic.getProducts()) {
        products.add(product);
      }

    }

    return products;
  }

  public List<User> getAllClinicsDoctors() {
    List<User> products = new ArrayList<>();

    List<Clinic> clinics = getAllClinics();

    for (Clinic clinic : clinics) {
      for (User product : clinic.getDoctor()) {
        products.add(product);
      }

    }

    return products;
  }

  public List<Product> findClinicProductsByDoctor(User doctor) {
    System.out.println("ID: " + doctor.getId());

    List<Clinic> clinics = getAllClinics();

    List<Product> products = new ArrayList<>();

    for (Clinic clinic : clinics) {

      for (User user : clinic.getDoctor()) {
        if (user.getId() == doctor.getId()) {

          for (Product product : clinic.getProducts()) {
            products.add(product);
          }
          break;
        }
      }

    }

    return products;

  }

  public Clinic findClinicById(Long id) {
    return clinicRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Clinic not found"));
  }

}
