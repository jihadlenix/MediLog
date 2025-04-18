package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.VisitSummary;
import com.medilog.medilog.repositories.MedicationRepository;
import com.medilog.medilog.repositories.PatientRepository;
import com.medilog.medilog.repositories.VisitSummaryRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/visit_summaries")
public class VisitSummaryController {

    private final VisitSummaryRepository visitSummaryRepository;
    private final MedicationRepository medicationRepository;
    private final PatientRepository patientRepository;

    public VisitSummaryController(
            VisitSummaryRepository visitSummaryRepository,
            MedicationRepository medicationRepository,
            PatientRepository patientRepository
    ) {
        this.visitSummaryRepository = visitSummaryRepository;
        this.medicationRepository = medicationRepository;
        this.patientRepository = patientRepository;
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
        // Get the patient information from the token
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();  // Patient's username (assuming it's used in the token)
    
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Unauthorized: Patient not found");
        }
    
        Patient patient = patientOpt.get();
        visitSummary.setPatientId(patient.getId());  // Set the patientId
    
        // Save the VisitSummary object
        VisitSummary savedVisit = visitSummaryRepository.save(visitSummary);
    
        // Process medications, if provided
        if (visitSummary.getMedications() != null && !visitSummary.getMedications().isEmpty()) {
            for (Medication medication : visitSummary.getMedications()) {
                medication.setVisitSummaryId(savedVisit.getId());
                medication.setPatientId(savedVisit.getPatientId());
                medication.setDoctorName(savedVisit.getDoctorName());
                medicationRepository.save(medication);
            }
        }
    
        return savedVisit;
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

                    if (updatedVisit.getMedications() != null && !updatedVisit.getMedications().isEmpty()) {
                        for (Medication medication : updatedVisit.getMedications()) {
                            medication.setVisitSummaryId(visit.getId());
                            medication.setPatientId(visit.getPatientId());
                            medicationRepository.save(medication);
                        }
                    }

                    return visitSummaryRepository.save(visit);
                })
                .orElseThrow(() -> new RuntimeException("Visit Summary not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteVisitSummary(@PathVariable String id) {
        medicationRepository.deleteByVisitSummaryId(id);
        visitSummaryRepository.deleteById(id);
    }

    @GetMapping("/my")
    public List<VisitSummary> getMyVisitSummaries() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Unauthorized: Patient not found");
        }

        return visitSummaryRepository.findByPatientId(patientOpt.get().getId());
    }
}
