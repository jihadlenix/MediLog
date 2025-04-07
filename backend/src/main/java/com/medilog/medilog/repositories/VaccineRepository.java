package com.medilog.medilog.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Vaccine;

public interface VaccineRepository extends MongoRepository<Vaccine, String> {
    List<Vaccine> findByPatientId(String patientId);
}
