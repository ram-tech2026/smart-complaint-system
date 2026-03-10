package com.complaints.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.complaints.entity.Complaint;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendResolutionEmail(Complaint complaint) {
        if (mailSender == null) {
            System.out.println("WARN: JavaMailSender is not configured. Email will not be sent to: "
                    + complaint.getUser().getEmail());
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(complaint.getUser().getEmail());
            message.setSubject("Your Complaint Has Been Resolved - SMCS");

            String text = String.format(
                    "Dear %s,\n\nWe are writing to inform you that your reported issue '%s' has been officially marked as RESOLVED by the local municipal administration.\n\nThank you for helping us keep our city clean and safe!\n\nBest regards,\nSmart Complaint Management System Team",
                    complaint.getUser().getFullName(),
                    complaint.getTitle());

            message.setText(text);
            mailSender.send(message);
            System.out.println("Resolution email sent to: " + complaint.getUser().getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send resolution email: " + e.getMessage());
            // In a real hackathon project we catch and log so the main thread doesn't crash
            // the Complaint save operation if SMTP authentication fails
        }
    }
}
