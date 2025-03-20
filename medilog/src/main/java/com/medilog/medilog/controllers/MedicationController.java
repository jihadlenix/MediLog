package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.repositories.MedicationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationRepository medicationRepository;

    public MedicationController(MedicationRepository medicationRepository) {
        this.medicationRepository = medicationRepository;
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

    @GetMapping("/patient/{patientId}")
    public List<Medication> getMedicationsByPatientId(@PathVariable String patientId) {
        return medicationRepository.findByPatientId(patientId);
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
}
