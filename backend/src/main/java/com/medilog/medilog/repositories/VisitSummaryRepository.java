package com.medilog.medilog.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.VisitSummary;
import java.util.List; // ✅ This is what was missing

public interface VisitSummaryRepository extends MongoRepository<VisitSummary, String> {
    List<VisitSummary> findByPatientId(String patientId);  // This line requires the List import
}