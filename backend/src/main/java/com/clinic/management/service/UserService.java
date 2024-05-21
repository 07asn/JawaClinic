package com.clinic.management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinic.management.model.Role;
import com.clinic.management.model.User;
import com.clinic.management.repository.UserRepository;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getLoggedInUser(User user) {
        Optional<User> existingUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (existingUser.isPresent()) {
            return existingUser.get();
        }
        return null;
    }

    public User saveUser(User user) {
        if (findByEmail(user).isEmpty()) {
            if (checkEmail(user.getEmail())) {
                if (user.getPassword().length() >= 8) {
                    if (user.getNationalNumber().length() >= 7) {
                        return userRepository.save(user);

                    }
                }

            }
        }
        return null;
    }

    boolean checkEmail(String email) {
        String EMAIL_REGEX = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();

    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public List<User> findByRole(Role role) {
        return userRepository.findByRole(role.name());
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setDateOfBirth(userDetails.getDateOfBirth());
        user.setNationalNumber(userDetails.getNationalNumber());
        user.setGender(userDetails.getGender());
        user.setCity(userDetails.getCity());
        user.setRole(userDetails.getRole());
        user.setPassword(userDetails.getPassword());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByEmail(User user) {
        return userRepository.findByEmail(user.getEmail());
    }

    public User fetchUser(Long id) {
        return userRepository.findById(id).get();
    }
}
