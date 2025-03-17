package com.medilog.service;

import com.medilog.model.Medications;
import com.medilog.repository.MedicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicationsService {
    @Autowired
    private MedicationsRepository medicationsRepository;

    public List<Medications> findAllMedications() {
        return medicationsRepository.findAll();
    }

    public Optional<Medications> findMedicationById(Long id) {
        return medicationsRepository.findById(id);
    }

    public Medications saveMedication(Medications medication) {
        return medicationsRepository.save(medication);
    }

    public void deleteMedication(Long id) {
        medicationsRepository.deleteById(id);
    }
}
