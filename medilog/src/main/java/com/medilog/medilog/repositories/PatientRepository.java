package com.medilog.medilog.repositories;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Patient;

public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByUsername(String username); 
}

