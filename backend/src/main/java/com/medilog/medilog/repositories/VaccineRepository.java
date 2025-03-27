package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Vaccine;

public interface VaccineRepository extends MongoRepository<Vaccine, String> {
}
