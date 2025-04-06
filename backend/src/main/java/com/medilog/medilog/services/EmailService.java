package com.medilog.medilog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

public void sendVerificationEmail(String toEmail, String token) {
    String subject = "Verify your email";
    String verificationUrl = "http://localhost:8080/api/patients/verify?token=" + token;

    String htmlContent = "<h2>Welcome to MediLog!</h2>"
            + "<p>Please verify your email by clicking the link below:</p>"
            + "<a href=\"" + verificationUrl + "\">Verify Email</a>";

    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // Enable HTML
        mailSender.send(message);
    } catch (MessagingException e) {
        throw new RuntimeException("Failed to send email", e);
    }
}
public void sendDoctorVerificationEmail(String toEmail, String token) {
    String subject = "Verify your email (Doctor)";
    String verificationUrl = "http://localhost:8080/api/doctors/verify?token=" + token;

    String htmlContent = "<h2>Welcome to MediLog, Doctor!</h2>"
            + "<p>Please verify your email by clicking the link below:</p>"
            + "<a href=\"" + verificationUrl + "\">Verify Email</a>";

    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        mailSender.send(message);
    } catch (MessagingException e) {
        throw new RuntimeException("Failed to send email", e);
    }
}

}


