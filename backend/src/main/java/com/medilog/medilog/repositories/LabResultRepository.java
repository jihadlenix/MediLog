package com.medilog.medilog.repositories;

import com.medilog.medilog.models.LabResult;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LabResultRepository extends MongoRepository<LabResult, String> {
    List<LabResult> findByVisitSummaryId(String visitSummaryId); // Find lab results by visit summary ID
}
