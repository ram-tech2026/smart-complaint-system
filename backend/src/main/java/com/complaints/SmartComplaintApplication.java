package com.complaints;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartComplaintApplication {

    public static void main(String[] args) {
        // Ensure uploads directory exists on startup
        java.io.File dir = new java.io.File("uploads");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        SpringApplication.run(SmartComplaintApplication.class, args);
    }
}
