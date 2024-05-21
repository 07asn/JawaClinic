package com.clinic.management.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Clinic {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String location;

  @OneToMany(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "product_id")
  private List<Product> products;

  @OneToMany(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "doctor_id")
  private List<User> doctor;

  public Clinic(String name, String location) {
    this.name = name;
    this.location = location;
  }
}
