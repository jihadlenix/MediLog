package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.repositories.MedicationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationRepository medicationRepository;
    private final PatientRepository patientRepository; 

    public MedicationController(MedicationRepository medicationRepository, PatientRepository patientRepository) {
        this.medicationRepository = medicationRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Medication> getAllMedications() {
        return medicationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Medication> getMedicationById(@PathVariable String id) {
        return medicationRepository.findById(id);
    }

    @GetMapping("/visit/{visitSummaryId}")
    public List<Medication> getMedicationsByVisitSummary(@PathVariable String visitSummaryId) {
        return medicationRepository.findByVisitSummaryId(visitSummaryId);
    }

    @GetMapping("/patient")
public ResponseEntity<?> getMedicationsByPatientToken(@RequestParam String token) {
    try {
        String username = JwtUtil.getUsernameFromToken(token);
        Optional<Patient> patient = patientRepository.findByUsername(username);

        if (patient.isPresent()) {
            List<Medication> medications = medicationRepository.findByPatientId(patient.get().getId());
            return ResponseEntity.ok(medications);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
        }

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
    }
}

    @PostMapping
    public Medication createMedication(@RequestBody Medication medication) {
        return medicationRepository.save(medication);
    }

    @PutMapping("/{id}")
    public Medication updateMedication(@PathVariable String id, @RequestBody Medication updatedMedication) {
        return medicationRepository.findById(id)
                .map(med -> {
                    med.setMedicationName(updatedMedication.getMedicationName());
                    med.setDosage(updatedMedication.getDosage());
                    med.setGivenDate(updatedMedication.getGivenDate());
                    med.setDueDate(updatedMedication.getDueDate());
                    med.setDescription(updatedMedication.getDescription());
                    med.setStatus(updatedMedication.getStatus());
                    return medicationRepository.save(med);
                })
                .orElseThrow(() -> new RuntimeException("Medication not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteMedication(@PathVariable String id) {
        medicationRepository.deleteById(id);
    }

    // ✅ ADDED: Return medications for the currently logged-in patient
    @GetMapping("/my")
    public List<Medication> getMyMedications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); // This is the logged-in patient's ID or username
        return medicationRepository.findByPatientId(username);
    }
}
