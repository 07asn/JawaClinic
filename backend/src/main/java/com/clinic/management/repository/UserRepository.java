package com.clinic.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinic.management.model.Role;
import com.clinic.management.model.User;

public interface UserRepository extends JpaRepository<User, Long>
{
  List<User> findByRole(String role);

  Optional<User> findByEmail(String username);

  Optional<User>  findByEmailAndPassword(String email, String password);

}

