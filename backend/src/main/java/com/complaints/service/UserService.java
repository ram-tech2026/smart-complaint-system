package com.complaints.service;

import com.complaints.dto.AuthDto;
import com.complaints.entity.User;
import com.complaints.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // NOTE: Should use PasswordEncoder in production
        user.setRole(User.Role.USER); // Public registration is always USER — admin is seeded on startup

        User savedUser = userRepository.save(user);
        return mapToAuthResponse(savedUser);
    }

    public AuthDto.AuthResponse login(AuthDto.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return mapToAuthResponse(user);
    }

    private AuthDto.AuthResponse mapToAuthResponse(User user) {
        AuthDto.AuthResponse response = new AuthDto.AuthResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setToken("mock-token-" + user.getId()); // Mock token
        return response;
    }

    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
