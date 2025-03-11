package com.medilog.service;

import com.medilog.model.LabResults;
import com.medilog.repository.LabResultsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabResultsService {
    @Autowired
    private LabResultsRepository labResultsRepository;

    public List<LabResults> findAllResults() {
        return labResultsRepository.findAll();
    }

    public Optional<LabResults> findResultById(Long id) {
        return labResultsRepository.findById(id);
    }

    public LabResults saveResult(LabResults result) {
        return labResultsRepository.save(result);
    }

    public void deleteResult(Long id) {
        labResultsRepository.deleteById(id);
    }
}
