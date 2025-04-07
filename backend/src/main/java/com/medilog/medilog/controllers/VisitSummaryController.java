package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Medication;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.VisitSummary;
import com.medilog.medilog.repositories.MedicationRepository;
import com.medilog.medilog.repositories.PatientRepository;
import com.medilog.medilog.repositories.VisitSummaryRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.medilog.medilog.models.Doctor;
import com.medilog.medilog.repositories.DoctorRepository;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/visit_summaries")
public class VisitSummaryController {

    private final VisitSummaryRepository visitSummaryRepository;
    private final MedicationRepository medicationRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public VisitSummaryController(VisitSummaryRepository visitSummaryRepository, MedicationRepository medicationRepository, PatientRepository patientRepository,DoctorRepository doctorRepository) {
        this.visitSummaryRepository = visitSummaryRepository;
        this.medicationRepository = medicationRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
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
    @PostMapping("/create")
public ResponseEntity<?> createVisitSummaryForPatient(@RequestParam String token, @RequestBody VisitSummary visitSummary) {
    try {
        String username = JwtUtil.getUsernameFromToken(token);
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);

        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();

            visitSummary.setPatientId(patient.getId());
            visitSummary.setDoctorName(patient.getName()); // if you store doctorName this way

            VisitSummary savedVisit = visitSummaryRepository.save(visitSummary);

            if (visitSummary.getMedications() != null && !visitSummary.getMedications().isEmpty()) {
                for (Medication medication : visitSummary.getMedications()) {
                    medication.setVisitSummaryId(savedVisit.getId());
                    medication.setPatientId(patient.getId());
                    medication.setDoctorName(savedVisit.getDoctorName());
                    medicationRepository.save(medication);
                }
            }

            return ResponseEntity.ok(savedVisit);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
        }

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
    }
}
@GetMapping("/patient")
public ResponseEntity<?> getVisitSummariesByToken(@RequestParam String token) {
    try {
        String username = JwtUtil.getUsernameFromToken(token);
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);

        if (patientOpt.isPresent()) {
            String patientId = patientOpt.get().getId();
            List<VisitSummary> summaries = visitSummaryRepository.findByPatientId(patientId);
            return ResponseEntity.ok(summaries);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found.");
        }

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
    }
}

}
