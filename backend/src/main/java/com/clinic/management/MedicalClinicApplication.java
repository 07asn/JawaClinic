package com.clinic.management;

import com.clinic.management.model.Role;
import com.clinic.management.model.User;
import com.clinic.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;
import java.util.Date;
import java.util.EnumSet;

@SpringBootApplication
public class MedicalClinicApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(MedicalClinicApplication.class, args);
    }

    @Autowired
    UserService userService;

    @Override
    public void run(String... args) throws Exception {

        User testUser = User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("manager@example.com")
                .phoneNumber("1234567890")
                .password("12345678")
                .dateOfBirth(new Date())
                .nationalNumber("12345678901")
                .gender("Male")
                .city("New York")
                .role(Role.MANAGER.name())
                .build();

        userService.saveUser(testUser);
    }

}
