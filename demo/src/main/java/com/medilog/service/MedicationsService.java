package com.medilog.service;

import com.medilog.model.Medication;
import com.medilog.repository.MedicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicationsService {
    @Autowired
    private MedicationsRepository medicationsRepository;

    public List<Medication> findAllMedications() {
        return medicationsRepository.findAll();
    }

    public Optional<Medication> findMedicationById(Long id) {
        return medicationsRepository.findById(id);
    }

    public Medication saveMedication(Medication medication) {
        return medicationsRepository.save(medication);
    }

    public void deleteMedication(Long id) {
        medicationsRepository.deleteById(id);
    }
}
