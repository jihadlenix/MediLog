package com.medilog.medilog.repositories;

import com.medilog.medilog.models.LabResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LabResultRepository extends MongoRepository<LabResult, String> {
    
}
