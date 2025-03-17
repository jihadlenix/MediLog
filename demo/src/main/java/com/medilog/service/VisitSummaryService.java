package com.medilog.service;

import com.medilog.model.VisitSummary;
import com.medilog.repository.VisitSummaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitSummaryService {

    private final VisitSummaryRepository visitSummaryRepository;

    public VisitSummaryService(VisitSummaryRepository visitSummaryRepository) {
        this.visitSummaryRepository = visitSummaryRepository;
    }

    public List<VisitSummary> findAllSummaries() {
        return visitSummaryRepository.findAll();
    }

    public VisitSummary findSummaryById(Long id) {
        return visitSummaryRepository.findById(id).orElse(null);
    }

    public VisitSummary saveSummary(VisitSummary visitSummary) {
        return visitSummaryRepository.save(visitSummary);
    }
}
