package com.medilog.service;

import com.medilog.model.Surgery;
import com.medilog.repository.SurgeryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurgeryService {

    private final SurgeryRepository surgeryRepository;

    public SurgeryService(SurgeryRepository surgeryRepository) {
        this.surgeryRepository = surgeryRepository;
    }

    public List<Surgery> findAllSurgeries() {
        return surgeryRepository.findAll();
    }

    public Surgery findSurgeryById(Long id) {
        return surgeryRepository.findById(id).orElse(null);
    }

    public Surgery saveSurgery(Surgery surgery) {
        return surgeryRepository.save(surgery);
    }
}
