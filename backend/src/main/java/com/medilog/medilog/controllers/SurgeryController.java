package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Surgery;
import com.medilog.medilog.models.Patient;
import com.medilog.medilog.repositories.SurgeryRepository;
import com.medilog.medilog.repositories.PatientRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/surgeries")
public class SurgeryController {

    private final SurgeryRepository surgeryRepository;
    private final PatientRepository patientRepository;

    public SurgeryController(SurgeryRepository surgeryRepository, PatientRepository patientRepository) {
        this.surgeryRepository = surgeryRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Surgery> getAllSurgeries() {
        return surgeryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Surgery> getSurgeryById(@PathVariable String id) {
        return surgeryRepository.findById(id);
    }

    @PostMapping
    public Surgery createSurgery(@RequestBody Surgery surgery) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Unauthorized: Patient not found");
        }

        surgery.setPatientId(patientOpt.get().getId());
        surgery.setCreatedAt(new Date());

        return surgeryRepository.save(surgery);
    }

    @PutMapping("/{id}")
    public Surgery updateSurgery(@PathVariable String id, @RequestBody Surgery updatedSurgery) {
        return surgeryRepository.findById(id)
                .map(surgery -> {
                    surgery.setSurgeryType(updatedSurgery.getSurgeryType());
                    surgery.setDescription(updatedSurgery.getDescription());
                    surgery.setStatus(updatedSurgery.getStatus());
                    return surgeryRepository.save(surgery);
                })
                .orElseThrow(() -> new RuntimeException("Surgery not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteSurgery(@PathVariable String id) {
        surgeryRepository.deleteById(id);
    }

    @GetMapping("/my")
    public List<Surgery> getMySurgeries() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Unauthorized: Patient not found");
        }

        return surgeryRepository.findByPatientId(patientOpt.get().getId());
    }
}
