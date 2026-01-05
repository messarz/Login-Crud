package com.example.crud.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserInfo {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner loadUsers(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                // Create sample users
                User admin = new User("admin", passwordEncoder.encode("admin123"), "admin@f1.com");
                admin.setRole("ADMIN");

                User user1 = new User("f1fan", passwordEncoder.encode("password123"), "fan@f1.com");
                User user2 = new User("racer", passwordEncoder.encode("password123"), "racer@f1.com");

                userRepository.save(admin);
                userRepository.save(user1);
                userRepository.save(user2);

                System.out.println("Sample users created:");
                System.out.println("Admin: admin/admin123");
                System.out.println("User1: f1fan/password123");
                System.out.println("User2: racer/password123");
            }
        };
    }
}
