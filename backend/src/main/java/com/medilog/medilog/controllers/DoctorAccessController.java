package com.medilog.medilog.controllers;

import com.medilog.medilog.models.*;
import com.medilog.medilog.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/access")
public class DoctorAccessController {

    @Autowired
    private AccessLinkRepository accessLinkRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private VaccineRepository vaccineRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // ✅ STEP 1: Get Patient Full Data via Token
    @GetMapping("/{token}/full-data")
    public ResponseEntity<?> getPatientDataViaToken(@PathVariable String token) {
        Optional<AccessLink> optionalLink = accessLinkRepository.findByToken(token);
        if (optionalLink.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid token.");
        }

        AccessLink link = optionalLink.get();
        if (!link.isActive() || link.getExpiryTime().before(new Date())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("⏰ Token expired or inactive.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Unauthorized or token expired.");
        }

        String email = authentication.getName();
        System.out.println("🧪 Extracted doctor email: " + email); // ✅ Debug print

        Optional<Doctor> doctorOpt = doctorRepository.findByEmailIgnoreCase(email); // ✅ case-insensitive lookup
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Doctor not found.");
        }

        Doctor loggedInDoctor = doctorOpt.get();
        if (!loggedInDoctor.getId().equals(link.getDoctorId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Doctor mismatch or not authorized.");
        }

        Optional<Patient> patientOpt = patientRepository.findById(link.getPatientId());
        if (patientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Patient not found.");
        }

        Patient patient = patientOpt.get();
        List<Medication> meds = medicationRepository.findByPatientId(patient.getId());
        List<Vaccine> vaccines = vaccineRepository.findByPatientId(patient.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("patient", patient);
        result.put("medications", meds);
        result.put("vaccines", vaccines);

        return ResponseEntity.ok(result);
    }

    // ✅ STEP 2: Add Medication
    @PostMapping("/{token}/add-medication")
    public ResponseEntity<?> addMedicationViaToken(@PathVariable String token, @RequestBody Medication med) {
        Optional<AccessLink> optionalLink = accessLinkRepository.findByToken(token);
        if (optionalLink.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid token.");
        }

        AccessLink link = optionalLink.get();
        if (!link.isActive() || link.getExpiryTime().before(new Date())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("⏰ Token expired or inactive.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Unauthorized or token expired.");
        }

        String email = authentication.getName();
        Optional<Doctor> doctorOpt = doctorRepository.findByEmailIgnoreCase(email);
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Doctor not found.");
        }

        Doctor loggedInDoctor = doctorOpt.get();
        if (!loggedInDoctor.getId().equals(link.getDoctorId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Doctor mismatch or not authorized.");
        }

        med.setPatientId(link.getPatientId());
        med.setCreatedAt(new Date());
        Medication saved = medicationRepository.save(med);
        return ResponseEntity.ok(saved);
    }

    // ✅ STEP 3: Add Vaccine
    @PostMapping("/{token}/add-vaccine")
    public ResponseEntity<?> addVaccineViaToken(@PathVariable String token, @RequestBody Vaccine vaccine) {
        Optional<AccessLink> optionalLink = accessLinkRepository.findByToken(token);
        if (optionalLink.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid token.");
        }

        AccessLink link = optionalLink.get();
        if (!link.isActive() || link.getExpiryTime().before(new Date())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("⏰ Token expired or inactive.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Unauthorized or token expired.");
        }

        String email = authentication.getName();
        Optional<Doctor> doctorOpt = doctorRepository.findByEmailIgnoreCase(email);
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Doctor not found.");
        }

        Doctor loggedInDoctor = doctorOpt.get();
        if (!loggedInDoctor.getId().equals(link.getDoctorId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Doctor mismatch or not authorized.");
        }

        vaccine.setPatientId(link.getPatientId());
        vaccine.setCreatedAt(new Date());
        Vaccine saved = vaccineRepository.save(vaccine);
        return ResponseEntity.ok(saved);
    }
}
