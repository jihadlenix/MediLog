package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.repositories.MedicationRepository;
import com.medilog.medilog.repositories.PatientRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @PostMapping
    public Medication createMedication(@RequestBody Medication medication) {
        medication.setCreatedAt(new Date());
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

    // ✅ FIXED: Use JWT username (not email)
    @GetMapping("/my")
    public ResponseEntity<?> getMyMedications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); // comes from JWT, represents username
        System.out.println("📬 Extracted username: " + username);

        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Patient not found.");
        }

        Patient patient = patientOpt.get();
        List<Medication> medications = medicationRepository.findByPatientId(patient.getId());
        return ResponseEntity.ok(medications);
    }
}