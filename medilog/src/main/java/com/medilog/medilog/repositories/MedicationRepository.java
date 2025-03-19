package com.medilog.medilog.repositories;

import com.medilog.medilog.models.Medication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MedicationRepository extends MongoRepository<Medication, String> {
    List<Medication> findByVisitSummaryId(String visitSummaryId); // Find medications by visit summary ID
}
