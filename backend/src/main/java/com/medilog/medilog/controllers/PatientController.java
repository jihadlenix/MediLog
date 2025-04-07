package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.PatientLoginRequest;
import com.medilog.medilog.models.VerificationToken;
import com.medilog.medilog.repositories.PatientRepository;
import com.medilog.medilog.repositories.VerificationTokenRepository;
import com.medilog.medilog.services.EmailService;
import com.medilog.medilog.controllers.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private EmailService emailService;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Patient patient) {
        System.out.println("📩 Received signup request:");
    System.out.println("Username: " + patient.getUsername());
    System.out.println("Email: " + patient.getEmail());
    System.out.println("Name: " + patient.getName());
    //System.out.println("ID Number: " + patient.getIdNumber());
    //System.out.println("Phone Number: " + patient.getPhoneNumber());
    System.out.println("DOB: " + patient.getDateOfBirth());
    System.out.println("Gender: " + patient.getGender());
    System.out.println("Password: " + patient.getPassword());
        if (!patient.getEmail().toLowerCase().matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please provide a valid email address.");
        }

        Optional<Patient> existing = patientRepository.findByUsername(patient.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }

        Patient saved = patientRepository.save(patient);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setPatientId(saved.getId());
        verificationToken.setExpiryDate(new Date(System.currentTimeMillis() + 120000)); // 2 minutes

        verificationTokenRepository.save(verificationToken);
        try{emailService.sendVerificationEmail(saved.getEmail(), token);}
        catch (Exception e) {
            e.printStackTrace(); // log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Signup failed to send email.");
        }

        return ResponseEntity.ok("Signup successful. Check your email to verify your account.");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody PatientLoginRequest request) {
        Optional<Patient> patient = patientRepository.findByUsername(request.getUsername());

        if (patient.isPresent()) {
            Patient p = patient.get();

            //if (!p.isEmailVerified()) {
              //  return ResponseEntity.status(HttpStatus.FORBIDDEN)
                //        .body("Please verify your email before logging in.");
            //}

            if (p.getPassword().equals(request.getPassword())) {
                String token = JwtUtil.generateToken(p.getUsername());
                return ResponseEntity.ok(Collections.singletonMap("token", token));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    // GET all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // GET patient info using token
    @GetMapping("/info")
    public ResponseEntity<?> getPatientByToken(@RequestParam String token) {
        try {
            String username = JwtUtil.getUsernameFromToken(token);
            Optional<Patient> patient = patientRepository.findByUsername(username);

            if (patient.isPresent()) {
                return ResponseEntity.ok(patient.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    // UPDATE patient using token
    @PutMapping("/update")
    public ResponseEntity<?> updatePatient(@RequestParam String token, @RequestBody Patient updatedPatient) {
        try {
            String username = JwtUtil.getUsernameFromToken(token);
            Optional<Patient> optionalPatient = patientRepository.findByUsername(username);

            if (optionalPatient.isPresent()) {
                Patient patient = optionalPatient.get();
                patient.setName(updatedPatient.getName());
                patient.setDateOfBirth(updatedPatient.getDateOfBirth());
                patient.setGender(updatedPatient.getGender());
                return ResponseEntity.ok(patientRepository.save(patient));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    // DELETE patient using token
    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePatient(@RequestParam String token) {
        try {
            String username = JwtUtil.getUsernameFromToken(token);
            Optional<Patient> optionalPatient = patientRepository.findByUsername(username);

            if (optionalPatient.isPresent()) {
                patientRepository.delete(optionalPatient.get());
                return ResponseEntity.ok("Patient deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    // EMAIL VERIFICATION
    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        Optional<VerificationToken> optionalToken = verificationTokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid or expired token.");
        }

        VerificationToken verificationToken = optionalToken.get();

        if (verificationToken.getExpiryDate().before(new Date())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Token has expired.");
        }

        Optional<Patient> optionalPatient = patientRepository.findById(verificationToken.getPatientId());
        if (optionalPatient.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Patient not found.");
        }

        Patient patient = optionalPatient.get();
        patient.setEmailVerified(true);
        patientRepository.save(patient);

        verificationTokenRepository.delete(verificationToken);

        return ResponseEntity.ok("✅ Email verified successfully! You can now log in.");
    }
}
