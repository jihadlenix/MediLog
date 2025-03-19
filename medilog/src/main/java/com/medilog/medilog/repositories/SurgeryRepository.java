package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Surgery;

public interface SurgeryRepository extends MongoRepository<Surgery, String> {
}
