package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Surgery;
import java.util.List;

public interface SurgeryRepository extends MongoRepository<Surgery, String> {
    List<Surgery> findByPatientId(String patientId); // 👈 this is new
}
