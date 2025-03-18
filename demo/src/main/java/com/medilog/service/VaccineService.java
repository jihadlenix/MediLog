package com.medilog.service;

import com.medilog.model.Vaccine;
import com.medilog.repository.VaccineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccineService {

    private final VaccineRepository vaccineRepository;

    public VaccineService(VaccineRepository vaccineRepository) {
        this.vaccineRepository = vaccineRepository;
    }

    public List<Vaccine> findAllVaccines() {
        return vaccineRepository.findAll();
    }

    public Vaccine findVaccineById(Long id) {
        return vaccineRepository.findById(id).orElse(null);
    }

    public Vaccine saveVaccine(Vaccine vaccine) {
        return vaccineRepository.save(vaccine);
    }
}
