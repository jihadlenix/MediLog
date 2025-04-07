package com.medilog.medilog.controllers;

import com.medilog.medilog.models.LabResult;
import com.medilog.medilog.repositories.LabResultRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lab_results")
public class LabResultController {

    private final LabResultRepository labResultRepository;

    public LabResultController(LabResultRepository labResultRepository) {
        this.labResultRepository = labResultRepository;
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
        return labResultRepository.save(labResult);
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

    // ✅ ADDED: Get current user's lab results (if linking to user later)
    @GetMapping("/my")
    public List<LabResult> getMyLabResults() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        // 🔧 NOTE: If lab results are tied to user in the future, filter by username
        // return labResultRepository.findByPatientId(username);
        return labResultRepository.findAll(); // Returns all for now
    }
}
