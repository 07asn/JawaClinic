package com.clinic.management.model;

import java.util.Date;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String phoneNumber;

  @Column(nullable = false)
  private String password;

  @Temporal(TemporalType.DATE)
  private Date dateOfBirth;

  @Column(nullable = false, unique = true)
  private String nationalNumber;

  @Column(nullable = false)
  private String gender;

  @Column(nullable = false)
  private String city;

  @Column(nullable = false)
  private String role;

}
