package com.medilog.medilog.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByEmailIgnoreCase(String email); // ✅ REQUIRED for matching in controller
    Optional<Doctor> findByVerificationToken(String token);
}
