package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.Vaccine;
import com.medilog.medilog.repositories.VaccineRepository;
import com.medilog.medilog.repositories.PatientRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {

    private final VaccineRepository vaccineRepository;
    private final PatientRepository patientRepository;

    public VaccineController(VaccineRepository vaccineRepository, PatientRepository patientRepository) {
        this.vaccineRepository = vaccineRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Vaccine> getAllVaccines() {
        return vaccineRepository.findAll();
    }

    // ✅ Get by ID (optional)
    @GetMapping("/{id}")
    public Optional<Vaccine> getVaccineById(@PathVariable String id) {
        return vaccineRepository.findById(id);
    }

    @PostMapping
    public Vaccine createVaccine(@RequestBody Vaccine vaccine) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Unauthorized: Patient not found");
        }

        vaccine.setPatientId(patientOpt.get().getId());
        vaccine.setCreatedAt(new Date());

        return vaccineRepository.save(vaccine);
    }

    @DeleteMapping("/{id}")
    public void deleteVaccine(@PathVariable String id) {
        vaccineRepository.deleteById(id);
    }

    @GetMapping("/my")
    public List<Vaccine> getMyVaccines() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Unauthorized: Patient not found");
        }

        return vaccineRepository.findByPatientId(patientOpt.get().getId());
    }
}
