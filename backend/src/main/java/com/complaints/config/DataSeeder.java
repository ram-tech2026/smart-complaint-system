package com.complaints.config;

import com.complaints.entity.User;
import com.complaints.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Auto-create default Admin if not already present
        String adminEmail = "byreddyramireddy987@gmail.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setFullName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword("Ramireddy@2004");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Default ADMIN account created: " + adminEmail);
        } else {
            System.out.println("Admin account already exists, skipping seed.");
        }
    }
}
