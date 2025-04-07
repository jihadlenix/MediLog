package com.medilog.medilog.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.VisitSummary;

public interface VisitSummaryRepository extends MongoRepository<VisitSummary, String> {
     List<VisitSummary> findByPatientId(String patientId);
}
