package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.VisitSummary;

public interface VisitSummaryRepository extends MongoRepository<VisitSummary, String> {
}
