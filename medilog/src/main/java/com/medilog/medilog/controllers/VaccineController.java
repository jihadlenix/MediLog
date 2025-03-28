package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Vaccine;
import com.medilog.medilog.repositories.VaccineRepository;
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
}
