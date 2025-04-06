package com.medilog.medilog.controllers;


import com.medilog.medilog.models.Doctor;
import com.medilog.medilog.models.VerifiedDoctorList;
import com.medilog.medilog.repositories.DoctorRepository;
import com.medilog.medilog.services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    

    @GetMapping("/{id}")
    public Optional<Doctor> getDoctorById(@PathVariable String id) {
        return doctorRepository.findById(id);
    }
@Autowired
private EmailService emailService; // already in your project

@PostMapping
public ResponseEntity<?> createDoctor(@RequestBody Doctor doctor) {
    Optional<Doctor> existing = doctorRepository.findByEmail(doctor.getEmail());

    if (existing.isPresent()) {
        Doctor existingDoctor = existing.get();

        if (existingDoctor.isEmailVerified()) {
            return ResponseEntity.status(409).body("❌ Doctor already registered and verified.");
        }

        // Not verified yet → generate new token and resend email
        String newToken = UUID.randomUUID().toString();
        existingDoctor.setVerificationToken(newToken);
        doctorRepository.save(existingDoctor);

        emailService.sendDoctorVerificationEmail(existingDoctor.getEmail(), newToken);
        return ResponseEntity.ok("🔁 Verification email resent.");
    }

    // New doctor
    doctor.setEmailVerified(false);
    doctor.setVerificationToken(UUID.randomUUID().toString());

    Doctor saved = doctorRepository.save(doctor);

    emailService.sendDoctorVerificationEmail(saved.getEmail(), saved.getVerificationToken());

    return ResponseEntity.ok("✅ Signup successful. Check your email to verify your account.");
}



    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable String id, @RequestBody Doctor updatedDoctor) {
        return doctorRepository.findById(id)
                .map(doctor -> {
                    doctor.setName(updatedDoctor.getName());
                    doctor.setSpecialty(updatedDoctor.getSpecialty());
                    doctor.setLicenseNumber(updatedDoctor.getLicenseNumber());
                    return doctorRepository.save(doctor);
                })
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable String id) {
        doctorRepository.deleteById(id);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(@RequestBody Doctor doctorLogin) {
        Optional<Doctor> doctor = doctorRepository.findByEmail(doctorLogin.getEmail());
    
        if (doctor.isEmpty()) {
            return ResponseEntity.status(404).body("❌ Doctor not found.");
        }
    
        Doctor existing = doctor.get();
    
        if (!existing.isEmailVerified()) {
            // Generate a new token and resend the email
            String newToken = UUID.randomUUID().toString();
            existing.setVerificationToken(newToken);
            doctorRepository.save(existing);
    
            emailService.sendDoctorVerificationEmail(existing.getEmail(), newToken);
    
            return ResponseEntity.status(403).body("📧 Please verify your email. A new verification link has been sent.");
        }
    
        // Check if in verified doctor list
        return VerifiedDoctorList.VERIFIED_DOCTORS.stream()
            .filter(doc ->
                doc.getName().equalsIgnoreCase(doctorLogin.getName()) &&
                doc.getCode().equals(doctorLogin.getCode()) &&
                doc.getNumber().equals(doctorLogin.getLicenseNumber()) &&
                doc.getSpecialty().equalsIgnoreCase(doctorLogin.getSpecialty())
            )
            .findFirst()
            .map(doc -> ResponseEntity.ok("✅ Login successful. Welcome, Doctor " + doc.getName()))
            .orElse(ResponseEntity.status(401).body("❌ You are not a verified doctor."));
    }
    
    
    @GetMapping("/verify")
public ResponseEntity<String> verifyDoctorEmail(@RequestParam String token) {
    Optional<Doctor> doctorOpt = doctorRepository.findByVerificationToken(token);
    if (doctorOpt.isPresent()) {
        Doctor doctor = doctorOpt.get();
        doctor.setEmailVerified(true);
        doctor.setVerificationToken(null); // Optional: clear the token
        doctorRepository.save(doctor);
        return ResponseEntity.ok("✅ Email verified successfully.");
    } else {
        return ResponseEntity.status(400).body("❌ Invalid or expired verification token.");
    }
}

    

}
