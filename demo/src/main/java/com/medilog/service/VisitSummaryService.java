package com.medilog.service;

import com.medilog.model.VisitSummary;
import com.medilog.repository.VisitSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisitSummaryService {
    @Autowired
    private VisitSummaryRepository visitSummaryRepository;

    public List<VisitSummary> findAllSummaries() {
        return visitSummaryRepository.findAll();
    }

    public Optional<VisitSummary> findSummaryById(Long id) {
        return visitSummaryRepository.findById(id);
    }

    public VisitSummary saveSummary(VisitSummary summary) {
        return visitSummaryRepository.save(summary);
    }

    public void deleteSummary(Long id) {
        visitSummaryRepository.deleteById(id);
    }
}
