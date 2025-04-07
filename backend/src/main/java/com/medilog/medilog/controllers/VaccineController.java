package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Vaccine;
import com.medilog.medilog.repositories.VaccineRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {

    private final VaccineRepository vaccineRepository;

    public VaccineController(VaccineRepository vaccineRepository) {
        this.vaccineRepository = vaccineRepository;
    }

    @GetMapping
    public List<Vaccine> getAllVaccines() {
        return vaccineRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Vaccine> getVaccineById(@PathVariable String id) {
        return vaccineRepository.findById(id);
    }

    @PostMapping
    public Vaccine createVaccine(@RequestBody Vaccine vaccine) {
        return vaccineRepository.save(vaccine);
    }

    @DeleteMapping("/{id}")
    public void deleteVaccine(@PathVariable String id) {
        vaccineRepository.deleteById(id);
    }

    // ✅ ADDED: Return vaccines for the logged-in patient (future filtering)
    @GetMapping("/my")
    public List<Vaccine> getMyVaccines() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        // In the future:
        // return vaccineRepository.findByPatientId(username);

        return vaccineRepository.findAll(); // Currently returning all
    }
}
