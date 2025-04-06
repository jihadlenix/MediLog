package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.PatientLoginRequest;
import com.medilog.medilog.models.VerificationToken;
import com.medilog.medilog.repositories.PatientRepository;
import com.medilog.medilog.repositories.VerificationTokenRepository;
import com.medilog.medilog.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    // SIGNUP
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

    // 👇 Token generation + email sending
    String token = UUID.randomUUID().toString();
    VerificationToken verificationToken = new VerificationToken();
    verificationToken.setToken(token);
    verificationToken.setPatientId(saved.getId());
    verificationToken.setExpiryDate(new Date(System.currentTimeMillis() + 120000)); // 2 minutes


    verificationTokenRepository.save(verificationToken);
    emailService.sendVerificationEmail(saved.getEmail(), token);

    return ResponseEntity.ok("Signup successful. Check your email to verify your account.");
}

                // @PostMapping("/signup")
                // public ResponseEntity<?> signUp(@RequestBody Patient patient) {
                //     Optional<Patient> existing = patientRepository.findByUsername(patient.getUsername());
                //     if (existing.isPresent()) {
                //         return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
                //     }

                //     Patient saved = patientRepository.save(patient);

                //     // 👇 Token generation + email sending
                //     String token = UUID.randomUUID().toString();
                //     VerificationToken verificationToken = new VerificationToken();
                //     verificationToken.setToken(token);
                //     verificationToken.setPatientId(saved.getId());
                //     verificationToken.setExpiryDate(new Date(System.currentTimeMillis() + 86400000)); // 24 hours

                //     verificationTokenRepository.save(verificationToken);
                //     emailService.sendVerificationEmail(saved.getEmail(), token);

                //     return ResponseEntity.ok("Signup successful. Check your email to verify your account.");
                // }

    // LOGIN
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody PatientLoginRequest request) {
    Optional<Patient> patient = patientRepository.findByUsername(request.getUsername());

    if (patient.isPresent()) {
        Patient p = patient.get();

        if (!p.isEmailVerified()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Please verify your email before logging in.");
        }

        if (p.getPassword().equals(request.getPassword())) {
            String token = JwtUtil.generateToken(p.getUsername());
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
}

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody PatientLoginRequest request) {
    //     Optional<Patient> patient = patientRepository.findByUsername(request.getUsername());

    //     if (patient.isPresent() && patient.get().getPassword().equals(request.getPassword())) {
    //         String token = JwtUtil.generateToken(patient.get().getUsername());
    //         return ResponseEntity.ok(Collections.singletonMap("token", token));
    //     } else {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    //     }
    // }

    // // GET all patients
     @GetMapping
    public List<Patient> getAllPatients() {
       return patientRepository.findAll();
    }

    // GET a patient by ID
    @GetMapping("/{id}")
    public Optional<Patient> getPatientById(@PathVariable String id) {
        return patientRepository.findById(id);
    }

    // ADD new patient (basic)
    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    // UPDATE patient
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable String id, @RequestBody Patient updatedPatient) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patient.setName(updatedPatient.getName());
                    patient.setDateOfBirth(updatedPatient.getDateOfBirth());
                    patient.setGender(updatedPatient.getGender());
                    return patientRepository.save(patient);
                })
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    // DELETE patient
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

}
