package com.medilog.service;

import com.medilog.model.LabResult;
import com.medilog.repository.LabResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabResultsService {
    @Autowired
    private LabResultRepository labResultsRepository;

    public List<LabResult> findAllResults() {
        return labResultsRepository.findAll();
    }

    public Optional<LabResult> findResultById(Long id) {
        return labResultsRepository.findById(id);
    }

    public LabResult saveResult(LabResult result) {
        return labResultsRepository.save(result);
    }

    public void deleteResult(Long id) {
        labResultsRepository.deleteById(id);
    }
}
