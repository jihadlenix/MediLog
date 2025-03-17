package com.medilog.service;

import com.medilog.model.Medication;
import com.medilog.repository.MedicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicationService {

    private final MedicationRepository medicationRepository;

    public MedicationService(MedicationRepository medicationRepository) {
        this.medicationRepository = medicationRepository;
    }

    public List<Medication> findAllMedications() {
        return medicationRepository.findAll();
    }

    public Medication findMedicationById(Long id) {
        return medicationRepository.findById(id).orElse(null);
    }

    public Medication saveMedication(Medication medication) {
        return medicationRepository.save(medication);
    }
}
