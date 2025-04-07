package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.repositories.MedicationRepository;
import com.medilog.medilog.repositories.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/create")
public ResponseEntity<?> createMedicationForPatient(@RequestParam String token, @RequestBody Medication medication) {
    try {
        String username = JwtUtil.getUsernameFromToken(token);
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);

        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();

            // Set the patientId from the patient object
            medication.setPatientId(patient.getId());
            

            Medication savedMedication = medicationRepository.save(medication);
            return ResponseEntity.ok(savedMedication);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found.");
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
    }
}
}
