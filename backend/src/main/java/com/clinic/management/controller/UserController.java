package com.clinic.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinic.management.model.Role;
import com.clinic.management.model.User;
import com.clinic.management.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/create")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User newUser = userService.saveUser(user);
    if (user != null) {
      return ResponseEntity.ok(newUser);
    }
    return (ResponseEntity) ResponseEntity.badRequest();
  }

  @PostMapping("/login")
  public ResponseEntity<User> login(@RequestBody User user) {
    return ResponseEntity.ok(userService.getLoggedInUser(user));
  }

  // Add to existing UserController

  @PostMapping("/register")
  public ResponseEntity<User> registerPatient(@RequestBody User user) {
    User savedUser = userService.saveUser(user);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return ResponseEntity.ok(userService.findUserById(id));
  }

  @GetMapping("/all")
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAllUsers());
  }

  @GetMapping("/user/{id}")
  public User fetchUser(@PathVariable Long id) {
    return userService.fetchUser(id);
  }

  @GetMapping("/role/{role}")
  public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) {
    List<User> users = userService.findByRole(role);
    return ResponseEntity.ok(users);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
    userDetails.setRole(userDetails.getRole().toUpperCase());
    return ResponseEntity.ok(userService.updateUser(id, userDetails));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok("User deleted successfully.");
  }
}
