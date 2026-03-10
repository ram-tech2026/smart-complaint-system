package com.complaints.service;

import com.complaints.entity.Complaint;
import com.complaints.entity.User;
import com.complaints.repository.ComplaintRepository;
import com.complaints.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Value("${file.upload.dir}")
    private String uploadDir;

    public ComplaintService(ComplaintRepository complaintRepository, UserRepository userRepository,
            EmailService emailService) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public Complaint createComplaint(Long userId, String title, String description, String category,
            String location, Complaint.Priority priority, MultipartFile image) throws IOException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Complaint complaint = new Complaint();
        complaint.setUser(user);
        complaint.setTitle(title);
        complaint.setDescription(description);
        complaint.setCategory(category);
        complaint.setLocation(location);
        if (priority != null)
            complaint.setPriority(priority);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(image.getInputStream(), filePath);
            complaint.setImageUrl("/uploads/" + fileName);
        }

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getUserComplaints(Long userId) {
        return complaintRepository.findByUserId(userId);
    }

    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    public Complaint updateComplaintStatus(Long id, Complaint.Status status) {
        Complaint complaint = getComplaintById(id);
        Complaint.Status oldStatus = complaint.getStatus();
        complaint.setStatus(status);
        Complaint savedComplaint = complaintRepository.save(complaint);

        // Send email notification when newly resolved
        if (status == Complaint.Status.RESOLVED && oldStatus != Complaint.Status.RESOLVED) {
            emailService.sendResolutionEmail(savedComplaint);
        }

        return savedComplaint;
    }

    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }
}
