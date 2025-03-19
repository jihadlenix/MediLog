package com.medilog.medilog.controllers;

import com.medilog.medilog.models.VisitSummary;
import com.medilog.medilog.repositories.VisitSummaryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/visit_summaries")
public class VisitSummaryController {

    private final VisitSummaryRepository visitSummaryRepository;

    public VisitSummaryController(VisitSummaryRepository visitSummaryRepository) {
        this.visitSummaryRepository = visitSummaryRepository;
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
        return visitSummaryRepository.save(visitSummary);
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
                    return visitSummaryRepository.save(visit);
                })
                .orElseThrow(() -> new RuntimeException("Visit Summary not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteVisitSummary(@PathVariable String id) {
        visitSummaryRepository.deleteById(id);
    }
}
