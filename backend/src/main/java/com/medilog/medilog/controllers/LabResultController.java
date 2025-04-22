package com.medilog.medilog.controllers;

import com.medilog.medilog.models.LabResult;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.repositories.LabResultRepository;
import com.medilog.medilog.repositories.PatientRepository;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/lab_results")
public class LabResultController {

    private final LabResultRepository labResultRepository;
    private final PatientRepository patientRepository;

    public LabResultController(LabResultRepository labResultRepository, PatientRepository patientRepository) {
        this.labResultRepository = labResultRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<LabResult> getAllLabResults() {
        return labResultRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<LabResult> getLabResultById(@PathVariable String id) {
        return labResultRepository.findById(id);
    }

    @PostMapping
    public LabResult createLabResult(@RequestBody LabResult labResult) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated user: " + auth.getName());
        String username = auth.getName();
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);

        if (patientOpt.isPresent()) {
            labResult.setPatientId(patientOpt.get().getId());
            labResult.setCreatedAt(new Date());
            return labResultRepository.save(labResult);
        }

        throw new RuntimeException("Unauthorized: Patient not found");
    }

    @PutMapping("/{id}")
    public LabResult updateLabResult(@PathVariable String id, @RequestBody LabResult updatedLabResult) {
        return labResultRepository.findById(id)
                .map(result -> {
                    result.setName(updatedLabResult.getName());
                    result.setPdfUrl(updatedLabResult.getPdfUrl());
                    return labResultRepository.save(result);
                })
                .orElseThrow(() -> new RuntimeException("Lab Result not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteLabResult(@PathVariable String id) {
        labResultRepository.deleteById(id);
    }

    @GetMapping("/my")
    public List<LabResult> getMyLabResults() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);

        if (patientOpt.isPresent()) {
            return labResultRepository.findByPatientId(patientOpt.get().getId());
        }

        throw new RuntimeException("Unauthorized: Patient not found");
    }
}
