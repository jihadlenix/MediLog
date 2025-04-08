package com.medilog.medilog.repositories;

import com.medilog.medilog.models.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByUsername(String username);
    Optional<Patient> findByEmail(String email);
}
