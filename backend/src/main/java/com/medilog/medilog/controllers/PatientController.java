package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.PatientLoginRequest;
import com.medilog.medilog.repositories.PatientRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Patient patient) {
        Optional<Patient> existing = patientRepository.findByUsername(patient.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }
        Patient saved = patientRepository.save(patient);
        return ResponseEntity.ok(saved);
    }
    
    
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody PatientLoginRequest request) {
        Optional<Patient> patient = patientRepository.findByUsername(request.getUsername());
    
        if (patient.isPresent() && patient.get().getPassword().equals(request.getPassword())) {
            String token = JwtUtil.generateToken(patient.get().getUsername());
            return ResponseEntity.ok().body(Collections.singletonMap("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    
    

//added for authentication

  

    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get a single patient by ID
    @GetMapping("/{id}")
    public Optional<Patient> getPatientById(@PathVariable String id) {
        return patientRepository.findById(id);
    }

    // Add a new patient
    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    // Update a patient
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

    // Delete a patient
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id) {
        patientRepository.deleteById(id);
    }
}
