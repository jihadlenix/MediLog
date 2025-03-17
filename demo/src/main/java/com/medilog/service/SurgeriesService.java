package com.medilog.service;

import com.medilog.model.Surgery;
import com.medilog.repository.SurgeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurgeriesService {
    @Autowired
    private SurgeriesRepository surgeriesRepository;

    public List<Surgery> findAllSurgeries() {
        return surgeriesRepository.findAll();
    }

    public Optional<Surgery> findSurgeryById(Long id) {
        return surgeriesRepository.findById(id);
    }

    public Surgery saveSurgery(Surgery surgery) {
        return surgeriesRepository.save(surgery);
    }

    public void deleteSurgery(Long id) {
        surgeriesRepository.deleteById(id);
    }
}
