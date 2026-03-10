package com.complaints.dto;

import lombok.Data;

public class AuthDto {

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class RegisterRequest {
        private String fullName;
        private String email;
        private String password;
        private String role; // "USER" or "ADMIN"
    }

    @Data
    public static class AuthResponse {
        private Long id;
        private String fullName;
        private String email;
        private String role;
        private String token; // For future JWT, basic mock for now
    }
}
