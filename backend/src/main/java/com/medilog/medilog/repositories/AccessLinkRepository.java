package com.medilog.medilog.repositories;

import com.medilog.medilog.models.AccessLink;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AccessLinkRepository extends MongoRepository<AccessLink, String> {

    Optional<AccessLink> findByToken(String token);
    AccessLink findFirstByPatientIdAndIsActiveOrderByCreatedAtDesc(String patientId, boolean isActive);
    List<AccessLink> findByDoctorIdAndIsActiveTrue(String doctorId);
}
