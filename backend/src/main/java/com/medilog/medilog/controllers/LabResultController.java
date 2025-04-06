package com.medilog.medilog.controllers;

import com.medilog.medilog.models.LabResult;
import com.medilog.medilog.repositories.LabResultRepository;
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

    @GetMapping("/visit/{visitSummaryId}")
    public List<LabResult> getLabResultsByVisitSummary(@PathVariable String visitSummaryId) {
        return labResultRepository.findByVisitSummaryId(visitSummaryId);
    }

    @PostMapping
    public LabResult createLabResult(@RequestBody LabResult labResult) {
        return labResultRepository.save(labResult);
    }

    @PutMapping("/{id}")
    public LabResult updateLabResult(@PathVariable String id, @RequestBody LabResult updatedLabResult) {
        return labResultRepository.findById(id)
                .map(result -> {
                    result.setHealthMetrics(updatedLabResult.getHealthMetrics());
                    return labResultRepository.save(result);
                })
                .orElseThrow(() -> new RuntimeException("Lab Result not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteLabResult(@PathVariable String id) {
        labResultRepository.deleteById(id);
    }
}
