package com.medilog.medilog.controllers;

import com.medilog.medilog.models.LabResult;
import com.medilog.medilog.repositories.LabResultRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

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

    // Optional: Upload lab result with file
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public LabResult uploadLabResult(
            @RequestParam("visitSummaryId") String visitSummaryId,
            @RequestParam("name") String name,
            @RequestParam("pdfUrl") String pdfUrl // In a real app, handle the file upload and generate the URL
    ) {
        LabResult labResult = new LabResult();
        labResult.setVisitSummaryId(visitSummaryId);
        labResult.setName(name);
        labResult.setPdfUrl(pdfUrl);
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
}
