package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Surgery;
import com.medilog.medilog.repositories.SurgeryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/surgeries")
public class SurgeryController {

    private final SurgeryRepository surgeryRepository;

    public SurgeryController(SurgeryRepository surgeryRepository) {
        this.surgeryRepository = surgeryRepository;
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
}
