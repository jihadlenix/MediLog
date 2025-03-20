package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.models.VisitSummary;
import com.medilog.medilog.repositories.MedicationRepository;
import com.medilog.medilog.repositories.VisitSummaryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/visit_summaries")
public class VisitSummaryController {

    private final VisitSummaryRepository visitSummaryRepository;
    private final MedicationRepository medicationRepository;

    public VisitSummaryController(VisitSummaryRepository visitSummaryRepository, MedicationRepository medicationRepository) {
        this.visitSummaryRepository = visitSummaryRepository;
        this.medicationRepository = medicationRepository;
    }

    @GetMapping
    public List<VisitSummary> getAllVisitSummaries() {
        return visitSummaryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<VisitSummary> getVisitSummaryById(@PathVariable String id) {
        return visitSummaryRepository.findById(id);
    }

    @PostMapping
    public VisitSummary createVisitSummary(@RequestBody VisitSummary visitSummary) {
        // Save the visit summary first
        VisitSummary savedVisit = visitSummaryRepository.save(visitSummary);

        // Check if medications exist in the request
        if (visitSummary.getMedications() != null && !visitSummary.getMedications().isEmpty()) {
            for (Medication medication : visitSummary.getMedications()) {
                medication.setVisitSummaryId(savedVisit.getId()); // Assign visit summary ID
                medication.setPatientId(savedVisit.getPatientId()); // Ensure patient ID is consistent
                medication.setDoctorName(savedVisit.getDoctorName());
                medicationRepository.save(medication); // Save medication
            }
        }

        return savedVisit; // Return the saved visit summary
    }

    @PutMapping("/{id}")
    public VisitSummary updateVisitSummary(@PathVariable String id, @RequestBody VisitSummary updatedVisit) {
        return visitSummaryRepository.findById(id)
                .map(visit -> {
                    visit.setVisitType(updatedVisit.getVisitType());
                    visit.setVisitDate(updatedVisit.getVisitDate());
                    visit.setDescription(updatedVisit.getDescription());
                    visit.setDoctorName(updatedVisit.getDoctorName());
                    visit.setDiagnosis(updatedVisit.getDiagnosis());
                    visit.setTestsRequired(updatedVisit.getTestsRequired());

                    // Update medications if present
                    if (updatedVisit.getMedications() != null && !updatedVisit.getMedications().isEmpty()) {
                        for (Medication medication : updatedVisit.getMedications()) {
                            medication.setVisitSummaryId(visit.getId()); // Assign visit summary ID
                            medication.setPatientId(visit.getPatientId()); // Ensure patient ID is consistent
                            medicationRepository.save(medication); // Save medication
                        }
                    }

                    return visitSummaryRepository.save(visit);
                })
                .orElseThrow(() -> new RuntimeException("Visit Summary not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteVisitSummary(@PathVariable String id) {
        // Delete all medications associated with this visit summary
        medicationRepository.deleteByVisitSummaryId(id);

        // Delete the visit summary
        visitSummaryRepository.deleteById(id);
    }
}
