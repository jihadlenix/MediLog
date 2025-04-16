package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.PatientLoginRequest;
import com.medilog.medilog.models.VerificationToken;
import com.medilog.medilog.models.AccessLink;
import com.medilog.medilog.repositories.PatientRepository;
import com.medilog.medilog.repositories.VerificationTokenRepository;
import com.medilog.medilog.repositories.AccessLinkRepository;
import com.medilog.medilog.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AccessLinkRepository accessLinkRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Patient patient) {
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
        emailService.sendVerificationEmail(saved.getEmail(), token);

        return ResponseEntity.ok("Signup successful. Check your email to verify your account.");
    }

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

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Patient> getPatientById(@PathVariable String id) {
        return patientRepository.findById(id);
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable String id, @RequestBody Patient updatedPatient) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patient.setName(updatedPatient.getName());
                    patient.setDateOfBirth(updatedPatient.getDateOfBirth());
                    patient.setGender(updatedPatient.getGender());
                    patient.setBloodType(updatedPatient.getBloodType());
                    patient.setHeight(updatedPatient.getHeight());
                    patient.setWeight(updatedPatient.getWeight());
                    patient.setMajorAllergies(updatedPatient.getMajorAllergies());
                    patient.setAge(updatedPatient.getAge());
                    return patientRepository.save(patient);
                })
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id) {
        patientRepository.deleteById(id);
    }

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

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentPatient() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<Patient> optionalPatient = patientRepository.findByUsername(username);

        if (optionalPatient.isPresent()) {
            return ResponseEntity.ok(optionalPatient.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
        }
    }

    @PostMapping("/generate-access-link")
    public ResponseEntity<?> generateAccessLink(Authentication authentication) {
        String username = authentication.getName();
        Optional<Patient> optionalPatient = patientRepository.findByUsername(username);
        if (optionalPatient.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Patient not found");
        }

        Patient patient = optionalPatient.get();

        AccessLink link = new AccessLink();
        link.setToken(UUID.randomUUID().toString());
        link.setPatientId(patient.getId());
        link.setDoctorId(null); // will be filled later
        link.setActive(true);

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 20);
        link.setExpiryTime(calendar.getTime());

        accessLinkRepository.save(link);

        String generatedLink = "https://medilog.com/access?token=" + link.getToken();

        return ResponseEntity.ok(Collections.singletonMap("link", generatedLink));
    }

    @PostMapping("/send-access-link/{doctorId}")
    public ResponseEntity<?> sendAccessLinkToDoctor(@PathVariable String doctorId, @RequestHeader("Authorization") String authHeader) {
        Patient patient = getLoggedInPatient(authHeader);
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or patient not found");
        }

        AccessLink link = accessLinkRepository
                .findFirstByPatientIdAndIsActiveOrderByCreatedAtDesc(patient.getId(), true);

        if (link == null || link.getExpiryTime().before(new Date())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No active access link found");
        }

        link.setDoctorId(doctorId);
        accessLinkRepository.save(link);

        return ResponseEntity.ok("Access link sent to doctor");
    }

    // 🔧 This is the missing helper that caused your error:
    private Patient getLoggedInPatient(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        String username = JwtUtil.getUsernameFromToken(token);  // You already use this in login
        Optional<Patient> patient = patientRepository.findByUsername(username);
        return patient.orElse(null);
    }
}
