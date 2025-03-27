package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, String> {
}
