package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Patient;

public interface PatientRepository extends MongoRepository<Patient, String> {
}
